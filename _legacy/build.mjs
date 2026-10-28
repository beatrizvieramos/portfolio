// Gera o site estático: index.html, sobre/, projetos/<slug>/ e 404.html.  Uso: node build.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects, site } from './data/projects.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const COLORS = { pink: '#FFB9DA', green: '#2B6349', ink: '#0A0909', paper: '#FFFFFF' };
const STAR = c => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" fill="${COLORS[c] || c}"/></svg>`;
const spark = (c, s = 28, cls = '', style = '') => `<i class="spark ${cls}" style="--s:${s}px;${style}">${STAR(c)}</i>`;
const GRADSTAR = id => `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB9DA"/><stop offset="1" stop-color="#2B6349"/></linearGradient></defs><path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" fill="url(#${id})"/></svg>`;
const groupOf = p => (p.cat === 'Produto' ? 'produtos' : p.cat === 'Ferramenta' ? 'ferramentas' : 'sites');
const hasPage = p => !p.live && p.case;

function head({ title, desc, base, extra = '' }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website">
<meta name="theme-color" content="#FFB9DA">
<link rel="icon" href="${base}assets/img/logo/biatriz-rosa.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}assets/css/styles.css">
${extra}</head>
<body>`;
}
const tail = base => `<script src="${base}assets/js/main.js" defer></script>\n</body>\n</html>\n`;

function navHTML(base, home) {
  const h = id => (home ? `#${id}` : `${base}#${id}`);
  return `<header class="nav" id="top">
  <a class="nav__logo" href="${home ? '#top' : base}" aria-label="biatriz — início"><img src="${base}assets/img/logo/biatriz-rosa.png" alt="biatriz" width="176" height="50"></a>
  <nav class="nav__links" aria-label="Principal">
    <a href="${h('projetos')}">Projetos</a><a href="${h('servicos')}">Serviços</a><a href="${h('ferramentas')}">Ferramentas</a><a href="${base}sobre/">Sobre</a><a href="${h('experiencia')}">Experiência</a><a href="${h('contato')}">Contato</a>
  </nav>
  <a class="btn btn--dark nav__cta" href="${h('contato')}">Vamos conversar ↗</a>
  <button class="nav__burger" aria-label="Abrir menu" aria-expanded="false"><span></span><span></span></button>
</header>`;
}

function sceneHTML(p, base, { big = false } = {}) {
  const a = `${base}assets/img/mock/${p.scene.a}.jpg`, b = p.scene.b && `${base}assets/img/mock/${p.scene.b}.jpg`;
  const win = (cls, src) => `<span class="win ${cls}"><img src="${src}" alt="" loading="lazy"></span>`;
  return `<div class="scene${p.dark ? ' scene--dark' : ''}" style="--bg:${p.bg}"><div class="scene__inner">${b ? win('win--a', a) + win('win--b', b) : win('win--solo', a)}</div></div>`;
}

function cardHTML(p, base) {
  const href = p.live || `${base}projetos/${p.slug}/`;
  const ext = p.live ? ' target="_blank" rel="noopener"' : '';
  return `<a class="card" data-group="${groupOf(p)}" href="${href}"${ext} aria-label="${esc(p.title)} — ${p.live ? 'abrir site' : 'ver projeto'}">
    <div class="scene-wrap" style="position:relative">${sceneHTML(p, base)}<span class="badge">${esc(p.cat)}</span><span class="linkpill">Link ↗</span></div>
    <div class="card__info"><span class="card__title">${esc(p.title)}</span></div>
    <div class="chips">${p.tags.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
  </a>`;
}

const secTitle = (ghost, slash, title) => `<div class="sec-title"><span class="ghost" aria-hidden="true">${ghost}</span><h2 class="h2"><span>${slash}</span>${title}</h2></div>`;
const secHead = label => `<div class="sec-head"><div class="h3"><span>/</span>${label}</div></div>`;

