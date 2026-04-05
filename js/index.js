/* ════════════════════════════════
   KE · About — About.js
════════════════════════════════ */

/* ── Nav scroll state ── */
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Mobile menu toggle ── */
function toggleMenu() {
  const links = document.getElementById('nav-links');
  const btn   = document.getElementById('hamburger');
  if (!links || !btn) return;
  const open = links.classList.toggle('open');
  // Animate hamburger to X
  const spans = btn.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link, .nav-cta').forEach(el => {
  el.addEventListener('click', () => {
    const links = document.getElementById('nav-links');
    const btn   = document.getElementById('hamburger');
    if (links && links.classList.contains('open')) {
      links.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
});

/* ── AOS (Animate On Scroll) — lightweight custom impl ── */
function initAOS() {
  const items = document.querySelectorAll('[data-aos]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.aosDelay || 0);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

/* ── Counter animation ── */
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// Trigger counter when hero stats come into view
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  let counted = false;
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      animateCounters();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(heroStats);
}

/* ── Active nav link on scroll ── */
function updateActiveNav() {
  const sections = ['mission', 'platform', 'gallery', 'methodology', 'cta'];
  const scrollY = window.scrollY + 120;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
      // Could add section-based nav highlighting here
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
});
