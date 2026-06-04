import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Set the class immediately on initial load to prevent flash of wrong theme
function getInitialTheme() {
  try {
    const saved = localStorage.getItem('luxe_theme');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

// Apply initial class synchronously (prevents FOUC)
const initialDark = getInitialTheme();
if (initialDark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(initialDark);

  useEffect(() => {
    localStorage.setItem('luxe_theme', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Listen for system preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (localStorage.getItem('luxe_theme') === null) {
        setIsDark(e.matches);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
