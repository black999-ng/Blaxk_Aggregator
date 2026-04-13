# 💡 Tips & Tricks - BlaXk Aggregator

## Power User Guide

---

## 🎯 Quick Tips

### 1. **Mix Code and Documentation**
Don't just aggregate code! Include:
- README.md files for context
- PDF documentation
- DOCX design specs
- XLSX data samples
- XML configuration files

**Example**: Compile a complete project overview:
```bash
python code_aggregator.py \
  src/ \
  README.md \
  docs/architecture.pdf \
  data/sample.xlsx \
  -o complete_project.html
```

---

### 2. **Smart File Filtering**

#### Include Only What You Need
```bash
# Only TypeScript and React files
python code_aggregator.py . --extensions ts,tsx

# Only Python files, excluding tests
python code_aggregator.py . --extensions py --exclude test_,tests/
```

#### Exclude Common Bloat
The tool auto-excludes:
- `node_modules/`
- `.git/`
- `__pycache__/`
- `dist/`, `build/`
- `.venv/`, `env/`

Add custom exclusions in the web UI or via `--exclude` flag.

---

### 3. **Optimize for AI Analysis**

When preparing code for ChatGPT, Claude, or other AI:

#### Best Practices
- **Use TXT format** - Most compatible
- **Enable line numbers** - Helps AI reference specific lines
- **Include metadata** - Provides context about file types
- **Group by folder** - Maintains project structure
- **Add README first** - Gives AI context

#### Example
```bash
python code_aggregator.py src/ \
  -o code_for_ai.txt \
  --line-numbers \
  --metadata \
  --separator "="
```

#### Pro Tip
Add your README.md at the top by including it first:
```bash
python code_aggregator.py README.md src/ -o for_ai.txt
```

---

### 4. **Beautiful Documentation Output**

#### Use Markdown for Docs
```bash
python code_aggregator.py . -f md -o PROJECT_DOCS.md
```

Benefits:
- Code blocks with syntax highlighting
- Proper headers and structure
- Easy to convert to other formats
- GitHub-compatible

#### Use HTML for Sharing
```bash
python code_aggregator.py . -f html -o sharing.html
```

Benefits:
- Syntax highlighting preserved
- Searchable in browser (Ctrl+F)
- Email-friendly
- Professional appearance

---

### 5. **Large Codebase Strategy**

For projects with 100+ files:

#### Strategy 1: Batch by Feature
```bash
# Compile each feature separately
python code_aggregator.py src/auth/ -o auth_module.txt
python code_aggregator.py src/api/ -o api_module.txt
python code_aggregator.py src/ui/ -o ui_module.txt
```

#### Strategy 2: Use Size Limits
```bash
# Skip large generated files
python code_aggregator.py . --max-size 5  # 5MB limit
```

#### Strategy 3: Group by Language
In the web UI, use "Group By: Type" to organize:
- All TypeScript files together
- All Python files together
- All configuration files together

---

### 6. **Custom Separators for Clarity**

Choose separators based on output format:

#### For Plain Text
```bash
--separator "="  # ====== file.py ======
--separator "-"  # ------ file.py ------
--separator "#"  # ###### file.py ######
```

#### For Visual Appeal
```bash
--separator "▓"  # ▓▓▓▓▓▓ file.py ▓▓▓▓▓▓
--separator "━"  # ━━━━━━ file.py ━━━━━━
--separator "═"  # ══════ file.py ══════
```

---

### 7. **Document Extraction Tips**

#### PDF Documents
- **Best**: Text-based PDFs (can select text)
- **Avoid**: Scanned PDFs (image-based)
- **Tip**: Test extraction on one file first

#### Word Documents
- **Use**: .docx (modern format)
- **Avoid**: .doc (legacy, limited support)
- **Tip**: Re-save old .doc files as .docx

#### Excel Files
- **All sheets extracted** with separators
- **Formulas**: Converted to values
- **Tip**: For better formatting, export as CSV first

---

### 8. **Metadata is Your Friend**

Enable metadata to see:
- File size (helps identify large files)
- Line count (understand code volume)
- Language detection (verify file types)
- Last modified date (track recent changes)

In web UI: Toggle "Include Metadata"  
In CLI: `--metadata` flag

---

### 9. **Preview Before Export**

Web UI advantage - **live preview**:
1. Upload files
2. Adjust settings
3. See changes instantly in preview
4. Search within preview (Ctrl+F)
5. Export when satisfied

This saves time and ensures output meets expectations.

---

### 10. **Keyboard Shortcuts (Web UI)**

- **Ctrl+F / Cmd+F**: Search in preview
- **Ctrl+A / Cmd+A**: Select all in preview
- **Ctrl+C / Cmd+C**: Copy preview content
- **Drag & Drop**: Quick file upload
- **Dark Mode Toggle**: Click theme button (top right)

---

## 🚀 Advanced Workflows

