/* MS Loisirs — vanilla JS, no deps */
(() => {
  const $  = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

  // Année footer
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  // Menu mobile
  const nav = $('.nav');
  const toggle = $('.nav__toggle');
  if (toggle && nav){
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nav__list a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Filtres
  const chips = $$('.chip');
  const cards = $$('.card');
  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('is-active'));
    c.classList.add('is-active');
    const f = c.dataset.filter;
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').split(/\s+/);
      card.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
    });
  }));

  // Langue (FR/ES/EN/DE) — bascule sur les blocs annotés [data-i18n] > [data-lang]
  const langButtons = $$('.lang button');
  function setLang(lang){
    langButtons.forEach(b => {
      const a = b.dataset.lang === lang;
      b.classList.toggle('is-active', a);
      b.setAttribute('aria-pressed', String(a));
    });
    $$('[data-i18n] [data-lang]').forEach(el => {
      el.hidden = el.dataset.lang !== lang;
    });
    document.documentElement.lang = lang;
  }
  langButtons.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  // Reveals
  const io = ('IntersectionObserver' in window)
    ? new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
      }, { threshold: .12, rootMargin: '0px 0px -8% 0px' })
    : null;
  $$('.section-head, .card, .promo__grid > *, .region__copy, .region__photo, .activities li, .owners__inner > *, .contact__card, .contact__form')
    .forEach((el,i) => {
      el.setAttribute('data-reveal','');
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
      if (io) io.observe(el); else el.classList.add('is-in');
    });
})();
