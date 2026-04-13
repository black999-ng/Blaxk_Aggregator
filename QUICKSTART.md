# 🚀 Quick Start Guide - BlaXk Aggregator

## Choose Your Version

### 🌐 Option 1: Web Application (Recommended)

**Best for:** Visual interface, ease of use, no installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:5173
```

**How to use:**
1. Drag & drop files or click "Select Files/Folder"
2. Mix code files (.js, .py, .tsx) with documents (.pdf, .docx, .xlsx)
3. Configure options (line numbers, metadata, grouping)
4. Preview the output in real-time
5. Click an export button (TXT, JSON, MD, HTML, PDF)
6. Download your compiled file!

**Supported Files:**
- **Code**: JS, TS, Python, Java, C++, PHP, Ruby, Go, and more
- **Documents**: PDF, DOCX, DOC, XLSX, XLS, CSV, XML, RTF

---

### 🐍 Option 2: Python CLI

**Best for:** Automation, scripts, command-line workflows

```bash
# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Run the aggregator
python code_aggregator.py <path-to-code> -o output.txt

# Example: Aggregate current directory to text file
python code_aggregator.py . -o my_code.txt

# Example: Create PDF with only Python files
python code_aggregator.py src/ -f pdf -o code.pdf --extensions py
```

---

## 📖 Common Use Cases

### Use Case 1: Share Code with ChatGPT/Claude

**Goal:** Compile your entire project to share with an AI assistant

**Web App:**
1. Select your project folder
2. Choose "TXT" or "MD" export
3. Copy to clipboard
4. Paste into ChatGPT/Claude

**CLI:**
```bash
python code_aggregator.py src/ -f txt -o for_ai.txt --extensions py,js,ts
```

---

### Use Case 2: Code Review Documentation

**Goal:** Create a PDF for code review

**Web App:**
1. Upload files
2. Enable line numbers and metadata
3. Export as PDF

**CLI:**
```bash
python code_aggregator.py src/ -f pdf -o review.pdf
```

---

### Use Case 3: Project Documentation

**Goal:** Generate Markdown documentation

**Web App:**
1. Select entire project folder
2. Group by "Folder"
3. Export as Markdown

**CLI:**
```bash
python code_aggregator.py . -f md -o DOCUMENTATION.md
```

---

## ⚙️ Configuration Tips

### Web App Settings

| Option | When to Use |
|--------|-------------|
| **Line Numbers** | Code reviews, debugging |
| **Metadata** | Understanding file context |
| **Group by Folder** | Preserve project structure |
| **Group by Type** | Compare similar files |
| **Group by Alphabet** | Alphabetical organization |

### CLI Flags

```bash
# Most commonly used flags:
-f, --format       # Output format (txt, json, md, html, pdf)
-o, --output       # Output file path
--extensions       # Filter by extensions (e.g., py,js,tsx)
--no-line-numbers  # Exclude line numbers
--no-metadata      # Exclude file metadata
--max-size         # Max file size in MB
```

---

## 🎯 Pro Tips

### 1. Filter Large Projects
```bash
# Only include TypeScript files under 5MB
python code_aggregator.py src/ -o output.txt --extensions ts,tsx --max-size 5
```

### 2. Exclude Test Files
```bash
# Add custom exclude patterns
python code_aggregator.py src/ -o output.txt --exclude "test,spec,*.test.js"
```

### 3. Multiple Directories
```bash
# Aggregate multiple folders
python code_aggregator.py src/ components/ utils/ -o output.txt
```

### 4. Quick JSON for APIs
```bash
# Export as JSON for parsing
python code_aggregator.py api/ -f json -o api_structure.json
```

### 5. Beautiful HTML Reports
```bash
# Create styled HTML report
python code_aggregator.py . -f html -o report.html
```

---

## 🐛 Troubleshooting

### Web App Issues

**Problem:** Files not showing up
- **Solution:** Check exclude patterns in options panel
- **Solution:** Verify file size is under the limit

**Problem:** PDF export not working
- **Solution:** Ensure jsPDF is installed (`npm install`)
- **Solution:** Try with fewer/smaller files first

**Problem:** Browser freezing
- **Solution:** Reduce max file size
- **Solution:** Process fewer files at once

### Python CLI Issues

**Problem:** `reportlab not found`
```bash
pip install reportlab
```

**Problem:** `Permission denied`
```bash
# Make script executable
chmod +x code_aggregator.py
```

**Problem:** No files found
```bash
# Check your exclude patterns
python code_aggregator.py . -o output.txt --extensions py
# If still nothing, verify files exist in the path
```

---

## 📚 Next Steps

1. **Read the full README.md** for comprehensive documentation
2. **Check README_PYTHON.md** for detailed CLI usage
3. **Explore the code** - it's well-commented!
4. **Customize** - modify options, add features
5. **Share** - help others discover this tool!

---

## 💡 Need Help?

- Check the [README.md](README.md) for full documentation
- Look at example commands in [README_PYTHON.md](README_PYTHON.md)
- Open an issue on GitHub
- Read the code - it's self-explanatory!

---

**Happy Coding! 🔥**

*BlaXk Aggregator - Making code compilation effortless*
