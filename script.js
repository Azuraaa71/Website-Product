    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    function closeMobileNav() {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          const cards = e.target.querySelectorAll('.feature-card, .spec-item');
          cards.forEach((c, i) => {
            c.style.transitionDelay = `${i * 80}ms`;
          });
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => observer.observe(r));

    // Nav active link on scroll
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
      });
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--white)' : '';
      });
    });