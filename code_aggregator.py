#!/usr/bin/env python3
"""
BlaXk Aggregator - Python CLI Version
A command-line tool to aggregate multiple code/document files into a single document
Supports: Code files, PDF, DOCX, DOC, XLSX, XLS, CSV, XML, RTF
Output formats: TXT, JSON, Markdown, HTML, and PDF
"""

import os
import sys
import json
import argparse
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional
import mimetypes

# PDF export support
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Preformatted
    from reportlab.lib.colors import HexColor
    PDF_EXPORT = True
except ImportError:
    PDF_EXPORT = False
    print("Warning: reportlab not installed. PDF export will not be available.")
    print("Install with: pip install reportlab")

# Document reading support
try:
    import PyPDF2
    PDF_READ = True
except ImportError:
    PDF_READ = False

try:
    from docx import Document as DocxDocument
    DOCX_SUPPORT = True
except ImportError:
    DOCX_SUPPORT = False

try:
    import openpyxl
    EXCEL_SUPPORT = True
except ImportError:
    EXCEL_SUPPORT = False

import csv as csv_module
import xml.etree.ElementTree as ET
import xml.dom.minidom as minidom


# Language mapping based on file extensions
LANGUAGE_MAP = {
    'js': 'JavaScript',
    'jsx': 'JavaScript React',
    'ts': 'TypeScript',
    'tsx': 'TypeScript React',
    'py': 'Python',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'cs': 'C#',
    'rb': 'Ruby',
    'go': 'Go',
    'rs': 'Rust',
    'php': 'PHP',
    'swift': 'Swift',
    'kt': 'Kotlin',
    'html': 'HTML',
    'css': 'CSS',
    'scss': 'SCSS',
    'sass': 'Sass',
    'json': 'JSON',
    'xml': 'XML',
    'yaml': 'YAML',
    'yml': 'YAML',
    'md': 'Markdown',
    'txt': 'Text',
    'sh': 'Shell',
    'bash': 'Bash',
    'sql': 'SQL',
    'r': 'R',
    'dart': 'Dart',
    'vue': 'Vue',
    'svelte': 'Svelte',
    # Document formats
    'pdf': 'PDF Document',
    'docx': 'Word Document',
    'doc': 'Word Document (Legacy)',
    'xlsx': 'Excel Spreadsheet',
    'xls': 'Excel Spreadsheet (Legacy)',
    'csv': 'CSV Spreadsheet',
    'rtf': 'Rich Text Format',
}

# Document file extensions
DOCUMENT_EXTENSIONS = {'pdf', 'docx', 'doc', 'xlsx', 'xls', 'csv', 'xml', 'rtf'}


def read_pdf_file(file_path: Path) -> str:
    """Extract text from PDF file"""
    if not PDF_READ:
        return "[PDF reading not available. Install PyPDF2: pip install PyPDF2]"
    
    try:
        text_content = []
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page_num, page in enumerate(pdf_reader.pages, 1):
                page_text = page.extract_text()
                text_content.append(f"\n--- Page {page_num} ---\n{page_text}")
        return '\n'.join(text_content)
    except Exception as e:
        return f"[Error reading PDF: {e}]"


def read_docx_file(file_path: Path) -> str:
    """Extract text from DOCX file"""
    if not DOCX_SUPPORT:
        return "[DOCX reading not available. Install python-docx: pip install python-docx]"
    
    try:
        doc = DocxDocument(file_path)
        paragraphs = [para.text for para in doc.paragraphs]
        return '\n'.join(paragraphs)
    except Exception as e:
        return f"[Error reading DOCX: {e}]"


