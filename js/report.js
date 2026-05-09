/* ════════════════════════════════
   KE · Reports & Research
   report.js
════════════════════════════════ */

let currentFilter = 'all';
let currentSearch = '';

// ─── FILTER BY CATEGORY ───
function filterReports(filter) {
  currentFilter = filter;

  // Update nav buttons
  document.querySelectorAll('.top-nav-item').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.top-nav-item[data-filter="${filter}"]`);
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.mob-nav-item').forEach(b => b.classList.remove('active'));
  const mob = document.querySelector(`.mob-nav-item[data-filter="${filter}"]`);
  if (mob) mob.classList.add('active');

  applyFilters();
}

// ─── SEARCH ───
function searchReports(query) {
  currentSearch = query.toLowerCase().trim();
  applyFilters();
}

// ─── APPLY BOTH FILTER + SEARCH ───
function applyFilters() {
  const cards = document.querySelectorAll('.report-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const category = card.dataset.category || '';
    const title    = (card.dataset.title || '').toLowerCase();
    const desc     = (card.querySelector('.report-desc')?.textContent || '').toLowerCase();
    const allText  = title + ' ' + desc;

    const categoryMatch = currentFilter === 'all' || category === currentFilter;
    const searchMatch   = currentSearch === '' || allText.includes(currentSearch);

    if (categoryMatch && searchMatch) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  // Update count badge
  const badge = document.getElementById('reportCountBadge');
  if (badge) badge.textContent = `${visibleCount} Report${visibleCount !== 1 ? 's' : ''}`;

  // Show/hide empty state
  const emptyState = document.getElementById('emptyState');
  if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';

  // Re-trigger stagger animation on visible cards
  let staggerIdx = 0;
  cards.forEach(card => {
    if (!card.classList.contains('hidden')) {
      staggerIdx++;
      card.style.animationDelay = `${staggerIdx * 0.06}s`;
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = '';
      card.classList.add('fade-in');
    }
  });
}

// ─── MOBILE SIDEBAR ───
function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}

// ─── LOADER ───
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 900);
});
