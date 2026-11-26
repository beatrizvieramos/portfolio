import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Project } from '../data/projects';
import { pt, type Dict, type Key } from './pt';
import { en } from './en';
import { es } from './es';
import { projectsEN, type ProjectI18n } from './projects.en';
import { projectsES } from './projects.es';

export type Lang = 'pt' | 'en' | 'es';
export type { Key };
export const LANGS: Lang[] = ['pt', 'en', 'es'];
export const HTML_LANG: Record<Lang, string> = { pt: 'pt-BR', en: 'en', es: 'es' };
export const LANG_NAME: Record<Lang, string> = { pt: 'Português', en: 'English', es: 'Español' };
const OG_LOCALE: Record<Lang, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };
const STORAGE_KEY = 'biatriz-lang';
const WA_NUMBER = '5579991378686';

const dicts: Record<Lang, Partial<Dict>> = { pt, en, es };
const projectDicts: Record<Lang, Record<string, ProjectI18n>> = { pt: {}, en: projectsEN, es: projectsES };

const isLang = (v: unknown): v is Lang => v === 'pt' || v === 'en' || v === 'es';

/** Ordem: escolha salva > ?lang= na URL > idioma do navegador > português. */
export function detectLang(): Lang {
  try { const s = localStorage.getItem(STORAGE_KEY); if (isLang(s)) return s; } catch { /* storage bloqueado */ }
  try { const q = new URLSearchParams(location.search).get('lang'); if (isLang(q)) return q; } catch { /* sem URL */ }
  try {
    const list = [...(navigator.languages || []), navigator.language].filter(Boolean);
    for (const l of list) { const p = l.slice(0, 2).toLowerCase(); if (isLang(p)) return p; }
  } catch { /* sem navigator */ }
  return 'pt';
}

// chaves/trechos sem tradução (caem para o português); consulte com missingKeys()
const missing: Record<Lang, Set<string>> = { pt: new Set(), en: new Set(), es: new Set() };
export const missingKeys = (l: Lang) => [...missing[l]];
const missingProjects: Record<Lang, Set<string>> = { pt: new Set(), en: new Set(), es: new Set() };
export const missingProjectFields = (l: Lang) => [...missingProjects[l]];

function translate(lang: Lang, key: Key, vars?: Record<string, string | number>): string {
  let s = dicts[lang][key];
  if (s === undefined) {
    s = pt[key];
    if (lang !== 'pt' && !missing[lang].has(key)) {
      missing[lang].add(key);
      if (import.meta.env.DEV) console.warn(`[i18n] sem tradução (${lang}): ${key}`);
    }
  }
  return vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : s;
}

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: Key, vars?: Record<string, string | number>) => string;
  /** lista: valor da chave separado por quebras de linha */
  tl: (key: Key) => string[];
  /** link do WhatsApp com a mensagem no idioma atual */
  wa: string;
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* storage bloqueado */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', OG_LOCALE[lang]);
    // mantém ?lang= coerente apenas se ele já estiver na URL
    try {
      const u = new URL(location.href);
      if (u.searchParams.has('lang') && u.searchParams.get('lang') !== lang) {
        u.searchParams.set('lang', lang);
        history.replaceState(history.state, '', u.pathname + u.search + u.hash);
      }
    } catch { /* ignora */ }
  }, [lang]);

  const value = useMemo<Ctx>(() => ({
    lang, setLang,
    t: (key, vars) => translate(lang, key, vars),
    tl: key => translate(lang, key).split('\n'),
    wa: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(translate(lang, 'wa.text'))}`,
  }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const c = useContext(I18nContext);
  if (!c) throw new Error('useI18n precisa estar dentro de <I18nProvider>');
  return c;
}

export interface ProjectText { cat: string; tags: string[]; lead?: string; paras?: string[]; role?: string[]; caps: string[]; mobileCap?: string }

/** Textos do projeto no idioma atual (cat, tags, lead, paras, role, caps, mobileCap) com fallback para o português de projects.ts. */
export function useProjectText(p?: Project): ProjectText {
  const { lang } = useI18n();
  return useMemo(() => {
    if (!p) return { cat: '', tags: [], caps: [] };
    const c = p.case;
    const tr = projectDicts[lang][p.slug];
    const pick = <T,>(field: keyof ProjectI18n, fallback: T): T => {
      const v = tr?.[field] as T | undefined;
      if (v === undefined || v === null || (Array.isArray(v) && v.length === 0 && !(Array.isArray(fallback) && fallback.length === 0))) {
        if (lang !== 'pt') missingProjects[lang].add(`${p.slug}.${field}`);
        return fallback;
      }
      return v;
    };
    const ptCaps = (c?.desktop || []).map(d => d.cap);
    const caps = tr?.caps && tr.caps.length === ptCaps.length ? tr.caps : ptCaps;
    if (lang !== 'pt' && caps === ptCaps && ptCaps.length) missingProjects[lang].add(`${p.slug}.caps`);
    return {
      cat: pick('cat', p.cat),
      tags: pick('tags', p.tags),
      lead: c ? pick('lead', c.lead) : undefined,
      paras: c ? pick('paras', c.paras) : undefined,
      role: c?.role ? pick('role', c.role) : undefined,
      caps,
      mobileCap: c?.mobile && c.mobile.length ? pick('mobileCap', c.mobileCap) : c?.mobileCap,
    };
  }, [lang, p]);
}
