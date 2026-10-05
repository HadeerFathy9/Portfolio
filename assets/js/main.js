(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const headerHeight = () => header.offsetHeight;

  /* ---------- Smooth scrolling (Lenis) ---------- */
  let lenis = null;
  if (!reduceMotion && typeof window.Lenis === 'function') {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      autoRaf: true,
    });
  }

  const scrollToTarget = (target) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : -headerHeight() });
    } else {
      const y = typeof target === 'number'
        ? target
        : target.getBoundingClientRect().top + window.scrollY - headerHeight();
      window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (id === '#' || id === '#main') return;
      event.preventDefault();
      closeNav(false);
      if (id === '#top') {
        scrollToTarget(0);
      } else {
        const target = document.querySelector(id);
        if (target) scrollToTarget(target);
      }
      history.replaceState(null, '', id === '#top' ? location.pathname : id);
    });
  });

  /* ---------- Mobile navigation ---------- */
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const toggleLabel = toggle.querySelector('.sr-only');

  nav.querySelectorAll('li').forEach((item, i) => item.style.setProperty('--i', i));

  function openNav() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggleLabel.textContent = 'Close menu';
    document.body.classList.add('nav-open');
    if (lenis) lenis.stop();
    nav.querySelector('a').focus({ preventScroll: true });
  }

  function closeNav(returnFocus = true) {
    if (!nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggleLabel.textContent = 'Open menu';
    document.body.classList.remove('nav-open');
    if (lenis) lenis.start();
    if (returnFocus) toggle.focus({ preventScroll: true });
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('is-open') ? closeNav() : openNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
    if (e.matches) closeNav(false);
  });

  /* ---------- Scroll reveal (once) ---------- */
  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    group.querySelectorAll('[data-reveal]').forEach((el, i) => {
      el.style.setProperty('--stagger', `${Math.min(i, 6) * 70}ms`);
    });
  });

  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Scroll-linked: header border and timeline progress ---------- */
  const timeline = document.querySelector('.timeline');
  const progress = document.querySelector('.timeline-progress');
  let ticking = false;

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);

    if (timeline && progress && !reduceMotion) {
      const rect = timeline.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const ratio = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      progress.style.transform = `scaleY(${ratio})`;
    }
    ticking = false;
  }

  const requestTick = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  };

  if (lenis) lenis.on('scroll', requestTick);
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  onScroll();

  /* ---------- Active navigation link ---------- */
  const navLinks = new Map();
  nav.querySelectorAll('a[href^="#"]').forEach((a) => navLinks.set(a.getAttribute('href').slice(1), a));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = navLinks.get(entry.target.id);
      if (!link || !entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  navLinks.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });

  /* ---------- Footer year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
