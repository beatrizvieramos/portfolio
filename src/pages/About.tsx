import type { ReactNode } from 'react';
import { site } from '../data/projects';
import { SecHead, Spark, Arrow, asset, type Vars } from '../components/ui';
import { TypeWriter } from '../components/TypeWriter';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useI18n, type Key } from '../i18n';

const Chips = ({ items, ink }: { items: string[]; ink?: boolean }) => <div className="chips">{items.map(c => <span className={`chip${ink ? ' chip--ink' : ''}`} key={c}>{c}</span>)}</div>;
const Card = ({ cls = '', kicker, title, body, style }: { cls?: string; kicker?: string; title: ReactNode; body?: string; style?: React.CSSProperties }) => (
  <div className={`acard ${cls}`} style={style}>{kicker && <span className="label">{kicker}</span>}<h3 className="h4">{title}</h3>{body && <p>{body}</p>}</div>
);
const Focus = ({ cls, n, title, body, chips, star }: { cls: string; n: number; title: string; body: string; chips: string[]; star: string }) => (
  <div className={`focus focus--${cls}${n < 3 ? ' focus--big' : ''} reveal`}>
    <div className="top"><span className="num">{n < 10 ? `0${n}` : n}</span><Spark c={star} s={n < 3 ? 56 : 40} cls="blink" style={{ '--i': n } as Vars} /></div>
    <div><div className="title">{title}</div><p style={{ marginTop: 14 }}>{body}</p></div>
    <Chips items={chips} />
  </div>
);

const interestColors = ['pink', 'mist', 'mist', 'ink', 'mist', 'mist', 'mist', 'green', 'pink-soft'];
const sticker = (left: number, top: number, bg: string, rot: number, delay: string, color?: string): React.CSSProperties => ({ left, top, background: bg, color, rotate: `${rot}deg`, animationDelay: delay });
const pos = (left: number, top: number): Vars => ({ left, top });

