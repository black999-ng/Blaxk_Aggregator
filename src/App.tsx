import { useState, useMemo } from 'react';
import { FileUploader } from './components/FileUploader';
import { FileList } from './components/FileList';
import { PreviewPanel } from './components/PreviewPanel';
import { OptionsPanel } from './components/OptionsPanel';
import { StatsPanel } from './components/StatsPanel';
import { ExportPanel } from './components/ExportPanel';
import { TableOfContents } from './components/TableOfContents';
import { Logo } from './components/Logo';
import { FileItem, ExportFormat, AppOptions } from './types';
import { processFiles, generateOutput, getFileStats, groupFiles } from './utils/fileProcessing';
import { exportFile } from './utils/export';

function App() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<AppOptions>({
    includeLineNumbers: true,
    includeMetadata: true,
    includeSubfolders: true,
    groupBy: 'folder',
    separator: '=',
    excludePatterns: ['node_modules', '.git', '__pycache__', 'dist', 'build', '.next'],
    fileExtensions: [],
    maxFileSize: 10,
  });

  const handleFilesSelected = async (selectedFiles: File[]) => {
    const processed = await processFiles(selectedFiles, options);
    setFiles(prev => [...prev, ...processed]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  const handleToggleFile = (id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
  };

  const handleToggleAll = () => {
    const allSelected = files.every(f => f.selected);
    setFiles(prev => prev.map(f => ({ ...f, selected: !allSelected })));
  };

  const handleExport = async (format: ExportFormat) => {
    const selectedFiles = files.filter(f => f.selected);
    if (selectedFiles.length === 0) {
      alert('Please select at least one file to export');
      return;
    }

    await exportFile(selectedFiles, format, options);
  };

  const handleCopyToClipboard = () => {
    const selectedFiles = files.filter(f => f.selected);
    if (selectedFiles.length === 0) {
      alert('Please select at least one file to copy');
      return;
    }

    const output = generateOutput(selectedFiles, options, 'txt');
    navigator.clipboard.writeText(output).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const groupedFiles = useMemo(() => groupFiles(files, options.groupBy), [files, options.groupBy]);
  const stats = useMemo(() => getFileStats(files.filter(f => f.selected)), [files]);
  const selectedFiles = files.filter(f => f.selected);
  const output = useMemo(() => 
    selectedFiles.length > 0 ? generateOutput(selectedFiles, options, 'txt') : '',
    [selectedFiles, options]
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#1e1e27] text-gray-100' : 'bg-[#f5f5f5] text-gray-900'}`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-[#28242a] border-[#df0139]/20' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 shadow-lg`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo theme={theme} />
          <div className="flex items-center gap-4">
            <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              🔒 All processing is client-side. Your code never leaves your browser.
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-[#1e1e27] hover:bg-[#df0139]/20 border border-[#df0139]/30' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Upload & Files */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <FileUploader onFilesSelected={handleFilesSelected} theme={theme} />
            
            <FileList
              files={files}
              groupedFiles={groupedFiles}
              onRemove={handleRemoveFile}
              onToggle={handleToggleFile}
              onToggleAll={handleToggleAll}
              onClearAll={handleClearAll}
              theme={theme}
            />

            <OptionsPanel
              options={options}
              onChange={setOptions}
              theme={theme}
            />
          </div>

          {/* Center - Preview */}
          <div className="col-span-12 lg:col-span-6">
            <PreviewPanel
              output={output}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onCopy={handleCopyToClipboard}
              theme={theme}
            />
          </div>

          {/* Right Sidebar - Stats & Export */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <StatsPanel stats={stats} theme={theme} />
            
            <TableOfContents
              files={selectedFiles}
              groupBy={options.groupBy}
              theme={theme}
            />

            <ExportPanel
              onExport={handleExport}
              disabled={selectedFiles.length === 0}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
