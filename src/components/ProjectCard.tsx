import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { useInView } from '../hooks/useInView';
import { Scene, Arrow } from './ui';

export const groupOf = (p: Project) => (p.cat === 'Produto' ? 'produtos' : p.cat === 'Ferramenta' ? 'ferramentas' : 'sites');
export const hasPage = (p: Project) => !p.live && !!p.case;

type Phase = 'idle' | 'loading' | 'ready';

/** Card com animação de carregamento ao rolar: esqueleto (shimmer) → conteúdo. */
export function ProjectCard({ p, index = 0 }: { p: Project; index?: number }) {
  const [ref, seen] = useInView<HTMLAnchorElement>(0.12);
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    if (!seen) return;
    setPhase('loading');
    const t = window.setTimeout(() => setPhase('ready'), 650 + (index % 2) * 140);
    return () => clearTimeout(t);
  }, [seen, index]);

  const inner = (
    <>
      <div className="scene-wrap" style={{ position: 'relative' }}>
        <Scene p={p} /><span className="badge">{p.cat}</span><span className="linkpill">Link <Arrow d="ne" /></span>
      </div>
      <div className="card__info"><span className="card__title">{p.title}</span></div>
      <div className="chips">{p.tags.map(t => <span className="chip" key={t}>{t}</span>)}</div>
      <span className="skel" aria-hidden="true"><i className="skel__img" /><i className="skel__bar" /><i className="skel__bar skel__bar--s" /></span>
    </>
  );
  const cls = `card card--${phase}`;
  const label = `${p.title} — ${p.live ? 'abrir site' : 'ver projeto'}`;
  return p.live
    ? <a ref={ref} className={cls} href={p.live} target="_blank" rel="noopener" aria-label={label}>{inner}</a>
    : <Link ref={ref} className={cls} to={`/projetos/${p.slug}`} aria-label={label}>{inner}</Link>;
}
