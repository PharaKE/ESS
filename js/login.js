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
  const isKh = currentLang === 'kh';

  if (!name || !pass) {
    showToast(isKh ? 'សូមបញ្ចូលឈ្មោះ និងពាក្យសម្ងាត់របស់អ្នក។' : 'Please enter your name and password.', false);
    return;
  }

  if (name === 'Admin' && pass === 'notadmin123') {
    showToast(isKh ? 'សូមស្វាគមន៍ Admin! កំពុងបញ្ជូនទៅកាន់ផ្ទាំងគ្រប់គ្រង…' : 'Welcome, Admin! Redirecting to Admin Panel…');
    setTimeout(() => { window.location.href = 'admin.html'; }, 1500);
    return;
  }

  const found = USERS.find(u => u.name.toLowerCase() === name.toLowerCase() && u.password === pass);
  if (found) {
    showToast((isKh ? 'ចូលគណនីដោយជោគជ័យ! សូមស្វាគមន៍ ' : 'Signed in successfully! Welcome, ') + found.name + '!');
    setTimeout(() => { window.location.href = 'user.html'; }, 1500);
    return;
  }

  showToast((isKh ? 'ចូលគណនីដោយជោគជ័យ! សូមស្វាគមន៍ ' : 'Signed in successfully! Welcome, ') + name + '!');
  setTimeout(() => { window.location.href = 'GEI.html'; }, 1500);
}

