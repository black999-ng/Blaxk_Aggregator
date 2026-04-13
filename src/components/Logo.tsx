interface LogoProps {
  theme: 'light' | 'dark';
}

export function Logo({ theme }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-3xl font-bold flex items-center">
        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Bla</span>
        <span className="relative inline-block group">
          {/* Main glowing X with BlaXk accent color */}
          <span className="text-[#df0139] animate-pulse text-4xl font-black italic transform rotate-12 inline-block mx-1 drop-shadow-[0_0_15px_rgba(223,1,57,0.9)] filter brightness-125">
            X
          </span>
          {/* Glow effect layer */}
          <span className="absolute inset-0 text-[#df0139] blur-sm opacity-60 text-4xl font-black italic transform rotate-12 inline-block mx-1">
            X
          </span>
          {/* Outer glow */}
          <span className="absolute inset-0 text-[#df0139] blur-md opacity-30 text-4xl font-black italic transform rotate-12 inline-block mx-1 scale-110">
            X
          </span>
        </span>
        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>k Aggregator</span>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
        theme === 'dark' 
          ? 'bg-[#df0139]/20 text-[#df0139] border border-[#df0139]/50' 
          : 'bg-[#df0139]/10 text-[#df0139] border border-[#df0139]/30'
      }`}>
        Pro
      </div>
    </div>
  );
}
