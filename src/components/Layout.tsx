import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { site } from '../data/projects';
import { GradStar, asset, Arrow } from './ui';

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const [active, setActive] = useState('');
  const home = pathname === '/';
  const close = () => setOpen(false);
  const to = (id: string) => ({ pathname: '/', hash: `#${id}` });

  // item do menu ativo conforme a seção na tela (Home) ou a página atual
  useEffect(() => {
    if (!home) { setActive(pathname.startsWith('/sobre') ? 'sobre-page' : pathname.startsWith('/projetos') ? 'projetos' : ''); return; }
    const ids = ['projetos', 'servicos', 'ferramentas', 'sobre', 'experiencia', 'contato'];
    const onScroll = () => {
      const y = scrollY + innerHeight * 0.35;
      let cur = '';
      ids.forEach(id => { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
      setActive(cur);
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => removeEventListener('scroll', onScroll);
  }, [home, pathname, hash]);

  const cur = (k: string) => (active === k ? { 'aria-current': 'true' as const } : {});
  return (
    <header className={`nav${open ? ' open' : ''}`} id="top">
      <Link className="nav__logo" to="/" aria-label="biatriz — início" onClick={close}><img src={asset('img/logo/biatriz-rosa.svg')} alt="biatriz" width={139} height={34} /></Link>
      <nav className="nav__links" aria-label="Principal">
        <Link to="/projetos" onClick={close} {...cur('projetos')}>Projetos</Link>
        <Link to={to('servicos')} onClick={close} {...cur('servicos')}>Serviços</Link>
        <Link to={to('ferramentas')} onClick={close} {...cur('ferramentas')}>Ferramentas</Link>
        <Link to="/sobre" onClick={close} {...cur('sobre-page')}>Sobre</Link>
        <Link to={to('experiencia')} onClick={close} {...cur('experiencia')}>Experiência</Link>
        <Link to={to('contato')} onClick={close} {...cur('contato')}>Contato</Link>
      </nav>
      <Link className="btn btn--dark nav__cta" to={to('contato')} onClick={close}>Vamos conversar <Arrow d="ne" /></Link>
      <button className="nav__burger" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(o => !o)}><span /><span /></button>
    </header>
  );
}

function Footer() {
  const to = (id: string) => ({ pathname: '/', hash: `#${id}` });
  const letters = [...'beatriz vieira'];
  return (
    <footer className="footer" id="rodape">
      <i className="fstar spin" style={{ right: '-2%', top: '42%', width: 'min(420px,32vw)' }}><GradStar id="g1" /></i>
      <i className="fstar spin-r" style={{ left: '42%', top: '-6%', width: 120 }}><GradStar id="g2" /></i>
      <Link className="footer__logo" to="/" aria-label="biatriz"><img src={asset('img/logo/biatriz-rosa.svg')} alt="biatriz" width={240} height={59} /></Link>
      <div className="fgrid">
        <div><span className="label">Páginas</span>
          <Link to="/">Home</Link><Link to="/projetos">Projetos</Link><Link to={to('servicos')}>Serviços</Link><Link to={to('ferramentas')}>Ferramentas</Link><Link to="/sobre">Sobre</Link><Link to={to('experiencia')}>Experiência</Link><Link to={to('contato')}>Contato</Link></div>
        <div><span className="label">Social</span>
          <a href={site.behance} target="_blank" rel="noopener">Behance <Arrow d="ne" /></a><a href={site.linkedin} target="_blank" rel="noopener">LinkedIn <Arrow d="ne" /></a><a href={site.whatsapp} target="_blank" rel="noopener">WhatsApp <Arrow d="ne" /></a></div>
        <div><span className="label">Contato</span>
          <a href={`mailto:${site.email}`}>{site.email}</a><a href={site.whatsapp} target="_blank" rel="noopener">{site.phone}</a></div>
        <div><span className="label">Estúdio</span><p>Baseada em Aracaju, Brasil</p><p>Disponível remotamente</p></div>
      </div>
      <div className="fname" aria-label="beatriz vieira">
        {letters.map((ch, i) => (ch === ' ' ? <span className="sp" aria-hidden="true" key={i} /> : <span aria-hidden="true" key={i}>{ch}</span>))}
      </div>
      <div className="fbar"><span>© 2026 Beatriz Vieira Ramos</span><a href="#top" onClick={e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); }}>Voltar ao topo <Arrow d="up" /></a></div>
    </footer>
  );
}

