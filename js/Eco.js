/* ════════════════════════════════
   KE · Ecosystem Matching — Eco.js
════════════════════════════════ */

// ── Data (embedded from SNA_2024_cleaned.json) ──
const SNA_DATA = {
  overall: [
    { city:"Phnom Penh", total:270, registered:160, mentorship:98, peerExchange:90, externalFunding:84, ideation:1, early:50, scaling:9, innovative:21, livelihood:87, social:40, traditional:122 },
    { city:"Siem Reap",  total:60,  registered:50,  mentorship:21, peerExchange:29, externalFunding:25, ideation:0, early:8,  scaling:3, innovative:2,  livelihood:1,  social:9,  traditional:48 },
    { city:"Battambang", total:60,  registered:30,  mentorship:41, peerExchange:39, externalFunding:29, ideation:5, early:10, scaling:13,innovative:10, livelihood:0,  social:18, traditional:32 }
  ],
  supportFromESOs: [
    { area:"Business planning and Strategy", pp:51, sr:33, bb:40, total:124 },
    { area:"Financial management and accounting", pp:41, sr:30, bb:26, total:97 },
    { area:"Networking and partnerships", pp:36, sr:14, bb:15, total:65 },
    { area:"Marketing and branding", pp:29, sr:24, bb:23, total:76 },
    { area:"Digital literacy", pp:27, sr:45, bb:35, total:107 },
    { area:"Market access", pp:26, sr:21, bb:18, total:65 },
    { area:"Getting investment ready", pp:24, sr:9,  bb:16, total:49 },
    { area:"Entrepreneurial skill development and training support", pp:23, sr:27, bb:21, total:71 },
    { area:"Human resources support", pp:19, sr:16, bb:18, total:53 },
    { area:"Innovation and R&D", pp:17, sr:7,  bb:19, total:43 },
    { area:"Access to funding", pp:16, sr:12, bb:18, total:46 },
    { area:"Legal and compliance", pp:15, sr:16, bb:17, total:48 },
    { area:"Technical and operational support", pp:10, sr:10, bb:18, total:38 },
    { area:"Logistics and supply chain management", pp:9,  sr:5,  bb:15, total:29 },
    { area:"Access to infrastructure and resources", pp:5, sr:2, bb:13, total:20 }
  ],
  actualNeed: [
    { area:"Business planning and Strategy", pp:141, sr:22, bb:24, total:187 },
    { area:"Financial management and accounting", pp:79, sr:24, bb:12, total:115 },
    { area:"Networking and partnerships", pp:137, sr:4, bb:25, total:166 },
    { area:"Marketing and branding", pp:75, sr:17, bb:12, total:104 },
    { area:"Digital literacy", pp:98, sr:41, bb:37, total:176 },
    { area:"Market access", pp:138, sr:23, bb:33, total:194 },
    { area:"Getting investment ready", pp:69, sr:6, bb:11, total:86 },
    { area:"Entrepreneurial skill development and training support", pp:85, sr:22, bb:19, total:126 },
    { area:"Human resources support", pp:59, sr:11, bb:14, total:84 },
    { area:"Innovation and R&D", pp:90, sr:9, bb:19, total:118 },
    { area:"Access to funding", pp:117, sr:13, bb:24, total:154 },
    { area:"Legal and compliance", pp:45, sr:11, bb:25, total:81 },
    { area:"Technical and operational support", pp:88, sr:11, bb:25, total:124 },
    { area:"Logistics and supply chain management", pp:73, sr:9, bb:24, total:106 },
    { area:"Access to infrastructure and resources", pp:23, sr:2, bb:14, total:39 }
  ]
};