function handleRegister() {
  const name     = document.getElementById('reg-name').value.trim();
  const gender   = document.getElementById('reg-gender').value;
  const position = document.getElementById('reg-position').value.trim();
  const org      = document.getElementById('reg-org').value.trim();
  const pass     = document.getElementById('reg-pass').value;
  const confirm  = document.getElementById('reg-confirm').value;
  const isKh     = currentLang === 'kh';

  if (!name)            { showToast(isKh ? 'សូមបញ្ចូលឈ្មោះពេញរបស់អ្នក។' : 'Please enter your full name.', false); return; }
  if (!gender)          { showToast(isKh ? 'សូមជ្រើសរើសភេទរបស់អ្នក។' : 'Please select your gender.', false); return; }
  if (!position)        { showToast(isKh ? 'សូមបញ្ចូលមុខតំណែង ឬមុខរបររបស់អ្នក។' : 'Please enter your position or occupation.', false); return; }
  if (!org)             { showToast(isKh ? 'សូមបញ្ចូលស្ថាប័នរបស់អ្នក។' : 'Please enter your organization.', false); return; }
  if (!pass)            { showToast(isKh ? 'សូមបង្កើតពាក្យសម្ងាត់។' : 'Please create a password.', false); return; }
  if (pass !== confirm) { showToast(isKh ? 'ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។' : 'Passwords do not match.', false); return; }
  if (pass.length < 6)  { showToast(isKh ? 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ។' : 'Password must be at least 6 characters.', false); return; }

  USERS.push({ name, gender, position, org, password: pass });

  showToast((isKh ? 'គណនីបានបង្កើតដោយជោគជ័យ! សូមស្វាគមន៍មកកាន់ KE ESS ' : 'Account created! Welcome to KE ESS, ') + name + '!');
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




/* ═══ LANGUAGE TOGGLE ═══ */
let currentLang = 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'kh' : 'en';
  
  // Toggle body class
  document.body.classList.toggle('lang-kh', currentLang === 'kh');
  
  // Update all toggle button pairs
  const enSpans = document.querySelectorAll('[id^="langEn"]');
  const khSpans = document.querySelectorAll('[id^="langKh"]');
  
  enSpans.forEach(el => el.classList.toggle('active', currentLang === 'en'));
  khSpans.forEach(el => el.classList.toggle('active', currentLang === 'kh'));
  
  // Update text content based on language
  updateLanguage(currentLang);
}

function updateLanguage(lang) {
  const isKh = lang === 'kh';

  // ═══════ LEFT PANEL (Desktop) ═══════
  const lpBrand = document.querySelector('.lp-brand');
  const lpTagline = document.querySelector('.lp-tagline');
  const lpH1 = document.querySelector('.lp-headline h1');
  const lpP = document.querySelector('.lp-headline p');

  if (lpBrand) lpBrand.textContent = isKh ? 'សហគ្រិនខ្មែរ' : 'Khmer Enterprise';
  if (lpTagline) lpTagline.textContent = isKh ? 'ថ្នាលវេទិកាគាំទ្រសហគ្រិនភាព' : 'Entrepreneur Support Platform';

  if (lpH1) {
    lpH1.innerHTML = isKh
      ? 'ការផ្តល់អតិភាព<br><span>សម្រាប់សហគ្រិនភាព</span><br>នៅកម្ពុជា'
      : 'Empowering<br><span>Cambodian</span><br>Entrepreneurs';
  }

  if (lpP) {
    lpP.textContent = isKh
      ? 'ចូលប្រើឧបករណ៍ ព្រមទាំងទិន្នន័យ និងបណ្តាញទំនាក់ទំនង ដើម្បីពង្រីកអាជីវកម្មរបស់លោកអ្នកនៅក្នុងប្រព័ន្ធអេកូឡូស៊ីសហគ្រិនភាពដែលកំពុងតែមានការរីកចម្រើនដុះដាលនៅកម្ពុជា។'
      : 'Access tools, data, and connections to grow your business in Cambodia\'s thriving ecosystem.';
  }

  // Left panel features
  const featTitles = document.querySelectorAll('.lp-feat-title');
  const featDescs = document.querySelectorAll('.lp-feat-desc');
  const featData = isKh ? [
    { title: 'ការវិភាគបណ្តាញទំនាក់ទំនង (SNA)', desc: 'គូសផែនទីទំនាក់ទំនងសហគ្រិនចំនួន ៣៩០+ នៅទូទាំងទីក្រុងធំៗចំនួន ៣' },
    { title: 'សន្ទស្សន៍សហគ្រិនភាពសកល​(GEI)', desc: 'តាមដានចំណាត់ថ្នាក់របស់កម្ពុជាលើសូចនាករសំខាន់ៗចំនួន ១៤ លើវិស័យសហគ្រិនភាព' },
    { title: 'ជំនួយការសហគ្រិន AI', desc: 'ចម្លើយរបស់អ្នកជំនាញភ្លាមៗសម្រាប់ដំណើរសហគ្រិនភាពរបស់អ្នក' },
  ] : [
    { title: 'Social Network Analysis', desc: 'Map 390+ entrepreneur connections across 3 cities' },
    { title: 'Global Entrepreneurship Index', desc: 'Track Cambodia\'s ranking across 14 key indicators' },
    { title: 'AI Business Assistant', desc: 'Instant expert answers for your entrepreneurship journey' },
  ];

  featTitles.forEach((el, i) => { if (featData[i]) el.textContent = featData[i].title; });
  featDescs.forEach((el, i) => { if (featData[i]) el.textContent = featData[i].desc; });

  // Left panel stats
  const statLabels = document.querySelectorAll('.lp-stat-label');
  const statKhLabels = ['សហគ្រិន', 'ទីក្រុង', 'ដៃគូ ESOs', 'ឆ្នាំទិន្នន័យ'];
  const statEnLabels = ['Entrepreneurs', 'Cities', 'ESO Partners', 'Data Year'];

  statLabels.forEach((el, i) => {
    el.textContent = isKh ? statKhLabels[i] : statEnLabels[i];
  });

  // ═══════ RIGHT PANEL: TABS ═══════
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');

  if (tabLogin) {
    const svg = tabLogin.querySelector('svg');
    tabLogin.innerHTML = '';
    if (svg) tabLogin.appendChild(svg.cloneNode(true));
    tabLogin.appendChild(document.createTextNode(isKh ? ' ចូលគណនី' : ' Sign In'));
  }
  if (tabRegister) {
    const svg = tabRegister.querySelector('svg');
    tabRegister.innerHTML = '';
    if (svg) tabRegister.appendChild(svg.cloneNode(true));
    tabRegister.appendChild(document.createTextNode(isKh ? ' បង្កើតគណនី' : ' Create Account'));
  }

  // ═══════ FORM HEADINGS ═══════
  const loginTitle = document.querySelector('#form-login .form-title');
  const loginSub = document.querySelector('#form-login .form-sub');
  const regTitle = document.querySelector('#form-register .form-title');
  const regSub = document.querySelector('#form-register .form-sub');

  if (loginTitle) loginTitle.textContent = isKh ? 'សូមស្វាគមន៍' : 'Welcome back';
  if (loginSub) loginSub.textContent = isKh ? 'សូមចូលដោយប្រើឈ្មោះ និងពាក្យសម្ងាត់' : 'Sign in with your name and password';
  if (regTitle) regTitle.textContent = isKh ? 'ចូលរួមប្រព័ន្ធអេកូឡូស៊ីសហគ្រិនភាព' : 'Join the ecosystem';
  if (regSub) regSub.textContent = isKh ? 'បង្កើតគណនី KE ឥតគិតថ្លៃ' : 'Create your free KE Ecosystem account';

  // ═══════ LABELS & PLACEHOLDERS ═══════
  const labelMap = {
    'login-name':   { label: ['Full Name', 'ឈ្មោះពេញ'], placeholder: ['Enter your full name', 'បញ្ចូលឈ្មោះពេញ'] },
    'login-pass':   { label: ['Password', 'ពាក្យសម្ងាត់'], placeholder: ['••••••••', '••••••••'] },
    'reg-name':     { label: ['Full Name', 'ឈ្មោះពេញ'], placeholder: ['e.g. Ching Tong', 'ឧ. ឈីង តុង'] },
    'reg-gender':   { label: ['Gender', 'ភេទ'] },
    'reg-position': { label: ['Position / Occupation', 'មុខតំណែង / មុខរបរ'], placeholder: ['e.g. Student', 'ឧ. និស្សិត'] },
    'reg-org':      { label: ['Organization', 'ស្ថាប័ន'], placeholder: ['e.g. ITC', 'ឧ. វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា'] },
    'reg-pass':     { label: ['Create Password', 'បង្កើតពាក្យសម្ងាត់'], placeholder: ['Create a strong password', 'បង្កើតពាក្យសម្ងាត់រឹងមាំ'] },
    'reg-confirm':  { label: ['Confirm Password', 'បញ្ជាក់ពាក្យសម្ងាត់'], placeholder: ['Re-enter your password', 'បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត'] },
  };

  Object.entries(labelMap).forEach(([inputId, texts]) => {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (texts.placeholder) input.placeholder = isKh ? texts.placeholder[1] : texts.placeholder[0];
    const label = input.closest('.field')?.querySelector('.field-label');
    if (label) label.textContent = isKh ? texts.label[1] : texts.label[0];
  });

  // ═══════ GENDER SELECT ═══════
  const genderSelect = document.getElementById('reg-gender');
  if (genderSelect) {
    const options = genderSelect.querySelectorAll('option');
    const genderMap = {
      '':                   ['Select gender…', 'ជ្រើសរើសភេទ…'],  // ← KEY FIX: match empty value
      'Male':               ['Male', 'ប្រុស'],
      'Female':             ['Female', 'ស្រី'],
      'Prefer not to say':  ['Prefer not to say', 'មិនចង់បញ្ជាក់'],
    };
    options.forEach(opt => {
      const key = opt.value; // Use the actual value, including empty string
      if (genderMap[key] !== undefined) {
        opt.textContent = isKh ? genderMap[key][1] : genderMap[key][0];
      }
    });
  }

  // ═══════ STRENGTH METER ═══════
  const strengthLabel = document.getElementById('strength-label');
  if (strengthLabel) {
    const currentText = strengthLabel.textContent;
    const strengthMap = {
      'Enter password':       ['Enter password', 'បញ្ចូលពាក្យសម្ងាត់'],
      'Too short':            ['Too short', 'ខ្លីពេក'],
      'Weak':                 ['Weak', 'ខ្សោយ'],
      'Good':                 ['Good', 'ល្អ'],
      'Strong':               ['Strong', 'រឹងមាំ'],
    };
    for (const [en, texts] of Object.entries(strengthMap)) {
      if (currentText === en || currentText === texts[1]) {
        strengthLabel.textContent = isKh ? texts[1] : texts[0];
        break;
      }
    }
  }

  // ═══════ SUBMIT BUTTONS ═══════
  const loginBtn = document.querySelector('#form-login .submit-btn');
  const regBtn = document.querySelector('#form-register .submit-btn');
  if (loginBtn) {
    const svg = loginBtn.querySelector('svg');
    loginBtn.innerHTML = '';
    if (svg) loginBtn.appendChild(svg.cloneNode(true));
    loginBtn.appendChild(document.createTextNode(isKh ? ' ចូលទៅកាន់ប្រព័ន្ធ' : ' Sign In to Platform'));
  }
  if (regBtn) {
    const svg = regBtn.querySelector('svg');
    regBtn.innerHTML = '';
    if (svg) regBtn.appendChild(svg.cloneNode(true));
    regBtn.appendChild(document.createTextNode(isKh ? ' បង្កើតគណនីឥតគិតថ្លៃ' : ' Create Free Account'));
  }

  // ═══════ SWITCH NOTES ═══════
  document.querySelectorAll('.switch-note').forEach(el => {
    if (el.closest('#form-login')) {
      el.innerHTML = isKh
        ? 'មិនទាន់មានគណនី? <a onclick="switchTab(\'register\')">បង្កើតមួយឥតគិតថ្លៃ</a>'
        : 'Don\'t have an account? <a onclick="switchTab(\'register\')">Create one free</a>';
    } else {
      el.innerHTML = isKh
        ? 'មានគណនីរួចហើយ? <a onclick="switchTab(\'login\')">ចូលគណនី</a>'
        : 'Already have an account? <a onclick="switchTab(\'login\')">Sign in</a>';
    }
  });

  // ═══════ CHECKBOX & FORGOT ═══════
  const checkLabel = document.querySelector('.check-label');
  if (checkLabel) {
    const checkbox = checkLabel.querySelector('input');
    checkLabel.innerHTML = '';
    if (checkbox) checkLabel.appendChild(checkbox.cloneNode(true));
    checkLabel.appendChild(document.createTextNode(isKh ? ' ចងចាំខ្ញុំ' : ' Remember me'));
  }
  const forgotLink = document.querySelector('.link-sm');
  if (forgotLink) forgotLink.textContent = isKh ? 'ភ្លេចពាក្យសម្ងាត់?' : 'Forgot password?';

  // ═══════ MOBILE TOP BAR ═══════
  const mobBarName = document.querySelector('.mob-bar-name');
  const mobBarSub = document.querySelector('.mob-bar-sub');
  if (mobBarName) mobBarName.textContent = isKh ? 'សហគ្រិនខ្មែរ' : 'Khmer Enterprise';
  if (mobBarSub) mobBarSub.textContent = isKh ? 'ថ្នាលវេទិកាគាំទ្រសហគ្រិន' : 'Entrepreneur Support Platform';

  // ═══════ COPYRIGHT ═══════
  const copyright = document.querySelector('.copyright');
  if (copyright) {
    copyright.textContent = isKh
      ? '© ២០២៦ សូមរក្សាសិទ្ធិដោយ ·​​ សហគ្រិនខ្មែរ'
      : '© 2026 Khmer Enterprise · All rights reserved';
  }

  // ═══════ TOGGLE BUTTONS (sync both desktop & mobile) ═══════
  document.querySelectorAll('[id^="langEn"]').forEach(el => el.classList.toggle('active', !isKh));
  document.querySelectorAll('[id^="langKh"]').forEach(el => el.classList.toggle('active', isKh));
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  // Default to English
  updateLanguage('en');
});