const services = [
  ['01', 'Product Design & UX', 'Pesquisa, arquitetura da informação, wireframes, prototipação e testes de usabilidade.'],
  ['02', 'Interface & Visual Design', 'Web e mobile, design responsivo, Auto Layout, componentização, hierarquia visual e tipografia.'],
  ['03', 'Design Systems', 'Bibliotecas de componentes, tokens e documentação legível por IA.'],
  ['04', 'Front-end', 'HTML5, CSS3, Sass, JavaScript, Bootstrap e Ruby on Rails (básico).'],
];
const ico = (bg, fg, t) => `<span class="ico" style="background:${bg};color:${fg}">${t}</span>`;
const T = f => `<img src="assets/img/tools/${f}.svg" alt="" loading="lazy">`;
const toolGroups = [
  ['Design', '', [['Figma', T('figma-color')], ['FigJam', ico('#0D0D0D', '#fff', 'Fj')], ['Photoshop', ico('#001E36', '#31A8FF', 'Ps')], ['Illustrator', ico('#330000', '#FF9A00', 'Ai')]]],
  ['Gestão & IA', 'group--pink', [['Notion', T('notion')], ['Trello', T('trello')], ['Claude', T('claude')], ['ChatGPT', T('chatgpt')], ['Codex', ico('#0D0D0D', '#fff', '&gt;_')]]],
  ['Desenvolvimento', '', [['HTML5', T('html5')], ['CSS3', T('css')], ['Sass', T('sass')], ['JavaScript', T('javascript')], ['Bootstrap', T('bootstrap')], ['Ruby on Rails', T('rubyonrails')]]],
];
const jobs = [['2024 — Atual', 'Alfama Web', 'UI Designer & Front-end', 'Aracaju / SE'], ['2021 — 2024', 'Agência Acerte', 'Front-end & Web Designer', 'Aracaju / SE'], ['2015', 'Alfama Web', 'Front-end & Web Designer', 'Aracaju / SE']];
const studies = [['2011 — 2015', 'UNIT', 'Bacharelado em Design Gráfico', 'Aracaju / SE'], ['Cursando', 'EBAC', 'Pós em UX/UI e Produtos Digitais', 'Online'], ['2026', 'EBAC', 'UX Design · UX/UI na Prática', 'Online'], ['2026', 'Samsung Ocean', 'Oficina de Usabilidade', 'Online'], ['2026', 'Clube de UI · DesignBoost', 'DS legíveis por IA · IA, UI e DS', 'Online'], ['2023', 'Alura', 'UX Research', 'Online']];
const expRows = rows => rows.map(r => `<div class="exp"><span>${esc(r[0])}</span><span class="h4">${esc(r[1])}</span><span>${esc(r[2])}</span><span>${esc(r[3])}</span></div>`).join('');

function footerHTML(base, home) {
  const h = id => (home ? `#${id}` : `${base}#${id}`);
  return `<footer class="footer" id="rodape">
  <i class="fstar spin" style="right:-2%;top:42%;width:min(420px,32vw)">${GRADSTAR('g1')}</i>
  <i class="fstar spin-r" style="left:42%;top:-6%;width:120px">${GRADSTAR('g2')}</i>
  <a class="footer__logo" href="${home ? '#top' : base}" aria-label="biatriz"><img src="${base}assets/img/logo/biatriz-verde.png" alt="biatriz" width="240" height="68"></a>
  <div class="fgrid">
    <div><span class="label">Páginas</span><a href="${home ? '#top' : base}">Home</a><a href="${h('projetos')}">Projetos</a><a href="${h('servicos')}">Serviços</a><a href="${h('ferramentas')}">Ferramentas</a><a href="${base}sobre/">Sobre</a><a href="${h('experiencia')}">Experiência</a><a href="${h('contato')}">Contato</a></div>
    <div><span class="label">Social</span><a href="${site.behance}" target="_blank" rel="noopener">Behance ↗</a><a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a><a href="${site.whatsapp}" target="_blank" rel="noopener">WhatsApp ↗</a></div>
    <div><span class="label">Contato</span><a href="mailto:${site.email}">${site.email}</a><a href="${site.whatsapp}" target="_blank" rel="noopener">${site.phone}</a></div>
    <div><span class="label">Estúdio</span><p>Baseada em Aracaju, Brasil</p><p>Disponível remotamente</p></div>
  </div>
  <div class="fname" data-letters="beatriz vieira"></div>
  <div class="fbar"><span>© 2026 Beatriz Vieira Ramos</span><a href="#top" data-top>Voltar ao topo ↑</a></div>
</footer>`;
}