/** Rola para o topo/âncora ao trocar de página, revela elementos ao rolar e move os títulos-fantasma. */
function PageEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    scrollTo({ top: el ? el.getBoundingClientRect().top + scrollY - 70 : 0, behavior: 'instant' as ScrollBehavior });
    html.style.scrollBehavior = '';
  }, [pathname, hash]);

  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal, .fall')];
    document.querySelectorAll('.fall').forEach((el, i) => (el as HTMLElement).style.setProperty('--d', `${(i % 3) * 0.45}s`));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
    }), { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const ghosts = [...document.querySelectorAll<HTMLElement>('.ghost')];
    if (!ghosts.length || reduce) return;
    const upd = () => ghosts.forEach(g => {
      const r = g.parentElement!.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2) / innerHeight - 0.5;
      g.style.transform = `translateX(calc(-50% + ${p * -120}px))`;
    });
    addEventListener('scroll', upd, { passive: true }); upd();
    return () => removeEventListener('scroll', upd);
  }, [pathname]);

  return null;
}


const CURSOR_STAR = 'M16 2C16.9 10.4 21.6 15.1 30 16C21.6 16.9 16.9 21.6 16 30C15.1 21.6 10.4 16.9 2 16C10.4 15.1 15.1 10.4 16 2Z';

/** Cursor próprio: estrela rosa da marca com borda verde; cresce sobre links e botões. Só com mouse. */
function StarCursor() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const d = el.current;
    if (!d) return;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0, on = false;
    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!on) { on = true; x = tx; y = ty; document.documentElement.classList.add('has-star'); d.style.opacity = '1'; }
      const t = e.target as Element | null;
      d.classList.toggle('big', !!t?.closest?.('a,button,[role="button"],.tab,.card,.nav__burger,summary,label,.ch'));
    };
    const leave = () => { d.style.opacity = '0'; };
    const enter = () => { if (on) d.style.opacity = '1'; };
    const tick = () => {
      x += (tx - x) * 0.45; y += (ty - y) * 0.45;
      d.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      document.documentElement.classList.remove('has-star');
    };
  }, []);
  return (
    <div ref={el} className="star-cursor" aria-hidden="true">
      <svg viewBox="0 0 32 32"><path d={CURSOR_STAR} fill="#FFB9DA" stroke="#2B6349" strokeWidth="2" strokeLinejoin="round" /></svg>
    </div>
  );
}

const WA_URL = 'https://wa.me/5579991378686?text=Ol%C3%A1%2C%20quero%20fazer%20um%20or%C3%A7amento%20%E2%9C%A6';

/** Botão flutuante discreto: estrela da marca; ao passar o mouse mostra "Entre em contato" e abre o WhatsApp. */
function WhatsAppFab() {
  const { pathname } = useLocation();
  const [hide, setHide] = useState(false);

  // some quando o rodapé ou os botões de navegação do case estão na tela (evita cobrir "Voltar ao topo" etc.)
  useEffect(() => {
    const targets = [...document.querySelectorAll('#rodape, .case-nav')];
    if (!targets.length) { setHide(false); return; }
    const seen = new Set<Element>();
    const io = new IntersectionObserver(es => {
      es.forEach(e => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setHide(seen.size > 0);
    });
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <a className={`fab${hide ? ' is-hidden' : ''}`} href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="Entre em contato pelo WhatsApp" tabIndex={hide ? -1 : 0}>
      <svg className="fab__star" viewBox="0 0 32 32" aria-hidden="true"><path d={CURSOR_STAR} fill="#2B6349" /></svg>
      <span className="fab__label">Entre em contato</span>
    </a>
  );
}

export function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <PageEffects />
      <StarCursor />
      <WhatsAppFab />
    </>
  );
}

