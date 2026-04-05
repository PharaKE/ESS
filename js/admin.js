/* ════════════════════════════════
   KE · Admin Dashboard — admin.js
════════════════════════════════ */

/* ──────────────────────────────
   1. MOCK DATA STORE
────────────────────────────── */
const Store = {
  /* Registered users */
  users: [
    { id:1, name:"Sophea Kem",      email:"sophea@example.com",  role:"Entrepreneur", org:"KE Hub",          status:"active",   joined:"2025-01-10", lastSeen:"2025-07-14 09:22", location:"Phnom Penh" },
    { id:2, name:"Dara Chan",       email:"dara@startup.kh",     role:"Mentor",       org:"StartupCambodia", status:"active",   joined:"2025-02-03", lastSeen:"2025-07-13 16:45", location:"Siem Reap" },
    { id:3, name:"Maly Heng",       email:"maly.h@invest.kh",    role:"Investor",     org:"Mekong Cap",      status:"pending",  joined:"2025-03-22", lastSeen:"2025-07-12 11:00", location:"Phnom Penh" },
    { id:4, name:"Pisey Nhem",      email:"pisey@sme.gov.kh",    role:"ESO",          org:"MOE Cambodia",    status:"active",   joined:"2025-04-05", lastSeen:"2025-07-14 07:58", location:"Battambang" },
    { id:5, name:"Rathana Vong",    email:"rathana@tech.kh",     role:"Entrepreneur", org:"TechBridge KH",   status:"inactive", joined:"2025-04-18", lastSeen:"2025-06-30 14:22", location:"Phnom Penh" },
    { id:6, name:"Bopha Lim",       email:"bopha@finance.kh",    role:"Investor",     org:"Dragon Cap",      status:"active",   joined:"2025-05-09", lastSeen:"2025-07-13 10:12", location:"Siem Reap" },
    { id:7, name:"Vuthy Sao",       email:"vuthy@agri.kh",       role:"Entrepreneur", org:"AgriTech KH",     status:"active",   joined:"2025-05-20", lastSeen:"2025-07-14 08:45", location:"Kampong Cham" },
    { id:8, name:"Chenda Ros",      email:"chenda@sna.kh",       role:"Researcher",   org:"RUPP",            status:"pending",  joined:"2025-06-01", lastSeen:"2025-07-11 13:30", location:"Phnom Penh" },
  ],

  /* Ecosystem matching submissions */
  matchSubmissions: [
    { id:1, user:"Sophea Kem",    type:"Funding",       sector:"FinTech",    stage:"Early",   need:"$50k seed",       status:"matched",  submitted:"2025-07-01", matchedWith:"Mekong Cap" },
    { id:2, user:"Vuthy Sao",     type:"Mentorship",    sector:"AgriTech",   stage:"Scaling", need:"Export strategy", status:"matched",  submitted:"2025-07-02", matchedWith:"Dara Chan" },
    { id:3, user:"Rathana Vong",  type:"Partnership",   sector:"EdTech",     stage:"Early",   need:"Tech partner",    status:"pending",  submitted:"2025-07-05", matchedWith:"—" },
    { id:4, user:"Chenda Ros",    type:"Funding",       sector:"HealthTech", stage:"Ideation",need:"Grant $20k",       status:"reviewing",submitted:"2025-07-08", matchedWith:"—" },
    { id:5, user:"Pisey Nhem",    type:"ESO Support",   sector:"General",    stage:"Scaling", need:"Policy advisory",  status:"matched",  submitted:"2025-07-10", matchedWith:"MOE Cambodia" },
    { id:6, user:"Bopha Lim",     type:"Funding",       sector:"Tourism",    stage:"Early",   need:"$80k Series A",   status:"pending",  submitted:"2025-07-12", matchedWith:"—" },
  ],

  /* System access logs */
  accessLogs: [
    { id:1,  ip:"103.7.184.12",  user:"Sophea Kem",   action:"Login",         module:"SNA Dashboard",    time:"2025-07-14 09:22:10", status:"success" },
    { id:2,  ip:"203.81.56.44",  user:"Dara Chan",    action:"View",          module:"GEI Index",        time:"2025-07-14 09:18:03", status:"success" },
    { id:3,  ip:"103.7.184.77",  user:"Unknown",      action:"Login Attempt", module:"Admin Panel",      time:"2025-07-14 09:15:55", status:"failed" },
    { id:4,  ip:"112.213.88.22", user:"Pisey Nhem",   action:"Export",        module:"SNA Data",         time:"2025-07-14 08:58:30", status:"success" },
    { id:5,  ip:"103.7.184.12",  user:"Vuthy Sao",    action:"Submit",        module:"Ecosystem Match",  time:"2025-07-14 08:45:17", status:"success" },
    { id:6,  ip:"119.93.45.67",  user:"Bopha Lim",    action:"Login",         module:"Portal",           time:"2025-07-13 16:50:22", status:"success" },
    { id:7,  ip:"203.81.56.44",  user:"Dara Chan",    action:"Update",        module:"Profile",          time:"2025-07-13 16:45:40", status:"success" },
    { id:8,  ip:"103.7.184.77",  user:"Unknown",      action:"Login Attempt", module:"Admin Panel",      time:"2025-07-13 14:22:05", status:"failed" },
    { id:9,  ip:"112.213.88.30", user:"Maly Heng",    action:"Login",         module:"Portal",           time:"2025-07-13 11:05:18", status:"success" },
    { id:10, ip:"103.7.200.15",  user:"Chenda Ros",   action:"View",          module:"SNA Dashboard",    time:"2025-07-13 10:30:44", status:"success" },
  ],

  /* GEI countries — first 20 shown in table */
  gei: [
    { country:"Cambodia",    region:"East Asia & Pacific",        income:"Lower middle income", index:36, economic:28, human_capital:40, connectedness:41, governance:27, market_potential:43 },
    { country:"Singapore",   region:"East Asia & Pacific",        income:"High income",         index:87, economic:90, human_capital:88, connectedness:89, governance:95, market_potential:75 },
    { country:"Thailand",    region:"East Asia & Pacific",        income:"Upper middle income",  index:59, economic:54, human_capital:60, connectedness:66, governance:57, market_potential:57 },
    { country:"Vietnam",     region:"East Asia & Pacific",        income:"Lower middle income",  index:49, economic:46, human_capital:63, connectedness:55, governance:41, market_potential:39 },
    { country:"Indonesia",   region:"East Asia & Pacific",        income:"Upper middle income",  index:52, economic:45, human_capital:56, connectedness:57, governance:46, market_potential:55 },
    { country:"Malaysia",    region:"East Asia & Pacific",        income:"Upper middle income",  index:68, economic:66, human_capital:70, connectedness:76, governance:72, market_potential:57 },
    { country:"Philippines", region:"East Asia & Pacific",        income:"Lower middle income",  index:50, economic:42, human_capital:58, connectedness:56, governance:44, market_potential:50 },
    { country:"Myanmar",     region:"East Asia & Pacific",        income:"Lower middle income",  index:33, economic:27, human_capital:38, connectedness:32, governance:24, market_potential:44 },
    { country:"Laos",        region:"East Asia & Pacific",        income:"Lower middle income",  index:31, economic:26, human_capital:36, connectedness:29, governance:22, market_potential:42 },
    { country:"Australia",   region:"East Asia & Pacific",        income:"High income",          index:82, economic:89, human_capital:92, connectedness:74, governance:93, market_potential:63 },
  ],

  /* SNA summary data */
  sna: {
    cities: ["Phnom Penh", "Siem Reap", "Battambang"],
    totals: [270, 60, 60],
    registered: [160, 50, 30],
    mentorship: [98, 21, 41],
    funding: [84, 25, 29],
    peerExchange: [90, 29, 39],
  }
};

