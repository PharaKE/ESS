/* ════════════════════════════════
   KE · Login — login.js
════════════════════════════════ */

function switchTab(tab) {
  ['login','register'].forEach(t => {
    document.getElementById('tab-' + t).classList.toggle('active', t === tab);
    document.getElementById('form-' + t).classList.toggle('hidden', t !== tab);
  });
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  if (!email || !pass) { showToast('Please enter your email and password.', false); return; }
  showToast('Signed in successfully! Redirecting…');
  setTimeout(() => { window.location.href = 'SNA.html'; }, 1500);
}

function handleRegister() {
  if (!document.getElementById('terms').checked) {
    showToast('Please accept the Terms of Service.', false); return;
  }
  showToast('Account created! Welcome to KE Ecosystem');
  setTimeout(() => { window.location.href = 'Eco.html'; }, 1500);
}

function handleGoogle() {
  showToast('Connecting with Google…');
  setTimeout(() => {
    showToast('Signed in with Google! Welcome');
    setTimeout(() => { window.location.href = 'Eco.html'; }, 1200);
  }, 1200);
}

function togglePwd(id, btn) {
  const input = document.getElementById(id);
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.querySelector('svg').style.opacity = isText ? '1' : '0.5';
}

function checkStrength(val) {
  const bars  = [1,2,3,4].map(i => document.getElementById('sb' + i));
  const label = document.getElementById('strength-label');
  let s = 0;
  if (val.length >= 6)          s++;
  if (val.match(/[A-Z]/))       s++;
  if (val.match(/[0-9]/))       s++;
  if (val.match(/[^a-zA-Z0-9]/)) s++;
  const colors = ['','#e74c3c','#e67e22','#f1c40f','#1a9b5f'];
  const labels = ['Enter password','Too short','Weak','Good','Strong'];
  bars.forEach((b, i) => {
    b.style.background = i < s ? colors[s] : 'rgba(26,107,181,0.10)';
  });
  label.textContent = labels[s];
  label.style.color = colors[s] || 'var(--text-light)';
}

function showToast(msg, success = true) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.style.borderColor = success ? 'rgba(26,155,95,0.28)' : 'rgba(220,50,50,0.28)';
  t.querySelector('.toast-icon-wrap').style.background = success ? 'rgba(26,155,95,0.12)' : 'rgba(220,50,50,0.10)';
  t.querySelector('svg').style.stroke = success ? 'var(--green-dark)' : '#dc3232';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
