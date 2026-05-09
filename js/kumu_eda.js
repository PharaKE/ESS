/* ════════════════════════════════
   KE · Kumu & EDA — kumu_eda.js
════════════════════════════════ */

// ─── MOBILE SIDEBAR ───
function toggleMobileSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('show');
}

// ─── LOADER ───
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 900);
});

function scrollToSection(id, btn) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.mob-nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
