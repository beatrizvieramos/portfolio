import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, site } from '../data/projects';
import { ProjectCard, FILTERS, groupOf } from '../components/ProjectCard';
import { Band, SecTitle, Spark, asset, type Vars, Arrow } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useI18n, type Key } from '../i18n';

const FEATURED = 7;
type Pose = 'center' | 'left' | 'right' | 'down';

const services: [string, string, Key][] = [
  ['01', 'Product Design & UX', 'svc.1.d'],
  ['02', 'Interface & Visual Design', 'svc.2.d'],
  ['03', 'Design Systems', 'svc.3.d'],
  ['04', 'Front-end', 'svc.4.d'],
];

const Ico = ({ bg, fg, t }: { bg: string; fg: string; t: string }) => <span className="ico" style={{ background: bg, color: fg }}>{t}</span>;
const Tl = ({ f }: { f: string }) => <img src={asset(`img/tools/${f}.svg`)} alt="" loading="lazy" />;
const toolGroups: { name: Key; cls: string; tools: [string, React.ReactNode][] }[] = [
  { name: 'tools.design', cls: '', tools: [['Figma', <Tl f="figma-color" />], ['FigJam', <Ico bg="#0D0D0D" fg="#fff" t="Fj" />], ['Photoshop', <Ico bg="#001E36" fg="#31A8FF" t="Ps" />], ['Illustrator', <Ico bg="#330000" fg="#FF9A00" t="Ai" />]] },
  { name: 'tools.mgmt', cls: 'group--pink', tools: [['Notion', <Tl f="notion" />], ['Trello', <Tl f="trello" />], ['Claude', <Tl f="claude" />], ['ChatGPT', <Tl f="chatgpt" />], ['Codex', <Ico bg="#0D0D0D" fg="#fff" t=">_" />]] },
  { name: 'tools.dev', cls: '', tools: [['HTML5', <Tl f="html5" />], ['CSS3', <Tl f="css" />], ['Sass', <Tl f="sass" />], ['JavaScript', <Tl f="javascript" />], ['Bootstrap', <Tl f="bootstrap" />], ['Ruby on Rails', <Tl f="rubyonrails" />]] },
];

// período/curso: texto fixo ou chave do dicionário (marcada com "@"); empresas, instituições e cidades não são traduzidas
const jobs = [['2024 — @exp.now', 'Alfama Web', 'UI Designer & Front-end', 'Aracaju / SE'], ['2021 — 2024', 'Agência Acerte', 'Front-end & Web Designer', 'Aracaju / SE'], ['2015', 'Alfama Web', 'Front-end & Web Designer', 'Aracaju / SE']];
const studies = [['2011 — 2015', 'UNIT', '@study.design', 'Aracaju / SE'], ['@exp.inProgress', 'EBAC', '@study.ebacPost', '@exp.online'], ['2026', 'EBAC', '@study.ebacUx', '@exp.online'], ['2026', 'Samsung Ocean', '@study.samsung', '@exp.online'], ['2026', 'Clube de UI · DesignBoost', '@study.club', '@exp.online'], ['2026', 'TERA', '@study.tera', '@exp.online'], ['2023', 'Alura', '@study.alura', '@exp.online']];
const ExpRows = ({ rows }: { rows: string[][] }) => {
  const { t } = useI18n();
  const tx = (v: string) => v.replace(/@([\w.]+)/g, (_, k) => t(k as Key));
  return <>{rows.map((r, i) => <div className="exp" key={i}><span>{tx(r[0])}</span><span className="h4">{r[1]}</span><span>{tx(r[2])}</span><span>{tx(r[3])}</span></div>)}</>;
};

/** Letras separadas: cada uma reage ao mouse (onda no nome do hero). */
const Letters = ({ text }: { text: string }) => <>{[...text].map((c, i) => <span className="ch" key={i}>{c}</span>)}</>;

const sp = (left: string, top: string): Vars => ({ left, top });

const canScrub = typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
const DOLL_FRAMES = 64;
const dollSrc = (i: number) => asset(`img/doll-seq/f${String(i).padStart(3, '0')}.jpg`);

