import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { FileItem, AppOptions, ExportFormat } from '../types';
import { generateOutput } from './fileProcessing';

export async function exportFile(
  files: FileItem[],
  format: ExportFormat,
  options: AppOptions
): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `code-aggregation-${timestamp}`;

  switch (format) {
    case 'txt':
      await exportAsText(files, options, filename);
      break;
    case 'json':
      await exportAsJSON(files, options, filename);
      break;
    case 'md':
      await exportAsMarkdown(files, options, filename);
      break;
    case 'html':
      await exportAsHTML(files, options, filename);
      break;
    case 'pdf':
      await exportAsPDF(files, options, filename);
      break;
  }
}

function exportAsText(files: FileItem[], options: AppOptions, filename: string): void {
  const content = generateOutput(files, options, 'txt');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${filename}.txt`);
}

function exportAsJSON(files: FileItem[], options: AppOptions, filename: string): void {
  const content = generateOutput(files, options, 'json');
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  saveAs(blob, `${filename}.json`);
}

function exportAsMarkdown(files: FileItem[], options: AppOptions, filename: string): void {
  const content = generateOutput(files, options, 'md');
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  saveAs(blob, `${filename}.md`);
}

function exportAsHTML(files: FileItem[], options: AppOptions, filename: string): void {
  const content = generateOutput(files, options, 'html');
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  saveAs(blob, `${filename}.html`);
}

async function exportAsPDF(files: FileItem[], options: AppOptions, filename: string): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let y = margin;

  // Title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BlaXk Aggregator', margin, y);
  y += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleString()}`, margin, y);
  y += 10;

  pdf.setFontSize(8);
  pdf.text(`Total Files: ${files.length}`, margin, y);
  y += 15;

  // Process each file
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Check if we need a new page
    if (y > pageHeight - 30) {
      pdf.addPage();
      y = margin;
    }

    // File separator
    pdf.setDrawColor(86, 156, 214);
    pdf.setLineWidth(0.5);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 5;

    // File header
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(file.path, margin, y);
    y += 6;

    // Metadata
    if (options.includeMetadata) {
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(128, 128, 128);
      const metadata = `${file.language} | ${(file.size / 1024).toFixed(2)} KB | ${file.lines} lines`;
      pdf.text(metadata, margin, y);
      y += 5;
      pdf.setTextColor(0, 0, 0);
    }

    y += 3;

    // Code content
    pdf.setFontSize(7);
    pdf.setFont('courier', 'normal');
    
    const lines = file.content.split('\n');

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      if (y > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }

      let line = lines[lineIdx];
      
      // Add line numbers if enabled
      if (options.includeLineNumbers) {
        const lineNum = String(lineIdx + 1).padStart(4, ' ');
        line = `${lineNum} | ${line}`;
      }

      // Truncate very long lines to fit
      if (line.length > 120) {
        line = line.substring(0, 120) + '...';
      }

      pdf.text(line, margin, y);
      y += 4;
    }

    y += 10;
  }

  pdf.save(`${filename}.pdf`);
}
