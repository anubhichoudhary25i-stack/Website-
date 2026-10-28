import { useEffect } from 'react';

export function useDarkMode() {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    try {
      localStorage.setItem('portfolio-theme', JSON.stringify('light'));
    } catch {
      // ignore
    }
  }, []);
  
  return { theme: 'light' as const, toggleTheme: () => {} };
}