function Hero() {
  const { t } = useI18n();
  const [pose, setPose] = useState<Pose>('center');
  const [scrub, setScrub] = useState(canScrub);
  const canvas = useRef<HTMLCanvasElement>(null);
  const target = useRef(0.5);
  const cur = useRef(0.5);

  // boneca: sequência de quadros pré-carregados; a posição do mouse escolhe o quadro (esquerda → direita)
  useEffect(() => {
    const cv = canvas.current;
    if (!scrub || !cv) return;
    const ctx = cv.getContext('2d');
    const imgs: HTMLImageElement[] = [];
    let loaded = 0, last = -1, raf = 0, dead = false;
    const draw = (i: number) => {
      const im = imgs[i];
      if (ctx && im && im.complete && im.naturalWidth) { ctx.drawImage(im, 0, 0, cv.width, cv.height); last = i; }
    };
    for (let i = 0; i < DOLL_FRAMES; i++) {
      const im = new Image();
      im.onload = () => { loaded++; if (i === Math.round((DOLL_FRAMES - 1) / 2) && last < 0) draw(i); };
      im.onerror = () => { if (!dead && loaded === 0 && i === 0) setScrub(false); };
      im.src = dollSrc(i);
      imgs.push(im);
    }
    const tick = () => {
      cur.current += (target.current - cur.current) * 0.22;
      const i = Math.round(cur.current * (DOLL_FRAMES - 1));
      if (i !== last) draw(i);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { dead = true; cancelAnimationFrame(raf); };
  }, [scrub]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
    if (scrub) target.current = Math.min(1, Math.max(0, 0.5 + dx * 1.5));
    else setPose(dy > 0.22 ? 'down' : dx < -0.14 ? 'left' : dx > 0.14 ? 'right' : 'center');
  };
  const onLeave = () => { target.current = 0.5; setPose('center'); };
  return (
    <section className="hero" aria-label={t('hero.aria')} onMouseMove={onMove} onMouseLeave={onLeave}>
      <h1 className="sr">{t('hero.h1')}</h1>
      <div className="name name--outline" aria-hidden="true"><Letters text="BEATRIZ" /></div>
      <div className="hero__arch" aria-hidden="true">
        {scrub
          ? <canvas ref={canvas} width={660} height={900} />
          : (['center', 'left', 'right', 'down'] as Pose[]).map(p => <img key={p} src={asset(`img/avatar/${p}.jpg`)} className={pose === p ? 'on' : ''} alt="" />)}
      </div>
      <div className="name name--solid" aria-hidden="true"><Letters text="VIEIRA" /></div>
      <div className="hero__sticker label"><span>{t('hero.sticker')}</span></div>
      <Spark c="green" s={56} cls="spin hide-md" style={sp('7.5%', '56%')} /><Spark c="pink" s={44} cls="spin-r" style={sp('29%', '15%')} />
      <Spark c="ink" s={28} cls="spin" style={sp('70%', '68%')} /><Spark c="pink" s={40} cls="spin-r" style={sp('74%', '44%')} /><Spark c="green" s={34} cls="spin hide-md" style={sp('20%', '64%')} />
      <div className="hero__todo" aria-hidden="true"><b>{t('hero.todo.title')}</b>{(['hero.todo.1', 'hero.todo.2', 'hero.todo.3', 'hero.todo.4'] as Key[]).map(k => <span key={k}>✓ {t(k)}</span>)}</div>
      <div className="hero__intro">
        <div className="hero__status"><span className="pill-status"><i aria-hidden="true" />{t('hero.status')}</span><p className="now"><span className="label now__chip">{t('hero.now')}</span>{t('hero.nowRole')}</p></div>
        <div className="label">↳  UI Designer · Product Designer · Webdesigner &amp; Front-end</div><p>{t('hero.intro')}</p></div>
      <div className="hero__actions"><a className="btn btn--dark" href="#projetos">{t('hero.projects')} <Arrow d="down" /></a><a className="btn btn--outline" href={asset('curriculo-beatriz.pdf')} download>{t('hero.cv')}</a></div>
    </section>
  );
}

const STEPS = [1, 2, 3, 4] as const;
const mq = (q: string) => typeof matchMedia !== 'undefined' && matchMedia(q).matches;

/** "Como eu trabalho": grade de 4 colunas no desktop; no mobile vira carrossel com avanço automático (pausa ao interagir/sair da tela; desligado com reduced-motion). */
function Process() {
  const { t } = useI18n();
  const track = useRef<HTMLUListElement>(null);
  const [idx, setIdx] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [busy, setBusy] = useState(false);
  const [seen, setSeen] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [mobile, setMobile] = useState(() => mq('(max-width: 760px)'));
  const [reduced, setReduced] = useState(() => mq('(prefers-reduced-motion: reduce)'));
  const idxRef = useRef(0);
  const releaseT = useRef(0);
  idxRef.current = idx;

  useEffect(() => {
    const m1 = matchMedia('(max-width: 760px)'), m2 = matchMedia('(prefers-reduced-motion: reduce)');
    const f1 = () => setMobile(m1.matches), f2 = () => setReduced(m2.matches), vis = () => setTabHidden(document.hidden);
    m1.addEventListener('change', f1); m2.addEventListener('change', f2); document.addEventListener('visibilitychange', vis);
    return () => { m1.removeEventListener('change', f1); m2.removeEventListener('change', f2); document.removeEventListener('visibilitychange', vis); };
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const n = STEPS.length, k = (i + n) % n;
    const card = el.children[k] as HTMLElement | undefined;
    if (!card) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    el.scrollTo({ left: card.offsetLeft - pad, behavior: mq('(prefers-reduced-motion: reduce)') ? 'auto' : 'smooth' });
    setIdx(k);
  }, []);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    let best = 0, d = Infinity;
    [...el.children].forEach((c, i) => { const x = Math.abs((c as HTMLElement).offsetLeft - pad - el.scrollLeft); if (x < d) { d = x; best = i; } });
    if (best !== idxRef.current) setIdx(best);
  };

  const playing = mobile && !reduced && !userPaused && !busy && seen && !tabHidden;
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => goTo(idxRef.current + 1), 4000);
    return () => clearInterval(id);
  }, [playing, goTo]);

  const hold = () => { clearTimeout(releaseT.current); setBusy(true); };
  const release = (delay = 0) => { clearTimeout(releaseT.current); releaseT.current = window.setTimeout(() => setBusy(false), delay); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(idx + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(idx - 1); }
  };

  return (
    <section className="section" id="processo"><div className="wrap">
      <SecTitle ghost={t('home.ghost.process')} title={t('home.process')} />
      <p className="process__lead">{t('process.lead')}</p>
      <div className="process reveal" onMouseEnter={hold} onMouseLeave={() => release()} onFocus={hold} onBlur={() => release()}
        onTouchStart={hold} onTouchEnd={() => release(2500)} onTouchCancel={() => release(2500)}>
        <ul className="process__track" ref={track} tabIndex={0} aria-label={t('process.aria')} aria-roledescription="carousel" onScroll={onScroll} onKeyDown={onKey}>
          {STEPS.map(n => (
            <li className={`pcard pcard--${n}`} key={n}>
              <span className="pcard__n">{`0${n}`}</span>
              <div><h3 className="pcard__t">{t(`process.${n}.t` as Key)}</h3><p className="pcard__d">{t(`process.${n}.d` as Key)}</p></div>
            </li>
          ))}
        </ul>
        <div className="process__ctrl">
          <div className="process__dots">{STEPS.map((n, i) => <button key={n} type="button" className="pdot" aria-label={t('process.dot', { n })} aria-current={idx === i ? 'true' : undefined} onClick={() => goTo(i)} />)}</div>
          {!reduced && <button type="button" className="pplay" aria-pressed={userPaused} aria-label={t(userPaused ? 'process.play' : 'process.pause')} onClick={() => setUserPaused(v => !v)}>{userPaused ? '▶' : '❚❚'}</button>}
        </div>
      </div>
    </div></section>
  );
}