// ESO Organizations (representative data)
const ESO_ORGS = [
  { name:"Khmer Enterprise (KE)", focus:["Business planning and Strategy","Access to funding","Getting investment ready","Innovation and R&D"], city:"Phnom Penh", type:"Government", desc:"National entrepreneurship support agency" },
  { name:"USAID Harvest II", focus:["Market access","Marketing and branding","Digital literacy"], city:"All Cities", type:"Development", desc:"Agriculture & food sector support" },
  { name:"GOPA / EU Support", focus:["Technical and operational support","Digital literacy","Entrepreneurial skill development and training support"], city:"Phnom Penh", type:"Development", desc:"EU-funded technical assistance program" },
  { name:"IFC Cambodia", focus:["Access to funding","Financial management and accounting","Getting investment ready"], city:"Phnom Penh", type:"Finance", desc:"International Finance Corporation support" },
  { name:"IDE Cambodia", focus:["Market access","Logistics and supply chain management","Access to infrastructure and resources"], city:"All Cities", type:"NGO", desc:"International Development Enterprises" },
  { name:"CEDAC", focus:["Agriculture & Food","Networking and partnerships","Human resources support"], city:"All Cities", type:"NGO", desc:"Rural cooperative & agri support" },
  { name:"CCI / DFDL", focus:["Legal and compliance","Financial management and accounting","Business planning and Strategy"], city:"Phnom Penh", type:"Legal", desc:"Business legal & compliance advisory" },
  { name:"Mekong Strategic Partners", focus:["Getting investment ready","Access to funding","Innovation and R&D"], city:"Phnom Penh", type:"Finance", desc:"Investment readiness & advisory" },
  { name:"SWISSCONTACT Cambodia", focus:["Entrepreneurial skill development and training support","Marketing and branding","Digital literacy"], city:"Siem Reap", type:"Development", desc:"Swiss vocational & business training" },
  { name:"NIPTICT", focus:["Digital literacy","Technical and operational support","Innovation and R&D"], city:"Phnom Penh", type:"Academic", desc:"National ICT training institute" },
  { name:"Impact Hub Phnom Penh", focus:["Networking and partnerships","Innovation and R&D","Social business"], city:"Phnom Penh", type:"Accelerator", desc:"Social enterprise co-working hub" },
  { name:"Angkor Enterprise Hub", focus:["Tourism & Hospitality","Marketing and branding","Market access"], city:"Siem Reap", type:"Local", desc:"Tourism business support" },
  { name:"Battambang BIC", focus:["Business planning and Strategy","Networking and partnerships","Technical and operational support"], city:"Battambang", type:"Local", desc:"Business Innovation Centre" }
];

// ── State ──
let userProfile = null;
let charts = {};

// ── Init ──
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => document.getElementById('loader').style.display = 'none', 400);
    populateESOTable();
    populateESOFilter();
  }, 1200);
});

// ── Page Navigation ──
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.top-nav-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.mob-nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelector(`[data-page="${name}"]`) && document.querySelectorAll(`[data-page="${name}"]`).forEach(el => el.classList.add('active'));
}

function toggleMobileSidebar() {
  document.getElementById('sidebar').classList.toggle('mobile-open');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}

// ── Run Matching ──
function runMatching() {
  const name = document.getElementById('f-name').value.trim();
  const city = document.getElementById('f-city').value;
  const sector = document.getElementById('f-sector').value;
  const btype = document.querySelector('input[name="btype"]:checked');
  const stage = document.getElementById('f-stage').value;

  if (!name || !city || !sector || !btype || !stage) {
    alert('Please fill in all required fields (marked with *)');
    return;
  }

  const needs = [...document.querySelectorAll('#needs-checkboxes input:checked')].map(c => c.value);
  if (needs.length === 0) {
    alert('Please select at least one support need');
    return;
  }

  userProfile = {
    name, city, sector,
    btype: btype.value, stage,
    gender: document.getElementById('f-gender').value,
    registered: document.getElementById('f-registered').value,
    employees: document.getElementById('f-employees').value,
    esoSupport: document.getElementById('f-eso').value,
    mentor: document.getElementById('f-mentor').value,
    funded: document.getElementById('f-funded').value,
    desc: document.getElementById('f-desc').value,
    needs
  };

  buildResults();
  buildNetwork();
  buildActionPlan();
  showPage('results');
}

