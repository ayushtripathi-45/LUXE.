import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-[52px] h-[28px] rounded-full transition-all duration-500 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
        ${isDark
          ? 'bg-gradient-to-r from-indigo-900 to-slate-800 shadow-inner shadow-indigo-950/50'
          : 'bg-gradient-to-r from-sky-300 to-blue-400 shadow-inner shadow-sky-400/30'
        }`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      id="theme-toggle-btn"
    >
      {/* Stars (dark mode) */}
      <div className={`absolute inset-0 overflow-hidden rounded-full transition-opacity duration-500
        ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        <span className="absolute w-[3px] h-[3px] bg-white/70 rounded-full top-[6px] left-[10px] animate-pulse" style={{animationDelay: '0s'}} />
        <span className="absolute w-[2px] h-[2px] bg-white/50 rounded-full top-[14px] left-[6px] animate-pulse" style={{animationDelay: '0.3s'}} />
        <span className="absolute w-[2px] h-[2px] bg-white/60 rounded-full top-[8px] left-[18px] animate-pulse" style={{animationDelay: '0.7s'}} />
        <span className="absolute w-[1.5px] h-[1.5px] bg-white/40 rounded-full top-[18px] left-[14px] animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      {/* Clouds (light mode) */}
      <div className={`absolute inset-0 overflow-hidden rounded-full transition-opacity duration-500
        ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        <span className={`absolute w-[10px] h-[5px] bg-white/60 rounded-full bottom-[7px] right-[8px] transition-transform duration-700
          ${isDark ? 'translate-x-4' : 'translate-x-0'}`} />
        <span className={`absolute w-[7px] h-[4px] bg-white/40 rounded-full bottom-[5px] right-[16px] transition-transform duration-700 delay-75
          ${isDark ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>

      {/* Toggle Knob */}
      <div
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full shadow-md
          transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
          ${isDark
            ? 'left-[27px] bg-gradient-to-br from-slate-200 to-slate-300 shadow-slate-400/30'
            : 'left-[3px] bg-gradient-to-br from-amber-300 to-yellow-400 shadow-amber-400/40'
          }`}
      >
        {/* Sun rays (light mode) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500
          ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
          <svg className="w-[14px] h-[14px] text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </svg>
        </div>

        {/* Moon (dark mode) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500
          ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
          <svg className="w-[12px] h-[12px] text-indigo-800" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>

        {/* Moon craters */}
        <div className={`absolute transition-opacity duration-500 ${isDark ? 'opacity-30' : 'opacity-0'}`}>
          <span className="absolute w-[3px] h-[3px] bg-indigo-900/40 rounded-full top-[5px] left-[10px]" />
          <span className="absolute w-[2px] h-[2px] bg-indigo-900/30 rounded-full top-[12px] left-[6px]" />
        </div>
      </div>
    </button>
  );
}