/* ──────────────────────────────
   2. NAVIGATION
────────────────────────────── */
function navigate(section) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const sec = document.getElementById('sec-' + section);
  if (sec) sec.classList.add('active');
  document.querySelectorAll('.nav-item[data-nav="' + section + '"]').forEach(n => n.classList.add('active'));

  // Update header title
  const titles = {
    dashboard:  'Dashboard <span>Overview</span>',
    users:      'User <span>Management</span>',
    ecosystem:  'Ecosystem <span>Matching</span>',
    gei:        'GEI <span>Index</span>',
    sna:        'SNA <span>Data</span>',
    logs:       'System <span>Logs</span>',
    settings:   'Admin <span>Settings</span>',
  };
  document.getElementById('header-title').innerHTML = titles[section] || section;

  // Close mobile sidebar
  closeMobileSidebar();
}

/* ──────────────────────────────
   3. SIDEBAR TOGGLE
────────────────────────────── */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const mw = document.getElementById('main-wrap');
  sb.classList.toggle('collapsed');
  mw.classList.toggle('expanded');
}

function openMobileSidebar() {
  document.getElementById('sidebar').classList.add('mobile-open');
  document.getElementById('sidebar-overlay').classList.add('open');
}
function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

/* ──────────────────────────────
   4. DASHBOARD RENDER
────────────────────────────── */
function renderDashboard() {
  // Recent activity log
  const logs = [
    { dot:'green', text:'<strong>Sophea Kem</strong> logged in from Phnom Penh',    time:'9m ago' },
    { dot:'blue',  text:'<strong>Dara Chan</strong> viewed GEI Index data',          time:'18m ago' },
    { dot:'red',   text:'<strong>Failed login attempt</strong> on Admin Panel',       time:'21m ago' },
    { dot:'green', text:'<strong>Pisey Nhem</strong> exported SNA data',             time:'28m ago' },
    { dot:'amber', text:'<strong>Vuthy Sao</strong> submitted Ecosystem Match form', time:'45m ago' },
    { dot:'green', text:'<strong>Bopha Lim</strong> registered new account',         time:'2h ago' },
  ];
  const logHtml = logs.map(l =>
    `<div class="log-item">
      <div class="log-dot ${l.dot}"></div>
      <div class="log-text">${l.text}</div>
      <div class="log-time">${l.time}</div>
    </div>`).join('');
  const logEl = document.getElementById('dash-activity');
  if (logEl) logEl.innerHTML = logHtml;

  // Top GEI countries
  const top = [...Store.gei].sort((a,b)=>b.index - a.index).slice(0,5);
  const topHtml = top.map((c,i) =>
    `<div class="ov-list-item">
      <div class="ov-num">${i+1}</div>
      <div style="flex:1;font-size:12.5px;font-weight:600;color:var(--text-dark)">${c.country}</div>
      <div class="mini-bar-wrap" style="width:120px">
        <div class="mini-bar-track" style="height:6px">
          <div class="mini-bar-fill green" style="width:${c.index}%"></div>
        </div>
        <span class="mini-bar-pct">${c.index}</span>
      </div>
    </div>`).join('');
  const topEl = document.getElementById('dash-top-gei');
  if (topEl) topEl.innerHTML = topHtml;

  // Recent match submissions
  const recentMatch = Store.matchSubmissions.slice(0,4);
  const matchHtml = recentMatch.map(m =>
    `<div class="ov-list-item">
      <div style="flex:1">
        <div style="font-size:12.5px;font-weight:700;color:var(--text-dark)">${m.user}</div>
        <div style="font-size:10.5px;color:var(--text-light)">${m.type} · ${m.sector}</div>
      </div>
      <span class="badge badge-${m.status==='matched'?'green':m.status==='reviewing'?'amber':'blue'}">${m.status}</span>
    </div>`).join('');
  const matchEl = document.getElementById('dash-recent-match');
  if (matchEl) matchEl.innerHTML = matchHtml;
}