// ── Build Results ──
function buildResults() {
  const p = userProfile;
  const cityData = SNA_DATA.overall.find(d => d.city === p.city) || SNA_DATA.overall[0];
  const cityKey = p.city === 'Phnom Penh' ? 'pp' : p.city === 'Siem Reap' ? 'sr' : 'bb';

  // Score
  let score = 60;
  if (p.esoSupport === 'Yes') score += 10;
  if (p.mentor === 'Yes') score += 10;
  if (p.funded === 'Yes') score += 8;
  if (p.registered === 'Registered') score += 7;
  if (p.needs.length >= 3) score += 5;
  score = Math.min(score, 98);

  document.getElementById('match-score-val').textContent = score + '%';
  const details = [
    p.registered === 'Registered' ? '✅ Registered' : '⚠️ Unregistered',
    p.esoSupport === 'Yes' ? '✅ ESO Engaged' : '📌 ESO Needed',
    p.mentor === 'Yes' ? '✅ Mentored' : '📌 Mentor Needed',
    p.funded === 'Yes' ? '✅ Funded' : '💡 Funding Available'
  ];
  document.getElementById('match-score-details').innerHTML = details.map(d => `<span class="match-badge">${d}</span>`).join('');

  // Profile summary
  const summary = [
    ['Business', p.name],
    ['City', p.city],
    ['Sector', p.sector],
    ['Type', p.btype],
    ['Stage', p.stage],
    ['Employees', p.employees],
    ['Support Needs', p.needs.length + ' areas identified']
  ];
  document.getElementById('profile-summary').innerHTML = summary.map(([l,v]) =>
    `<div class="ps-item"><span class="ps-label">${l}</span><span class="ps-val">${v}</span></div>`
  ).join('');

  // Similar stats
  const esoRate = Math.round((cityData.mentorship / cityData.total) * 100);
  const peerRate = Math.round((cityData.peerExchange / cityData.total) * 100);
  const fundRate = Math.round((cityData.externalFunding / cityData.total) * 100);
  const regRate  = Math.round((cityData.registered / cityData.total) * 100);
  document.getElementById('similar-stats').innerHTML = [
    { txt:`${cityData.total} entrepreneurs surveyed in ${p.city}`, cls:'', icon:'👥' },
    { txt:`${esoRate}% received mentorship support — ${esoRate > 50 ? 'strong' : 'growing'} mentor network`, cls:'blue', icon:'🎓' },
    { txt:`${peerRate}% active in peer exchange programs`, cls:'yellow', icon:'🤝' },
    { txt:`${fundRate}% accessed external funding`, cls:'orange', icon:'💰' },
    { txt:`${regRate}% of businesses formally registered`, cls:'', icon:'📋' }
  ].map(i => `<div class="insight-item ${i.cls}"><span>${i.icon}</span><span>${i.txt}</span></div>`).join('');

  // Gap chart
  const topNeeds = p.needs.slice(0, 5);
  const esoValues = topNeeds.map(n => {
    const row = SNA_DATA.supportFromESOs.find(s => s.area === n);
    return row ? row[cityKey] : 0;
  });
  const needValues = topNeeds.map(n => {
    const row = SNA_DATA.actualNeed.find(s => s.area === n);
    return row ? row[cityKey] : 0;
  });
  const shortLabels = topNeeds.map(n => n.length > 18 ? n.substring(0,16)+'…' : n);

  destroyChart('gapChart');
  charts.gapChart = new Chart(document.getElementById('gapChart'), {
    type: 'bar',
    data: {
      labels: shortLabels,
      datasets: [
        { label: 'ESO Providing', data: esoValues, backgroundColor: 'rgba(26,155,95,0.75)', borderRadius: 5 },
        { label: 'Actual Need', data: needValues, backgroundColor: 'rgba(26,107,181,0.55)', borderRadius: 5 }
      ]
    },
    options: { responsive:true, plugins:{ legend:{ labels:{ font:{ family:'Poppins', size:10 } } } }, scales:{ y:{ ticks:{ font:{ family:'Poppins', size:9 } } }, x:{ ticks:{ font:{ family:'Poppins', size:9 } } } } }
  });

  // Support tags
  const priorityNeeds = p.needs.slice(0, 6);
  document.getElementById('support-tags').innerHTML = priorityNeeds.map((n, i) =>
    `<span class="stag ${i < 2 ? 'high' : i < 4 ? 'med' : 'low'}">${n.length > 22 ? n.substring(0,20)+'…' : n}</span>`
  ).join('');

  // Support match chart
  destroyChart('supportMatchChart');
  const matchScores = priorityNeeds.map(n => {
    const eso = SNA_DATA.supportFromESOs.find(s => s.area === n);
    const need = SNA_DATA.actualNeed.find(s => s.area === n);
    if (!eso || !need) return 0;
    return Math.round((eso[cityKey] / Math.max(need[cityKey], 1)) * 100);
  });
  charts.supportMatchChart = new Chart(document.getElementById('supportMatchChart'), {
    type: 'radar',
    data: {
      labels: priorityNeeds.map(n => n.length > 14 ? n.substring(0,12)+'…' : n),
      datasets: [{
        label: 'ESO Match %',
        data: matchScores,
        backgroundColor: 'rgba(26,155,95,0.15)',
        borderColor: 'rgba(26,155,95,0.8)',
        pointBackgroundColor: '#1a9b5f',
        borderWidth: 2
      }]
    },
    options: { responsive:true, scales:{ r:{ ticks:{ font:{ family:'Poppins', size:9 } }, pointLabels:{ font:{ family:'Poppins', size:9 } } } }, plugins:{ legend:{ labels:{ font:{ family:'Poppins', size:10 } } } } }
  });

  // Funding insights
  const fundInsights = [
    { txt:`${fundRate}% of ${p.city} entrepreneurs secured external funding`, icon:'📊' },
    { txt: p.stage === 'Scaling' ? 'As a scaling business, angel/VC funding is within reach' : p.stage === 'Early' ? 'Grants and seed funding match your early-stage profile' : 'Incubation grants available for ideation-stage ventures', icon:'💡', cls:'blue' },
    { txt: p.funded === 'Yes' ? 'Leverage existing funding to access next growth round' : 'Connect with KE\'s investment readiness program', icon:'🎯', cls:'yellow' },
    { txt:'IFC & Mekong Strategic Partners active in your city', icon:'🏦', cls:'orange' }
  ];
  document.getElementById('funding-insights').innerHTML = fundInsights.map(i =>
    `<div class="insight-item ${i.cls||''}"><span>${i.icon}</span><span>${i.txt}</span></div>`
  ).join('');

  destroyChart('fundingChart');
  charts.fundingChart = new Chart(document.getElementById('fundingChart'), {
    type: 'doughnut',
    data: {
      labels: ['External Funding', 'No Funding Yet', 'In Progress'],
      datasets: [{ data: [fundRate, Math.round((100 - fundRate) * 0.7), Math.round((100 - fundRate) * 0.3)], backgroundColor: ['rgba(26,155,95,0.8)','rgba(26,107,181,0.5)','rgba(200,184,0,0.7)'], borderWidth: 0 }]
    },
    options: { responsive:true, plugins:{ legend:{ position:'bottom', labels:{ font:{ family:'Poppins', size:10 } } } } }
  });
}