export default function About() {
  const { t, tl } = useI18n();
  useDocumentTitle(t('about.metaTitle'), t('about.desc'));
  return (
    <main>
      <section className="about-hero">
        <div><span className="label g">{t('about.kicker')}</span><h1 className="h1">{t('about.h1a')}<span className="g">{t('about.h1b')}</span></h1>
          <p className="intro">{t('about.intro')}</p>
          <div className="facts">
            <span className="fact" style={{ background: 'var(--green)', color: '#fff' }}>Aracaju · SE</span><span className="fact" style={{ background: 'var(--ink)', color: '#fff' }}>Product Designer</span>
            <span className="fact" style={{ background: 'var(--pink)' }}>Webdesigner</span><span className="fact" style={{ background: 'var(--mist)' }}>Front-end</span><span className="fact" style={{ background: 'var(--mist)' }}>{t('about.fact.ai')}</span></div></div>
        <div className="collage" aria-hidden="true">
          <div className="blob" />
          <div className="polaroid"><img src={asset('img/me/foto.jpg')} alt="" /><b>biatriz ✦</b></div>
          <div className="arch2"><img src={asset('img/avatar/center.jpg')} alt="" /></div>
          <span className="sticker" style={sticker(400, 70, 'var(--green)', 6, '.9s,1s', '#fff')}>Aracaju, SE</span>
          <span className="sticker" style={sticker(30, 640, 'var(--ink)', -5, '1.1s,1s', '#fff')}>Product Designer ✦</span>
          <span className="sticker" style={sticker(420, 660, 'var(--pink)', 4, '1.3s,1s')}>{t('about.sticker.since')}</span>
          <Spark c="pink" s={64} cls="spin" style={pos(300, 30)} /><Spark c="green" s={44} cls="spin-r" style={pos(590, 360)} /><Spark c="ink" s={28} cls="spin" style={pos(60, 10)} /><Spark c="pink" s={40} cls="spin-r" style={pos(10, 420)} />
        </div>
      </section>

      <div className="about-body">
        <section><SecHead label={t('about.story')} /><div className="cards cards--4 reveal">
          <Card kicker="2011 — 2015" title={t('about.story.1.t')} body={t('about.story.1.d')} />
          <Card cls="acard--pink" kicker="2015" title={t('about.story.2.t')} body={t('about.story.2.d')} />
          <Card kicker={t('about.story.3.k')} title={t('about.story.3.t')} body={t('about.story.3.d')} />
          <Card cls="acard--pink" kicker={t('about.story.4.k')} title="UI Designer & Front-end" body={t('about.story.4.d')} />
        </div></section>

        <section><SecHead label={t('about.focus')} /><div className="cards cards--2" style={{ marginBottom: 16 }}>
          <Focus cls="ink" n={1} title="Product Design & UX" body={t('about.focus.1.d')} chips={tl('about.focus.1.chips')} star="pink" />
          <Focus cls="pink" n={2} title="Interface & Visual Design" body={t('about.focus.2.d')} chips={tl('about.focus.2.chips')} star="ink" />
        </div><div className="cards cards--3">
          <Focus cls="mist" n={3} title="Design Systems" body={t('about.focus.3.d')} chips={tl('about.focus.3.chips')} star="green" />
          <Focus cls="green" n={4} title="Front-end" body={t('about.focus.4.d')} chips={tl('about.focus.4.chips')} star="pink" />
          <Focus cls="soft" n={5} title={t('about.focus.5.t')} body={t('about.focus.5.d')} chips={tl('about.focus.5.chips')} star="ink" />
        </div></section>

        <section><SecHead label={t('about.interests')} /><div className="interests reveal">
          {tl('about.interests.list').map((x, i) => { const c = interestColors[i]; return <span className="interest" key={x} style={{ '--n': i, background: `var(--${c})`, color: c === 'ink' || c === 'green' ? '#fff' : undefined } as Vars}>{x}</span>; })}
        </div></section>

        <section><SecHead label={t('about.how')} /><div className="skills reveal">
          {tl('about.how.list').map((x, i) => <div className="skill" key={x}><Spark c="green" s={26} cls="blink" style={{ '--i': i } as Vars} /><span>{x}</span></div>)}
        </div></section>

        <section><SecHead label={t('about.edu')} /><div className="cards cards--3 reveal">
          <Card kicker={t('about.edu.grad.k')} title={t('about.edu.grad.t')} body={t('about.edu.grad.d')} />
          <Card cls="acard--pink" kicker={t('about.edu.post.k')} title={t('about.edu.post.t')} body={t('about.edu.post.d')} />
          <Card kicker={t('about.edu.lang.k')} title={t('about.edu.lang.t')} body={t('about.edu.lang.d')} />
        </div><div className="cards cards--3 reveal" style={{ marginTop: 16 }}>
          <Card cls="acard--white" kicker={t('about.cert.1.k')} title={t('about.cert.1.t')} body={t('about.cert.1.d')} />
          <Card cls="acard--white" kicker={t('about.cert.2.k')} title={t('about.cert.2.t')} body={t('about.cert.2.d')} />
          <Card cls="acard--white" kicker={t('about.cert.3.k')} title={t('about.cert.3.t')} body={t('about.cert.3.d')} />
        </div></section>

        <section><SecHead label={t('about.brand')} /><div className="brandrow">
          <div className="stack">
            <p className="h4">{t('about.brand.lead')}</p>
            <p className="lead muted">{t('about.brand.text')}</p>
            <div><span className="label muted">{t('about.brand.fields')}</span><div style={{ marginTop: 12 }}><Chips items={tl('about.brand.fields.list')} /></div></div>
            <div><span className="label muted">{t('about.brand.tools')}</span><div style={{ marginTop: 12 }}><Chips items={['Illustrator', 'Photoshop', 'InDesign']} /></div></div>
            <div><span className="label muted">{t('about.brand.palette')}</span><div className="swatches" style={{ marginTop: 12 }}>
              {([['#296246', 'about.brand.green'], ['#FFBBD9', 'about.brand.pink'], ['#FAEFEC', 'about.brand.cream']] as [string, Key][]).map(([hex, n]) => <div className="swatch" key={hex}><i style={{ background: hex }} /><span className="label">{t(n)} · {hex}</span></div>)}</div></div>
            <div><a className="btn btn--dark" href={site.behanceBrand} target="_blank" rel="noopener">{t('about.brand.btn')} <Arrow d="ne" /></a></div>
          </div>
          <div className="brandimgs reveal"><img src={asset('img/brand/logo-verde.jpg')} alt={t('about.brand.alt1')} loading="lazy" /><img src={asset('img/brand/logo-rosa.jpg')} alt={t('about.brand.alt2')} loading="lazy" /><img className="wide" src={asset('img/brand/padrao.jpg')} alt={t('about.brand.alt3')} loading="lazy" /></div>
        </div></section>

        <section><SecHead label={t('about.profile')} /><div className="words reveal">
          {(() => { const w = tl('about.profile.words'); return <><b>{w[0]}</b><Spark c="pink" s={48} cls="spin" /><b className="o">{w[1]}</b><Spark c="green" s={48} cls="spin-r" /><b className="g">{w[2]}</b><Spark c="ink" s={48} cls="spin" /><b className="o">{w[3]}</b><Spark c="pink" s={48} cls="spin-r" /></>; })()}
        </div></section>

        <section className="fora"><SecHead label={t('about.out')} /><div className="cards cards--3">
          <div className="acard acard--pink fall"><span className="label">{t('about.out.1.k')}</span><h3 className="h3">{t('about.out.1.t')}</h3><Chips ink items={tl('about.out.1.chips')} /></div>
          <div className="acard fall"><span className="label">{t('about.out.2.k')}</span><h3 className="h3">{t('about.out.2.t')}</h3><Chips ink items={tl('about.out.2.chips')} /></div>
          <div className="acard fall" style={{ background: 'var(--pink)' }}><span className="label">{t('about.out.3.k')}</span><h3 className="h3">{t('about.out.3.t')}</h3><Chips ink items={tl('about.out.3.chips')} /></div>
        </div></section>

        <section className="about-cta"><TypeWriter text={t('about.type')} hi={t('about.typeHi')} />
          <div className="btns">
            <a className="btn btn--pink" href={site.whatsapp} target="_blank" rel="noopener">WhatsApp <Arrow d="ne" /></a>
            <a className="btn btn--light" href={site.linkedin} target="_blank" rel="noopener">LinkedIn <Arrow d="ne" /></a>
            <a className="btn btn--light" href={site.behance} target="_blank" rel="noopener">Behance <Arrow d="ne" /></a>
            <a className="btn btn--light" href={`mailto:${site.email}`}>{t('common.email')} <Arrow d="ne" /></a></div></section>
      </div>
    </main>
  );
}