def read_excel_file(file_path: Path) -> str:
    """Extract text from Excel file"""
    extension = file_path.suffix.lower()
    
    if extension == '.csv':
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()
        except Exception as e:
            return f"[Error reading CSV: {e}]"
    
    if not EXCEL_SUPPORT:
        return "[Excel reading not available. Install openpyxl: pip install openpyxl]"
    
    try:
        workbook = openpyxl.load_workbook(file_path, data_only=True)
        text_content = []
        
        for sheet_name in workbook.sheetnames:
            sheet = workbook[sheet_name]
            text_content.append(f"\n--- Sheet: {sheet_name} ---")
            
            for row in sheet.iter_rows(values_only=True):
                row_text = ','.join([str(cell) if cell is not None else '' for cell in row])
                text_content.append(row_text)
        
        return '\n'.join(text_content)
    except Exception as e:
        return f"[Error reading Excel: {e}]"


def read_xml_file(file_path: Path) -> str:
    """Read and pretty-print XML file"""
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
        xml_str = ET.tostring(root, encoding='unicode')
        dom = minidom.parseString(xml_str)
        return dom.toprettyxml(indent="  ")
    except Exception as e:
        # Fallback to reading as text
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()
        except:
            return f"[Error reading XML: {e}]"


def read_rtf_file(file_path: Path) -> str:
    """Read RTF file (basic text extraction)"""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        # Basic RTF stripping (remove RTF commands)
        import re
        stripped = re.sub(r'\\[a-z]+\d*\s?', '', content)
        stripped = re.sub(r'[{}\\]', '', stripped)
        return stripped.strip() or "[RTF content - formatting stripped]"
    except Exception as e:
        return f"[Error reading RTF: {e}]"


def is_document_file(file_path: Path) -> bool:
    """Check if file is a document type"""
    extension = file_path.suffix[1:].lower() if file_path.suffix else ''
    return extension in DOCUMENT_EXTENSIONS


def read_document_file(file_path: Path) -> str:
    """Read document file based on extension"""
    extension = file_path.suffix[1:].lower() if file_path.suffix else ''
    
    if extension == 'pdf':
        return read_pdf_file(file_path)
    elif extension in ('docx', 'doc'):
        return read_docx_file(file_path)
    elif extension in ('xlsx', 'xls', 'csv'):
        return read_excel_file(file_path)
    elif extension == 'xml':
        return read_xml_file(file_path)
    elif extension == 'rtf':
        return read_rtf_file(file_path)
    else:
        # Fallback to text reading
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()
        except Exception as e:
            return f"[Error reading file: {e}]"

DEFAULT_EXCLUDE_PATTERNS = [
    'node_modules',
    '.git',
    '__pycache__',
    'dist',
    'build',
    '.next',
    'venv',
    'env',
    '.venv',
    '.idea',
    '.vscode',
    '*.pyc',
    '*.pyo',
    '*.pyd',
    '.DS_Store',
]


class FileInfo:
    """Represents information about a code/document file"""
    
    def __init__(self, path: str, root_dir: str):
        self.path = Path(path)
        self.root_dir = Path(root_dir)
        self.relative_path = str(self.path.relative_to(self.root_dir))
        self.name = self.path.name
        self.extension = self.path.suffix[1:] if self.path.suffix else ''
        self.language = LANGUAGE_MAP.get(self.extension.lower(), 'Unknown')
        
        try:
            # Use document reader for special file types
            if is_document_file(self.path):
                self.content = read_document_file(self.path)
            else:
                with open(self.path, 'r', encoding='utf-8', errors='ignore') as f:
                    self.content = f.read()
            
            self.lines = len(self.content.split('\n'))
            self.size = self.path.stat().st_size
            self.last_modified = datetime.fromtimestamp(self.path.stat().st_mtime)
        except Exception as e:
            print(f"Error reading {self.path}: {e}", file=sys.stderr)
            self.content = ""
            self.lines = 0
            self.size = 0
            self.last_modified = datetime.now()