// ---------------------------------------------------------------- HOME
function home() {
    const html = head({ title: 'Beatriz Vieira Ramos — Product Designer, Webdesigner & Front-end', desc: 'Portfólio de Beatriz Vieira Ramos, Product Designer e Front-end em Aracaju (SE): projetos, serviços, ferramentas e história.', base: '' }) + `
${navHTML('', true)}
<main>
<section class="hero" aria-label="Apresentação">
  <h1 class="sr">Beatriz Vieira Ramos — Product Designer, Webdesigner e Front-end</h1>
  <div class="name name--outline" aria-hidden="true">BEATRIZ</div>
  <div class="hero__arch" aria-hidden="true">
    <img src="assets/img/avatar/center.jpg" data-pose="center" class="on" alt=""><img src="assets/img/avatar/left.jpg" data-pose="left" alt=""><img src="assets/img/avatar/right.jpg" data-pose="right" alt=""><img src="assets/img/avatar/down.jpg" data-pose="down" alt="">
  </div>
  <div class="name name--solid" aria-hidden="true">VIEIRA</div>
  <div class="hero__sticker label"><span>Desde\n2015</span></div>
  ${spark('green', 56, 'spin', 'left:7.5%;top:56%')}${spark('pink', 44, 'spin-r', 'left:29%;top:15%')}${spark('ink', 28, 'spin', 'left:70%;top:68%')}${spark('pink', 40, 'spin-r', 'left:74%;top:44%')}${spark('green', 34, 'spin', 'left:20%;top:71%')}
  <div class="hero__intro"><div class="label">↳  UI Designer · Product Designer · Webdesigner &amp; Front-end</div><p>Crio interfaces claras, textos que guiam e código que funciona — do conceito à entrega.</p></div>
  <div class="hero__actions"><a class="btn btn--dark" href="#projetos">Ver projetos ↓</a><a class="btn btn--outline" href="assets/curriculo-beatriz.pdf" download>Baixar currículo</a></div>
</section>

<div class="band" aria-hidden="true"><div class="band__track">${[0, 1, 2, 3].map(() => ['Product Design', 'Front-end', 'Webdesigner', 'Design Systems', 'IA aplicada ao Design'].map(t => `<span>${t}</span>${spark('pink', 28)}`).join('')).join('')}</div></div>

<section class="section" id="projetos"><div class="wrap">
  ${secTitle('PORTFÓLIO', '/', 'Trabalhos selecionados')}
  <div class="filters"><div class="tabs" role="group" aria-label="Filtrar projetos"><button class="tab" data-filter="all" aria-pressed="true">Todos</button><button class="tab" data-filter="sites" aria-pressed="false">Sites</button><button class="tab" data-filter="produtos" aria-pressed="false">Produtos</button><button class="tab" data-filter="ferramentas" aria-pressed="false">Ferramentas</button></div><a class="btn btn--outline" href="${site.behance}" target="_blank" rel="noopener">Ver todos ↗</a></div>
  <div class="grid">
    ${projects.map(p => cardHTML(p, '')).join('\n    ')}
    <div class="tile-cta card" data-group="all-only"><span class="label">Mais trabalhos</span><div><h3 class="h2">Veja mais trabalhos e conecte-se comigo</h3><div class="btns" style="margin-top:28px"><a class="btn btn--dark" href="${site.behance}" target="_blank" rel="noopener">Behance ↗</a><a class="btn btn--outline" href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a></div></div></div>
  </div>
</div></section>

<section class="section" id="servicos"><div class="wrap">
  ${secTitle('SERVIÇOS', '/', 'Serviços')}
  <div>${services.map(s => `<div class="svc"><span class="svc__n label">${s[0]}</span><span class="svc__name h2">${s[1]}</span><span class="svc__d">${s[2]}</span><span class="svc__arrow">↗</span></div>`).join('')}</div>
</div></section>

<div class="band band--rev" aria-hidden="true"><div class="band__track">${[0, 1, 2, 3].map(() => ['Product Design', 'Front-end', 'Webdesigner', 'Design Systems', 'IA aplicada ao Design'].map(t => `<span>${t}</span>${spark('pink', 28)}`).join('')).join('')}</div></div>

<section class="section" id="ferramentas"><div class="wrap">
  ${secTitle('TOOLS', '/', 'Ferramentas')}
  <div class="groups">${toolGroups.map(g => `<div class="group ${g[1]}"><span class="label">${g[0]}</span><div class="tools">${g[2].map(t => `<div class="tool">${t[1]}<span>${t[0]}</span></div>`).join('')}</div></div>`).join('')}</div>
</div></section>

<section class="section" id="sobre"><div class="wrap">
  ${secTitle('SOBRE', '/', 'Sobre mim')}
  <div class="bento">
    <div class="b b--statement reveal"><p class="h3">Sou a Beatriz, Product Designer de Aracaju. Desde 2015 trabalho na interseção entre design e front-end, criando produtos digitais claros, responsivos e centrados nas pessoas.</p><p>Uso Figma, design systems, HTML, CSS e Bootstrap para criar interfaces intuitivas e orientadas a resultados. Hoje aprofundo Product Design, UX Research e IA aplicada ao design para otimizar processos, documentação e componentização.</p></div>
    <div class="b b--photo reveal" role="img" aria-label="Foto de Beatriz" style="background-image:url(assets/img/me/foto.jpg)"></div>
    <div class="b b--stat reveal" style="background:var(--pink)"><span class="h2">2015</span><p>Início na área digital: sites, interfaces e front-end.</p></div>
    <div class="b b--stat reveal" style="background:var(--green);color:#fff"><span class="h2">Design + código</span><p>Do Figma ao HTML, CSS e Bootstrap, sem perder nada no caminho.</p></div>
    <div class="b b--stat reveal" style="background:var(--mist)"><span class="h2">IA</span><p>Aplicada a processos, documentação, design systems e à minha skill e plugin Mapa de Conteúdo.</p></div>
    <div class="b b--list reveal"><span class="label">O que eu faço ↴</span><p>Product Design &amp; UX\nInterface &amp; Visual Design\nDesign Systems\nFront-end\nIA aplicada ao Design\nSkills e plugins com IA</p></div>
    <div class="b b--list b--list--pink reveal"><span class="label">Projetos &amp; marcas ↴</span><p>Alfama Web\nPrimasa Camel\nTerrah\nLa Lena FHV\nEntre Rios\nGerador de Criativos</p></div>
  </div>
  <div class="more"><a class="btn btn--dark" href="sobre/">Conhecer minha história ↗</a></div>
</div></section>

<div class="dark-card" id="experiencia"><div class="wrap" style="padding:0">
  ${secTitle('EXPERIÊNCIA', '/', 'Experiência')}
  <div class="exp-head label"><span>Período</span><span>Empresa</span><span>Cargo</span><span>Local</span></div>${expRows(jobs)}
  <div class="exp-gap"></div>
  <div class="sec-head" style="margin-bottom:24px"><div class="h3"><span>/</span>Formação &amp; certificações</div></div>
  <div class="exp-head label"><span>Ano</span><span>Instituição</span><span>Curso</span><span>Local</span></div>${expRows(studies)}
</div></div>

<section class="cta" id="contato"><div class="wrap">
  <span class="label g">↳  Tem um projeto em mente?</span>
  <h2 class="big">Vamos criar algo <span class="g">juntos?</span></h2>
  <div class="btns"><a class="btn btn--dark" href="mailto:${site.email}">Enviar e-mail ↗</a><a class="btn btn--outline" href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a><a class="btn btn--outline" href="${site.behance}" target="_blank" rel="noopener">Behance ↗</a><a class="btn btn--pink" href="${site.whatsapp}" target="_blank" rel="noopener">WhatsApp ↗</a></div>
  <div class="info3"><div><span class="label">E-mail</span><a class="h4" href="mailto:${site.email}">${site.email}</a></div><div><span class="label">Telefone</span><a class="h4" href="${site.whatsapp}" target="_blank" rel="noopener">${site.phone}</a></div><div><span class="label">Estúdio</span><span class="h4">Aracaju, Sergipe — Brasil<br>Disponível remotamente</span></div></div>
</div></section>
</main>
${footerHTML('', true)}
` + tail('');
  return html.replace('class="tile-cta card" data-group="all-only"', 'class="tile-cta card" data-group="sites-produtos-ferramentas-all"');
}

