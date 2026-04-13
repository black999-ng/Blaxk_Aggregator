import { FileItem, AppOptions, FileStats, GroupedFiles, GroupBy } from '../types';
import { processDocument, isDocumentFile, getDocumentType } from './documentProcessor';

const LANGUAGE_MAP: Record<string, string> = {
  js: 'JavaScript',
  jsx: 'JavaScript React',
  ts: 'TypeScript',
  tsx: 'TypeScript React',
  py: 'Python',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  cs: 'C#',
  rb: 'Ruby',
  go: 'Go',
  rs: 'Rust',
  php: 'PHP',
  swift: 'Swift',
  kt: 'Kotlin',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  json: 'JSON',
  xml: 'XML',
  yaml: 'YAML',
  yml: 'YAML',
  md: 'Markdown',
  txt: 'Text',
  sh: 'Shell',
  bash: 'Bash',
  sql: 'SQL',
  r: 'R',
  dart: 'Dart',
  vue: 'Vue',
  svelte: 'Svelte',
  // Document formats
  pdf: 'PDF Document',
  docx: 'Word Document',
  doc: 'Word Document (Legacy)',
  xlsx: 'Excel Spreadsheet',
  xls: 'Excel Spreadsheet (Legacy)',
  csv: 'CSV Spreadsheet',
  rtf: 'Rich Text Format',
};

export async function processFiles(files: File[], options: AppOptions): Promise<FileItem[]> {
  const processed: FileItem[] = [];
  
  for (const file of files) {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > options.maxFileSize) {
      console.warn(`Skipping ${file.name} - exceeds ${options.maxFileSize}MB limit`);
      continue;
    }

    // Check exclude patterns
    const shouldExclude = options.excludePatterns.some(pattern => 
      file.webkitRelativePath?.includes(pattern) || file.name.includes(pattern)
    );
    if (shouldExclude) {
      continue;
    }

    // Check file extensions filter
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (options.fileExtensions.length > 0 && !options.fileExtensions.includes(extension)) {
      continue;
    }

    try {
      // Use document processor for special file types
      let content: string;
      if (isDocumentFile(file.name)) {
        content = await processDocument(file);
      } else {
        content = await file.text();
      }
      
      const lines = content.split('\n').length;
      const language = LANGUAGE_MAP[extension] || getDocumentType(file.name) || 'Unknown';

      processed.push({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        name: file.name,
        path: file.webkitRelativePath || file.name,
        content,
        size: file.size,
        extension,
        language,
        lines,
        selected: true,
        lastModified: new Date(file.lastModified),
      });
    } catch (error) {
      console.error(`Error processing ${file.name}:`, error);
    }
  }

  return processed;
}

