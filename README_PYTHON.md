# BlaXk Aggregator - Python CLI

A powerful command-line tool to aggregate multiple code files into a single document.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage

```bash
# Aggregate all files in a directory to text file
python code_aggregator.py src/ -o output.txt

# Aggregate specific files
python code_aggregator.py file1.py file2.js file3.tsx -o output.txt
```

### Export Formats

```bash
# Plain Text
python code_aggregator.py project/ -f txt -o output.txt

# JSON
python code_aggregator.py project/ -f json -o output.json

# Markdown
python code_aggregator.py project/ -f md -o output.md

# HTML
python code_aggregator.py project/ -f html -o output.html

# PDF
python code_aggregator.py project/ -f pdf -o output.pdf
```

### Advanced Options

```bash
# Filter by file extensions
python code_aggregator.py project/ -o output.txt --extensions py,js,tsx

# Exclude line numbers
python code_aggregator.py project/ -o output.txt --no-line-numbers

# Exclude metadata
python code_aggregator.py project/ -o output.txt --no-metadata

# Custom separator
python code_aggregator.py project/ -o output.txt -s "#"

# Custom max file size (in MB)
python code_aggregator.py project/ -o output.txt --max-size 20

# Additional exclude patterns
python code_aggregator.py project/ -o output.txt --exclude "test,*.spec.js"
```

### Complete Example

```bash
python code_aggregator.py \
  ./src \
  ./components \
  -f pdf \
  -o my_code_compilation.pdf \
  --extensions py,js,jsx,ts,tsx \
  --no-line-numbers \
  --max-size 15
```

## Features

✅ **Multiple Input Sources**: Select files or entire directories  
✅ **Smart Filtering**: Auto-excludes node_modules, .git, __pycache__, etc.  
✅ **Multiple Export Formats**: TXT, JSON, Markdown, HTML, PDF  
✅ **File Metadata**: Size, lines, language, last modified  
✅ **Line Numbers**: Optional line numbering  
✅ **Customizable Separators**: Choose your own separator style  
✅ **Extension Filtering**: Only include specific file types  
✅ **Size Limits**: Skip files over specified size  

## Default Exclude Patterns

The tool automatically excludes:
- `node_modules/`
- `.git/`
- `__pycache__/`
- `dist/`
- `build/`
- `.next/`
- `venv/`, `env/`, `.venv/`
- `.idea/`, `.vscode/`
- `*.pyc`, `*.pyo`, `*.pyd`
- `.DS_Store`

## Output Examples

### Text Format
```
==================== src/app.py ====================
Language: Python | Size: 2.45 KB | Lines: 87 | Modified: 2024-01-15 10:30:22

  1 | import os
  2 | import sys
  3 | 
  4 | def main():
  5 |     print("Hello, World!")
...
```

### JSON Format
```json
[
  {
    "name": "app.py",
    "path": "src/app.py",
    "language": "Python",
    "size": 2508,
    "lines": 87,
    "content": "import os\nimport sys...",
    "lastModified": "2024-01-15T10:30:22"
  }
]
```

### Markdown Format
```markdown
# Code Aggregation

Generated on: 2024-01-15 10:30:22

## Table of Contents

1. [src/app.py](#file-1)
2. [src/utils.py](#file-2)

---

### src/app.py

- **Language**: Python
- **Size**: 2.45 KB
- **Lines**: 87

\`\`\`py
import os
import sys
...
\`\`\`
```

## License

MIT License - Feel free to use and modify!