// ---------------------------------------------------------------- SOBRE
function about() {
  const base = '../';
  const spk = (c, s, i) => spark(c, s, 'blink', `--i:${i}`);
  const card = (cls, kicker, title, body) => `<div class="acard ${cls}">${kicker ? `<span class="label">${kicker}</span>` : ''}<h3 class="h4">${title}</h3>${body ? `<p>${body}</p>` : ''}</div>`;
  const focus = (cls, n, title, body, chips, star) => `<div class="focus focus--${cls}${n < 3 ? ' focus--big' : ''} reveal"><div class="top"><span class="num">${n < 10 ? '0' + n : n}</span>${spark(star, n < 3 ? 56 : 40, 'blink', `--i:${n}`)}</div><div><div class="title">${title}</div><p style="margin-top:14px">${body}</p></div><div class="chips">${chips.map(c => `<span class="chip">${c}</span>`).join('')}</div></div>`;
  const html = head({ title: 'Sobre mim — Beatriz Vieira Ramos', desc: 'Conheça Beatriz Vieira Ramos: história, foco profissional, interesses, marca e o que ela faz fora das telas.', base }) + `
${navHTML(base, false)}
<main>
<section class="about-hero" style="padding-top:140px">
  <div><span class="label g">↳  Sobre mim</span><h1 class="h1">Oi, eu sou a <span class="g">Beatriz.</span></h1>
  <p class="intro">Product Designer de Aracaju, Sergipe. Junto interface, design systems e front-end para criar produtos digitais claros, responsivos e centrados nas pessoas — e sigo curiosa para aprender, testar e melhorar tudo o que faço.</p>
  <div class="facts"><span class="fact" style="background:var(--green);color:#fff">Aracaju · SE</span><span class="fact" style="background:var(--ink);color:#fff">Product Designer</span><span class="fact" style="background:var(--pink)">Webdesigner</span><span class="fact" style="background:var(--mist)">Front-end</span><span class="fact" style="background:var(--mist)">IA aplicada ao design</span></div></div>
  <div class="collage" aria-hidden="true">
    <div class="blob"></div>
    <div class="polaroid"><img src="${base}assets/img/me/foto.jpg" alt=""><b>biatriz ✦</b></div>
    <div class="arch2"><img src="${base}assets/img/avatar/center.jpg" alt=""></div>
    <span class="sticker" style="left:400px;top:70px;background:var(--green);color:#fff;rotate:6deg;animation-delay:.9s,1s">Aracaju, SE</span>
    <span class="sticker" style="left:30px;top:640px;background:var(--ink);color:#fff;rotate:-5deg;animation-delay:1.1s,1s">Product Designer ✦</span>
    <span class="sticker" style="left:420px;top:660px;background:var(--pink);rotate:4deg;animation-delay:1.3s,1s">Desde 2015</span>
    ${spark('pink', 64, 'spin', 'left:300px;top:30px')}${spark('green', 44, 'spin-r', 'left:590px;top:360px')}${spark('ink', 28, 'spin', 'left:60px;top:10px')}${spark('pink', 40, 'spin-r', 'left:10px;top:420px')}
  </div>
</section>

<div class="about-body">
  <section>${secHead('Minha história')}<div class="cards cards--4 reveal">
    ${card('', '2011 — 2015', 'Design Gráfico', 'Bacharelado em Design Gráfico na Universidade Tiradentes (UNIT), em Aracaju.')}
    ${card('acard--pink', '2015', 'Primeiros sites', 'Comecei na área digital na Alfama Web, criando, atualizando e mantendo websites para diferentes marcas.')}
    ${card('', '2021 — 2024', 'Design + front-end', 'Na Agência Acerte, uni design e desenvolvimento em sites, landing pages e produtos digitais, do conceito à entrega.')}
    ${card('acard--pink', '2024 — hoje', 'UI Designer &amp; Front-end', 'De volta à Alfama Web, atuo com produtos digitais, design systems, protótipos e interfaces responsivas.')}
  </div></section>

  <section>${secHead('Meu foco profissional')}<div class="cards cards--2" style="margin-bottom:16px">
    ${focus('ink', 1, 'Product Design &amp; UX', 'Do problema à solução: pesquisa, arquitetura da informação, wireframes, prototipação e testes de usabilidade para decidir com clareza.', ['Pesquisa', 'Arquitetura da informação', 'Wireframes', 'Prototipação', 'Testes de usabilidade'], 'pink')}
    ${focus('pink', 2, 'Interface &amp; Visual Design', 'Interfaces web e mobile responsivas, com hierarquia visual, tipografia e componentização pensadas para o uso real.', ['Web &amp; Mobile', 'Design responsivo', 'Auto Layout', 'Componentização', 'Tipografia'], 'ink')}
  </div><div class="cards cards--3">
    ${focus('mist', 3, 'Design Systems', 'Bibliotecas de componentes, tokens e documentação, inclusive legível por IA.', ['Tokens', 'Componentes', 'Documentação'], 'green')}
    ${focus('green', 4, 'Front-end', 'Levo o design até o ar com código limpo, responsivo e fiel ao layout.', ['HTML5', 'CSS3', 'Sass', 'JavaScript', 'Bootstrap', 'Rails (básico)'], 'pink')}
    ${focus('soft', 5, 'IA aplicada ao design', 'IA para otimizar processos, documentação e componentização, com mais qualidade nas entregas.', ['Processos', 'Documentação', 'Componentização'], 'ink')}
  </div></section>

  <section>${secHead('Interesses')}<div class="interests reveal">${[['IA aplicada ao design', 'pink'], ['Design systems para IA', 'mist'], ['Documentação para IA', 'mist'], ['Product Design', 'ink'], ['UX Research', 'mist'], ['Acessibilidade', 'mist'], ['Performance', 'mist'], ['Componentização', 'green'], ['Aprendizado contínuo', 'pink-soft']].map(([t, c]) => `<span class="interest" style="background:var(--${c});${c === 'ink' || c === 'green' ? 'color:#fff' : ''}">${t}</span>`).join('')}</div></section>

  <section>${secHead('Como eu trabalho')}<div class="skills reveal">${['Pensamento estratégico', 'Resolução de problemas', 'Comunicação eficaz', 'Colaboração multidisciplinar', 'Gestão de tempo', 'Adaptabilidade', 'Aprendizado contínuo', 'Organização e documentação de processos'].map((t, i) => `<div class="skill">${spk('green', 26, i)}<span>${t}</span></div>`).join('')}</div></section>

  <section>${secHead('Formação &amp; idiomas')}<div class="cards cards--3 reveal">
    ${card('', 'Graduação', 'Design Gráfico — UNIT', 'Universidade Tiradentes, 2011 – 2015.')}
    ${card('acard--pink', 'Pós-graduação', 'UX/UI e Produtos Digitais — EBAC', 'Em andamento.')}
    ${card('', 'Idiomas', 'Português · Inglês · Espanhol', 'Português nativo; inglês e espanhol intermediários.')}
  </div><div class="cards cards--2 reveal" style="margin-top:16px">
    ${card('acard--white', 'Certificações · UX e Product Design', 'UX Design, UX/UI na Prática, Oficina de Usabilidade, UX Research', 'EBAC, Samsung Ocean e Alura.')}
    ${card('acard--white', 'Certificações · Design Systems e IA', 'DS legíveis por IA · IA, UI e Design System', 'Clube de UI e DesignBoost.')}
  </div></section>

  <section>${secHead('Minha marca')}<div class="brandrow">
    <div class="stack">
      <p class="h4">biatriz é a identidade visual do meu portfólio: logotipo, paleta e padrão gráfico que unem estética e funcionalidade.</p>
      <p class="lead muted">O projeto nasceu da busca por combinar estética e funcionalidade, com foco em entender o público e os objetivos de cada cliente. Foi publicado no Behance em fevereiro de 2024.</p>
      <div><span class="label muted">Campos de criação</span><div class="chips" style="margin-top:12px"><span class="chip">Design de logotipo</span><span class="chip">Branding</span><span class="chip">Design gráfico</span><span class="chip">UI/UX</span></div></div>
      <div><span class="label muted">Ferramentas</span><div class="chips" style="margin-top:12px"><span class="chip">Illustrator</span><span class="chip">Photoshop</span><span class="chip">InDesign</span></div></div>
      <div><span class="label muted">Paleta</span><div class="swatches" style="margin-top:12px"><div class="swatch"><i style="background:#296246"></i><span class="label">Verde · #296246</span></div><div class="swatch"><i style="background:#FFBBD9"></i><span class="label">Rosa · #FFBBD9</span></div><div class="swatch"><i style="background:#FAEFEC"></i><span class="label">Creme · #FAEFEC</span></div></div></div>
      <div><a class="btn btn--dark" href="${site.behanceBrand}" target="_blank" rel="noopener">Ver no Behance ↗</a></div>
    </div>
    <div class="brandimgs reveal"><img src="${base}assets/img/brand/logo-verde.jpg" alt="Logotipo biatriz em verde" loading="lazy"><img src="${base}assets/img/brand/logo-rosa.jpg" alt="Logotipo biatriz em rosa" loading="lazy"><img class="wide" src="${base}assets/img/brand/padrao.jpg" alt="Padrão gráfico da marca" loading="lazy"></div>
  </div></section>

  <section>${secHead('Perfil')}<div class="words reveal"><b>Criativa.</b>${spark('pink', 48, 'spin')}<b class="o">Curiosa.</b>${spark('green', 48, 'spin-r')}<b class="g">Observadora.</b>${spark('ink', 48, 'spin')}<b class="o">Interessada.</b>${spark('pink', 48, 'spin-r')}</div></section>

  <section class="fora">${secHead('Fora das telas')}<div class="cards cards--3">
    <div class="acard acard--pink fall"><span class="label">Hobbies</span><h3 class="h3">Livros, filmes, séries, animes e mangás.</h3><div class="chips">${['Livros', 'Filmes', 'Séries', 'Animes', 'Mangás'].map(c => `<span class="chip chip--ink">${c}</span>`).join('')}</div></div>
    <div class="acard fall"><span class="label">Gosto musical</span><h3 class="h3">Rock e pop, com Pink Floyd, Guns N’ Roses e a-ha na trilha.</h3><div class="chips">${['Rock', 'Pop', 'Pink Floyd', 'Guns N’ Roses', 'a-ha'].map(c => `<span class="chip chip--ink">${c}</span>`).join('')}</div></div>
    <div class="acard fall" style="background:var(--pink)"><span class="label">Curiosidades</span><h3 class="h3">Cultura pop, tecnologia, inteligência artificial, estética e comportamento humano.</h3><div class="chips">${['Cultura pop', 'Tecnologia', 'Inteligência artificial', 'Estética', 'Comportamento humano'].map(c => `<span class="chip chip--ink">${c}</span>`).join('')}</div></div>
  </div></section>

  <section class="about-cta"><h2 class="big" data-type="Bora conversar?" data-hi="conversar" aria-label="Bora conversar?">&nbsp;</h2>
    <div class="btns"><a class="btn btn--pink" href="${site.whatsapp}" target="_blank" rel="noopener">WhatsApp ↗</a><a class="btn btn--light" href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a><a class="btn btn--light" href="${site.behance}" target="_blank" rel="noopener">Behance ↗</a><a class="btn btn--light" href="mailto:${site.email}">E-mail ↗</a></div></section>
</div>
</main>
${footerHTML(base, false)}
` + tail(base);
  return html;
}

