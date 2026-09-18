// Lumicite — shared chrome behaviour (nav state, mobile menu, scroll reveal).
// Mirrors the equivalent block in index.html so both pages behave identically.

const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a, .nav-cta').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      })
    );
  }
}

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
}

// ── article table of contents ─────────────────────────────
// Collapsed by default on mobile; highlights the section in view on desktop.
const toc = document.getElementById('toc');
if (toc) {
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;
  if (isMobile()) toc.removeAttribute('open');

  const links = Array.from(toc.querySelectorAll('.toc-list a'));
  const targets = links
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter(Boolean);

  links.forEach((a) =>
    a.addEventListener('click', () => { if (isMobile()) toc.removeAttribute('open'); })
  );

  if (targets.length) {
    // Highlight the section the reader is currently inside — the last heading
    // whose top has passed the nav. An observer-band approach leaves the rail
    // blank whenever no heading happens to be on screen.
    let ticking = false;
    const mark = () => {
      ticking = false;
      const y = window.scrollY + 140;
      let active = targets[0];
      for (const t of targets) {
        if (t.getBoundingClientRect().top + window.scrollY <= y) active = t;
      }
      links.forEach((a) =>
        a.classList.toggle('is-current', a.hash.slice(1) === active.id)
      );
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(mark); }
    };
    mark();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }
}
