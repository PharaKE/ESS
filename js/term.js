/* ════════════════════════════════
   KE · Terms of Service — term.js
════════════════════════════════ */

// ── Language ──────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('ke-lang') || 'en';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ke-lang', lang);

  // Update all data-en / data-kh elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });

  // Update lang attributes on key containers
  document.documentElement.lang = lang === 'kh' ? 'km' : 'en';

  // Toggle body class for font family
  document.body.classList.toggle('lang-kh', lang === 'kh');

  // Update toggle button active state
  const enOpt = document.querySelector('.lang-option-en');
  const khOpt = document.querySelector('.lang-option-kh');
  if (enOpt && khOpt) {
    enOpt.classList.toggle('active', lang === 'en');
    khOpt.classList.toggle('active', lang === 'kh');
  }
}

function toggleLanguage() {
  applyLanguage(currentLang === 'en' ? 'kh' : 'en');
}

// ── Nav Scroll ────────────────────────────────────────────────────────────
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Hamburger ─────────────────────────────────────────────────────────────
function toggleMenu() {
  const links   = document.getElementById('nav-links');
  const burger  = document.getElementById('hamburger');
  if (!links) return;
  const isOpen = links.classList.toggle('open');
  if (burger) burger.setAttribute('aria-expanded', isOpen);
}

// Close menu when a nav link is clicked on mobile
function initMenuClose() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-links')?.classList.remove('open');
    });
  });
}

// ── TOC Active Highlight ──────────────────────────────────────────────────
function initTOC() {
  const sections = document.querySelectorAll('.tos-section[id]');
  const tocLinks = document.querySelectorAll('.toc-link');
  if (!sections.length || !tocLinks.length) return;

  const NAV_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, {
    rootMargin: `-${NAV_H + 24}px 0px -60% 0px`,
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));

  // Smooth scroll with offset for sticky nav
  tocLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_H - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── Fade-in Sections on Scroll ────────────────────────────────────────────
function initFadeIn() {
  const sections = document.querySelectorAll('.tos-section');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(s => s.style.opacity = 1);
    return;
  }
  sections.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(18px)';
    s.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });
  sections.forEach(s => obs.observe(s));
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  initNavScroll();
  initMenuClose();
  initTOC();
  initFadeIn();
});