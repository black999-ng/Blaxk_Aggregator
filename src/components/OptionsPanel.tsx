import { AppOptions, GroupBy } from '../types';

interface OptionsPanelProps {
  options: AppOptions;
  onChange: (options: AppOptions) => void;
  theme: 'light' | 'dark';
}

export function OptionsPanel({ options, onChange, theme }: OptionsPanelProps) {
  const handleChange = (key: keyof AppOptions, value: any) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-[#28242a] border-[#df0139]/30' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-lg`}>
      <h2 className="text-lg font-bold mb-4">⚙️ Options</h2>

      <div className="space-y-4">
        {/* Line Numbers */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.includeLineNumbers}
            onChange={(e) => handleChange('includeLineNumbers', e.target.checked)}
            className="w-4 h-4 rounded accent-purple-500"
          />
          <span className="text-sm">Include line numbers</span>
        </label>

        {/* Metadata */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.includeMetadata}
            onChange={(e) => handleChange('includeMetadata', e.target.checked)}
            className="w-4 h-4 rounded accent-purple-500"
          />
          <span className="text-sm">Include metadata</span>
        </label>

        {/* Subfolders */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.includeSubfolders}
            onChange={(e) => handleChange('includeSubfolders', e.target.checked)}
            className="w-4 h-4 rounded accent-purple-500"
          />
          <span className="text-sm">Include subfolders</span>
        </label>

        {/* Group By */}
        <div>
          <label className="block text-sm font-semibold mb-2">Group by:</label>
          <div className="space-y-2">
            {(['folder', 'type', 'alphabet'] as GroupBy[]).map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="groupBy"
                  checked={options.groupBy === type}
                  onChange={() => handleChange('groupBy', type)}
                  className="w-4 h-4 accent-purple-500"
                />
                <span className="text-sm capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div>
          <label className="block text-sm font-semibold mb-2">Separator:</label>
          <input
            type="text"
            value={options.separator}
            onChange={(e) => handleChange('separator', e.target.value)}
            maxLength={3}
            className={`w-full px-3 py-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-gray-100'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="="
          />
        </div>

        {/* Max File Size */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Max file size: {options.maxFileSize} MB
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={options.maxFileSize}
            onChange={(e) => handleChange('maxFileSize', Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        {/* Exclude Patterns */}
        <div>
          <label className="block text-sm font-semibold mb-2">Exclude patterns:</label>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            {options.excludePatterns.join(', ')}
          </div>
        </div>

        {/* File Extensions Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">File extensions (optional):</label>
          <input
            type="text"
            placeholder="e.g., js,py,tsx (leave empty for all)"
            value={options.fileExtensions.join(',')}
            onChange={(e) => handleChange('fileExtensions', 
              e.target.value ? e.target.value.split(',').map(s => s.trim()) : []
            )}
            className={`w-full px-3 py-2 rounded-lg border text-sm ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
      </div>
    </div>
  );
}
