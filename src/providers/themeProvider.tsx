'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

type ColorScheme = 'dark' | 'light';

interface ThemeProviderInterface {
  colorScheme: ColorScheme;
  setColorScheme: (v?: ColorScheme) => void;
}

const defaultTheme: ThemeProviderInterface = {
  colorScheme: 'dark',
  setColorScheme: () => undefined
};

const colorSchemeKey = 'color-scheme';

const ThemeProviderContext =
  createContext<ThemeProviderInterface>(defaultTheme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorScheme] =
    useState<ThemeProviderInterface['colorScheme']>('dark');

  // Set's theme variable inside CSS, HTML and local storage
  const setColorSchemeFn = useCallback((colorScheme: ColorScheme) => {
    const html = document.getElementsByTagName('html')[0] as HTMLElement;

    // Settings to local storage
    localStorage.setItem(colorSchemeKey, colorScheme);

    // settings to HTML and CSS
    html.style.setProperty('--color-scheme', colorScheme);
    html.setAttribute('data-color-scheme', colorScheme);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const colorScheme = localStorage.getItem(colorSchemeKey);

    if (colorScheme === null) {
      setColorSchemeFn('dark');
    } else {
      setColorSchemeFn(colorScheme as ColorScheme);
      setColorScheme(colorScheme as ColorScheme);
    }
  }, [setColorSchemeFn]);

  const updateColorScheme = (v?: ColorScheme): void => {
    setColorScheme((currColorScheme) => {
      const newColorScheme =
        v !== undefined ? v : currColorScheme === 'dark' ? 'light' : 'dark';

      setColorSchemeFn(newColorScheme);

      return newColorScheme;
    });
  };

  return (
    <ThemeProviderContext.Provider
      value={{ colorScheme, setColorScheme: updateColorScheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeProviderContext);
