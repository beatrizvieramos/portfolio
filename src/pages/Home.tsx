import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, site } from '../data/projects';
import { ProjectCard, groupOf } from '../components/ProjectCard';
import { Band, SecTitle, Spark, asset, type Vars, Arrow } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const FEATURED = 7;
type Pose = 'center' | 'left' | 'right' | 'down';

const services: [string, string, string][] = [
  ['01', 'Product Design & UX', 'Pesquisa, arquitetura da informação, wireframes, prototipação e testes de usabilidade.'],
  ['02', 'Interface & Visual Design', 'Web e mobile, design responsivo, Auto Layout, componentização, hierarquia visual e tipografia.'],
  ['03', 'Design Systems', 'Bibliotecas de componentes, tokens e documentação legível por IA.'],
  ['04', 'Front-end', 'HTML5, CSS3, Sass, JavaScript, Bootstrap e Ruby on Rails (básico).'],
];

const Ico = ({ bg, fg, t }: { bg: string; fg: string; t: string }) => <span className="ico" style={{ background: bg, color: fg }}>{t}</span>;
const Tl = ({ f }: { f: string }) => <img src={asset(`img/tools/${f}.svg`)} alt="" loading="lazy" />;
const toolGroups: { name: string; cls: string; tools: [string, React.ReactNode][] }[] = [
  { name: 'Design', cls: '', tools: [['Figma', <Tl f="figma-color" />], ['FigJam', <Ico bg="#0D0D0D" fg="#fff" t="Fj" />], ['Photoshop', <Ico bg="#001E36" fg="#31A8FF" t="Ps" />], ['Illustrator', <Ico bg="#330000" fg="#FF9A00" t="Ai" />]] },
  { name: 'Gestão & IA', cls: 'group--pink', tools: [['Notion', <Tl f="notion" />], ['Trello', <Tl f="trello" />], ['Claude', <Tl f="claude" />], ['ChatGPT', <Tl f="chatgpt" />], ['Codex', <Ico bg="#0D0D0D" fg="#fff" t=">_" />]] },
  { name: 'Desenvolvimento', cls: '', tools: [['HTML5', <Tl f="html5" />], ['CSS3', <Tl f="css" />], ['Sass', <Tl f="sass" />], ['JavaScript', <Tl f="javascript" />], ['Bootstrap', <Tl f="bootstrap" />], ['Ruby on Rails', <Tl f="rubyonrails" />]] },
];

const jobs = [['2024 — Atual', 'Alfama Web', 'UI Designer & Front-end', 'Aracaju / SE'], ['2021 — 2024', 'Agência Acerte', 'Front-end & Web Designer', 'Aracaju / SE'], ['2015', 'Alfama Web', 'Front-end & Web Designer', 'Aracaju / SE']];
const studies = [['2011 — 2015', 'UNIT', 'Bacharelado em Design Gráfico', 'Aracaju / SE'], ['Cursando', 'EBAC', 'Pós em UX/UI e Produtos Digitais', 'Online'], ['2026', 'EBAC', 'UX Design · UX/UI na Prática', 'Online'], ['2026', 'Samsung Ocean', 'Oficina de Usabilidade', 'Online'], ['2026', 'Clube de UI · DesignBoost', 'DS legíveis por IA · IA, UI e DS', 'Online'], ['2023', 'Alura', 'UX Research', 'Online']];
const ExpRows = ({ rows }: { rows: string[][] }) => <>{rows.map((r, i) => <div className="exp" key={i}><span>{r[0]}</span><span className="h4">{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span></div>)}</>;

const sp = (left: string, top: string): Vars => ({ left, top });

function Hero() {
  const [pose, setPose] = useState<Pose>('center');
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
    setPose(dy > 0.22 ? 'down' : dx < -0.14 ? 'left' : dx > 0.14 ? 'right' : 'center');
  };
  return (
    <section className="hero" aria-label="Apresentação" onMouseMove={onMove} onMouseLeave={() => setPose('center')}>
      <h1 className="sr">Beatriz Vieira Ramos — Product Designer, Webdesigner e Front-end</h1>
      <div className="name name--outline" aria-hidden="true">BEATRIZ</div>
      <div className="hero__arch" aria-hidden="true">
        {(['center', 'left', 'right', 'down'] as Pose[]).map(p => <img key={p} src={asset(`img/avatar/${p}.jpg`)} className={pose === p ? 'on' : ''} alt="" />)}
      </div>
      <div className="name name--solid" aria-hidden="true">VIEIRA</div>
      <div className="hero__sticker label"><span>{'Desde\n2015'}</span></div>
      <Spark c="green" s={56} cls="spin" style={sp('7.5%', '56%')} /><Spark c="pink" s={44} cls="spin-r" style={sp('29%', '15%')} />
      <Spark c="ink" s={28} cls="spin" style={sp('70%', '68%')} /><Spark c="pink" s={40} cls="spin-r" style={sp('74%', '44%')} /><Spark c="green" s={34} cls="spin" style={sp('20%', '71%')} />
      <div className="hero__intro"><div className="label">↳  UI Designer · Product Designer · Webdesigner &amp; Front-end</div><p>Crio interfaces claras, textos que guiam e código que funciona — do conceito à entrega.</p></div>
      <div className="hero__actions"><a className="btn btn--dark" href="#projetos">Ver projetos <Arrow d="down" /></a><a className="btn btn--outline" href={asset('curriculo-beatriz.pdf')} download>Baixar currículo</a></div>
    </section>
  );
}

