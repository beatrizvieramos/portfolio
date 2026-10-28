import type { CSSProperties, ReactNode } from 'react';
import type { Project } from '../data/projects';

export type Vars = CSSProperties & { [k: `--${string}`]: string | number };

const COLORS: Record<string, string> = { pink: '#FFB9DA', green: '#2B6349', ink: '#0A0909', paper: '#FFFFFF' };
const STAR_PATH = 'M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z';

export const asset = (p: string) => `/assets/${p}`;

export function Spark({ c, s = 28, cls = '', style }: { c: string; s?: number; cls?: string; style?: Vars }) {
  const st: Vars = { '--s': `${s}px`, ...style };
  return (
    <i className={`spark ${cls}`} style={st}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={STAR_PATH} fill={COLORS[c] || c} /></svg>
    </i>
  );
}

export function GradStar({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFB9DA" /><stop offset="1" stopColor="#2B6349" /></linearGradient></defs>
      <path d={STAR_PATH} fill={`url(#${id})`} />
    </svg>
  );
}

export const SecTitle = ({ ghost, title }: { ghost: string; title: ReactNode }) => (
  <div className="sec-title"><span className="ghost" aria-hidden="true">{ghost}</span><h2 className="h2"><span>/</span>{title}</h2></div>
);

export const SecHead = ({ label }: { label: ReactNode }) => (
  <div className="sec-head"><div className="h3"><span>/</span>{label}</div></div>
);

export function Scene({ p }: { p: Project }) {
  const win = (cls: string, f: string) => <span className={`win ${cls}`}><img src={asset(`img/mock/${f}.jpg`)} alt="" loading="lazy" /></span>;
  const st: Vars = { '--bg': p.bg };
  return (
    <div className={`scene${p.dark ? ' scene--dark' : ''}`} style={st}>
      <div className="scene__inner">{p.scene.b ? <>{win('win--a', p.scene.a)}{win('win--b', p.scene.b)}</> : win('win--solo', p.scene.a)}</div>
    </div>
  );
}

const WORDS = ['Product Design', 'Front-end', 'Webdesigner', 'Design Systems', 'IA aplicada ao Design'];
export function Band({ rev }: { rev?: boolean }) {
  return (
    <div className={`band${rev ? ' band--rev' : ''}`} aria-hidden="true">
      <div className="band__track">
        {[0, 1, 2, 3].map(i => WORDS.map(t => <span key={`${i}${t}`} style={{ display: 'contents' }}><span>{t}</span><Spark c="pink" s={28} /></span>))}
      </div>
    </div>
  );
}

export const Ext = (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a target="_blank" rel="noopener" {...p} />;

const ARROWS = {
  ne: 'M1.6 8.4 8.4 1.6M3.2 1.6H8.4V6.8',
  right: 'M1 5H9M5.6 1.6 9 5 5.6 8.4',
  left: 'M9 5H1M4.4 1.6 1 5 4.4 8.4',
  down: 'M5 1V9M1.6 5.6 5 9 8.4 5.6',
  up: 'M5 9V1M1.6 4.4 5 1 8.4 4.4',
} as const;

/** Seta em SVG (mesmo desenho fino do layout), no tamanho do texto. */
export function Arrow({ d = 'ne' }: { d?: keyof typeof ARROWS }) {
  return (
    <svg className="arrow" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d={ARROWS[d]} /></svg>
  );
}
