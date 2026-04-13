import { ExportFormat } from '../types';

interface ExportPanelProps {
  onExport: (format: ExportFormat) => void;
  disabled: boolean;
  theme: 'light' | 'dark';
}

export function ExportPanel({ onExport, disabled, theme }: ExportPanelProps) {
  const exportOptions: { format: ExportFormat; label: string; icon: string; color: string }[] = [
    { format: 'txt', label: 'Plain Text', icon: '📄', color: 'gray' },
    { format: 'json', label: 'JSON', icon: '📊', color: 'blue' },
    { format: 'md', label: 'Markdown', icon: '📝', color: 'green' },
    { format: 'html', label: 'HTML', icon: '🌐', color: 'orange' },
    { format: 'pdf', label: 'PDF', icon: '📕', color: 'red' },
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-[#28242a] border-[#df0139]/30' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-lg`}>
      <h2 className="text-lg font-bold mb-4">📥 Export</h2>

      <div className="space-y-2">
        {exportOptions.map(({ format, label, icon }) => (
          <button
            key={format}
            onClick={() => onExport(format)}
            disabled={disabled}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-between ${
              disabled
                ? theme === 'dark'
                  ? 'bg-[#1e1e27] text-gray-500 cursor-not-allowed border border-gray-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : theme === 'dark'
                ? 'bg-[#df0139] hover:bg-[#ff0545] text-white shadow-lg shadow-[#df0139]/30 hover:shadow-xl transform hover:scale-105'
                : 'bg-[#df0139] hover:bg-[#ff0545] text-white shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </span>
            <span className="text-xs opacity-75">.{format}</span>
          </button>
        ))}
      </div>

      {disabled && (
        <div className={`mt-4 p-3 rounded-lg text-xs text-center border ${
          theme === 'dark' ? 'bg-[#df0139]/10 text-[#df0139] border-[#df0139]/30' : 'bg-yellow-50 text-yellow-800 border-yellow-200'
        }`}>
          ⚠️ Select at least one file to export
        </div>
      )}

      <div className={`mt-4 p-3 rounded-lg text-xs border ${
        theme === 'dark' ? 'bg-[#df0139]/10 text-[#df0139] border-[#df0139]/30' : 'bg-blue-50 text-blue-800 border-blue-200'
      }`}>
        💡 <strong>PDF Export:</strong> Uses JavaScript PDF generation for client-side processing. Large files may take a moment.
      </div>
    </div>
  );
}
