import { useEffect } from 'react';

const ORIGIN = 'https://biatrizportfolio.com.br';

/** Título e meta description da página (já traduzidos pelo chamador); og:title/og:description acompanham. */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    }
    // canonical e og:url acompanham a página atual
    const url = ORIGIN + (location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, ''));
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
  }, [title, description]);
}
