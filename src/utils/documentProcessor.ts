import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface DocumentContent {
  text: string;
  success: boolean;
  error?: string;
}

/**
 * Process DOCX files
 */
export async function processDocx(file: File): Promise<DocumentContent> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    return {
      text: result.value,
      success: true,
    };
  } catch (error) {
    console.error('Error processing DOCX:', error);
    return {
      text: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Process DOC files (older Word format)
 * Note: mammoth also supports .doc to some extent
 */
export async function processDoc(file: File): Promise<DocumentContent> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    return {
      text: result.value || '[DOC format may not be fully supported. Please convert to DOCX for best results.]',
      success: true,
    };
  } catch (error) {
    console.error('Error processing DOC:', error);
    return {
      text: '[Unable to read DOC file. Please convert to DOCX format.]',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Process PDF files
 */
export async function processPdf(file: File): Promise<DocumentContent> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += `\n--- Page ${pageNum} ---\n${pageText}\n`;
    }
    
    return {
      text: fullText.trim(),
      success: true,
    };
  } catch (error) {
    console.error('Error processing PDF:', error);
    return {
      text: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Process Excel files (XLS, XLSX, CSV)
 */
export async function processSpreadsheet(file: File): Promise<DocumentContent> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    let fullText = '';
    
    // Process each sheet
    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const csvData = XLSX.utils.sheet_to_csv(worksheet);
      
      fullText += `\n--- Sheet: ${sheetName} ---\n${csvData}\n`;
    });
    
    return {
      text: fullText.trim(),
      success: true,
    };
  } catch (error) {
    console.error('Error processing spreadsheet:', error);
    return {
      text: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Process XML files
 */
export async function processXml(file: File): Promise<DocumentContent> {
  try {
    const text = await file.text();
    
    // Pretty print XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      return {
        text,
        success: true,
      };
    }
    
    // Format XML nicely
    const serializer = new XMLSerializer();
    const formatted = serializer.serializeToString(xmlDoc);
    
    return {
      text: formatted,
      success: true,
    };
  } catch (error) {
    console.error('Error processing XML:', error);
    return {
      text: await file.text(),
      success: true,
    };
  }
}

/**
 * Process RTF files
 */
export async function processRtf(file: File): Promise<DocumentContent> {
  try {
    const text = await file.text();
    
    // Basic RTF to text conversion (strip RTF formatting)
    const stripped = text
      .replace(/\\[a-z]+\d*\s?/g, '') // Remove RTF commands
      .replace(/[{}]/g, '') // Remove braces
      .replace(/\\/g, '') // Remove backslashes
      .trim();
    
    return {
      text: stripped || '[RTF content - formatting stripped]',
      success: true,
    };
  } catch (error) {
    console.error('Error processing RTF:', error);
    return {
      text: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Main document processor - routes to appropriate handler
 */
export async function processDocument(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  
  let result: DocumentContent;
  
  switch (extension) {
    case 'docx':
      result = await processDocx(file);
      break;
    case 'doc':
      result = await processDoc(file);
      break;
    case 'pdf':
      result = await processPdf(file);
      break;
    case 'xlsx':
    case 'xls':
    case 'csv':
      result = await processSpreadsheet(file);
      break;
    case 'xml':
      result = await processXml(file);
      break;
    case 'rtf':
      result = await processRtf(file);
      break;
    default:
      // For regular text files
      return await file.text();
  }
  
  if (!result.success) {
    return `[Error reading ${extension.toUpperCase()} file: ${result.error}]`;
  }
  
  return result.text;
}

/**
 * Check if file is a document type that needs special processing
 */
export function isDocumentFile(filename: string): boolean {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  return ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'csv', 'xml', 'rtf'].includes(extension);
}

/**
 * Get document type label
 */
export function getDocumentType(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  
  const typeMap: Record<string, string> = {
    docx: 'Word Document',
    doc: 'Word Document (Legacy)',
    pdf: 'PDF Document',
    xlsx: 'Excel Spreadsheet',
    xls: 'Excel Spreadsheet (Legacy)',
    csv: 'CSV Spreadsheet',
    xml: 'XML Document',
    rtf: 'Rich Text Format',
  };
  
  return typeMap[extension] || 'Document';
}