// ── Build Network ──
function buildNetwork() {
  if (!userProfile) return;
  const p = userProfile;
  const cityData = SNA_DATA.overall.find(d => d.city === p.city) || SNA_DATA.overall[0];

  document.getElementById('net-peers').textContent = cityData.total;
  document.getElementById('net-esos').textContent = ESO_ORGS.filter(e => e.city === p.city || e.city === 'All Cities').length;
  document.getElementById('net-mentors').textContent = Math.round(cityData.mentorship * 0.3);
  document.getElementById('net-funders').textContent = Math.round(cityData.externalFunding * 0.25);

  // Simple network viz on canvas
  drawNetworkViz();

  // Peer chart
  destroyChart('peerChart');
  charts.peerChart = new Chart(document.getElementById('peerChart'), {
    type: 'bar',
    data: {
      labels: ['Peer Exchange', 'Mentorship', 'Ext. Funding'],
      datasets: SNA_DATA.overall.map((d, i) => ({
        label: d.city,
        data: [d.peerExchange, d.mentorship, d.externalFunding],
        backgroundColor: ['rgba(26,155,95,0.75)','rgba(26,107,181,0.6)','rgba(200,184,0,0.7)'][i],
        borderRadius: 5
      }))
    },
    options: { responsive:true, plugins:{ legend:{ labels:{ font:{ family:'Poppins', size:10 } } } }, scales:{ y:{ ticks:{ font:{ family:'Poppins', size:9 } } }, x:{ ticks:{ font:{ family:'Poppins', size:9 } } } } }
  });

  document.getElementById('peer-insights').innerHTML = [
    { txt:`${cityData.peerExchange} entrepreneurs in ${p.city} actively exchange with peers`, icon:'🔗' },
    { txt:'Join sector-specific peer groups to fast-track growth', icon:'⚡', cls:'blue' },
    { txt:'KE Peer Networks run monthly meetups across all cities', icon:'📅', cls:'yellow' }
  ].map(i => `<div class="insight-item ${i.cls||''}"><span>${i.icon}</span><span>${i.txt}</span></div>`).join('');

  // Network connection cards
  const connections = [
    { type:'ESO', name:'Khmer Enterprise', desc:'Primary support organization for your business stage', tag:'Top Match' },
    { type:'Peer Network', name:`${p.city} ${p.sector} Group`, desc:`Connect with ${p.sector} entrepreneurs in ${p.city}`, tag:'Sector Match' },
    { type:'Mentor', name:'Experienced Mentor', desc:`Sector expert in ${p.sector} business development`, tag:'Recommended' },
    { type:'Investor', name:'Seed Fund Cambodia', desc:'Early-stage funding for SME growth', tag:'Funding' },
    { type:'Training', name:'KE Training Hub', desc:'Free workshops on your identified support needs', tag:'Skills' },
    { type:'Community', name:`${p.city} Business Forum`, desc:'Monthly networking events and business showcases', tag:'Networking' }
  ];
  document.getElementById('network-connections').innerHTML = connections.map(c =>
    `<div class="net-card">
      <div class="net-card-type">${c.type}</div>
      <div class="net-card-name">${c.name}</div>
      <div class="net-card-desc">${c.desc}</div>
      <span class="net-card-tag">${c.tag}</span>
    </div>`
  ).join('');
}

