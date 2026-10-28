import type { ReactNode } from 'react';
import { site } from '../data/projects';
import { SecHead, Spark, Arrow, asset, type Vars } from '../components/ui';
import { TypeWriter } from '../components/TypeWriter';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

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

const interests: [string, string][] = [['IA aplicada ao design', 'pink'], ['Design systems para IA', 'mist'], ['Documentação para IA', 'mist'], ['Product Design', 'ink'], ['UX Research', 'mist'], ['Acessibilidade', 'mist'], ['Performance', 'mist'], ['Componentização', 'green'], ['Aprendizado contínuo', 'pink-soft']];
const skills = ['Pensamento estratégico', 'Resolução de problemas', 'Comunicação eficaz', 'Colaboração multidisciplinar', 'Gestão de tempo', 'Adaptabilidade', 'Aprendizado contínuo', 'Organização e documentação de processos'];
const sticker = (left: number, top: number, bg: string, rot: number, delay: string, color?: string): React.CSSProperties => ({ left, top, background: bg, color, rotate: `${rot}deg`, animationDelay: delay });
const pos = (left: number, top: number): Vars => ({ left, top });

export default function About() {
  useDocumentTitle('Sobre mim | Beatriz Vieira Ramos', 'Conheça Beatriz Vieira Ramos: história, foco profissional, interesses, marca e o que ela faz fora das telas.');
  return (
    <main>
      <section className="about-hero" style={{ paddingTop: 140 }}>
        <div><span className="label g">↳  Sobre mim</span><h1 className="h1">Oi, eu sou a <span className="g">Beatriz.</span></h1>
          <p className="intro">Product Designer de Aracaju, Sergipe. Junto interface, design systems e front-end para criar produtos digitais claros, responsivos e centrados nas pessoas — e sigo curiosa para aprender, testar e melhorar tudo o que faço.</p>
          <div className="facts">
            <span className="fact" style={{ background: 'var(--green)', color: '#fff' }}>Aracaju · SE</span><span className="fact" style={{ background: 'var(--ink)', color: '#fff' }}>Product Designer</span>
            <span className="fact" style={{ background: 'var(--pink)' }}>Webdesigner</span><span className="fact" style={{ background: 'var(--mist)' }}>Front-end</span><span className="fact" style={{ background: 'var(--mist)' }}>IA aplicada ao design</span></div></div>
        <div className="collage" aria-hidden="true">
          <div className="blob" />
          <div className="polaroid"><img src={asset('img/me/foto.jpg')} alt="" /><b>biatriz ✦</b></div>
          <div className="arch2"><img src={asset('img/avatar/center.jpg')} alt="" /></div>
          <span className="sticker" style={sticker(400, 70, 'var(--green)', 6, '.9s,1s', '#fff')}>Aracaju, SE</span>
          <span className="sticker" style={sticker(30, 640, 'var(--ink)', -5, '1.1s,1s', '#fff')}>Product Designer ✦</span>
          <span className="sticker" style={sticker(420, 660, 'var(--pink)', 4, '1.3s,1s')}>Desde 2015</span>
          <Spark c="pink" s={64} cls="spin" style={pos(300, 30)} /><Spark c="green" s={44} cls="spin-r" style={pos(590, 360)} /><Spark c="ink" s={28} cls="spin" style={pos(60, 10)} /><Spark c="pink" s={40} cls="spin-r" style={pos(10, 420)} />
        </div>
      </section>

      <div className="about-body">
        <section><SecHead label="Minha história" /><div className="cards cards--4 reveal">
          <Card kicker="2011 — 2015" title="Design Gráfico" body="Bacharelado em Design Gráfico na Universidade Tiradentes (UNIT), em Aracaju." />
          <Card cls="acard--pink" kicker="2015" title="Primeiros sites" body="Comecei na área digital na Alfama Web, criando, atualizando e mantendo websites para diferentes marcas." />
          <Card kicker="2021 — 2024" title="Design + front-end" body="Na Agência Acerte, uni design e desenvolvimento em sites, landing pages e produtos digitais, do conceito à entrega." />
          <Card cls="acard--pink" kicker="2024 — hoje" title="UI Designer & Front-end" body="De volta à Alfama Web, atuo com produtos digitais, design systems, protótipos e interfaces responsivas." />
        </div></section>

        <section><SecHead label="Meu foco profissional" /><div className="cards cards--2" style={{ marginBottom: 16 }}>
          <Focus cls="ink" n={1} title="Product Design & UX" body="Do problema à solução: pesquisa, arquitetura da informação, wireframes, prototipação e testes de usabilidade para decidir com clareza." chips={['Pesquisa', 'Arquitetura da informação', 'Wireframes', 'Prototipação', 'Testes de usabilidade']} star="pink" />
          <Focus cls="pink" n={2} title="Interface & Visual Design" body="Interfaces web e mobile responsivas, com hierarquia visual, tipografia e componentização pensadas para o uso real." chips={['Web & Mobile', 'Design responsivo', 'Auto Layout', 'Componentização', 'Tipografia']} star="ink" />
        </div><div className="cards cards--3">
          <Focus cls="mist" n={3} title="Design Systems" body="Bibliotecas de componentes, tokens e documentação, inclusive legível por IA." chips={['Tokens', 'Componentes', 'Documentação']} star="green" />
          <Focus cls="green" n={4} title="Front-end" body="Levo o design até o ar com código limpo, responsivo e fiel ao layout." chips={['HTML5', 'CSS3', 'Sass', 'JavaScript', 'Bootstrap', 'Rails (básico)']} star="pink" />
          <Focus cls="soft" n={5} title="IA aplicada ao design" body="IA para otimizar processos, documentação e componentização, com mais qualidade nas entregas." chips={['Processos', 'Documentação', 'Componentização']} star="ink" />
        </div></section>

        <section><SecHead label="Interesses" /><div className="interests reveal">
          {interests.map(([t, c]) => <span className="interest" key={t} style={{ background: `var(--${c})`, color: c === 'ink' || c === 'green' ? '#fff' : undefined }}>{t}</span>)}
        </div></section>

        <section><SecHead label="Como eu trabalho" /><div className="skills reveal">
          {skills.map((t, i) => <div className="skill" key={t}><Spark c="green" s={26} cls="blink" style={{ '--i': i } as Vars} /><span>{t}</span></div>)}
        </div></section>

        <section><SecHead label="Formação & idiomas" /><div className="cards cards--3 reveal">
          <Card kicker="Graduação" title="Design Gráfico — UNIT" body="Universidade Tiradentes, 2011 – 2015." />
          <Card cls="acard--pink" kicker="Pós-graduação" title="UX/UI e Produtos Digitais — EBAC" body="Em andamento." />
          <Card kicker="Idiomas" title="Português · Inglês · Espanhol" body="Português nativo; inglês e espanhol intermediários." />
        </div><div className="cards cards--2 reveal" style={{ marginTop: 16 }}>
          <Card cls="acard--white" kicker="Certificações · UX e Product Design" title="UX Design, UX/UI na Prática, Oficina de Usabilidade, UX Research" body="EBAC, Samsung Ocean e Alura." />
          <Card cls="acard--white" kicker="Certificações · Design Systems e IA" title="DS legíveis por IA · IA, UI e Design System" body="Clube de UI e DesignBoost." />
        </div></section>

        <section><SecHead label="Minha marca" /><div className="brandrow">
          <div className="stack">
            <p className="h4">biatriz é a identidade visual do meu portfólio: logotipo, paleta e padrão gráfico que unem estética e funcionalidade.</p>
            <p className="lead muted">O projeto nasceu da busca por combinar estética e funcionalidade, com foco em entender o público e os objetivos de cada cliente. Foi publicado no Behance em fevereiro de 2024.</p>
            <div><span className="label muted">Campos de criação</span><div style={{ marginTop: 12 }}><Chips items={['Design de logotipo', 'Branding', 'Design gráfico', 'UI/UX']} /></div></div>
            <div><span className="label muted">Ferramentas</span><div style={{ marginTop: 12 }}><Chips items={['Illustrator', 'Photoshop', 'InDesign']} /></div></div>
            <div><span className="label muted">Paleta</span><div className="swatches" style={{ marginTop: 12 }}>
              {[['#296246', 'Verde'], ['#FFBBD9', 'Rosa'], ['#FAEFEC', 'Creme']].map(([hex, n]) => <div className="swatch" key={hex}><i style={{ background: hex }} /><span className="label">{n} · {hex}</span></div>)}</div></div>
            <div><a className="btn btn--dark" href={site.behanceBrand} target="_blank" rel="noopener">Ver no Behance <Arrow d="ne" /></a></div>
          </div>
          <div className="brandimgs reveal"><img src={asset('img/brand/logo-verde.jpg')} alt="Logotipo biatriz em verde" loading="lazy" /><img src={asset('img/brand/logo-rosa.jpg')} alt="Logotipo biatriz em rosa" loading="lazy" /><img className="wide" src={asset('img/brand/padrao.jpg')} alt="Padrão gráfico da marca" loading="lazy" /></div>
        </div></section>

        <section><SecHead label="Perfil" /><div className="words reveal">
          <b>Criativa.</b><Spark c="pink" s={48} cls="spin" /><b className="o">Curiosa.</b><Spark c="green" s={48} cls="spin-r" /><b className="g">Observadora.</b><Spark c="ink" s={48} cls="spin" /><b className="o">Interessada.</b><Spark c="pink" s={48} cls="spin-r" />
        </div></section>

        <section className="fora"><SecHead label="Fora das telas" /><div className="cards cards--3">
          <div className="acard acard--pink fall"><span className="label">Hobbies</span><h3 className="h3">Livros, filmes, séries, animes e mangás.</h3><Chips ink items={['Livros', 'Filmes', 'Séries', 'Animes', 'Mangás']} /></div>
          <div className="acard fall"><span className="label">Gosto musical</span><h3 className="h3">Rock e pop, com Pink Floyd, Guns N’ Roses e a-ha na trilha.</h3><Chips ink items={['Rock', 'Pop', 'Pink Floyd', 'Guns N’ Roses', 'a-ha']} /></div>
          <div className="acard fall" style={{ background: 'var(--pink)' }}><span className="label">Curiosidades</span><h3 className="h3">Cultura pop, tecnologia, inteligência artificial, estética e comportamento humano.</h3><Chips ink items={['Cultura pop', 'Tecnologia', 'Inteligência artificial', 'Estética', 'Comportamento humano']} /></div>
        </div></section>

        <section className="about-cta"><TypeWriter text="Bora conversar?" hi="conversar" />
          <div className="btns">
            <a className="btn btn--pink" href={site.whatsapp} target="_blank" rel="noopener">WhatsApp <Arrow d="ne" /></a>
            <a className="btn btn--light" href={site.linkedin} target="_blank" rel="noopener">LinkedIn <Arrow d="ne" /></a>
            <a className="btn btn--light" href={site.behance} target="_blank" rel="noopener">Behance <Arrow d="ne" /></a>
            <a className="btn btn--light" href={`mailto:${site.email}`}>E-mail <Arrow d="ne" /></a></div></section>
      </div>
    </main>
  );
}
