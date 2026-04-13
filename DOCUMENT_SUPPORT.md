# 📄 Document Support Guide

## Overview

**BlaXk Aggregator** now supports reading and aggregating various document formats in addition to code files. This allows you to compile mixed content including documentation, spreadsheets, and code into a single output.

---

## 📚 Supported Document Formats

### 📕 PDF Documents (.pdf)
- **What it does**: Extracts text content from PDF files page by page
- **Output format**: Text with page separators (`--- Page N ---`)
- **Limitations**: 
  - Cannot extract text from scanned PDFs (image-based)
  - Formatting and layout may not be preserved perfectly
  - Complex tables might not render well

**Web App Library**: PDF.js  
**Python Library**: PyPDF2

---

### 📝 Word Documents (.docx, .doc)
- **What it does**: Extracts text and paragraphs from Word documents
- **Output format**: Plain text with paragraph breaks
- **Limitations**:
  - Formatting (bold, italic, colors) is not preserved
  - Images and embedded objects are not extracted
  - .DOC (legacy) support may be limited

**Web App Library**: Mammoth.js  
**Python Library**: python-docx

---

### 📊 Excel Spreadsheets (.xlsx, .xls, .csv)
- **What it does**: Extracts data from spreadsheet files
- **Output format**: 
  - CSV: Raw text as-is
  - Excel: Comma-separated values per sheet
  - Sheet separators: `--- Sheet: [Name] ---`
- **Limitations**:
  - Formulas are converted to their calculated values
  - Formatting and styles are not preserved
  - Charts and images are not extracted

**Web App Library**: XLSX  
**Python Library**: openpyxl

---

### 🗂️ XML Files (.xml)
- **What it does**: Reads and pretty-prints XML structure
- **Output format**: Formatted XML with proper indentation
- **Limitations**:
  - Very large XML files may take time to process
  - Malformed XML will fallback to raw text

**Processing**: Native XML parsers (browser DOM, Python ElementTree)

---

### 📋 Rich Text Format (.rtf)
- **What it does**: Basic text extraction from RTF files
- **Output format**: Plain text with RTF commands stripped
- **Limitations**:
  - Advanced RTF features may not be fully supported
  - Formatting is completely removed
  - Best effort conversion only

**Processing**: Basic regex-based stripping

---

## 🚀 Usage Examples

### Web Application

1. **Upload Documents**
   - Drag and drop PDF, DOCX, XLSX files
   - Mix code and document files in the same compilation
   - Preview extracted text in real-time

2. **Configure Options**
   - Enable metadata to see file types
   - Group by file type to separate documents from code
   - Export to any format (TXT, MD, HTML, JSON, PDF)

### Python CLI

```bash
# Aggregate code and documents together
python code_aggregator.py project/ \
  --extensions py,js,pdf,docx,xlsx \
  -o compiled.txt

# Only process document files
python code_aggregator.py documents/ \
  --extensions pdf,docx,xlsx \
  -f md \
  -o documentation.md

# Mix everything
python code_aggregator.py . \
  -o complete_compilation.pdf \
  --include-metadata
```

---

## 📦 Installation Requirements

### Web Application
All required libraries are automatically included via npm:
```bash
npm install
```

Included libraries:
- `mammoth` - DOCX reading
- `pdfjs-dist` - PDF reading
- `xlsx` - Spreadsheet processing

### Python CLI

Install document processing libraries:
```bash
pip install -r requirements.txt
```

This installs:
- `PyPDF2` - PDF reading
- `python-docx` - Word document reading
- `openpyxl` - Excel reading

**Note**: CSV and XML support is included in Python's standard library.

---

## ⚠️ Important Notes

### File Size Considerations
- Large documents (especially PDFs with many pages) may take time to process
- Default max file size is 10MB (configurable)
- Consider splitting very large documents

### Quality of Extraction
- **Best**: Text-based PDFs, modern DOCX files, simple spreadsheets
- **Good**: XML files, CSV files, RTF files
- **Limited**: Scanned PDFs, complex Word documents with tables/images, DOC (legacy)

### Privacy & Security
- **Web App**: All processing happens in your browser (100% client-side)
- **Python CLI**: All processing happens on your local machine
- **No data is uploaded** to any server

---

## 🔧 Troubleshooting

### Web Application

**Problem**: "Error reading PDF"  
**Solution**: The PDF might be encrypted or corrupted. Try opening it in a PDF viewer first.

**Problem**: "DOCX file not showing content"  
**Solution**: The file might be corrupted or use an unsupported format. Try re-saving as DOCX.

**Problem**: "Excel file shows strange characters"  
**Solution**: The file might use a different encoding. Save as CSV and try again.

### Python CLI

**Problem**: `ModuleNotFoundError: No module named 'PyPDF2'`  
**Solution**: Install requirements: `pip install -r requirements.txt`

**Problem**: `[PDF reading not available]` in output  
**Solution**: Install PyPDF2: `pip install PyPDF2`

**Problem**: `[DOCX reading not available]` in output  
**Solution**: Install python-docx: `pip install python-docx`

---

## 🎯 Best Practices

### 1. Mixed Content Projects
When aggregating mixed code and documents:
- Use **Group By Type** to separate code from documents
- Enable **metadata** to see file types clearly
- Use **Markdown output** for better formatting

### 2. Large Document Sets
For processing many large documents:
- Increase max file size if needed
- Process in batches
- Use Python CLI for better performance on large files

### 3. Output Formats
Choose the right output format:
- **TXT**: Simple, universal, good for AI analysis
- **Markdown**: Best for mixed code/docs, readable
- **HTML**: Great for sharing with formatting
- **PDF**: Professional reports and archives
- **JSON**: Structured data, programmatic access

---

## 📈 Examples

### Example 1: Code + Documentation
```bash
# Compile a React project with its documentation
python code_aggregator.py src/ docs/ README.md \
  --extensions tsx,ts,md,pdf \
  -o project_complete.md
```

### Example 2: Data Analysis Project
```bash
# Compile Python scripts with Excel data files
python code_aggregator.py analysis/ data/ \
  --extensions py,xlsx,csv \
  -o data_project.pdf
```

### Example 3: Technical Documentation
```bash
# Compile all documentation files
python code_aggregator.py documentation/ \
  --extensions md,docx,pdf,xml \
  -f html \
  -o technical_docs.html
```

---

## 🆕 Future Enhancements

Planned document support improvements:
- [ ] Image extraction from PDFs and Word documents
- [ ] Table extraction with formatting preservation
- [ ] PowerPoint (.pptx) support
- [ ] OCR for scanned PDFs
- [ ] Better formatting preservation
- [ ] Markdown to PDF conversion improvements

---

## 📞 Support

Having issues with document processing?
- Check this guide first
- Verify file is not corrupted by opening in native application
- Try converting to a different format
- Open an issue on GitHub with file type and error details

---

<div align="center">

**Document support powered by industry-standard libraries**

[← Back to Main README](README.md)

</div>