function drawNetworkViz() {
  const canvas = document.getElementById('networkViz');
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const center = { x: w/2, y: h/2 };
  const nodes = [
    { x: w/2, y: h/2, r: 22, label: 'YOU', color: '#1a9b5f' },
    { x: w/2 - 140, y: h/2 - 80, r: 16, label: 'KE', color: '#1a6bb5' },
    { x: w/2 + 130, y: h/2 - 90, r: 14, label: 'ESO', color: '#1a6bb5' },
    { x: w/2 - 130, y: h/2 + 90, r: 14, label: 'Peers', color: '#c8b800' },
    { x: w/2 + 120, y: h/2 + 80, r: 14, label: 'Mentor', color: '#c87000' },
    { x: w/2, y: h/2 - 130, r: 12, label: 'Fund', color: '#1a9b5f' },
    { x: w/2 - 70, y: h/2 + 140, r: 11, label: 'Train', color: '#1a6bb5' },
    { x: w/2 + 75, y: h/2 + 130, r: 11, label: 'Network', color: '#1a9b5f' }
  ];

  // Draw edges
  ctx.globalAlpha = 0.35;
  nodes.slice(1).forEach(n => {
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(n.x, n.y);
    ctx.strokeStyle = n.color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  });
  ctx.globalAlpha = 1;

  // Draw nodes
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = n.color + '22';
    ctx.fill();
    ctx.strokeStyle = n.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = n.color;
    ctx.font = `bold ${n.r < 14 ? 9 : 10}px Poppins, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(n.label, n.x, n.y);
  });
}

// ── Build Action Plan ──
function buildActionPlan() {
  if (!userProfile) return;
  const p = userProfile;

  document.getElementById('action-title').textContent = `${p.name}'s Ecosystem Growth Plan`;
  document.getElementById('action-sub').textContent = `Tailored action plan for a ${p.btype} in ${p.city} — ${p.stage} stage`;

  const immediate = [
    { step:'Step 1', txt:`Register your business formally with the Ministry of Commerce (if not done) to access ${p.city} ESO programs`, cls:'' },
    { step:'Step 2', txt:`Contact Khmer Enterprise (KE) to enroll in the ${p.stage === 'Ideation' ? 'Startup Bootcamp' : p.stage === 'Early' ? 'Business Accelerator' : 'Scale-Up Program'}`, cls:'' },
    { step:'Step 3', txt:`Identify and join the ${p.sector} sector peer group in ${p.city} for knowledge sharing`, cls:'' }
  ];
  if (p.needs.includes('Digital literacy')) immediate.push({ step:'Step 4', txt:'Enroll in NIPTICT or GOPA digital literacy workshop — free for SMEs', cls:'' });

  document.getElementById('actions-immediate').innerHTML = immediate.map(a =>
    `<div class="action-item ${a.cls}"><div><div class="action-step ${a.cls}">${a.step}</div>${a.txt}</div></div>`
  ).join('');

  const shortTerm = [
    { step:'Month 2–3', txt:`Engage 2–3 ESOs matching your top needs: ${p.needs.slice(0,2).join(', ')}`, cls:'blue' },
    { step:'Month 3', txt: p.mentor === 'No' ? 'Apply for KE Mentorship Program to get a dedicated business mentor' : 'Leverage your mentor for introductions to investors and partners', cls:'blue' },
    { step:'Month 3–4', txt:'Attend Cambodia SME Forum and 1–2 sector-specific events', cls:'blue' }
  ];
  document.getElementById('actions-short').innerHTML = shortTerm.map(a =>
    `<div class="action-item ${a.cls}"><div><div class="action-step ${a.cls}">${a.step}</div>${a.txt}</div></div>`
  ).join('');

  const medTerm = [
    { step:'Month 6', txt: p.funded === 'No' ? 'Apply for seed funding through IFC Cambodia or KE Grant Program' : 'Leverage current funding track record for Series A preparation', cls:'yellow' },
    { step:'Month 8', txt:`Establish formal partnerships with 2 ESOs for ongoing ${p.needs[0]} support`, cls:'yellow' },
    { step:'Month 12', txt:`Target ${p.stage === 'Scaling' ? '30%+ revenue growth' : p.stage === 'Early' ? 'operational breakeven' : 'launch MVP to market'}`, cls:'yellow' }
  ];
  document.getElementById('actions-medium').innerHTML = medTerm.map(a =>
    `<div class="action-item ${a.cls}"><div><div class="action-step ${a.cls}">${a.step}</div>${a.txt}</div></div>`
  ).join('');

  const nextSteps = [
    { icon:'🌐', txt:'Visit khmerenterprise.gov.kh', sub:'Register and explore all programs' },
    { icon:'📱', txt:'Download KE Mobile App', sub:'Track your business support journey' },
    { icon:'🤝', txt:'Attend next KE Networking Event', sub:'Connect with ecosystem players' },
    { icon:'💬', txt:'Use AI Chatbot', sub:'Get instant answers about ecosystem support' }
  ];
  document.getElementById('next-steps').innerHTML = nextSteps.map(n =>
    `<div class="next-item"><span class="next-icon">${n.icon}</span><div><div class="next-text">${n.txt}</div><div class="next-sub">${n.sub}</div></div></div>`
  ).join('');

  // Progress tracker
  const progs = [
    { emoji:'📋', label:'Profile Complete', pct:100 },
    { emoji:'🏢', label:'ESO Engagement', pct: p.esoSupport === 'Yes' ? 75 : 10 },
    { emoji:'🎓', label:'Mentor Access', pct: p.mentor === 'Yes' ? 80 : 5 },
    { emoji:'💰', label:'Funding Access', pct: p.funded === 'Yes' ? 70 : 15 }
  ];
  document.getElementById('progress-items').innerHTML = progs.map(pr =>
    `<div class="prog-item">
      <div class="prog-emoji">${pr.emoji}</div>
      <div class="prog-label">${pr.label}</div>
      <div class="prog-bar-wrap"><div class="prog-bar" style="width:${pr.pct}%"></div></div>
      <div class="prog-pct">${pr.pct}%</div>
    </div>`
  ).join('');
}