// ---------------------------------------------------------------- PROJETOS
function projectPage(p, list) {
  const base = '../../'; const c = p.case; const img = f => `${base}assets/img/cases/${p.slug}/${f}.jpg`;
  const next = list[(list.indexOf(p) + 1) % list.length];
  const dots = '<i style="background:#FF5F57"></i><i style="background:#FEBC2E"></i><i style="background:#28C840"></i>';
  const chipsBlock = (label, arr) => arr && arr.length ? `<div class="grp"><span class="label">${label}</span><div class="chips">${arr.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div></div>` : '';
  const desktop = (c.desktop || []).map(g => `<figure class="reveal"><figcaption class="label">${esc(g.cap)}</figcaption><div class="browser"><div class="browser__bar">${dots}</div>${g.files.map(f => `<img src="${img(f)}" alt="${esc(p.title)} — ${esc(g.cap)}" loading="lazy">`).join('')}</div></figure>`).join('');
  const mobile = c.mobile && c.mobile.length ? `<figure class="reveal"><figcaption class="label">${esc(c.mobileCap || 'Mobile')}</figcaption><div class="phones">${c.mobile.map(f => `<div class="phone"><img src="${img(f)}" alt="${esc(p.title)} — mobile" loading="lazy"></div>`).join('')}</div></figure>` : '';
  return head({ title: `${p.title} — Beatriz Vieira Ramos`, desc: c.lead, base }) + `
${navHTML(base, false)}
<main>
<section class="case-hero"><span class="label">Projeto · ${esc(p.cat)}</span><h1 class="h1">${esc(p.title)}</h1></section>
<section class="case-meta"><div><span class="label">Categoria</span><span class="h4">${esc(p.cat)}</span></div><div><span class="label">Serviços</span><span class="h4">${p.tags.map(esc).join(' · ')}</span></div></section>
<section class="case-scene">${sceneHTML(p, base)}</section>
<section class="case-overview"><div><div class="h3"><span class="g">/</span>Visão geral</div></div><div class="body"><p class="h4">${esc(c.lead)}</p>${c.paras.map(t => `<p>${esc(t)}</p>`).join('')}${chipsBlock('Meu papel', c.role)}${chipsBlock('Ferramentas', c.tools)}</div></section>
<section class="shots"><div class="sec-head" style="margin-bottom:0"><div class="h3"><span>/</span>Telas</div></div>${desktop}${mobile}</section>
<section class="wrap" style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-bottom:96px"><a class="btn btn--outline" href="${base}#projetos">← Voltar aos projetos</a><a class="btn btn--dark" href="${next.live || base + 'projetos/' + next.slug + '/'}"${next.live ? ' target="_blank" rel="noopener"' : ''}>Próximo: ${esc(next.title)} →</a></section>
</main>
${footerHTML(base, false)}
` + tail(base);
}

// ---------------------------------------------------------------- 404
const notFound = () => head({ title: 'Página não encontrada — Beatriz Vieira Ramos', desc: 'Página não encontrada.', base: '/' }) + `
${navHTML('/', false)}
<main class="wrap" style="min-height:80vh;display:grid;place-items:center;text-align:center;padding-top:140px"><div><span class="label g">Erro 404</span><h1 class="h1" style="margin:24px 0 32px">Essa página não existe.</h1><a class="btn btn--dark" href="/">Voltar ao início</a></div></main>
${footerHTML('/', false)}
` + tail('/');

function write(rel, content) { const f = join(ROOT, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, content); }
write('index.html', home());
write('sobre/index.html', about());
const pages = projects.filter(hasPage);
const navList = projects.filter(x => hasPage(x) || x.live); pages.forEach(p => write(`projetos/${p.slug}/index.html`, projectPage(p, navList)));
write('404.html', notFound());
console.log(`ok: home, sobre, ${pages.length} páginas de projeto, 404`);
