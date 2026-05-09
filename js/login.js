/* ════════════════════════════════
   KE · Login — login.js
════════════════════════════════ */

const USERS = [];

function switchTab(tab) {
  ['login', 'register'].forEach(t => {
    document.getElementById('tab-' + t).classList.toggle('active', t === tab);
    document.getElementById('form-' + t).classList.toggle('hidden', t !== tab);
  });
}

function handleLogin() {
  const name = document.getElementById('login-name').value.trim();
  const pass = document.getElementById('login-pass').value;

  if (!name || !pass) {
    showToast('Please enter your name and password.', false);
    return;
  }

  if (name === 'Admin' && pass === 'notadmin123') {
    showToast('Welcome, Admin! Redirecting to Admin Panel…');
    setTimeout(() => { window.location.href = 'admin.html'; }, 1500);
    return;
  }

  const found = USERS.find(u => u.name.toLowerCase() === name.toLowerCase() && u.password === pass);
  if (found) {
    showToast('Signed in successfully! Welcome, ' + found.name + '!');
    setTimeout(() => { window.location.href = 'user.html'; }, 1500);
    return;
  }

  showToast('Signed in successfully! Welcome, ' + name + '!');
  setTimeout(() => { window.location.href = 'GEI.html'; }, 1500);
}

function handleRegister() {
  const name     = document.getElementById('reg-name').value.trim();
  const gender   = document.getElementById('reg-gender').value;
  const position = document.getElementById('reg-position').value.trim();
  const org      = document.getElementById('reg-org').value.trim();
  const pass     = document.getElementById('reg-pass').value;
  const confirm  = document.getElementById('reg-confirm').value;

  if (!name)            { showToast('Please enter your full name.', false); return; }
  if (!gender)          { showToast('Please select your gender.', false); return; }
  if (!position)        { showToast('Please enter your position or occupation.', false); return; }
  if (!org)             { showToast('Please enter your organization.', false); return; }
  if (!pass)            { showToast('Please create a password.', false); return; }
  if (pass !== confirm) { showToast('Passwords do not match.', false); return; }
  if (pass.length < 6)  { showToast('Password must be at least 6 characters.', false); return; }

  USERS.push({ name, gender, position, org, password: pass });

  showToast('Account created! Welcome to KE Ecosystem, ' + name + '!');
  setTimeout(() => {
    switchTab('login');
    document.getElementById('login-name').value = name;
  }, 1600);
}

function togglePwd(id, btn) {
  const input = document.getElementById(id);
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.querySelector('svg').style.opacity = isText ? '1' : '0.45';
}

function checkStrength(val) {
  const bars  = [1,2,3,4].map(i => document.getElementById('sb' + i));
  const label = document.getElementById('strength-label');
  let s = 0;
  if (val.length >= 6)            s++;
  if (val.match(/[A-Z]/))         s++;
  if (val.match(/[0-9]/))         s++;
  if (val.match(/[^a-zA-Z0-9]/)) s++;
  const colors = ['', '#e74c3c', '#e67e22', '#f1c40f', '#1a9b5f'];
  const labels = ['Enter password', 'Too short', 'Weak', 'Good', 'Strong'];
  bars.forEach((b, i) => {
    b.style.background = i < s ? colors[s] : '';
  });
  label.textContent  = labels[s];
  label.style.color  = colors[s] || '';
}

function showToast(msg, success = true) {
  const t   = document.getElementById('toast');
  const ico = t.querySelector('.toast-icon-wrap');
  const svg = ico.querySelector('svg');
  document.getElementById('toast-msg').textContent = msg;
  t.style.borderColor     = success ? 'rgba(26,155,95,.28)'  : 'rgba(220,50,50,.28)';
  ico.style.background    = success ? 'rgba(26,155,95,.12)'  : 'rgba(220,50,50,.10)';
  svg.style.stroke        = success ? '#0d6e42'              : '#dc3232';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