export function generateOutput(
  files: FileItem[],
  options: AppOptions,
  format: 'txt' | 'md' | 'html' | 'json'
): string {
  if (format === 'json') {
    return JSON.stringify(files.map(f => ({
      name: f.name,
      path: f.path,
      language: f.language,
      size: f.size,
      lines: f.lines,
      content: f.content,
      lastModified: f.lastModified,
    })), null, 2);
  }

  const grouped = groupFiles(files, options.groupBy);
  let output = '';

  // Add header
  if (format === 'md') {
    output += '# Code Aggregation\n\n';
    output += `Generated on: ${new Date().toLocaleString()}\n\n`;
    output += '## Table of Contents\n\n';
    files.forEach((file, idx) => {
      output += `${idx + 1}. [${file.path}](#file-${idx})\n`;
    });
    output += '\n---\n\n';
  } else if (format === 'html') {
    output += '<!DOCTYPE html>\n<html>\n<head>\n';
    output += '<meta charset="UTF-8">\n';
    output += '<title>Code Aggregation</title>\n';
    output += '<style>\n';
    output += 'body { font-family: monospace; max-width: 1200px; margin: 0 auto; padding: 20px; background: #1e1e1e; color: #d4d4d4; }\n';
    output += '.file-separator { border-top: 3px solid #569cd6; margin: 30px 0; padding: 10px 0; }\n';
    output += '.file-header { color: #4ec9b0; font-size: 18px; font-weight: bold; }\n';
    output += '.metadata { color: #858585; font-size: 12px; margin: 5px 0; }\n';
    output += '.code-block { background: #252526; padding: 15px; border-radius: 5px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; }\n';
    output += '.line-number { color: #858585; margin-right: 15px; user-select: none; }\n';
    output += '</style>\n';
    output += '</head>\n<body>\n';
    output += `<h1>📁 Code Aggregation</h1>\n`;
    output += `<p>Generated on: ${new Date().toLocaleString()}</p>\n`;
  }

  // Generate separator
  const sep = options.separator.repeat(20);

  // Add files
  let fileIndex = 0;
  for (const [groupName, groupFiles] of Object.entries(grouped)) {
    if (format === 'md' && options.groupBy !== 'alphabet') {
      output += `## ${groupName}\n\n`;
    }

    for (const file of groupFiles) {
      if (format === 'md') {
        output += `<a id="file-${fileIndex}"></a>\n\n`;
        output += `### ${file.path}\n\n`;
        if (options.includeMetadata) {
          output += `- **Language**: ${file.language}\n`;
          output += `- **Size**: ${(file.size / 1024).toFixed(2)} KB\n`;
          output += `- **Lines**: ${file.lines}\n`;
          output += `- **Modified**: ${file.lastModified.toLocaleString()}\n\n`;
        }
        output += '```' + file.extension + '\n';
        output += file.content;
        output += '\n```\n\n';
      } else if (format === 'html') {
        output += `<div class="file-separator">\n`;
        output += `<div class="file-header">${sep} ${file.path} ${sep}</div>\n`;
        if (options.includeMetadata) {
          output += `<div class="metadata">Language: ${file.language} | Size: ${(file.size / 1024).toFixed(2)} KB | Lines: ${file.lines} | Modified: ${file.lastModified.toLocaleString()}</div>\n`;
        }
        output += `<div class="code-block">`;
        
        if (options.includeLineNumbers) {
          const lines = file.content.split('\n');
          output += lines.map((line, i) => 
            `<span class="line-number">${i + 1}</span>${escapeHtml(line)}`
          ).join('\n');
        } else {
          output += escapeHtml(file.content);
        }
        
        output += `</div>\n</div>\n`;
      } else {
        // Plain text format
        output += `${sep} ${file.path} ${sep}\n`;
        if (options.includeMetadata) {
          output += `Language: ${file.language} | Size: ${(file.size / 1024).toFixed(2)} KB | Lines: ${file.lines} | Modified: ${file.lastModified.toLocaleString()}\n`;
        }
        output += '\n';
        
        if (options.includeLineNumbers) {
          const lines = file.content.split('\n');
          const maxLineNumWidth = String(lines.length).length;
          output += lines.map((line, i) => 
            `${String(i + 1).padStart(maxLineNumWidth)} | ${line}`
          ).join('\n');
        } else {
          output += file.content;
        }
        
        output += '\n\n';
      }
      
      fileIndex++;
    }
  }

  if (format === 'html') {
    output += '</body>\n</html>';
  }

  return output;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function getFileStats(files: FileItem[]): FileStats {
  const stats: FileStats = {
    totalFiles: files.length,
    totalLines: 0,
    totalSize: 0,
    languages: {},
  };

  files.forEach(file => {
    stats.totalLines += file.lines;
    stats.totalSize += file.size;
    stats.languages[file.language] = (stats.languages[file.language] || 0) + 1;
  });

  return stats;
}

export function groupFiles(files: FileItem[], groupBy: GroupBy): GroupedFiles {
  const grouped: GroupedFiles = {};

  files.forEach(file => {
    let key: string;

    switch (groupBy) {
      case 'type':
        key = file.language;
        break;
      case 'folder':
        const pathParts = file.path.split('/');
        key = pathParts.length > 1 ? pathParts.slice(0, -1).join('/') : 'Root';
        break;
      case 'alphabet':
        key = file.name[0].toUpperCase();
        break;
      default:
        key = 'All Files';
    }

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(file);
  });

  // Sort files within each group
  Object.values(grouped).forEach(group => {
    group.sort((a, b) => a.name.localeCompare(b.name));
  });

  return grouped;
}
