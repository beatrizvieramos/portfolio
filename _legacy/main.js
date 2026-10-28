// Interações do portfólio (sem dependências)
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // menu mobile
  const nav = $('.nav');
  const burger = $('.nav__burger');
  if (nav && burger) {
    burger.addEventListener('click', () => { nav.classList.toggle('open'); burger.setAttribute('aria-expanded', nav.classList.contains('open')); });
    $$('.nav__links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // item do menu ativo conforme a seção na tela
  const links = $$('.nav__links a[href^="#"], .nav__links a[href*="/#"]');
  const spy = links.map(a => ({ a, el: document.getElementById((a.getAttribute('href').split('#')[1] || '')) })).filter(x => x.el);
  if (spy.length) {
    const onScroll = () => {
      const y = scrollY + innerHeight * 0.35; let cur = null;
      spy.forEach(x => { if (x.el.offsetTop <= y) cur = x; });
      spy.forEach(x => x.a.toggleAttribute('aria-current', x === cur));
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // avatar do hero: o olhar acompanha o mouse (centro, esquerda, direita, baixo)
  const hero = $('.hero');
  if (hero) {
    const imgs = Object.fromEntries($$('.hero__arch img').map(i => [i.dataset.pose, i]));
    let cur = 'center';
    const set = p => { if (p === cur || !imgs[p]) return; imgs[cur].classList.remove('on'); imgs[p].classList.add('on'); cur = p; };
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
      if (dy > 0.22) set('down'); else if (dx < -0.14) set('left'); else if (dx > 0.14) set('right'); else set('center');
    });
    hero.addEventListener('mouseleave', () => set('center'));
  }

  // filtros dos projetos
  const tabs = $$('.tab');
  if (tabs.length) {
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.setAttribute('aria-pressed', x === t));
      const f = t.dataset.filter;
      $$('.card[data-group]').forEach(c => { c.hidden = !(f === 'all' || c.dataset.group === f); });
    }));
  }

  // letras do rodapé (empurram as vizinhas no hover)
  $$('[data-letters]').forEach(el => {
    const text = el.dataset.letters; el.setAttribute('aria-label', text);
    el.innerHTML = [...text].map(ch => ch === ' ' ? '<span class="sp" aria-hidden="true"></span>' : `<span aria-hidden="true">${ch}</span>`).join('');
  });

  // revelar ao rolar + queda em cascata + digitação
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.matches('[data-type]')) typeWrite(e.target);
  }), { threshold: 0.25 });
  $$('.reveal, .fall, [data-type]').forEach(el => io.observe(el));
  $$('.fall').forEach((el, i) => el.style.setProperty('--d', `${(i % 3) * 0.45}s`));

  function typeWrite(el) {
    const full = el.dataset.type, hi = el.dataset.hi || '';
    if (reduce) { el.innerHTML = markup(full.length); return; }
    el.classList.add('type-cur'); let n = 0;
    const tick = () => { el.innerHTML = markup(++n); if (n < full.length) setTimeout(tick, 70); else setTimeout(() => el.classList.remove('type-cur'), 1800); };
    setTimeout(tick, 300);
    function markup(k) { const s = full.slice(0, k); if (!hi) return s; const i = full.indexOf(hi); if (i < 0 || k <= i) return s; return s.slice(0, i) + '<span class="p">' + s.slice(i) + '</span>'; }
  }

  // títulos fantasma deslizam levemente com a rolagem
  const ghosts = $$('.ghost');
  if (ghosts.length && !reduce) {
    const upd = () => ghosts.forEach(g => {
      const r = g.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2) / innerHeight - 0.5; g.style.transform = `translateX(calc(-50% + ${p * -120}px))`;
    });
    addEventListener('scroll', upd, { passive: true }); upd();
  }

  // voltar ao topo
  $$('[data-top]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); }));
})();
