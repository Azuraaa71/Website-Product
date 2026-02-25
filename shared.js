// shared.js — nav active, hamburger, scroll reveal, dark/light theme toggle

// Apply theme immediately (before DOMContentLoaded) to prevent flash
(function() {
  const saved = localStorage.getItem('ebook-rdp-theme') || 'dark';
  if (saved === 'light') document.body && document.body.classList.add('light');
})();

document.addEventListener('DOMContentLoaded', () => {

  // Apply theme to body (in case above ran before body existed)
  const saved = localStorage.getItem('ebook-rdp-theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light');

  // ── NAV ACTIVE STATE ──────────────────────────
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── HAMBURGER ─────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
  }
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
    });
  });

  // ── THEME TOGGLE ──────────────────────────────
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      localStorage.setItem('ebook-rdp-theme', isLight ? 'light' : 'dark');
      // Micro-animation on button
      themeBtn.style.transform = 'rotate(20deg) scale(0.85)';
      setTimeout(() => { themeBtn.style.transform = ''; }, 200);
    });
  }

  // ── SCROLL REVEAL ─────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible'), delay);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(r => observer.observe(r));

});
