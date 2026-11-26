import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { hasPage } from '../components/ProjectCard';
import { useI18n, useProjectText } from '../i18n';
import { Scene, asset, Arrow } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import NotFound from './NotFound';

const navList = projects.filter(p => hasPage(p) || p.live);
const Dots = () => <><i style={{ background: '#FF5F57' }} /><i style={{ background: '#FEBC2E' }} /><i style={{ background: '#28C840' }} /></>;
const ChipsBlock = ({ label, arr }: { label: string; arr?: string[] }) => arr && arr.length ? <div className="grp"><span className="label">{label}</span><div className="chips">{arr.map(x => <span className="chip" key={x}>{x}</span>)}</div></div> : null;

export default function ProjectPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const p = projects.find(x => x.slug === slug && hasPage(x));
  const txt = useProjectText(p);
  useDocumentTitle(p ? `${p.title} | Beatriz Vieira Ramos` : t('case.notFound'), txt.lead);
  if (!p || !p.case) return <NotFound />;
  const c = p.case;
  const img = (f: string) => asset(`img/cases/${p.slug}/${f}.jpg`);
  const next = navList[(navList.indexOf(p) + 1) % navList.length];

  return (
    <main>
      <section className="case-hero"><span className="label">{t('case.project')} · {txt.cat}</span><h1 className="h1">{p.title}</h1></section>
      <section className="case-meta"><div><span className="label">{t('case.category')}</span><span className="h4">{txt.cat}</span></div><div><span className="label">{t('case.services')}</span><span className="h4">{txt.tags.join(' · ')}</span></div></section>
      <section className="case-scene">
        {c.video
          ? <div className="case-video"><video src={asset(c.video.src)} poster={asset(c.video.poster)} autoPlay muted loop playsInline preload="metadata" aria-label={t('case.videoAria', { title: p.title })} /></div>
          : <Scene p={p} />}
      </section>
      <section className="case-overview"><div><div className="h3"><span className="g">/</span>{t('case.overview')}</div>
          {(c.site || c.behance) && <div className="case-links">
            {c.site && <a className="btn btn--pink case-site" href={c.site} target="_blank" rel="noopener">{t('case.site')} <Arrow d="ne" /></a>}
            {c.behance && <a className="btn btn--dark case-behance" href={c.behance} target="_blank" rel="noopener">{t('case.behance')} <Arrow d="ne" /></a>}
          </div>}</div>
        <div className="body"><p className="h4">{txt.lead}</p>{(txt.paras || []).map(x => <p key={x}>{x}</p>)}<ChipsBlock label={t('case.role')} arr={txt.role} /><ChipsBlock label={t('case.tools')} arr={c.tools} /></div></section>
      <section className="shots"><div className="sec-head" style={{ marginBottom: 0 }}><div className="h3"><span>/</span>{t('case.screens')}</div></div>
        {(c.desktop || []).map((g, gi) => (
          <figure className="reveal" key={g.cap}><figcaption className="label">{txt.caps[gi] || g.cap}</figcaption>
            <div className="browser"><div className="browser__bar"><Dots /></div>{g.files.map(f => <img key={f} src={img(f)} alt={t('case.imgAlt', { title: p.title, cap: txt.caps[gi] || g.cap })} loading="lazy" />)}</div></figure>
        ))}
        {c.mobile && c.mobile.length > 0 && (
          <figure className="reveal"><figcaption className="label">{txt.mobileCap || t('case.mobile')}</figcaption>
            <div className="phones">{c.mobile.map(f => <div className="phone" key={f}><img src={img(f)} alt={t('case.imgAltMobile', { title: p.title })} loading="lazy" /></div>)}</div></figure>
        )}
      </section>
      <section className="wrap case-nav" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingBottom: 96 }}>
        <Link className="btn btn--outline" to="/projetos"><Arrow d="left" /> {t('case.back')}</Link>
        {next.live
          ? <a className="btn btn--dark" href={next.live} target="_blank" rel="noopener">{t('case.next', { title: next.title })} <Arrow d="right" /></a>
          : <Link className="btn btn--dark" to={`/projetos/${next.slug}`}>{t('case.next', { title: next.title })} <Arrow d="right" /></Link>}
      </section>
    </main>
  );
}