// ── ESO Table ──
function populateESOTable() {
  const tbody = document.getElementById('eso-table-body');
  tbody.innerHTML = SNA_DATA.supportFromESOs.map((row, i) => {
    const needRow = SNA_DATA.actualNeed.find(n => n.area === row.area);
    const gap = needRow ? needRow.total - row.total : 0;
    return `<tr>
      <td>${i+1}</td>
      <td style="font-weight:600">${row.area}</td>
      <td>${row.pp}</td>
      <td>${row.sr}</td>
      <td>${row.bb}</td>
      <td><strong>${row.total}</strong></td>
      <td>${gap > 60 ? '<span class="badge-yes">High Need</span>' : gap > 30 ? '<span class="badge-partial">Medium</span>' : '<span class="badge-no">Covered</span>'}</td>
    </tr>`;
  }).join('');

  // ESO match list
  const matched = ESO_ORGS.slice(0, 5);
  document.getElementById('eso-match-list').innerHTML = matched.map((e, i) =>
    `<div class="eso-item">
      <div><div class="eso-name">${e.name}</div><div class="eso-sub">${e.type} · ${e.city}</div></div>
      <div class="eso-score">${95 - i * 7}%</div>
    </div>`
  ).join('');

  // Coverage chart
  const labels = SNA_DATA.supportFromESOs.slice(0, 8).map(r => r.area.length > 16 ? r.area.substring(0,14)+'…' : r.area);
  const vals = SNA_DATA.supportFromESOs.slice(0, 8).map(r => r.total);
  destroyChart('esoCoverageChart');
  charts.esoCoverageChart = new Chart(document.getElementById('esoCoverageChart'), {
    type: 'horizontalBar' in Chart ? 'horizontalBar' : 'bar',
    data: {
      labels,
      datasets: [{ label: 'Entrepreneurs Reached', data: vals, backgroundColor: 'rgba(26,155,95,0.7)', borderRadius: 4 }]
    },
    options: {
      indexAxis: 'y', responsive:true,
      plugins:{ legend:{ display:false } },
      scales:{ x:{ ticks:{ font:{ family:'Poppins', size:9 } } }, y:{ ticks:{ font:{ family:'Poppins', size:9 } } } }
    }
  });
}

function populateESOFilter() {
  const sel = document.getElementById('eso-support');
  SNA_DATA.supportFromESOs.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.area; opt.textContent = r.area;
    sel.appendChild(opt);
  });
}

function filterESOs() {
  const supportFilter = document.getElementById('eso-support').value;
  const cityFilter = document.getElementById('eso-city').value;
  const rows = document.querySelectorAll('#eso-table-body tr');
  let count = 0;
  rows.forEach((row, i) => {
    const area = SNA_DATA.supportFromESOs[i];
    const show = (!supportFilter || area.area === supportFilter);
    row.style.display = show ? '' : 'none';
    if (show) count++;
  });
  document.getElementById('eso-count').textContent = count;
}

function resetESOFilters() {
  document.getElementById('eso-support').value = '';
  document.getElementById('eso-city').value = '';
  filterESOs();
  document.getElementById('eso-count').textContent = 'All';
}

// ── Helpers ──
function destroyChart(id) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
  const ctx = document.getElementById(id);
  if (ctx) { const parent = ctx.parentNode; const newCanvas = document.createElement('canvas'); newCanvas.id = id; newCanvas.height = ctx.height; parent.replaceChild(newCanvas, ctx); }
}