/* ──────────────────────────────
   5. USERS TABLE
────────────────────────────── */
let userFilter = '';
let userRoleFilter = 'all';

function renderUsers() {
  const tbody = document.getElementById('users-tbody');
  if (!tbody) return;
  let filtered = Store.users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(userFilter) ||
                        u.email.toLowerCase().includes(userFilter) ||
                        u.org.toLowerCase().includes(userFilter);
    const matchRole   = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchSearch && matchRole;
  });
  tbody.innerHTML = filtered.map(u => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="user-avatar" style="width:32px;height:32px;border-radius:9px;font-size:11px">${u.name.charAt(0)}</div>
          <div>
            <div style="font-weight:700;font-size:12.5px">${u.name}</div>
            <div style="font-size:10.5px;color:var(--text-light)">${u.email}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-${roleColor(u.role)}">${u.role}</span></td>
      <td style="font-size:12px;color:var(--text-mid)">${u.org}</td>
      <td style="font-size:11.5px;color:var(--text-light)">${u.location}</td>
      <td><span class="badge badge-${u.status==='active'?'green':u.status==='pending'?'amber':'gray'}">${u.status}</span></td>
      <td style="font-size:11px;color:var(--text-light)">${u.joined}</td>
      <td style="font-size:11px;color:var(--text-light)">${u.lastSeen}</td>
      <td>
        <div class="action-btns">
          <div class="icon-btn view" onclick="viewUser(${u.id})" title="View"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></div>
          <div class="icon-btn edit" onclick="editUser(${u.id})" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div>
          <div class="icon-btn delete" onclick="deleteUser(${u.id})" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></div>
        </div>
      </td>
    </tr>`).join('');
  document.getElementById('users-count').textContent = `${filtered.length} users`;
}

function roleColor(r) {
  return {Entrepreneur:'green',Mentor:'blue',Investor:'purple',ESO:'amber',Researcher:'gray'}[r] || 'gray';
}

function viewUser(id) {
  const u = Store.users.find(x => x.id === id);
  if (!u) return;
  openModal('User Profile', `
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="display:flex;align-items:center;gap:16px">
        <div class="user-avatar" style="width:56px;height:56px;border-radius:14px;font-size:20px">${u.name.charAt(0)}</div>
        <div>
          <div style="font-size:18px;font-weight:800;color:var(--text-dark)">${u.name}</div>
          <div style="font-size:12px;color:var(--text-light)">${u.email}</div>
          <span class="badge badge-${u.status==='active'?'green':u.status==='pending'?'amber':'gray'}" style="margin-top:4px;display:inline-flex">${u.status}</span>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-group"><span class="form-label">Role</span><div class="form-input" style="background:rgba(26,107,181,0.04)">${u.role}</div></div>
        <div class="form-group"><span class="form-label">Organisation</span><div class="form-input" style="background:rgba(26,107,181,0.04)">${u.org}</div></div>
        <div class="form-group"><span class="form-label">Location</span><div class="form-input" style="background:rgba(26,107,181,0.04)">${u.location}</div></div>
        <div class="form-group"><span class="form-label">Joined</span><div class="form-input" style="background:rgba(26,107,181,0.04)">${u.joined}</div></div>
        <div class="form-group full"><span class="form-label">Last Seen</span><div class="form-input" style="background:rgba(26,107,181,0.04)">${u.lastSeen}</div></div>
      </div>
    </div>`);
}

function editUser(id) {
  const u = Store.users.find(x => x.id === id);
  if (!u) return;
  openModal('Edit User', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="eu-name" value="${u.name}"></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="eu-email" value="${u.email}"></div>
      <div class="form-group"><label class="form-label">Role</label>
        <select class="form-select" id="eu-role">
          ${['Entrepreneur','Mentor','Investor','ESO','Researcher'].map(r => `<option ${r===u.role?'selected':''}>${r}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label class="form-label">Status</label>
        <select class="form-select" id="eu-status">
          ${['active','pending','inactive'].map(s => `<option ${s===u.status?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label class="form-label">Organisation</label><input class="form-input" id="eu-org" value="${u.org}"></div>
      <div class="form-group"><label class="form-label">Location</label><input class="form-input" id="eu-loc" value="${u.location}"></div>
    </div>`,
    () => {
      u.name   = document.getElementById('eu-name').value;
      u.email  = document.getElementById('eu-email').value;
      u.role   = document.getElementById('eu-role').value;
      u.status = document.getElementById('eu-status').value;
      u.org    = document.getElementById('eu-org').value;
      u.location = document.getElementById('eu-loc').value;
      renderUsers();
      showToast('User updated successfully');
      closeModal();
    });
}

function deleteUser(id) {
  const u = Store.users.find(x => x.id === id);
  if (!u) return;
  openModal('Confirm Delete', `<p style="font-size:14px;color:var(--text-mid);line-height:1.6">Are you sure you want to remove <strong>${u.name}</strong> from the system? This action cannot be undone.</p>`,
    () => {
      Store.users = Store.users.filter(x => x.id !== id);
      renderUsers();
      showToast('User deleted', false);
      closeModal();
    }, 'Delete', true);
}

/* ──────────────────────────────
   6. ECOSYSTEM MATCHING TABLE
────────────────────────────── */
function renderEcosystem() {
  const tbody = document.getElementById('eco-tbody');
  if (!tbody) return;
  tbody.innerHTML = Store.matchSubmissions.map(m => `
    <tr>
      <td style="font-weight:700;font-size:12.5px">${m.user}</td>
      <td><span class="badge badge-${typeColor(m.type)}">${m.type}</span></td>
      <td style="font-size:12px;color:var(--text-mid)">${m.sector}</td>
      <td style="font-size:11.5px;color:var(--text-light)">${m.stage}</td>
      <td style="font-size:12px;color:var(--text-dark)">${m.need}</td>
      <td style="font-size:11px;color:var(--text-light)">${m.submitted}</td>
      <td><span class="badge badge-${m.status==='matched'?'green':m.status==='reviewing'?'amber':'blue'}">${m.status}</span></td>
      <td style="font-size:12px;color:var(--text-mid)">${m.matchedWith}</td>
      <td>
        <div class="action-btns">
          <div class="icon-btn edit" onclick="editMatch(${m.id})" title="Edit Status">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
        </div>
      </td>
    </tr>`).join('');
}

function typeColor(t) {
  return {Funding:'purple',Mentorship:'blue','ESO Support':'green',Partnership:'amber'}[t] || 'gray';
}

function editMatch(id) {
  const m = Store.matchSubmissions.find(x => x.id === id);
  if (!m) return;
  openModal('Update Match Status', `
    <div class="form-grid">
      <div class="form-group full"><label class="form-label">Applicant</label><div class="form-input" style="background:rgba(26,107,181,0.04)">${m.user}</div></div>
      <div class="form-group"><label class="form-label">Status</label>
        <select class="form-select" id="em-status">
          ${['pending','reviewing','matched'].map(s=>`<option ${s===m.status?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label class="form-label">Matched With</label><input class="form-input" id="em-match" value="${m.matchedWith}"></div>
      <div class="form-group full"><label class="form-label">Notes</label><textarea class="form-textarea" id="em-notes" placeholder="Add admin notes…"></textarea></div>
    </div>`,
    () => {
      m.status     = document.getElementById('em-status').value;
      m.matchedWith = document.getElementById('em-match').value;
      renderEcosystem();
      showToast('Match record updated');
      closeModal();
    });
}

/* ──────────────────────────────
   7. GEI TABLE
────────────────────────────── */
let geiFilter = '';

function renderGEI() {
  const tbody = document.getElementById('gei-tbody');
  if (!tbody) return;
  let data = Store.gei.filter(c =>
    c.country.toLowerCase().includes(geiFilter) ||
    c.region.toLowerCase().includes(geiFilter)
  );
  tbody.innerHTML = data.map(c => `
    <tr>
      <td style="font-weight:700;font-size:12.5px">${c.country}</td>
      <td style="font-size:11.5px;color:var(--text-light)">${c.region}</td>
      <td><span class="badge badge-${incomeColor(c.income)}">${c.income}</span></td>
      <td class="${scoreClass(c.index)}">${c.index}</td>
      <td style="font-size:12px">${c.economic}</td>
      <td style="font-size:12px">${c.human_capital}</td>
      <td style="font-size:12px">${c.connectedness}</td>
      <td style="font-size:12px">${c.governance}</td>
      <td style="font-size:12px">${c.market_potential}</td>
      <td>
        <div class="action-btns">
          <div class="icon-btn edit" onclick="editGEI('${c.country}')" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
        </div>
      </td>
    </tr>`).join('');
}

function incomeColor(i) {
  return {'High income':'green','Upper middle income':'blue','Lower middle income':'amber','Low income':'red'}[i] || 'gray';
}
function scoreClass(s) {
  return s >= 65 ? 'score-high' : s >= 40 ? 'score-mid' : 'score-low';
}

function editGEI(country) {
  const c = Store.gei.find(x => x.country === country);
  if (!c) return;
  const fields = ['economic','human_capital','connectedness','governance','market_potential'];
  openModal(`Edit GEI — ${c.country}`, `
    <div class="form-grid">
      <div class="form-group full"><label class="form-label">Country</label><div class="form-input" style="background:rgba(26,107,181,0.04)">${c.country} · ${c.region}</div></div>
      <div class="form-group"><label class="form-label">Index Score</label><input class="form-input" id="gei-index" type="number" min="0" max="100" value="${c.index}"></div>
      <div class="form-group"><label class="form-label">Income Level</label>
        <select class="form-select" id="gei-income">
          ${['High income','Upper middle income','Lower middle income','Low income'].map(i=>`<option ${i===c.income?'selected':''}>${i}</option>`).join('')}
        </select>
      </div>
      ${fields.map(f=>`<div class="form-group"><label class="form-label">${f.replace(/_/g,' ')}</label><input class="form-input" id="gei-${f}" type="number" min="0" max="100" value="${c[f]}"></div>`).join('')}
    </div>`,
    () => {
      c.index          = +document.getElementById('gei-index').value;
      c.income         = document.getElementById('gei-income').value;
      fields.forEach(f => { c[f] = +document.getElementById(`gei-${f}`).value; });
      renderGEI();
      showToast('GEI data updated');
      closeModal();
    });
}

/* ──────────────────────────────
   8. SNA DATA
────────────────────────────── */
function renderSNA() {
  const tbody = document.getElementById('sna-tbody');
  if (!tbody) return;
  const { cities, totals, registered, mentorship, funding, peerExchange } = Store.sna;
  tbody.innerHTML = cities.map((city, i) => `
    <tr>
      <td style="font-weight:700;font-size:13px">${city}</td>
      <td style="font-weight:700;font-size:13px">${totals[i]}</td>
      <td>
        <div class="mini-bar-wrap">
          <div class="mini-bar-track"><div class="mini-bar-fill green" style="width:${Math.round(registered[i]/totals[i]*100)}%"></div></div>
          <span class="mini-bar-pct">${registered[i]}</span>
        </div>
      </td>
      <td>
        <div class="mini-bar-wrap">
          <div class="mini-bar-track"><div class="mini-bar-fill blue" style="width:${Math.round(mentorship[i]/totals[i]*100)}%"></div></div>
          <span class="mini-bar-pct">${mentorship[i]}</span>
        </div>
      </td>
      <td>
        <div class="mini-bar-wrap">
          <div class="mini-bar-track"><div class="mini-bar-fill amber" style="width:${Math.round(peerExchange[i]/totals[i]*100)}%"></div></div>
          <span class="mini-bar-pct">${peerExchange[i]}</span>
        </div>
      </td>
      <td>
        <div class="mini-bar-wrap">
          <div class="mini-bar-track"><div class="mini-bar-fill red" style="width:${Math.round(funding[i]/totals[i]*100)}%"></div></div>
          <span class="mini-bar-pct">${funding[i]}</span>
        </div>
      </td>
      <td>
        <div class="action-btns">
          <div class="icon-btn edit" onclick="editSNA(${i})" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
        </div>
      </td>
    </tr>`).join('');
}

function editSNA(i) {
  const { cities, totals, registered, mentorship, peerExchange, funding } = Store.sna;
  openModal(`Edit SNA — ${cities[i]}`, `
    <div class="form-grid">
      <div class="form-group full"><label class="form-label">City</label><div class="form-input" style="background:rgba(26,107,181,0.04)">${cities[i]}</div></div>
      <div class="form-group"><label class="form-label">Total Entrepreneurs</label><input class="form-input" id="sna-total" type="number" value="${totals[i]}"></div>
      <div class="form-group"><label class="form-label">Registered</label><input class="form-input" id="sna-reg" type="number" value="${registered[i]}"></div>
      <div class="form-group"><label class="form-label">Mentorship Received</label><input class="form-input" id="sna-ment" type="number" value="${mentorship[i]}"></div>
      <div class="form-group"><label class="form-label">Peer Exchange</label><input class="form-input" id="sna-peer" type="number" value="${peerExchange[i]}"></div>
      <div class="form-group"><label class="form-label">External Funding</label><input class="form-input" id="sna-fund" type="number" value="${funding[i]}"></div>
    </div>`,
    () => {
      Store.sna.totals[i]       = +document.getElementById('sna-total').value;
      Store.sna.registered[i]   = +document.getElementById('sna-reg').value;
      Store.sna.mentorship[i]   = +document.getElementById('sna-ment').value;
      Store.sna.peerExchange[i] = +document.getElementById('sna-peer').value;
      Store.sna.funding[i]      = +document.getElementById('sna-fund').value;
      renderSNA();
      showToast('SNA data updated');
      closeModal();
    });
}

/* ──────────────────────────────
   9. ACCESS LOGS
────────────────────────────── */
function renderLogs() {
  const tbody = document.getElementById('logs-tbody');
  if (!tbody) return;
  tbody.innerHTML = Store.accessLogs.map(l => `
    <tr>
      <td style="font-family:monospace;font-size:11.5px;color:var(--text-mid)">${l.ip}</td>
      <td style="font-weight:600;font-size:12.5px">${l.user}</td>
      <td><span class="badge badge-${l.action.includes('Attempt')?'red':l.action==='Login'?'green':l.action==='Export'?'purple':'blue'}">${l.action}</span></td>
      <td style="font-size:12px;color:var(--text-mid)">${l.module}</td>
      <td style="font-size:11px;color:var(--text-light);font-family:monospace">${l.time}</td>
      <td><span class="badge badge-${l.status==='success'?'green':'red'}">${l.status}</span></td>
    </tr>`).join('');
}

/* ──────────────────────────────
   10. MODAL HELPERS
────────────────────────────── */
let _confirmCb = null;

function openModal(title, bodyHtml, confirmCb, confirmLabel = 'Save Changes', isDanger = false) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  const confirmBtn = document.getElementById('modal-confirm');
  confirmBtn.textContent = confirmLabel;
  confirmBtn.className = 'btn ' + (isDanger ? 'btn-danger' : 'btn-primary');
  _confirmCb = confirmCb || null;
  if (!confirmCb) confirmBtn.style.display = 'none';
  else confirmBtn.style.display = '';
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  _confirmCb = null;
}

function modalConfirm() {
  if (_confirmCb) _confirmCb();
}

/* ──────────────────────────────
   11. TOAST
────────────────────────────── */
function showToast(msg, success = true) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.style.borderColor = success ? 'rgba(26,155,95,0.28)' : 'rgba(220,50,50,0.28)';
  t.querySelector('.toast-icon-wrap').style.background = success ? 'rgba(26,155,95,0.12)' : 'rgba(220,50,50,0.10)';
  t.querySelector('.toast-icon-wrap svg').style.stroke = success ? 'var(--green-dark)' : '#dc3232';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ──────────────────────────────
   12. EXPORT CSV
────────────────────────────── */
function exportCSV(type) {
  let csv = '', filename = '';
  if (type === 'users') {
    filename = 'ke_users.csv';
    csv = 'Name,Email,Role,Org,Location,Status,Joined,Last Seen\n' +
      Store.users.map(u => `"${u.name}","${u.email}","${u.role}","${u.org}","${u.location}","${u.status}","${u.joined}","${u.lastSeen}"`).join('\n');
  } else if (type === 'ecosystem') {
    filename = 'ke_ecosystem_matches.csv';
    csv = 'User,Type,Sector,Stage,Need,Submitted,Status,Matched With\n' +
      Store.matchSubmissions.map(m => `"${m.user}","${m.type}","${m.sector}","${m.stage}","${m.need}","${m.submitted}","${m.status}","${m.matchedWith}"`).join('\n');
  } else if (type === 'logs') {
    filename = 'ke_access_logs.csv';
    csv = 'IP,User,Action,Module,Time,Status\n' +
      Store.accessLogs.map(l => `"${l.ip}","${l.user}","${l.action}","${l.module}","${l.time}","${l.status}"`).join('\n');
  } else if (type === 'gei') {
    filename = 'ke_gei_data.csv';
    csv = 'Country,Region,Income,Index,Economic,Human Capital,Connectedness,Governance,Market Potential\n' +
      Store.gei.map(c => `"${c.country}","${c.region}","${c.income}",${c.index},${c.economic},${c.human_capital},${c.connectedness},${c.governance},${c.market_potential}`).join('\n');
  }
  const blob = new Blob([csv], { type:'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href:url, download:filename });
  a.click(); URL.revokeObjectURL(url);
  showToast(`Exported ${filename}`);
}

/* ──────────────────────────────
   13. ADD USER
────────────────────────────── */
function openAddUser() {
  openModal('Add New User', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="au-name" placeholder="Full name"></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="au-email" type="email" placeholder="email@example.com"></div>
      <div class="form-group"><label class="form-label">Role</label>
        <select class="form-select" id="au-role">
          ${['Entrepreneur','Mentor','Investor','ESO','Researcher'].map(r=>`<option>${r}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label class="form-label">Organisation</label><input class="form-input" id="au-org" placeholder="Organisation name"></div>
      <div class="form-group"><label class="form-label">Location</label><input class="form-input" id="au-loc" placeholder="City"></div>
      <div class="form-group"><label class="form-label">Status</label>
        <select class="form-select" id="au-status"><option>active</option><option>pending</option></select>
      </div>
    </div>`,
    () => {
      const name = document.getElementById('au-name').value.trim();
      const email = document.getElementById('au-email').value.trim();
      if (!name || !email) { showToast('Name and email required', false); return; }
      const today = new Date().toISOString().slice(0,10);
      Store.users.push({
        id: Store.users.length + 1,
        name, email,
        role:     document.getElementById('au-role').value,
        org:      document.getElementById('au-org').value || '—',
        location: document.getElementById('au-loc').value || '—',
        status:   document.getElementById('au-status').value,
        joined:   today,
        lastSeen: today + ' —',
      });
      renderUsers();
      showToast('New user added');
      closeModal();
    }, 'Add User');
}

/* ──────────────────────────────
   14. ADD GEI COUNTRY
────────────────────────────── */
function openAddGEI() {
  openModal('Add GEI Country', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Country</label><input class="form-input" id="ag-country" placeholder="Country name"></div>
      <div class="form-group"><label class="form-label">Region</label><input class="form-input" id="ag-region" placeholder="e.g. East Asia & Pacific"></div>
      <div class="form-group"><label class="form-label">Income Level</label>
        <select class="form-select" id="ag-income">
          ${['High income','Upper middle income','Lower middle income','Low income'].map(i=>`<option>${i}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label class="form-label">Index Score</label><input class="form-input" id="ag-index" type="number" min="0" max="100" value="50"></div>
      <div class="form-group"><label class="form-label">Economic</label><input class="form-input" id="ag-economic" type="number" min="0" max="100" value="50"></div>
      <div class="form-group"><label class="form-label">Human Capital</label><input class="form-input" id="ag-hc" type="number" min="0" max="100" value="50"></div>
      <div class="form-group"><label class="form-label">Connectedness</label><input class="form-input" id="ag-conn" type="number" min="0" max="100" value="50"></div>
      <div class="form-group"><label class="form-label">Governance</label><input class="form-input" id="ag-gov" type="number" min="0" max="100" value="50"></div>
      <div class="form-group full"><label class="form-label">Market Potential</label><input class="form-input" id="ag-mp" type="number" min="0" max="100" value="50"></div>
    </div>`,
    () => {
      const country = document.getElementById('ag-country').value.trim();
      if (!country) { showToast('Country name required', false); return; }
      Store.gei.push({
        country, region: document.getElementById('ag-region').value,
        income:          document.getElementById('ag-income').value,
        index:           +document.getElementById('ag-index').value,
        economic:        +document.getElementById('ag-economic').value,
        human_capital:   +document.getElementById('ag-hc').value,
        connectedness:   +document.getElementById('ag-conn').value,
        governance:      +document.getElementById('ag-gov').value,
        market_potential:+document.getElementById('ag-mp').value,
      });
      renderGEI();
      showToast('GEI country added');
      closeModal();
    }, 'Add Country');
}

/* ──────────────────────────────
   15. INIT
────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  navigate('dashboard');
  renderDashboard();
  renderUsers();
  renderEcosystem();
  renderGEI();
  renderSNA();
  renderLogs();

  /* User search */
  const us = document.getElementById('user-search');
  if (us) us.addEventListener('input', e => { userFilter = e.target.value.toLowerCase(); renderUsers(); });

  /* User role filter */
  const rf = document.getElementById('user-role-filter');
  if (rf) rf.addEventListener('change', e => { userRoleFilter = e.target.value; renderUsers(); });

  /* GEI search */
  const gs = document.getElementById('gei-search');
  if (gs) gs.addEventListener('input', e => { geiFilter = e.target.value.toLowerCase(); renderGEI(); });

  /* Close modal on overlay click */
  const mo = document.getElementById('modal-overlay');
  if (mo) mo.addEventListener('click', e => { if (e.target === mo) closeModal(); });

  /* Close mobile sidebar on overlay */
  const so = document.getElementById('sidebar-overlay');
  if (so) so.addEventListener('click', closeMobileSidebar);
});