export default function Home() {
  const { t } = useI18n();
  useDocumentTitle(t('home.title'), t('home.desc'));
  const [filter, setFilter] = useState<string>('all');
  // 'Todos' mostra os destaques; os outros filtros procuram em todos os projetos (os primeiros 7 não têm Ferramentas nem a maioria dos Produtos)
  const featured = filter === 'all' ? projects.slice(0, FEATURED) : projects.filter(p => groupOf(p) === filter);

  return (
    <main>
      <Hero />
      <Band />

      <section className="section" id="projetos"><div className="wrap">
        <SecTitle ghost={t('home.ghost.portfolio')} title={t('home.portfolio')} />
        <div className="filters">
          <div className="tabs" role="group" aria-label={t('filter.aria')}>
            {FILTERS.map(([k, label]) => <button key={k} className="tab" aria-pressed={filter === k} onClick={() => setFilter(k)}>{t(label)}</button>)}
          </div>
          <Link className="btn btn--outline only-desktop" to="/projetos">{t('common.viewAll')} <Arrow d="ne" /></Link>
        </div>
        <div className="grid">
          {featured.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}
          {filter === 'all' && (
            <div className="tile-cta card card--ready"><span className="label">{t('tile.label')}</span><div><h3 className="h2">{t('tile.title')}</h3>
              <div className="btns" style={{ marginTop: 28 }}>
                <a className="btn btn--dark" href={site.behance} target="_blank" rel="noopener">Behance <Arrow d="ne" /></a>
                <a className="btn btn--outline" href={site.linkedin} target="_blank" rel="noopener">LinkedIn <Arrow d="ne" /></a></div></div></div>
          )}
        </div>
        <div className="more only-mobile"><Link className="btn btn--outline" to="/projetos">{t('common.viewAll')} <Arrow d="ne" /></Link></div>
      </div></section>

      <section className="section" id="servicos"><div className="wrap">
        <SecTitle ghost={t('home.ghost.services')} title={t('home.services')} />
        <div>{services.map(s => <div className="svc" key={s[0]}><span className="svc__n label">{s[0]}</span><span className="svc__name h2">{s[1]}</span><span className="svc__d">{t(s[2])}</span><span className="svc__arrow">↗</span></div>)}</div>
      </div></section>

      <Process />

      <Band rev />

      <section className="section" id="ferramentas"><div className="wrap">
        <SecTitle ghost={t('home.ghost.tools')} title={t('home.tools')} />
        <div className="groups">{toolGroups.map(g => (
          <div className={`group ${g.cls}`} key={g.name}><span className="label">{t(g.name)}</span>
            <div className="tools">{g.tools.map(([n, icon]) => <div className="tool" key={n}>{icon}<span>{n}</span></div>)}</div></div>
        ))}</div>
      </div></section>

      <section className="section" id="sobre"><div className="wrap">
        <SecTitle ghost={t('home.ghost.about')} title={t('home.about')} />
        <div className="bento">
          <div className="b b--statement reveal"><p className="h3">{t('bento.statement1')}</p><p>{t('bento.statement2')}</p></div>
          <div className="b b--photo reveal" role="img" aria-label={t('bento.photoAlt')} style={{ backgroundImage: `url(${asset('img/me/foto.jpg')})` }} />
          <div className="b b--stat reveal" style={{ background: 'var(--pink)' }}><span className="h2">2015</span><p>{t('bento.stat1')}</p></div>
          <div className="b b--stat reveal" style={{ background: 'var(--green-fill)', color: '#fff' }}><span className="h2">{t('bento.stat2.t')}</span><p>{t('bento.stat2')}</p></div>
          <div className="b b--stat reveal" style={{ background: 'var(--mist)' }}><span className="h2">IA</span><p>{t('bento.stat3')}</p></div>
          <div className="b b--list reveal"><span className="label">{t('bento.do.label')}</span><p>{t('bento.do.list')}</p></div>
          <div className="b b--list b--list--pink reveal"><span className="label">{t('bento.brands.label')}</span><p>{'Stanza\nEntre Rios\nAlphaville\nGSP Loteamentos\nRede Primavera\nCoesi'}</p></div>
        </div>
        <div className="more"><Link className="btn btn--dark" to="/sobre">{t('bento.more')} <Arrow d="ne" /></Link></div>
      </div></section>

      <div className="dark-card" id="experiencia"><div className="wrap" style={{ padding: 0 }}>
        <SecTitle ghost={t('home.ghost.exp')} title={t('home.exp')} />
        <div className="exp-head label"><span>{t('exp.period')}</span><span>{t('exp.company')}</span><span>{t('exp.role')}</span><span>{t('exp.place')}</span></div><ExpRows rows={jobs} />
        <div className="exp-gap" />
        <div className="sec-head" style={{ marginBottom: 24 }}><div className="h3"><span>/</span>{t('exp.studiesTitle')}</div></div>
        <div className="exp-head label"><span>{t('exp.year')}</span><span>{t('exp.institution')}</span><span>{t('exp.course')}</span><span>{t('exp.place')}</span></div><ExpRows rows={studies} />
      </div></div>

      <section className="cta" id="contato"><div className="wrap">
        <span className="label g">{t('cta.kicker')}</span>
        <h2 className="big">{t('cta.t1')}<span className="g">{t('cta.t2')}</span></h2>
        <div className="btns">
          <a className="btn btn--dark" href={`mailto:${site.email}`}>{t('cta.email')} <Arrow d="ne" /></a>
          <a className="btn btn--outline" href={site.linkedin} target="_blank" rel="noopener">LinkedIn <Arrow d="ne" /></a>
          <a className="btn btn--outline" href={site.behance} target="_blank" rel="noopener">Behance <Arrow d="ne" /></a>
          <a className="btn btn--pink" href={site.whatsapp} target="_blank" rel="noopener">WhatsApp <Arrow d="ne" /></a></div>
        <div className="info3">
          <div><span className="label">{t('common.email')}</span><a className="h4" href={`mailto:${site.email}`}>{site.email}</a></div>
          <div><span className="label">{t('cta.phone')}</span><a className="h4" href={site.whatsapp} target="_blank" rel="noopener">{site.phone}</a></div>
          <div><span className="label">{t('cta.studio')}</span><span className="h4">{t('cta.place')}<br />{t('cta.remote')}</span></div></div>
      </div></section>
    </main>
  );
}
