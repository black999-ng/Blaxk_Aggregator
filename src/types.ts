export interface FileItem {
  id: string;
  name: string;
  path: string;
  content: string;
  size: number;
  extension: string;
  language: string;
  lines: number;
  selected: boolean;
  lastModified: Date;
}

export type GroupBy = 'folder' | 'type' | 'alphabet';

export type ExportFormat = 'txt' | 'json' | 'md' | 'html' | 'pdf';

export interface AppOptions {
  includeLineNumbers: boolean;
  includeMetadata: boolean;
  includeSubfolders: boolean;
  groupBy: GroupBy;
  separator: string;
  excludePatterns: string[];
  fileExtensions: string[];
  maxFileSize: number; // in MB
}

export interface FileStats {
  totalFiles: number;
  totalLines: number;
  totalSize: number;
  languages: Record<string, number>;
}

export interface GroupedFiles {
  [key: string]: FileItem[];
}
