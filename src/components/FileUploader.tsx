import { useRef, useState } from 'react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  theme: 'light' | 'dark';
}

export function FileUploader({ onFilesSelected, theme }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-[#28242a] border-[#df0139]/30' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-lg`}>
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        📂 Upload Files
      </h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-[#df0139] bg-[#df0139]/10'
            : theme === 'dark'
            ? 'border-[#df0139]/40 hover:border-[#df0139]/60 bg-[#1e1e27]/50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-4xl mb-3">📁</div>
        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
          Drop files here or click to browse
        </p>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Supports all code & document file types
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        accept="*/*"
      />

      <input
        ref={folderInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        {...({ webkitdirectory: '', directory: '' } as any)}
      />

      <div className="mt-4 space-y-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            theme === 'dark'
              ? 'bg-[#df0139] hover:bg-[#ff0545] text-white shadow-lg shadow-[#df0139]/30'
              : 'bg-[#df0139] hover:bg-[#ff0545] text-white'
          }`}
        >
          📄 Select Files
        </button>
        
        <button
          onClick={() => folderInputRef.current?.click()}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors border ${
            theme === 'dark'
              ? 'bg-[#1e1e27] hover:bg-[#df0139]/20 text-white border-[#df0139]/50'
              : 'bg-white hover:bg-gray-50 text-gray-900 border-[#df0139]/30'
          }`}
        >
          📁 Select Folder
        </button>
      </div>

      <div className={`mt-4 p-3 rounded-lg text-xs border ${
        theme === 'dark' ? 'bg-[#df0139]/10 text-[#df0139] border-[#df0139]/30' : 'bg-[#df0139]/5 text-[#df0139] border-[#df0139]/20'
      }`}>
        💡 <strong>Tip:</strong> You can select multiple files or an entire folder to aggregate all code & document files at once.
      </div>
    </div>
  );
}
