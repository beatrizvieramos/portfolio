import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { useInView } from '../hooks/useInView';
import { Scene, Arrow } from './ui';
import { useI18n, useProjectText, type Key } from '../i18n';

// Cada projeto cai em UM grupo: estudos pessoais só aparecem em "Todos" e "Case de Estudo" (nunca em Sites/Produtos/Ferramentas), inclusive os novos.
export const groupOf = (p: Project) => (p.study ? 'estudos' : p.cat === 'Produto' ? 'produtos' : p.cat === 'Ferramenta' ? 'ferramentas' : 'sites');
export const FILTERS: readonly (readonly [string, Key])[] = [['all', 'filter.all'], ['sites', 'filter.sites'], ['produtos', 'filter.products'], ['ferramentas', 'filter.tools'], ['estudos', 'filter.studies']];
export const hasPage = (p: Project) => !p.live && !!p.case;

type Phase = 'idle' | 'loading' | 'ready';

/** Card com animação de carregamento ao rolar: esqueleto (shimmer) → conteúdo. */
export function ProjectCard({ p, index = 0 }: { p: Project; index?: number }) {
  const [ref, seen] = useInView<HTMLAnchorElement>(0.12);
  const [phase, setPhase] = useState<Phase>('idle');
  const { t } = useI18n();
  const txt = useProjectText(p);

  useEffect(() => {
    if (!seen) return;
    setPhase('loading');
    const t = window.setTimeout(() => setPhase('ready'), 650 + (index % 2) * 140);
    return () => clearTimeout(t);
  }, [seen, index]);

  const inner = (
    <>
      <div className="scene-wrap" style={{ position: 'relative' }}>
        <Scene p={p} /><span className="badge">{txt.cat}</span><span className="linkpill">{t('common.link')} <Arrow d="ne" /></span>
      </div>
      <div className="card__info"><span className="card__title">{p.title}</span></div>
      <div className="chips">{txt.tags.map(g => <span className="chip" key={g}>{g}</span>)}</div>
      <span className="skel" aria-hidden="true"><i className="skel__img" /><i className="skel__bar" /><i className="skel__bar skel__bar--s" /></span>
    </>
  );
  const cls = `card card--${phase}`;
  const label = `${p.title}: ${p.live ? t('common.openSite') : t('common.viewProject')}`;
  return p.live
    ? <a ref={ref} className={cls} href={p.live} target="_blank" rel="noopener" aria-label={label}>{inner}</a>
    : <Link ref={ref} className={cls} to={`/projetos/${p.slug}`} aria-label={label}>{inner}</Link>;
}
