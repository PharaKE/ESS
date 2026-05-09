/* ════════════════════════════════
   KE · user.js — Profile Page
════════════════════════════════ */

/* ── Avatar image map ── */
const AVATARS = {
  male:   { label: 'Male',   src: 'images/man_profile.jpg' },
  female: { label: 'Female', src: 'images/woman_profile.jpg' },
  dog:    { label: 'Dog',    src: 'images/dog_profile.jpg' },
  cat:    { label: 'Cat',    src: 'images/cat_profile.jpg' },
};

let currentAvatar = 'male';

function setAvatar(key, btn) {
  currentAvatar = key;
  const av    = AVATARS[key];
  const img   = document.getElementById('avatarImg');
  const label = document.getElementById('avatarLabel');
  const wrap  = document.getElementById('avatarWrap');

  // Animate out → swap → animate in
  wrap.style.transform = 'scale(0.88)';
  wrap.style.opacity   = '0.6';
  setTimeout(() => {
    img.src             = av.src;
    img.alt             = av.label;
    label.textContent   = av.label;
    wrap.style.transform = '';
    wrap.style.opacity   = '';
  }, 180);

  // Update active button in dropdown
  document.querySelectorAll('.av-drop-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Close dropdown after selection
  closeAvatarDropdown();
}

function toggleAvatarDropdown(e) {
  e.stopPropagation();
  const dd = document.getElementById('avatarDropdown');
  const isOpen = dd.classList.contains('open');
  if (isOpen) {
    closeAvatarDropdown();
  } else {
    dd.classList.add('open');
    // Close when clicking outside
    setTimeout(() => document.addEventListener('click', outsideAvatarClick), 0);
  }
}

function closeAvatarDropdown() {
  const dd = document.getElementById('avatarDropdown');
  if (dd) dd.classList.remove('open');
  document.removeEventListener('click', outsideAvatarClick);
}

function outsideAvatarClick(e) {
  const dd  = document.getElementById('avatarDropdown');
  const btn = document.getElementById('avatarEditBtn');
  if (dd && !dd.contains(e.target) && e.target !== btn) {
    closeAvatarDropdown();
  }
}

/* ── Edit Modal ── */
function openEditModal() {
  document.getElementById('edit-name').value     = document.getElementById('profileName').textContent;
  document.getElementById('edit-gender').value   = document.getElementById('detailGender').textContent;
  document.getElementById('edit-position').value = document.getElementById('detailPosition').textContent;
  document.getElementById('edit-org').value      = document.getElementById('detailOrg').textContent;

  // Clear password fields on open
  document.getElementById('edit-current-pw').value  = '';
  document.getElementById('edit-new-pw').value       = '';
  document.getElementById('edit-confirm-pw').value   = '';

  document.getElementById('editModal').classList.add('open');
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('open');
}

function closeEditModalOutside(e) {
  if (e.target === document.getElementById('editModal')) closeEditModal();
}

function saveProfile() {
  const name     = document.getElementById('edit-name').value.trim();
  const gender   = document.getElementById('edit-gender').value;
  const position = document.getElementById('edit-position').value.trim();
  const org      = document.getElementById('edit-org').value.trim();
  const currentPw = document.getElementById('edit-current-pw').value;
  const newPw     = document.getElementById('edit-new-pw').value;
  const confirmPw = document.getElementById('edit-confirm-pw').value;

  // Validate name
  if (!name) { showToast('Name cannot be empty.', false); return; }

  // Validate password fields only if user started filling them
  const pwAttempted = currentPw || newPw || confirmPw;
  if (pwAttempted) {
    if (!currentPw) { showToast('Please enter your current password.', false); return; }
    if (newPw.length < 6) { showToast('New password must be at least 6 characters.', false); return; }
    if (newPw !== confirmPw) { showToast('New passwords do not match.', false); return; }
    // NOTE: In a real app, verify currentPw against the server here.
  }

  // Update hero
  document.getElementById('profileName').textContent = name;
  document.getElementById('profileRole').textContent = position + ' · ' + org;
  document.getElementById('profileGender').textContent = gender;
  document.getElementById('profilePosition').textContent = position;
  document.getElementById('profileOrg').textContent = org;

  // Update detail list
  document.getElementById('detailName').textContent     = name;
  document.getElementById('detailGender').textContent   = gender;
  document.getElementById('detailPosition').textContent = position;
  document.getElementById('detailOrg').textContent      = org;

  closeEditModal();
  showToast(pwAttempted ? 'Profile & password updated!' : 'Profile updated successfully!');
}

/* ── Toast ── */
function showToast(msg, success = true) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.style.borderColor = success ? 'rgba(26,155,95,0.28)' : 'rgba(220,50,50,0.28)';
  t.querySelector('.toast-icon-wrap').style.background = success ? 'rgba(26,155,95,0.12)' : 'rgba(220,50,50,0.10)';
  t.querySelector('svg').style.stroke = success ? 'var(--green-dark)' : '#dc3232';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── Mobile Sidebar — uses .open class (mirrors SNA.css) ── */
function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const isOpen  = sidebar.classList.contains('open');

  sidebar.classList.toggle('open', !isOpen);
  overlay.classList.toggle('active', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

/* ── Mobile Nav Scroll ── */
function scrollToSection(sectionId, btn) {
  const target = document.getElementById(sectionId);
  if (target) {
    const offset = 70; // topbar height
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // Update active state
  document.querySelectorAll('.mob-nav-item').forEach(item => item.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  // Set default avatar button state
  const defaultBtn = document.querySelector('.av-drop-btn[data-av="male"]');
  if (defaultBtn) defaultBtn.classList.add('active');

  // Add transition style to avatar wrap for smooth swap
  const wrap = document.getElementById('avatarWrap');
  if (wrap) wrap.style.transition = 'transform 0.18s ease, opacity 0.18s ease';

  // Hide loader
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity    = '0';
      loader.style.transition = 'opacity 0.4s';
      setTimeout(() => loader.style.display = 'none', 400);
    }
  }, 700);
});
