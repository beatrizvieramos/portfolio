import { useCallback, useEffect, useRef, useState } from 'react';
import { Spark, asset, type Vars } from './ui';
import { useI18n, type Key } from '../i18n';

type FolderDef = { n: number; fill: string; line: string; x: number; y: number; r: number; star: string; delay: number };
// posições em % do palco (layout "Fora Stage" do Figma); fill usa os tokens do site
const FOLDERS: FolderDef[] = [
  { n: 1, fill: 'var(--dsurf)', line: 'rgba(255,255,255,.5)', x: 6, y: 8, r: 4, star: 'pink', delay: 0 },
  { n: 2, fill: 'var(--pink)', line: 'rgba(255,255,255,.85)', x: 16, y: 38, r: -4, star: 'ink', delay: 1.3 },
  { n: 7, fill: 'var(--green-fill)', line: 'rgba(255,255,255,.7)', x: 6, y: 68, r: 4, star: 'pink', delay: 2.4 },
  { n: 3, fill: 'var(--pink)', line: 'rgba(255,255,255,.85)', x: 77, y: 6, r: -4, star: 'ink', delay: .7 },
  { n: 4, fill: 'var(--dsurf)', line: 'rgba(255,255,255,.5)', x: 87, y: 28, r: 4, star: 'pink', delay: 1.9 },
  { n: 5, fill: 'var(--mist)', line: 'rgba(120,120,120,.7)', x: 77, y: 52, r: -4, star: 'green', delay: 3 },
  { n: 6, fill: 'var(--green-fill)', line: 'rgba(255,255,255,.7)', x: 87, y: 74, r: 4, star: 'pink', delay: 1.1 },
];

const FolderSvg = ({ fill, line }: { fill: string; line: string }) => (
  <svg viewBox="0 0 140 112" aria-hidden="true">
    <path d="M6 18a8 8 0 0 1 8-8h34a8 8 0 0 1 8 8v6H6z" fill={fill} stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
    <rect x="3" y="20" width="134" height="88" rx="12" fill={fill} stroke="var(--ink)" strokeWidth="2" />
    <rect x="22" y="38" width="44" height="6" rx="3" fill={line} />
    <rect x="22" y="52" width="22" height="6" rx="3" fill={line} opacity=".7" />
  </svg>
);

const DECOR: [string, number, number, number, string][] = [
  ['pink', 30, 47, 4, 'spin'], ['green', 26, 52, 91, 'blink'], ['ink', 18, 29, 12, 'spin-r'], ['pink', 22, 30, 84, 'blink'],
  ['pink', 24, 68, 15, 'blink'], ['green', 26, 66, 83, 'spin'], ['ink', 18, 2.5, 46, 'spin'], ['pink', 22, 95.5, 50, 'spin-r'], ['ink', 16, 96, 9, 'blink'],
];

export function FolderStage() {
  const { t, tl } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const backRef = useRef<HTMLButtonElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const lastBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const on = () => setMobile(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => lastBtn.current?.focus());
  }, []);

  useEffect(() => {
    if (open === null) return;
    backRef.current?.focus({ preventScroll: true });
    if (window.innerWidth <= 1100 && !mobile) winRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab' && mobile && winRef.current) {
        const f = [...winRef.current.querySelectorAll<HTMLElement>('button')];
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    const lock = mobile;
    const prev = document.body.style.overflow;
    if (lock) document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); if (lock) document.body.style.overflow = prev; };
  }, [open, mobile, close]);

  const name = (n: number) => t(`about.out.f${n}.name` as Key);
  const files = (n: number) => tl(`about.out.f${n}.files` as Key).map(l => { const i = l.indexOf('|'); return [l.slice(0, i), l.slice(i + 1)]; });
  const countText = (c: number) => (c === 1 ? t('about.out.count1') : t('about.out.count', { n: c }));
  const total = FOLDERS.length;
  const sheet = mobile && open !== null;

  return (
    <div className="fstage" data-open={open !== null ? '' : undefined} role="group" aria-label={t('about.out.stage')} onClick={e => { if (sheet && e.target === e.currentTarget) close(); }}>
      {DECOR.map(([c, s, x, y, cls], i) => <Spark key={i} c={c} s={s} cls={`fdecor ${cls}`} style={{ left: `${x}%`, top: `${y}%`, '--i': i } as Vars} />)}
      <ul className="flist">
        {FOLDERS.map(f => {
          const c = files(f.n).length; const active = open === f.n;
          return (
            <li key={f.n} className={`fol${active ? ' is-active' : ''}`} style={{ '--x': `${f.x}%`, '--y': `${f.y}%`, '--r': `${f.r}deg`, '--fd': `${f.delay}s` } as Vars}>
              <button type="button" className="fol__btn" aria-expanded={active} aria-controls="fora-win"
                aria-label={t('about.out.open', { name: name(f.n), count: countText(c) })}
                onClick={e => { lastBtn.current = e.currentTarget; setOpen(active ? null : f.n); }}>
                <span className="fol__art"><FolderSvg fill={f.fill} line={f.line} /><Spark c={f.star} s={26} cls="fol__star" /></span>
                <span className="fol__tag" aria-hidden="true">{name(f.n)}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={`fwin${open !== null ? ' is-open' : ''}`} id="fora-win" ref={winRef} role={sheet ? 'dialog' : 'region'} aria-modal={sheet ? true : undefined} aria-label={open !== null ? name(open) : t('about.out.hint')}>
        <div className="fwin__bar"><i style={{ background: 'var(--pink)' }} /><i style={{ background: 'var(--green-fill)' }} /><i style={{ background: 'var(--ink)' }} /><span>{open !== null ? `beatriz/${name(open)}` : 'beatriz/'}</span></div>
        {open === null ? (
          <div className="fwin__home" key="home">
            <span className="fwin__avawrap"><span className="fwin__ava"><img src={asset('img/avatar/center.jpg')} alt="" /></span><Spark c="pink" s={22} cls="fwin__glow blink" /></span>
            <h3 className="fwin__t">{t('about.out.hint')} <Spark c="ink" s={26} cls="spin" /></h3>
            <p>{t('about.out.desc', { n: total })}</p>
          </div>
        ) : (
          <div className="fwin__open" key={open}>
            <div className="fwin__top">
              <button type="button" className="fwin__back" ref={backRef} onClick={close}>{t('about.out.back')}</button>
              <span className="fwin__count">{countText(files(open).length)}</span>
              <button type="button" className="fwin__x" onClick={close} aria-label={t('about.out.close')}>✕</button>
            </div>
            <h3 className="fwin__t fwin__t--l"><Spark c="pink" s={26} cls="blink" />{name(open)}/</h3>
            <ul className="ffiles">
              {files(open).map(([fn, tx], i) => (
                <li key={fn} style={{ '--n': i } as Vars}>
                  <svg viewBox="0 0 28 32" aria-hidden="true"><rect x="2" y="2" width="24" height="28" rx="6" fill="none" stroke="var(--ink)" strokeWidth="2" /><path d="M8 12h12M8 19h12" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" /></svg>
                  <span><b>{fn}</b><em>{tx}</em></span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
