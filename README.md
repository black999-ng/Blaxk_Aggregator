# 🔥 BlaXk Aggregator

<div align="center">

### The Ultimate Code & Document Aggregator

**Compile multiple code files and documents into a single, beautifully formatted output**

[Web App](#web-application) • [Python CLI](#python-cli-version) • [Features](#features) • [Document Support](DOCUMENT_SUPPORT.md) • [Tips & Tricks](TIPS_AND_TRICKS.md)

</div>

---

## 🌟 Overview

**BlaXk Aggregator** is a powerful tool for developers who need to:
- 📦 Combine multiple code files for documentation
- 🤖 Prepare code for AI/LLM analysis
- 📄 Create code portfolios or reports
- 🔍 Review entire codebases in one document
- 📚 Generate comprehensive code documentation
- 📋 Extract and compile text from documents (PDF, DOCX, XLSX, etc.)

## ✨ Features

### Core Features
- ✅ **Multiple File Upload** - Drag & drop or select files
- ✅ **Folder Upload** - Select entire folders recursively
- ✅ **Document Support** - Read PDF, DOCX, DOC, XLSX, XLS, CSV, XML, RTF
- ✅ **Smart Filtering** - Auto-exclude node_modules, .git, etc.
- ✅ **5 Export Formats** - TXT, JSON, Markdown, HTML, PDF
- ✅ **Syntax Highlighting** - Beautiful code preview
- ✅ **Table of Contents** - Auto-generated file index
- ✅ **File Statistics** - Lines, size, language breakdown
- ✅ **Dark/Light Theme** - Easy on the eyes
- ✅ **Client-Side Processing** - Your code never leaves your browser
- ✅ **Privacy First** - 100% secure, no uploads

### Advanced Features
- 📊 **Group By** - Organize by folder, file type, or alphabetically
- 🔢 **Line Numbers** - Optional line numbering
- 📝 **Metadata** - Include file size, language, modified date
- 🔍 **Search** - Find text in preview
- 🎨 **Customizable Separators** - Choose your separator style
- 📏 **File Size Limits** - Skip files over specified size
- 🎯 **Extension Filtering** - Only include specific file types

---

## 🚀 Web Application

### Quick Start

1. **Clone & Install**
```bash
git clone <repository-url>
cd blaxk-aggregator
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
```

### Usage

1. **Upload Files**
   - Drag & drop files into the upload zone
   - Click "Select Files" for individual files
   - Click "Select Folder" for entire directories

2. **Configure Options**
   - Toggle line numbers and metadata
   - Choose grouping method (folder/type/alphabet)
   - Set custom separator character
   - Filter by file extensions

3. **Preview & Export**
   - View real-time preview
   - Search within the preview
   - Export to your preferred format
   - Copy to clipboard

### Export Formats

| Format | Description | Use Case |
|--------|-------------|----------|
| **TXT** | Plain text with separators | Simple sharing, email |
| **JSON** | Structured data format | API integration, parsing |
| **MD** | Markdown with code blocks | Documentation, GitHub |
| **HTML** | Styled HTML with syntax highlighting | Web viewing, presentations |
| **PDF** | Professional PDF document | Reports, printing |

---

## 🐍 Python CLI Version

A powerful command-line alternative for automation and scripting.

### Installation

```bash
pip install -r requirements.txt
```

### Quick Examples

```bash
# Basic usage
python code_aggregator.py src/ -o output.txt

# Export to PDF
python code_aggregator.py project/ -f pdf -o compilation.pdf

# Filter by extensions
python code_aggregator.py . -o output.txt --extensions py,js,tsx

# Advanced usage
python code_aggregator.py src/ components/ \
  -f md \
  -o documentation.md \
  --extensions ts,tsx \
  --no-line-numbers \
  --max-size 20
```

For detailed Python CLI documentation, see [README_PYTHON.md](README_PYTHON.md)

---

## 📖 Documentation

### Guides & Resources
- 📄 **[Document Support Guide](DOCUMENT_SUPPORT.md)** - Complete guide for PDF, DOCX, XLSX support
- 💡 **[Tips & Tricks](TIPS_AND_TRICKS.md)** - Power user guide and best practices
- 🚀 **[Quick Start](QUICKSTART.md)** - Get started in 5 minutes
- 📋 **[Examples](EXAMPLES.md)** - Real-world usage examples
- 🐍 **[Python CLI Docs](README_PYTHON.md)** - Command-line tool documentation

---

## 📸 Screenshots

### Main Interface
- **Upload Area** - Drag & drop or click to select
- **File List** - View and manage selected files
- **Preview Panel** - Real-time preview with syntax highlighting
- **Statistics** - Total files, lines, size, languages
- **Export Options** - One-click export to multiple formats

### Dark Theme
Beautiful dark theme for comfortable late-night coding sessions.

---

## 📚 Supported File Types

### Code Files
JavaScript, TypeScript, Python, Java, C++, C#, Ruby, Go, Rust, PHP, Swift, Kotlin, HTML, CSS, SCSS, YAML, JSON, Markdown, Shell scripts, SQL, and more!

### Document Files
- **PDF** - Extract text from PDF documents
- **Word** - DOCX and DOC files
- **Excel** - XLSX, XLS spreadsheets
- **CSV** - Comma-separated values
- **XML** - Structured data files
- **RTF** - Rich text format

---

## 🛠️ Tech Stack

### Web Application
- ⚛️ **React** - UI framework
- ⚡ **Vite** - Build tool
- 🎨 **Tailwind CSS** - Styling
- 📄 **jsPDF** - PDF generation
- 📝 **Mammoth.js** - DOCX reading
- 📕 **PDF.js** - PDF reading
- 📊 **XLSX** - Spreadsheet processing
- 🔤 **TypeScript** - Type safety

### Python CLI
- 🐍 **Python 3.8+**
- 📄 **ReportLab** - PDF export
- 📕 **PyPDF2** - PDF reading
- 📝 **python-docx** - Word document reading
- 📊 **openpyxl** - Excel reading
- 🎨 **Colorama** - Terminal colors (optional)

---

## 📋 Use Cases

### For Developers
- 📦 **Code Reviews** - Compile entire features for review
- 🤖 **AI Analysis** - Prepare code for ChatGPT/Claude/Copilot
- 📚 **Documentation** - Generate code documentation
- 🎓 **Learning** - Study open-source projects

### For Teams
- 📊 **Reports** - Create code audit reports
- 🔍 **Onboarding** - Help new developers understand codebase
- 📄 **Archives** - Archive project snapshots
- 🎯 **Code Portfolios** - Showcase your work

---

## 🔒 Privacy & Security

- ✅ **100% Client-Side** - All processing happens in your browser
- ✅ **No Uploads** - Your code never leaves your device
- ✅ **No Tracking** - We don't collect any data
- ✅ **Open Source** - Fully transparent code

---

## 🎯 Roadmap

### Upcoming Features
- [ ] GitHub integration (import directly from repos)
- [ ] Syntax highlighting in PDF exports
- [ ] Custom templates and presets
- [ ] Batch processing automation
- [ ] VS Code extension
- [ ] Browser extension
- [ ] Cloud storage integration (optional)
- [ ] Diff mode (compare compilations)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests
- 📖 Improve documentation

---

## 📝 License

MIT License - Feel free to use and modify!

---

## 💬 Support

Have questions or issues?
- 📧 Open an issue on GitHub
- 💬 Start a discussion
- ⭐ Star this repo if you find it useful!

---

## 🙏 Acknowledgments

Built with ❤️ for developers who need to aggregate code files.

Special thanks to:
- React team for the amazing framework
- Vite for lightning-fast builds
- Tailwind CSS for beautiful styling
- jsPDF for client-side PDF generation
- ReportLab for Python PDF support

---

<div align="center">

### Made with 🔥 by the BlaXk Aggregator Team

**[⬆ Back to Top](#-blaxk-aggregator)**

</div>
