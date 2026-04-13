import { FileStats } from '../types';

interface StatsPanelProps {
  stats: FileStats;
  theme: 'light' | 'dark';
}

export function StatsPanel({ stats, theme }: StatsPanelProps) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-[#28242a] border-[#df0139]/30' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-lg`}>
      <h2 className="text-lg font-bold mb-4">📊 Statistics</h2>

      <div className="space-y-4">
        {/* Total Files */}
        <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-[#df0139]/10 border-[#df0139]/30' : 'bg-purple-50 border-purple-200'}`}>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Files
          </div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#df0139]' : 'text-purple-600'}`}>
            {stats.totalFiles}
          </div>
        </div>

        {/* Total Lines */}
        <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-[#df0139]/10 border-[#df0139]/30' : 'bg-blue-50 border-blue-200'}`}>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Lines
          </div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#df0139]' : 'text-blue-600'}`}>
            {stats.totalLines.toLocaleString()}
          </div>
        </div>

        {/* Total Size */}
        <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-[#df0139]/10 border-[#df0139]/30' : 'bg-green-50 border-green-200'}`}>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Size
          </div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#df0139]' : 'text-green-600'}`}>
            {formatSize(stats.totalSize)}
          </div>
        </div>

        {/* Languages */}
        {Object.keys(stats.languages).length > 0 && (
          <div>
            <div className="text-sm font-semibold mb-2">Languages:</div>
            <div className="space-y-2">
              {Object.entries(stats.languages)
                .sort((a, b) => b[1] - a[1])
                .map(([lang, count]) => (
                  <div
                    key={lang}
                    className={`flex items-center justify-between p-2 rounded border ${
                      theme === 'dark' ? 'bg-[#1e1e27] border-[#df0139]/20' : 'bg-gray-100 border-gray-200'
                    }`}
                  >
                    <span className="text-sm">{lang}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      theme === 'dark' ? 'bg-[#df0139]/20 text-[#df0139]' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
