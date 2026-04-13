# 📘 BlaXk Aggregator - Examples & Recipes

Real-world examples of how to use BlaXk Aggregator effectively.

---

## 🤖 AI/LLM Integration

### Example 1: Prepare Code for ChatGPT Analysis

**Scenario:** You want ChatGPT to review your React component

**Web App:**
```
1. Select your component folder
2. Filter extensions: jsx, tsx, css
3. Enable metadata
4. Export as TXT
5. Copy and paste to ChatGPT with prompt:
   "Review this React component for best practices"
```

**CLI:**
```bash
python code_aggregator.py src/components/Dashboard/ \
  -f txt \
  -o dashboard_for_review.txt \
  --extensions jsx,tsx,css
```

---

### Example 2: Full Project Context for Claude

**Scenario:** Give Claude complete context of your project

**CLI:**
```bash
python code_aggregator.py . \
  -f md \
  -o project_overview.md \
  --extensions py,js,ts,jsx,tsx,vue \
  --exclude "test,spec,*.config.js" \
  --max-size 5
```

Then paste the markdown to Claude with:
```
"Here's my entire codebase. Help me understand the architecture 
and suggest improvements."
```

---

## 📊 Code Review & Documentation

### Example 3: Weekly Code Review Package

**Scenario:** Prepare files changed this week for team review

**CLI:**
```bash
# First, get list of changed files (using git)
git diff --name-only HEAD~7 > changed_files.txt

# Then aggregate those specific files
python code_aggregator.py $(cat changed_files.txt) \
  -f pdf \
  -o weekly_review.pdf
```

---

### Example 4: API Documentation

**Scenario:** Document all API endpoints

**CLI:**
```bash
python code_aggregator.py api/ routes/ controllers/ \
  -f md \
  -o API_DOCUMENTATION.md \
  --extensions py,js,ts \
  --no-line-numbers
```

Add the output to your project wiki or docs folder.

---

## 🎓 Learning & Teaching

### Example 5: Study Open Source Project

**Scenario:** Understand how a library works

**CLI:**
```bash
# Clone the repo
git clone https://github.com/some/library.git
cd library

# Aggregate core source files
python code_aggregator.py src/ \
  -f html \
  -o library_source.html \
  --extensions js,ts
```

Open `library_source.html` in browser and read through the code.

---

### Example 6: Code Tutorial Generation

**Scenario:** Create a tutorial showing project evolution

**CLI:**
```bash
# Generate snapshots at different commits
git checkout v1.0
python code_aggregator.py src/ -f md -o tutorial_v1.md

git checkout v2.0
python code_aggregator.py src/ -f md -o tutorial_v2.md

git checkout v3.0
python code_aggregator.py src/ -f md -o tutorial_v3.md
```

---

## 💼 Professional Use Cases

### Example 7: Client Code Delivery

**Scenario:** Deliver code to client with professional documentation

**CLI:**
```bash
python code_aggregator.py . \
  -f pdf \
  -o "Project_Delivery_$(date +%Y%m%d).pdf" \
  --exclude "node_modules,test,*.test.js,*.spec.js"
```

---

### Example 8: Code Portfolio

**Scenario:** Showcase your best work in a portfolio

**Web App:**
```
1. Select your best project folders
2. Group by: Folder
3. Include metadata
4. Export as HTML
5. Host on your portfolio website
```

**CLI:**
```bash
python code_aggregator.py \
  ~/projects/awesome-app/src \
  ~/projects/cool-library/lib \
  -f html \
  -o portfolio.html
```

---

## 🔍 Analysis & Auditing

### Example 9: Security Audit Preparation

**Scenario:** Prepare codebase for security review

**CLI:**
```bash
# Focus on authentication and API files
python code_aggregator.py \
  src/auth/ \
  src/api/ \
  src/middleware/ \
  -f pdf \
  -o security_audit.pdf \
  --extensions py,js,ts
```

---

### Example 10: Code Metrics & Stats

**Scenario:** Generate code statistics report

**CLI:**
```bash
# Use JSON format for parsing
python code_aggregator.py . \
  -f json \
  -o code_stats.json

# Then parse with Python/Node to generate metrics
```

Example parsing script:
```python
import json

with open('code_stats.json') as f:
    data = json.load(f)

total_lines = sum(file['lines'] for file in data)
languages = {}

for file in data:
    lang = file['language']
    languages[lang] = languages.get(lang, 0) + 1

print(f"Total Files: {len(data)}")
print(f"Total Lines: {total_lines:,}")
print(f"Languages: {languages}")
```

---

## 🚀 Automation & CI/CD

### Example 11: Automated Documentation

**Scenario:** Auto-generate docs on every commit

