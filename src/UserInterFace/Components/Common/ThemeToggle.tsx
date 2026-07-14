import React from 'react';
import { useDarkMode } from '../../Hooks/Shared/useDarkMode';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "تفعيل الوضع المضيء" : "تفعيل الوضع الليلي"}
      title={isDark ? "تفعيل الوضع المضيء" : "تفعيل الوضع الليلي"}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-shamelco-surface border border-shamelco-border text-shamelco-darker hover:border-shamelco-accent hover:bg-shamelco-bg transition-all duration-200 shadow-3xs cursor-pointer active:scale-90 select-none overflow-hidden group"
    >
      <span className={`absolute transition-all duration-300 ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`}>
        <svg className="w-5 h-5 text-shamelco-gold drop-shadow-sm fill-current" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>

      <span className={`absolute transition-all duration-300 ${isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}>
        <svg className="w-5 h-5 text-shamelco-accent group-hover:text-shamelco-gold fill-current transition-colors" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </span>
    </button>
  );
};