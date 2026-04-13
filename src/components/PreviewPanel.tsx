import { useMemo } from 'react';

interface PreviewPanelProps {
  output: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCopy: () => void;
  theme: 'light' | 'dark';
}

export function PreviewPanel({
  output,
  searchTerm,
  onSearchChange,
  onCopy,
  theme,
}: PreviewPanelProps) {
  const highlightedOutput = useMemo(() => {
    if (!searchTerm) return output;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return output.split('\n').map((line, idx) => {
      const highlighted = line.replace(regex, '<mark class="bg-yellow-300 text-black">$1</mark>');
      return `<div key="${idx}">${highlighted}</div>`;
    }).join('');
  }, [output, searchTerm]);

  return (
    <div className={`${theme === 'dark' ? 'bg-[#28242a] border-[#df0139]/30' : 'bg-white border-gray-200'} border rounded-lg shadow-lg flex flex-col`} style={{ height: 'calc(100vh - 12rem)' }}>
      <div className={`p-4 border-b ${theme === 'dark' ? 'border-[#df0139]/20' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">👁️ Preview</h2>
          <button
            onClick={onCopy}
            disabled={!output}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              !output
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : theme === 'dark'
                ? 'bg-[#df0139] hover:bg-[#ff0545] text-white shadow-lg shadow-[#df0139]/30'
                : 'bg-[#df0139] hover:bg-[#ff0545] text-white'
            }`}
          >
            📋 Copy All
          </button>
        </div>
        
        <input
          type="text"
          placeholder="🔍 Search in preview..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border ${
            theme === 'dark'
              ? 'bg-[#1e1e27] border-[#df0139]/40 text-gray-100 placeholder-gray-400'
              : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-[#df0139]`}
        />
      </div>

      <div className={`flex-1 overflow-y-auto overflow-x-auto p-4 ${theme === 'dark' ? 'bg-[#000000]' : 'bg-gray-50'} scrollbar-thin ${theme === 'dark' ? 'scrollbar-thumb-[#df0139] scrollbar-track-[#28242a]' : 'scrollbar-thumb-gray-400 scrollbar-track-gray-200'}`}>
        {output ? (
          <pre className={`text-xs font-mono whitespace-pre-wrap break-words ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
          }`}>
            {searchTerm ? (
              <div dangerouslySetInnerHTML={{ __html: highlightedOutput }} />
            ) : (
              output
            )}
          </pre>
        ) : (
          <div className={`flex items-center justify-center h-full ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <div className="text-center">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-lg font-semibold mb-2">No Preview Available</p>
              <p className="text-sm">Select files to see the aggregated output</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