Create `.github/workflows/docs.yml`:
```yaml
name: Generate Documentation

on:
  push:
    branches: [main]

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Python
        uses: actions/setup-python@v2
        
      - name: Install dependencies
        run: pip install -r requirements.txt
        
      - name: Generate docs
        run: |
          python code_aggregator.py src/ \
            -f md \
            -o docs/SOURCE_CODE.md
            
      - name: Commit docs
        run: |
          git config user.name "Bot"
          git config user.email "bot@example.com"
          git add docs/SOURCE_CODE.md
          git commit -m "Auto-update source documentation"
          git push
```

---

### Example 12: Pre-commit Hook

**Scenario:** Generate updated code snapshot before each commit

Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash

python code_aggregator.py src/ \
  -f txt \
  -o .code-snapshot.txt \
  --no-line-numbers

git add .code-snapshot.txt
```

---

## 🎨 Creative Use Cases

### Example 13: Code Art Gallery

**Scenario:** Create beautiful HTML displays of code

**CLI:**
```bash
python code_aggregator.py src/ \
  -f html \
  -o code_gallery.html

# Customize the CSS in the HTML output
# Add to your website as an interactive gallery
```

---

### Example 14: Code Time Capsule

**Scenario:** Archive project state for future reference

**CLI:**
```bash
# Create timestamped archive
python code_aggregator.py . \
  -f pdf \
  -o "archive_$(date +%Y-%m-%d_%H-%M-%S).pdf"

# Store in archives folder
mkdir -p archives
mv archive_*.pdf archives/
```

---

## 🔧 Advanced Workflows

### Example 15: Multi-Format Export

**Scenario:** Generate all formats for different purposes

**Bash Script:**
```bash
#!/bin/bash

PROJECT_PATH="./src"
OUTPUT_DIR="./compiled"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $OUTPUT_DIR

# Text for AI
python code_aggregator.py $PROJECT_PATH \
  -f txt \
  -o "$OUTPUT_DIR/${TIMESTAMP}_for_ai.txt"

# JSON for parsing
python code_aggregator.py $PROJECT_PATH \
  -f json \
  -o "$OUTPUT_DIR/${TIMESTAMP}_data.json"

# Markdown for docs
python code_aggregator.py $PROJECT_PATH \
  -f md \
  -o "$OUTPUT_DIR/${TIMESTAMP}_docs.md"

# PDF for review
python code_aggregator.py $PROJECT_PATH \
  -f pdf \
  -o "$OUTPUT_DIR/${TIMESTAMP}_review.pdf"

echo "All formats generated in $OUTPUT_DIR"
```

---

### Example 16: Smart Filtering by Language

**Scenario:** Separate frontend and backend code

**CLI:**
```bash
# Frontend only
python code_aggregator.py . \
  -f md \
  -o frontend.md \
  --extensions jsx,tsx,css,scss,html

# Backend only
python code_aggregator.py . \
  -f md \
  -o backend.md \
  --extensions py,java,go,rs

# Config files
python code_aggregator.py . \
  -f json \
  -o config.json \
  --extensions json,yaml,yml,toml
```

---

## 📱 Platform-Specific Examples

### Example 17: React Project Structure

**CLI:**
```bash
python code_aggregator.py \
  src/components/ \
  src/hooks/ \
  src/utils/ \
  src/App.jsx \
  -f md \
  -o react_structure.md \
  --extensions jsx,tsx,js,ts
```

---

### Example 18: Python Package Documentation

**CLI:**
```bash
python code_aggregator.py \
  package_name/ \
  -f md \
  -o PACKAGE_DOCS.md \
  --extensions py \
  --exclude "test,__pycache__"
```

---

## 🎯 Tips & Tricks

### Tip 1: Create Aliases
Add to `.bashrc` or `.zshrc`:
```bash
alias agg='python ~/path/to/code_aggregator.py'
alias agg-txt='python ~/path/to/code_aggregator.py -f txt'
alias agg-pdf='python ~/path/to/code_aggregator.py -f pdf'
```

### Tip 2: Default Config File
Create `agg_config.sh`:
```bash
#!/bin/bash
COMMON_OPTS="--no-line-numbers --max-size 5"
python code_aggregator.py "$@" $COMMON_OPTS
```

### Tip 3: Combine with Other Tools
```bash
# Find files modified in last 7 days, then aggregate
find . -type f -mtime -7 -name "*.py" -o -name "*.js" | \
  xargs python code_aggregator.py -o recent_changes.txt
```

---

## 🌟 Community Examples

Share your creative uses! Open a PR to add your examples here.

---

**Happy Aggregating! 🔥**

*These examples showcase the versatility of BlaXk Aggregator.*  
*Mix and match techniques to fit your workflow!*