### Workflow 1: Code Review Preparation
```bash
# 1. Compile feature branch
git checkout feature-branch
python code_aggregator.py src/ -o feature_review.md

# 2. Add context
cat > review.txt << EOF
# Feature Review: New Authentication System

## Files Changed:
EOF
cat feature_review.md >> review.txt

# 3. Share with team
```

### Workflow 2: Project Documentation
```bash
# Compile comprehensive documentation
python code_aggregator.py \
  README.md \
  ARCHITECTURE.md \
  docs/*.pdf \
  src/**/*.ts \
  -f html \
  -o project_documentation.html \
  --metadata
```

### Workflow 3: Code Portfolio
```bash
# Create a portfolio piece
python code_aggregator.py \
  projects/my-app/src/ \
  projects/my-app/README.md \
  --extensions ts,tsx,css \
  -f pdf \
  -o portfolio_my_app.pdf \
  --line-numbers \
  --metadata
```

### Workflow 4: Automated Backups
```bash
#!/bin/bash
# backup_code.sh - Daily code backup script

DATE=$(date +%Y-%m-%d)
python code_aggregator.py \
  ~/projects/important-project/ \
  -o "backups/project_backup_$DATE.txt" \
  --metadata
```

---

## 🎨 Output Format Recommendations

| Use Case | Recommended Format | Why |
|----------|-------------------|-----|
| AI Analysis | TXT | Simple, universal, no formatting issues |
| Code Review | Markdown | Syntax highlighting, GitHub integration |
| Sharing with Team | HTML | Beautiful, searchable, self-contained |
| Archive/Backup | JSON | Structured, metadata preserved, searchable |
| Professional Reports | PDF | Professional, printable, fixed layout |
| Further Processing | JSON | Programmatic access, structured data |

---

## ⚡ Performance Tips

### For Large Projects (1000+ files)

1. **Use CLI instead of Web UI**
   - CLI is faster for bulk operations
   - Web UI better for selective compilation

2. **Filter Aggressively**
   - Only include needed extensions
   - Exclude test files if not needed
   - Skip generated files (dist, build)

3. **Batch Processing**
   - Compile by module/feature
   - Combine later if needed

4. **Increase File Size Limit Carefully**
   - Default 10MB is usually enough
   - Larger files slow processing
   - Consider splitting large files

---

## 🔧 Troubleshooting Common Issues

### Issue: Output is Too Large
**Solutions:**
- Filter by file extension
- Exclude test files
- Lower max file size
- Split by folder/module

### Issue: Can't Read Document File
**Solutions:**
- Verify file isn't corrupted (open in native app)
- Check file format (use modern formats)
- Install required Python libraries
- Try converting to different format

### Issue: Missing Files in Output
**Solutions:**
- Check exclude patterns
- Verify file extensions filter
- Ensure file size under limit
- Check console for errors

### Issue: Slow Processing
**Solutions:**
- Reduce number of files
- Lower max file size
- Use CLI for better performance
- Close other browser tabs (web UI)

---

## 📚 Learning Resources

### Example Projects to Try

1. **Small Web App** (5-20 files)
   - Good for learning
   - Fast processing
   - Easy to review

2. **Medium Backend API** (50-100 files)
   - Practice filtering
   - Group by module
   - Use metadata

3. **Large Full-Stack App** (200+ files)
   - Master batch processing
   - Learn optimization
   - Use advanced filters

### Practice Exercises

1. **Exercise 1**: Compile only your utility functions
2. **Exercise 2**: Create a documentation-only compilation
3. **Exercise 3**: Mix code + docs for complete project view
4. **Exercise 4**: Create themed outputs (API only, UI only, etc.)

---

## 🎯 Pro Tips Summary

✅ **DO:**
- Mix code and documents for complete context
- Use metadata for better understanding
- Preview before exporting (web UI)
- Choose the right format for your use case
- Filter aggressively for large projects

❌ **DON'T:**
- Include generated files (dist, build)
- Forget to exclude node_modules
- Use legacy file formats (.doc over .docx)
- Process extremely large files without testing first
- Ignore file size warnings

---

## 🌟 Hidden Features

### Web Application
1. **Drag & Drop Folders** - Works in modern browsers
2. **Search in Preview** - Ctrl+F works in preview panel
3. **Copy to Clipboard** - Click copy button for instant access
4. **Theme Persistence** - Your theme choice is saved
5. **Real-time Stats** - Watch stats update as you add files

### Python CLI
1. **Glob Patterns** - Use wildcards: `src/**/*.py`
2. **Multiple Paths** - Specify multiple directories
3. **JSON Output** - Structured data for scripting
4. **Colorized Output** - Install colorama for better CLI experience
5. **Progress Bars** - Install tqdm for large operations

---

<div align="center">

## 🚀 Ready to Master BlaXk Aggregator?

Start with simple compilations and gradually explore advanced features!

[← Back to Main README](README.md) | [View Examples →](EXAMPLES.md)

</div>
