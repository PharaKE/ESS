/* ════════════════════════════════
   KE · About KE — aboutke.js
════════════════════════════════ */

/* ── Nav scroll shadow ── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Mobile hamburger ── */
function toggleMenu() {
  const links = document.getElementById('nav-links');
  const burger = document.getElementById('hamburger');
  links.classList.toggle('open');
  burger.classList.toggle('open');
}

/* ── Language toggle ── */
let currentLang = localStorage.getItem('ke-lang') || 'en';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ke-lang', lang);
  document.body.classList.toggle('lang-kh', lang === 'kh');

  // Toggle active button state
  const enBtn = document.querySelector('.lang-option-en');
  const khBtn = document.querySelector('.lang-option-kh');
  if (enBtn) enBtn.classList.toggle('active', lang === 'en');
  if (khBtn) khBtn.classList.toggle('active', lang === 'kh');

  // Update all elements with data-en / data-kh
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = lang === 'kh' ? el.getAttribute('data-kh') : el.getAttribute('data-en');
    if (text) el.textContent = text;
  });
}

function toggleLanguage() {
  applyLanguage(currentLang === 'en' ? 'kh' : 'en');
}

// Apply saved language on load
applyLanguage(currentLang);

/* ── AOS (Animate on Scroll) ── */
function initAOS() {
  const items = document.querySelectorAll('[data-aos]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initAOS);