class CodeAggregator:
    """Main class for aggregating code files"""
    
    def __init__(self, 
                 separator: str = '=',
                 include_line_numbers: bool = True,
                 include_metadata: bool = True,
                 exclude_patterns: Optional[List[str]] = None,
                 file_extensions: Optional[List[str]] = None,
                 max_file_size_mb: float = 10.0):
        
        self.separator = separator
        self.include_line_numbers = include_line_numbers
        self.include_metadata = include_metadata
        self.exclude_patterns = exclude_patterns or DEFAULT_EXCLUDE_PATTERNS
        self.file_extensions = file_extensions or []
        self.max_file_size_bytes = int(max_file_size_mb * 1024 * 1024)
    
    def should_exclude(self, path: Path) -> bool:
        """Check if a file should be excluded based on patterns"""
        path_str = str(path)
        for pattern in self.exclude_patterns:
            if pattern in path_str:
                return True
        return False
    
    def should_include_extension(self, extension: str) -> bool:
        """Check if file extension should be included"""
        if not self.file_extensions:
            return True
        return extension.lower() in [ext.lower() for ext in self.file_extensions]
    
    def collect_files(self, paths: List[str]) -> List[FileInfo]:
        """Collect all files from given paths (files or directories)"""
        files = []
        
        for path_str in paths:
            path = Path(path_str)
            
            if not path.exists():
                print(f"Warning: {path} does not exist", file=sys.stderr)
                continue
            
            if path.is_file():
                if not self.should_exclude(path):
                    root_dir = path.parent
                    file_info = FileInfo(str(path), str(root_dir))
                    if file_info.size <= self.max_file_size_bytes:
                        if self.should_include_extension(file_info.extension):
                            files.append(file_info)
            
            elif path.is_dir():
                for file_path in path.rglob('*'):
                    if file_path.is_file() and not self.should_exclude(file_path):
                        file_info = FileInfo(str(file_path), str(path))
                        if file_info.size <= self.max_file_size_bytes:
                            if self.should_include_extension(file_info.extension):
                                files.append(file_info)
        
        # Sort files by relative path
        files.sort(key=lambda f: f.relative_path)
        return files
    
    def generate_txt(self, files: List[FileInfo]) -> str:
        """Generate plain text output"""
        output = []
        sep_line = self.separator * 20
        
        for file_info in files:
            output.append(f"{sep_line} {file_info.relative_path} {sep_line}")
            
            if self.include_metadata:
                metadata = (
                    f"Language: {file_info.language} | "
                    f"Size: {file_info.size / 1024:.2f} KB | "
                    f"Lines: {file_info.lines} | "
                    f"Modified: {file_info.last_modified.strftime('%Y-%m-%d %H:%M:%S')}"
                )
                output.append(metadata)
            
            output.append("")
            
            if self.include_line_numbers:
                lines = file_info.content.split('\n')
                max_width = len(str(len(lines)))
                for i, line in enumerate(lines, 1):
                    output.append(f"{str(i).rjust(max_width)} | {line}")
            else:
                output.append(file_info.content)
            
            output.append("")
            output.append("")
        
        return '\n'.join(output)
    
    def generate_json(self, files: List[FileInfo]) -> str:
        """Generate JSON output"""
        data = []
        for file_info in files:
            data.append({
                'name': file_info.name,
                'path': file_info.relative_path,
                'language': file_info.language,
                'size': file_info.size,
                'lines': file_info.lines,
                'content': file_info.content,
                'lastModified': file_info.last_modified.isoformat(),
            })
        return json.dumps(data, indent=2)
    
    def generate_markdown(self, files: List[FileInfo]) -> str:
        """Generate Markdown output"""
        output = []
        output.append("# Code Aggregation\n")
        output.append(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        output.append("## Table of Contents\n")
        
        for i, file_info in enumerate(files, 1):
            output.append(f"{i}. [{file_info.relative_path}](#file-{i})")
        
        output.append("\n---\n")
        
        for i, file_info in enumerate(files, 1):
            output.append(f"<a id='file-{i}'></a>\n")
            output.append(f"### {file_info.relative_path}\n")
            
            if self.include_metadata:
                output.append(f"- **Language**: {file_info.language}")
                output.append(f"- **Size**: {file_info.size / 1024:.2f} KB")
                output.append(f"- **Lines**: {file_info.lines}")
                output.append(f"- **Modified**: {file_info.last_modified.strftime('%Y-%m-%d %H:%M:%S')}\n")
            
            output.append(f"```{file_info.extension}")
            output.append(file_info.content)
            output.append("```\n")
        
        return '\n'.join(output)
    
    def generate_html(self, files: List[FileInfo]) -> str:
        """Generate HTML output"""
        sep_line = self.separator * 20
        
        html = [
            '<!DOCTYPE html>',
            '<html>',
            '<head>',
            '<meta charset="UTF-8">',
            '<title>BlaXk Aggregator - Code Compilation</title>',
            '<style>',
            'body { font-family: monospace; max-width: 1200px; margin: 0 auto; padding: 20px; background: #1e1e1e; color: #d4d4d4; }',
            'h1 { color: #4ec9b0; }',
            '.file-separator { border-top: 3px solid #569cd6; margin: 30px 0; padding: 10px 0; }',
            '.file-header { color: #4ec9b0; font-size: 18px; font-weight: bold; }',
            '.metadata { color: #858585; font-size: 12px; margin: 5px 0; }',
            '.code-block { background: #252526; padding: 15px; border-radius: 5px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; }',
            '.line-number { color: #858585; margin-right: 15px; user-select: none; }',
            '</style>',
            '</head>',
            '<body>',
            '<h1>📁 BlaXk Aggregator - Code Compilation</h1>',
            f'<p>Generated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</p>',
            f'<p>Total Files: {len(files)} | Total Lines: {sum(f.lines for f in files):,}</p>',
        ]
        
        for file_info in files:
            html.append('<div class="file-separator">')
            html.append(f'<div class="file-header">{sep_line} {file_info.relative_path} {sep_line}</div>')
            
            if self.include_metadata:
                metadata = (
                    f"Language: {file_info.language} | "
                    f"Size: {file_info.size / 1024:.2f} KB | "
                    f"Lines: {file_info.lines} | "
                    f"Modified: {file_info.last_modified.strftime('%Y-%m-%d %H:%M:%S')}"
                )
                html.append(f'<div class="metadata">{metadata}</div>')
            
            html.append('<div class="code-block">')
            
            if self.include_line_numbers:
                lines = file_info.content.split('\n')
                for i, line in enumerate(lines, 1):
                    escaped_line = line.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
                    html.append(f'<span class="line-number">{i}</span>{escaped_line}<br>')
            else:
                escaped_content = file_info.content.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
                html.append(escaped_content)
            
            html.append('</div>')
            html.append('</div>')
        
        html.append('</body>')
        html.append('</html>')
        
        return '\n'.join(html)
    
    def generate_pdf(self, files: List[FileInfo], output_path: str):
        """Generate PDF output"""
        if not PDF_AVAILABLE:
            print("Error: reportlab not installed. Cannot generate PDF.", file=sys.stderr)
            return
        
        doc = SimpleDocTemplate(output_path, pagesize=letter)
        story = []
        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=HexColor('#4ec9b0'),
            spaceAfter=30,
        )
        
        header_style = ParagraphStyle(
            'CustomHeader',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=HexColor('#569cd6'),
            spaceAfter=12,
        )
        
        code_style = ParagraphStyle(
            'Code',
            parent=styles['Code'],
            fontSize=7,
            leftIndent=0,
            fontName='Courier',
        )
        
        # Title
        story.append(Paragraph("BlaXk Aggregator", title_style))
        story.append(Paragraph(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", styles['Normal']))
        story.append(Paragraph(f"Total Files: {len(files)} | Total Lines: {sum(f.lines for f in files):,}", styles['Normal']))
        story.append(Spacer(1, 0.3 * inch))
        
        # Files
        for file_info in files:
            story.append(Paragraph(file_info.relative_path, header_style))
            
            if self.include_metadata:
                metadata = (
                    f"{file_info.language} | "
                    f"{file_info.size / 1024:.2f} KB | "
                    f"{file_info.lines} lines"
                )
                story.append(Paragraph(metadata, styles['Normal']))
            
            story.append(Spacer(1, 0.1 * inch))
            
            # Code content
            if self.include_line_numbers:
                lines = file_info.content.split('\n')[:500]  # Limit lines for PDF
                code_text = '\n'.join([f"{i:4d} | {line}" for i, line in enumerate(lines, 1)])
            else:
                code_text = '\n'.join(file_info.content.split('\n')[:500])
            
            story.append(Preformatted(code_text, code_style))
            story.append(PageBreak())
        
        doc.build(story)
        print(f"PDF generated: {output_path}")


def main():
    parser = argparse.ArgumentParser(
        description='BlaXk Aggregator - Compile multiple code files into a single document',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s src/ -o output.txt
  %(prog)s file1.py file2.js -f json -o output.json
  %(prog)s project/ -f pdf -o compilation.pdf --extensions py,js,ts
  %(prog)s . -f md --no-line-numbers --no-metadata
        """
    )
    
    parser.add_argument('paths', nargs='+', help='Files or directories to aggregate')
    parser.add_argument('-o', '--output', required=True, help='Output file path')
    parser.add_argument('-f', '--format', 
                       choices=['txt', 'json', 'md', 'html', 'pdf'],
                       default='txt',
                       help='Output format (default: txt)')
    parser.add_argument('-s', '--separator', default='=', help='Separator character (default: =)')
    parser.add_argument('--no-line-numbers', action='store_true', help='Exclude line numbers')
    parser.add_argument('--no-metadata', action='store_true', help='Exclude file metadata')
    parser.add_argument('--extensions', help='Comma-separated list of file extensions to include (e.g., py,js,tsx)')
    parser.add_argument('--exclude', help='Additional exclude patterns (comma-separated)')
    parser.add_argument('--max-size', type=float, default=10.0, help='Maximum file size in MB (default: 10)')
    
    args = parser.parse_args()
    
    # Parse extensions
    extensions = args.extensions.split(',') if args.extensions else []
    
    # Parse additional exclude patterns
    exclude_patterns = DEFAULT_EXCLUDE_PATTERNS.copy()
    if args.exclude:
        exclude_patterns.extend(args.exclude.split(','))
    
    # Create aggregator
    aggregator = CodeAggregator(
        separator=args.separator,
        include_line_numbers=not args.no_line_numbers,
        include_metadata=not args.no_metadata,
        exclude_patterns=exclude_patterns,
        file_extensions=extensions,
        max_file_size_mb=args.max_size,
    )
    
    # Collect files
    print("Collecting files...")
    files = aggregator.collect_files(args.paths)
    print(f"Found {len(files)} files")
    
    if not files:
        print("No files found to aggregate!", file=sys.stderr)
        sys.exit(1)
    
    # Generate output
    print(f"Generating {args.format.upper()} output...")
    
    if args.format == 'pdf':
        aggregator.generate_pdf(files, args.output)
    else:
        if args.format == 'txt':
            content = aggregator.generate_txt(files)
        elif args.format == 'json':
            content = aggregator.generate_json(files)
        elif args.format == 'md':
            content = aggregator.generate_markdown(files)
        elif args.format == 'html':
            content = aggregator.generate_html(files)
        
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Output written to: {args.output}")
    
    # Print statistics
    total_lines = sum(f.lines for f in files)
    total_size = sum(f.size for f in files)
    print(f"\nStatistics:")
    print(f"  Total Files: {len(files)}")
    print(f"  Total Lines: {total_lines:,}")
    print(f"  Total Size: {total_size / 1024:.2f} KB")


if __name__ == '__main__':
    main()
