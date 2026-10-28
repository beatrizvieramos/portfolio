import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { hasPage } from '../components/ProjectCard';
import { Scene, asset, Arrow } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import NotFound from './NotFound';

const navList = projects.filter(p => hasPage(p) || p.live);
const Dots = () => <><i style={{ background: '#FF5F57' }} /><i style={{ background: '#FEBC2E' }} /><i style={{ background: '#28C840' }} /></>;
const ChipsBlock = ({ label, arr }: { label: string; arr?: string[] }) => arr && arr.length ? <div className="grp"><span className="label">{label}</span><div className="chips">{arr.map(x => <span className="chip" key={x}>{x}</span>)}</div></div> : null;

export default function ProjectPage() {
  const { slug } = useParams();
  const p = projects.find(x => x.slug === slug && hasPage(x));
  useDocumentTitle(p ? `${p.title} | Beatriz Vieira Ramos` : 'Projeto não encontrado', p?.case?.lead);
  if (!p || !p.case) return <NotFound />;
  const c = p.case;
  const img = (f: string) => asset(`img/cases/${p.slug}/${f}.jpg`);
  const next = navList[(navList.indexOf(p) + 1) % navList.length];

  return (
    <main>
      <section className="case-hero"><span className="label">Projeto · {p.cat}</span><h1 className="h1">{p.title}</h1></section>
      <section className="case-meta"><div><span className="label">Categoria</span><span className="h4">{p.cat}</span></div><div><span className="label">Serviços</span><span className="h4">{p.tags.join(' · ')}</span></div></section>
      <section className="case-scene"><Scene p={p} /></section>
      <section className="case-overview"><div><div className="h3"><span className="g">/</span>Visão geral</div></div>
        <div className="body"><p className="h4">{c.lead}</p>{c.paras.map(t => <p key={t}>{t}</p>)}<ChipsBlock label="Meu papel" arr={c.role} /><ChipsBlock label="Ferramentas" arr={c.tools} /></div></section>
      <section className="shots"><div className="sec-head" style={{ marginBottom: 0 }}><div className="h3"><span>/</span>Telas</div></div>
        {(c.desktop || []).map(g => (
          <figure className="reveal" key={g.cap}><figcaption className="label">{g.cap}</figcaption>
            <div className="browser"><div className="browser__bar"><Dots /></div>{g.files.map(f => <img key={f} src={img(f)} alt={`${p.title} — ${g.cap}`} loading="lazy" />)}</div></figure>
        ))}
        {c.mobile && c.mobile.length > 0 && (
          <figure className="reveal"><figcaption className="label">{c.mobileCap || 'Mobile'}</figcaption>
            <div className="phones">{c.mobile.map(f => <div className="phone" key={f}><img src={img(f)} alt={`${p.title} — mobile`} loading="lazy" /></div>)}</div></figure>
        )}
      </section>
      <section className="wrap case-nav" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingBottom: 96 }}>
        <Link className="btn btn--outline" to="/projetos"><Arrow d="left" /> Voltar aos projetos</Link>
        {next.live
          ? <a className="btn btn--dark" href={next.live} target="_blank" rel="noopener">Próximo: {next.title} <Arrow d="right" /></a>
          : <Link className="btn btn--dark" to={`/projetos/${next.slug}`}>Próximo: {next.title} <Arrow d="right" /></Link>}
      </section>
    </main>
  );
}
