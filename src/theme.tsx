import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';
export const THEME_KEY = 'biatriz-theme';
const META: Record<Theme, string> = { light: '#FFB9DA', dark: '#0A0909' };

const isTheme = (v: unknown): v is Theme => v === 'light' || v === 'dark';

/** Tema inicial: o index.html já aplicou data-theme antes do React; senão lê o storage; padrão = claro. */
function initialTheme(): Theme {
  const a = document.documentElement.getAttribute('data-theme');
  if (isTheme(a)) return a;
  try { const s = localStorage.getItem(THEME_KEY); if (isTheme(s)) return s; } catch { /* storage bloqueado */ }
  return 'light';
}

function apply(t: Theme) {
  const h = document.documentElement;
  h.setAttribute('data-theme', t);
  h.style.colorScheme = t;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[t]);
}

interface Ctx { theme: Theme; toggle: () => void }
const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => { apply(theme); }, [theme]);

  // sincroniza entre abas
  useEffect(() => {
    const on = (e: StorageEvent) => { if (e.key === THEME_KEY && isTheme(e.newValue)) setTheme(e.newValue); };
    addEventListener('storage', on);
    return () => removeEventListener('storage', on);
  }, []);

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(THEME_KEY, next); } catch { /* storage bloqueado */ }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Ctx {
  const c = useContext(ThemeContext);
  if (!c) throw new Error('useTheme precisa estar dentro de <ThemeProvider>');
  return c;
}
