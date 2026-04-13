import { FileItem, GroupedFiles } from '../types';

interface FileListProps {
  files: FileItem[];
  groupedFiles: GroupedFiles;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onClearAll: () => void;
  theme: 'light' | 'dark';
}

export function FileList({
  files,
  groupedFiles,
  onRemove,
  onToggle,
  onToggleAll,
  onClearAll,
  theme,
}: FileListProps) {
  if (files.length === 0) {
    return (
      <div className={`${theme === 'dark' ? 'bg-[#28242a] border-[#df0139]/30' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-lg`}>
        <h2 className="text-lg font-bold mb-4">📋 Files</h2>
        <p className={`text-sm text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No files selected yet
        </p>
      </div>
    );
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-[#28242a] border-[#df0139]/30' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">📋 Files ({files.length})</h2>
        <div className="flex gap-2">
          <button
            onClick={onToggleAll}
            className={`text-xs px-2 py-1 rounded ${
              theme === 'dark'
                ? 'bg-[#1e1e27] hover:bg-[#df0139]/20 text-gray-300 border border-[#df0139]/30'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            title="Toggle all"
          >
            ☑️
          </button>
          <button
            onClick={onClearAll}
            className={`text-xs px-2 py-1 rounded ${
              theme === 'dark'
                ? 'bg-[#df0139]/20 hover:bg-[#df0139]/30 text-[#df0139] border border-[#df0139]/50'
                : 'bg-red-100 hover:bg-red-200 text-red-700'
            }`}
            title="Clear all"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-2">
        {Object.entries(groupedFiles).map(([groupName, groupFiles]) => (
          <div key={groupName}>
            <div className={`text-xs font-semibold mb-2 ${
              theme === 'dark' ? 'text-[#df0139]' : 'text-[#df0139]'
            }`}>
              {groupName}
            </div>
            {groupFiles.map(file => (
              <div
                key={file.id}
                className={`flex items-center gap-2 p-2 rounded-lg mb-1 border ${
                  theme === 'dark'
                    ? file.selected
                      ? 'bg-[#1e1e27] border-[#df0139]/40'
                      : 'bg-[#1e1e27]/50 border-transparent opacity-50'
                    : file.selected
                    ? 'bg-gray-100 border-gray-200'
                    : 'bg-gray-50 border-transparent opacity-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={file.selected}
                  onChange={() => onToggle(file.id)}
                  className="w-4 h-4 rounded accent-[#df0139] cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {file.name}
                  </div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {file.language} • {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
                <button
                  onClick={() => onRemove(file.id)}
                  className={`p-1 rounded hover:bg-[#df0139]/20 text-[#df0139] transition-colors`}
                  title="Remove file"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
