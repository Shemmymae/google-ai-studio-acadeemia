import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const faviconLight = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/favicon-light.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2Zhdmljb24tbGlnaHQucG5nIiwiaWF0IjoxNzU2NzU2NjkzLCJleHAiOjMzMjkyNzU2NjkzfQ.OcaCZ1p2qrgMlF8DqJ8C1u-At1J-EG_l4UyPEb_xfjQ';
const faviconDark = 'https://oqasxrkbosdqaldwydeu.supabase.co/storage/v1/object/sign/website_images/logo/favivon-dark.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNWYwZjU5NS00NmQxLTRkOTctYTMxMS1lMmMxMTcyMzEyODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlX2ltYWdlcy9sb2dvL2Zhdml2b24tZGFyay5wbmciLCJpYXQiOjE3NTY3NTY3NDUsImV4cCI6MzMyOTI3NTY3NDV9.h-Xy766D1JhNL6M6kljA2mwoDbK6tNYsyBCKfYx6slQ';

export const ThemeProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // 1. Check for a manually saved theme first (user override)
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // 2. If no saved theme, automatically determine based on local time
      const currentHour = new Date().getHours();
      // Day time is between 6 AM (6) and 6 PM (18)
      const isDayTime = currentHour >= 6 && currentHour < 18;
      setTheme(isDayTime ? 'light' : 'dark');
    }
  }, []);

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      if (favicon) {
        favicon.href = faviconDark;
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (favicon) {
        favicon.href = faviconLight;
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    // When user manually toggles, save their preference
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
