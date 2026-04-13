import { FileItem, GroupBy } from '../types';
import { groupFiles } from '../utils/fileProcessing';

interface TableOfContentsProps {
  files: FileItem[];
  groupBy: GroupBy;
  theme: 'light' | 'dark';
}

export function TableOfContents({ files, groupBy, theme }: TableOfContentsProps) {
  const grouped = groupFiles(files, groupBy);

  if (files.length === 0) {
    return (
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-lg`}>
        <h2 className="text-lg font-bold mb-4">📑 Table of Contents</h2>
        <p className={`text-sm text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No files selected
        </p>
      </div>
    );
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-[#28242a] border-[#df0139]/30' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-lg`}>
      <h2 className="text-lg font-bold mb-4">📑 Table of Contents</h2>

      <div className="max-h-96 overflow-y-auto space-y-3">
        {Object.entries(grouped).map(([groupName, groupFiles]) => (
          <div key={groupName}>
            <div className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}>
              <span>📁</span>
              <span>{groupName}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'
              }`}>
                {groupFiles.length}
              </span>
            </div>
            <div className="ml-4 space-y-1">
              {groupFiles.map((file, idx) => (
                <div
                  key={file.id}
                  className={`text-xs flex items-start gap-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                    {idx + 1}.
                  </span>
                  <span className="flex-1 truncate" title={file.path}>
                    {file.name}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {file.extension}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