const FILTERS = [['all', 'Todos'], ['sites', 'Sites'], ['produtos', 'Produtos'], ['ferramentas', 'Ferramentas']] as const;

export default function Home() {
  useDocumentTitle('Beatriz Vieira Ramos | Product Designer, Webdesigner & Front-end');
  const [filter, setFilter] = useState<string>('all');
  const featured = projects.slice(0, FEATURED).filter(p => filter === 'all' || groupOf(p) === filter);

  return (
    <main>
      <Hero />
      <Band />

      <section className="section" id="projetos"><div className="wrap">
        <SecTitle ghost="PORTFÓLIO" title="Trabalhos selecionados" />
        <div className="filters">
          <div className="tabs" role="group" aria-label="Filtrar projetos">
            {FILTERS.map(([k, label]) => <button key={k} className="tab" aria-pressed={filter === k} onClick={() => setFilter(k)}>{label}</button>)}
          </div>
          <Link className="btn btn--outline" to="/projetos">Ver todos <Arrow d="ne" /></Link>
        </div>
        <div className="grid">
          {featured.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}
          {filter === 'all' && (
            <div className="tile-cta card card--ready"><span className="label">Mais trabalhos</span><div><h3 className="h2">Veja mais trabalhos e conecte-se comigo</h3>
              <div className="btns" style={{ marginTop: 28 }}>
                <a className="btn btn--dark" href={site.behance} target="_blank" rel="noopener">Behance <Arrow d="ne" /></a>
                <a className="btn btn--outline" href={site.linkedin} target="_blank" rel="noopener">LinkedIn <Arrow d="ne" /></a></div></div></div>
          )}
        </div>
      </div></section>

      <section className="section" id="servicos"><div className="wrap">
        <SecTitle ghost="SERVIÇOS" title="Serviços" />
        <div>{services.map(s => <div className="svc" key={s[0]}><span className="svc__n label">{s[0]}</span><span className="svc__name h2">{s[1]}</span><span className="svc__d">{s[2]}</span><span className="svc__arrow">↗</span></div>)}</div>
      </div></section>

      <Band rev />

      <section className="section" id="ferramentas"><div className="wrap">
        <SecTitle ghost="TOOLS" title="Ferramentas" />
        <div className="groups">{toolGroups.map(g => (
          <div className={`group ${g.cls}`} key={g.name}><span className="label">{g.name}</span>
            <div className="tools">{g.tools.map(([n, icon]) => <div className="tool" key={n}>{icon}<span>{n}</span></div>)}</div></div>
        ))}</div>
      </div></section>

      <section className="section" id="sobre"><div className="wrap">
        <SecTitle ghost="SOBRE" title="Sobre mim" />
        <div className="bento">
          <div className="b b--statement reveal"><p className="h3">Sou a Beatriz, Product Designer de Aracaju. Desde 2015 trabalho na interseção entre design e front-end, criando produtos digitais claros, responsivos e centrados nas pessoas.</p><p>Uso Figma, design systems, HTML, CSS e Bootstrap para criar interfaces intuitivas e orientadas a resultados. Hoje aprofundo Product Design, UX Research e IA aplicada ao design para otimizar processos, documentação e componentização.</p></div>
          <div className="b b--photo reveal" role="img" aria-label="Foto de Beatriz" style={{ backgroundImage: `url(${asset('img/me/foto.jpg')})` }} />
          <div className="b b--stat reveal" style={{ background: 'var(--pink)' }}><span className="h2">2015</span><p>Início na área digital: sites, interfaces e front-end.</p></div>
          <div className="b b--stat reveal" style={{ background: 'var(--green)', color: '#fff' }}><span className="h2">Design + código</span><p>Do Figma ao HTML, CSS e Bootstrap, sem perder nada no caminho.</p></div>
          <div className="b b--stat reveal" style={{ background: 'var(--mist)' }}><span className="h2">IA</span><p>Aplicada a processos, documentação, design systems e à minha skill e plugin Mapa de Conteúdo.</p></div>
          <div className="b b--list reveal"><span className="label">O que eu faço ↴</span><p>{'Product Design & UX\nInterface & Visual Design\nDesign Systems\nFront-end\nIA aplicada ao Design\nSkills e plugins com IA'}</p></div>
          <div className="b b--list b--list--pink reveal"><span className="label">Projetos &amp; marcas ↴</span><p>{'Alfama Web\nPrimasa Camel\nTerrah\nLa Lena FHV\nEntre Rios\nGerador de Criativos'}</p></div>
        </div>
        <div className="more"><Link className="btn btn--dark" to="/sobre">Conhecer minha história <Arrow d="ne" /></Link></div>
      </div></section>

      <div className="dark-card" id="experiencia"><div className="wrap" style={{ padding: 0 }}>
        <SecTitle ghost="EXPERIÊNCIA" title="Experiência" />
        <div className="exp-head label"><span>Período</span><span>Empresa</span><span>Cargo</span><span>Local</span></div><ExpRows rows={jobs} />
        <div className="exp-gap" />
        <div className="sec-head" style={{ marginBottom: 24 }}><div className="h3"><span>/</span>Formação &amp; certificações</div></div>
        <div className="exp-head label"><span>Ano</span><span>Instituição</span><span>Curso</span><span>Local</span></div><ExpRows rows={studies} />
      </div></div>

      <section className="cta" id="contato"><div className="wrap">
        <span className="label g">↳  Tem um projeto em mente?</span>
        <h2 className="big">Vamos criar algo <span className="g">juntos?</span></h2>
        <div className="btns">
          <a className="btn btn--dark" href={`mailto:${site.email}`}>Enviar e-mail <Arrow d="ne" /></a>
          <a className="btn btn--outline" href={site.linkedin} target="_blank" rel="noopener">LinkedIn <Arrow d="ne" /></a>
          <a className="btn btn--outline" href={site.behance} target="_blank" rel="noopener">Behance <Arrow d="ne" /></a>
          <a className="btn btn--pink" href={site.whatsapp} target="_blank" rel="noopener">WhatsApp <Arrow d="ne" /></a></div>
        <div className="info3">
          <div><span className="label">E-mail</span><a className="h4" href={`mailto:${site.email}`}>{site.email}</a></div>
          <div><span className="label">Telefone</span><a className="h4" href={site.whatsapp} target="_blank" rel="noopener">{site.phone}</a></div>
          <div><span className="label">Estúdio</span><span className="h4">Aracaju, Sergipe — Brasil<br />Disponível remotamente</span></div></div>
      </div></section>
    </main>
  );
}
