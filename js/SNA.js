/* ════════════════════════════════
   KE · Social Network Analysis 2024
   SNA.js
════════════════════════════════ */

let SNA = null;
let charts = {};
let filteredEntrepreneurs = [];

// ─── COLOUR PALETTE (matches GEI) ───
const C_GREEN  = '#1a9b5f';
const C_BLUE   = '#1a6bb5';
const C_YELLOW = '#c8b800';
const C_ORANGE = '#c87000';
const C_RED    = '#e05252';
const C_GREEN_L  = '#2ecc8a';
const C_BLUE_L   = '#3b9ee8';
const C_YELLOW_L = '#f5e642';

const CITY_COLORS = {
  'Phnom Penh': C_GREEN,
  'Siem Reap':  C_BLUE,
  'Battambang': C_YELLOW,
};
const CITY_SHORT = {
  'Phnom Penh': 'PP',
  'Siem Reap':  'SR',
  'Battambang': 'BB',
};

// ─── CHART DEFAULTS ───
Chart.defaults.font.family = 'Poppins';
Chart.defaults.color = '#3a5070';

function chartDefaults(type, labels, datasets, extraOpts = {}) {
  return {
    type,
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { family:'Poppins', size:11 }, boxWidth:12, padding:12 } },
        tooltip: { titleFont:{ family:'Poppins', weight:'700' }, bodyFont:{ family:'Poppins' } },
      },
      ...extraOpts
    }
  };
}

function destroyChart(id) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
}

// ─── NAVIGATION ───
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.top-nav-item').forEach(b => b.classList.remove('active'));
  const topNav = document.querySelector(`.top-nav-item[data-page="${name}"]`);
  if (topNav) topNav.classList.add('active');
  document.querySelectorAll('.mob-nav-item').forEach(b => b.classList.remove('active'));
  const mobNav = document.querySelector(`.mob-nav-item[data-page="${name}"]`);
  if (mobNav) mobNav.classList.add('active');
  window.scrollTo({ top:0, behavior:'smooth' });
}

// ─── MOBILE SIDEBAR ───
function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const btn     = document.getElementById('mobileMenuBtn');
  sidebar.classList.toggle('mobile-open');
  overlay.classList.toggle('active');
  btn.classList.toggle('open');
}

// ─── DATA LOAD ───
async function loadData() {
  try {
    const res = await fetch('data/SNA_2024_cleaned.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    SNA = await res.json();
    document.getElementById('loader').style.display = 'none';
    initAll();
  } catch(e) {
    console.error(e);
    document.getElementById('loader').innerHTML = '<div style="color:red;font-size:16px;text-align:center;padding:20px">⚠️ Could not load data.<br><small>Make sure SNA_2024_cleaned.json is in data/</small></div>';
  }
}

function initAll() {
  filteredEntrepreneurs = SNA.entrepreneurs;
  renderOverviewPage();
  renderEcosystemPage();
  renderFundingPage();
  renderMentorshipPage();
  renderEntrepreneursPage();
  populateSectorFilter();
}

// ══════════════════════════════════════
// PAGE: OVERVIEW
// ══════════════════════════════════════
function renderOverviewPage() {
  const overall = SNA.sna_overall; // [{City, Total Entrepreneurs, ...}]
  const pp = overall.find(r => r.City === 'Phnom Penh');
  const sr = overall.find(r => r.City === 'Siem Reap');
  const bb = overall.find(r => r.City === 'Battambang');
  const total = overall.reduce((s,r) => s + r['Total Entrepreneurs'], 0);

  // KPIs from entrepreneurs list
  const ents = SNA.entrepreneurs;
  const esoCount = ents.filter(e => (e.eso_support||'').toLowerCase() === 'yes').length;
  const peerCount = ents.filter(e => (e.peer_exchange||'').toLowerCase() === 'yes').length;
  const fundCount = ents.filter(e => (e.external_funding||'').toLowerCase() === 'yes').length;

  document.getElementById('kpi-eso-rate').textContent  = Math.round(esoCount/total*100) + '%';
  document.getElementById('kpi-peer-rate').textContent = Math.round(peerCount/total*100) + '%';
  document.getElementById('kpi-fund-rate').textContent = Math.round(fundCount/total*100) + '%';

  // City summary list
  const summaryEl = document.getElementById('city-summary-list');
  const cityData = [
    { city:'Phnom Penh', cls:'pp', row:pp },
    { city:'Siem Reap',  cls:'sr', row:sr },
    { city:'Battambang', cls:'bb', row:bb },
  ];
  summaryEl.innerHTML = cityData.map(({ city, cls, row }) => {
    if (!row) return '';
    const reg = row['Rigistered'] || 0;
    const regPct = Math.round(reg / row['Total Entrepreneurs'] * 100);
    return `
      <div class="city-summary-item">
        <div class="city-badge ${cls}">${CITY_SHORT[city]}</div>
        <div class="city-info">
          <div class="city-name">${city}</div>
          <div class="city-stat">Registered: ${regPct}% · Mentored: ${row['Mentorship received']||0} · Funded: ${row['External Funding Received']||0}</div>
        </div>
        <div class="city-num">${row['Total Entrepreneurs']}</div>
      </div>`;
  }).join('');

  // City Overview Bar Chart
  destroyChart('cityOverview');
  const ctx1 = document.getElementById('cityOverviewChart').getContext('2d');
  charts['cityOverview'] = new Chart(ctx1, chartDefaults('bar',
    ['Phnom Penh', 'Siem Reap', 'Battambang'],
    [
      { label:'Total', data: overall.map(r => r['Total Entrepreneurs']), backgroundColor: [C_GREEN+'cc', C_BLUE+'cc', C_YELLOW+'cc'], borderRadius:6 },
      { label:'Registered', data: overall.map(r => r['Rigistered']||0), backgroundColor: [C_GREEN+'55', C_BLUE+'55', C_YELLOW+'55'], borderRadius:6 },
      { label:'ESO Support', data: [esoFromCity('Phnom Penh'), esoFromCity('Siem Reap'), esoFromCity('Battambang')], backgroundColor:[C_GREEN+'33',C_BLUE+'33',C_YELLOW+'33'], borderRadius:6 },
    ],
    { scales: { y:{ beginAtZero:true, grid:{color:'rgba(26,107,181,0.07)'} }, x:{grid:{display:false}} } }
  ));

  // Business Type Donut
  const typeMap = {};
  ents.forEach(e => { const t = e.business_type || 'Unknown'; typeMap[t] = (typeMap[t]||0)+1; });
  destroyChart('businessType');
  const ctx2 = document.getElementById('businessTypeChart').getContext('2d');
  charts['businessType'] = new Chart(ctx2, chartDefaults('doughnut',
    Object.keys(typeMap),
    [{ data: Object.values(typeMap), backgroundColor: [C_BLUE, C_GREEN, C_YELLOW, C_ORANGE, C_RED, '#9b59b6'], hoverOffset:6 }],
    { plugins:{ legend:{ position:'right', labels:{ font:{family:'Poppins',size:10}, boxWidth:11 } } } }
  ));

  // Stage Chart
  const stageMap = {};
  ents.forEach(e => { const s = e.stage || 'Not specified'; stageMap[s] = (stageMap[s]||0)+1; });
  // Use SNA overall for combined stage data
  const stageLabels = ['Ideation & Prototype','Early & Operational','Scaling'];
  const stageData   = [
    overall.reduce((s,r) => s+(r['Ideation & Prototype state']||0),0),
    overall.reduce((s,r) => s+(r['Early &Operational Stage']||0),0),
    overall.reduce((s,r) => s+(r['Scaling Stage']||0),0),
  ];
  destroyChart('stage');
  const ctx3 = document.getElementById('stageChart').getContext('2d');
  charts['stage'] = new Chart(ctx3, chartDefaults('bar',
    stageLabels,
    [{ label:'Entrepreneurs', data:stageData, backgroundColor:[C_GREEN+'cc',C_BLUE+'cc',C_YELLOW+'cc'], borderRadius:8 }],
    {
      indexAxis:'y',
      scales:{ x:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}}, y:{grid:{display:false}} },
      plugins:{ legend:{display:false} }
    }
  ));

  // Registration Chart
  destroyChart('registration');
  const ctx4 = document.getElementById('registrationChart').getContext('2d');
  charts['registration'] = new Chart(ctx4, chartDefaults('bar',
    ['Phnom Penh','Siem Reap','Battambang'],
    [
      { label:'Registered',     data: overall.map(r => r['Rigistered']||0), backgroundColor:C_GREEN+'cc', borderRadius:5 },
      { label:'Not Registered', data: overall.map(r => r['Not Registered']||0), backgroundColor:C_RED+'88', borderRadius:5 },
      { label:'No Answer',      data: overall.map(r => r['No Answer']||0), backgroundColor:C_YELLOW+'88', borderRadius:5 },
    ],
    { scales:{ x:{stacked:true,grid:{display:false}}, y:{stacked:true,beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}} } }
  ));

  // Network Engagement Chart
  destroyChart('networkEngagement');
  const ctx5 = document.getElementById('networkEngagementChart').getContext('2d');
  charts['networkEngagement'] = new Chart(ctx5, chartDefaults('bar',
    ['Phnom Penh','Siem Reap','Battambang'],
    [
      { label:'Mentorship Received', data: overall.map(r => r['Mentorship received']||0), backgroundColor:C_GREEN+'cc', borderRadius:5 },
      { label:'Peer Exchange',       data: overall.map(r => r['Peer Exchange']||0),       backgroundColor:C_BLUE+'cc',  borderRadius:5 },
      { label:'External Funding',    data: overall.map(r => r['External Funding Received']||0), backgroundColor:C_YELLOW+'cc', borderRadius:5 },
    ],
    { scales:{ x:{grouped:true,grid:{display:false}}, y:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}} } }
  ));

  // Gender Chart
  const genderMap = {};
  ents.forEach(e => { const g = e.gender||'Unknown'; genderMap[g]=(genderMap[g]||0)+1; });
  destroyChart('gender');
  const ctx6 = document.getElementById('genderChart').getContext('2d');
  charts['gender'] = new Chart(ctx6, chartDefaults('doughnut',
    Object.keys(genderMap),
    [{ data:Object.values(genderMap), backgroundColor:[C_BLUE+'cc',C_GREEN+'cc',C_YELLOW+'cc','#9b59b6cc'], hoverOffset:6 }],
    { plugins:{ legend:{ position:'right' } } }
  ));

  // Sector Chart
  const sectorMap = {};
  ents.forEach(e => { const s = e.sector||'Other'; sectorMap[s]=(sectorMap[s]||0)+1; });
  const topSectors = Object.entries(sectorMap).sort((a,b)=>b[1]-a[1]).slice(0,8);
  destroyChart('sector');
  const ctx7 = document.getElementById('sectorChart').getContext('2d');
  charts['sector'] = new Chart(ctx7, chartDefaults('bar',
    topSectors.map(s => truncate(s[0],22)),
    [{ label:'Entrepreneurs', data:topSectors.map(s=>s[1]), backgroundColor: topSectors.map((_,i)=>[C_GREEN,C_BLUE,C_YELLOW,C_ORANGE,C_GREEN_L,C_BLUE_L,C_RED,'#9b59b6'][i%8]+'cc'), borderRadius:5 }],
    {
      indexAxis:'y',
      scales:{ x:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}}, y:{grid:{display:false},ticks:{font:{size:10}}} },
      plugins:{ legend:{display:false} }
    }
  ));
}

function esoFromCity(city) {
  return SNA.entrepreneurs.filter(e => e.city === city && (e.eso_support||'').toLowerCase() === 'yes').length;
}

// ══════════════════════════════════════
// PAGE: ESO ECOSYSTEM
// ══════════════════════════════════════
function renderEcosystemPage() {
  const delivered = SNA.support_from_esos;
  const needed    = SNA.actual_support_need;
  const providers = SNA.eso_providers;

  const categories = delivered.map(r => r['Support']);

  // ESO Support by City (Grouped Bar)
  destroyChart('esoSupport');
  const ctx1 = document.getElementById('esoSupportChart').getContext('2d');
  charts['esoSupport'] = new Chart(ctx1, chartDefaults('bar',
    categories.map(c => truncate(c, 20)),
    [
      { label:'Phnom Penh', data: delivered.map(r => r['Phnom Penh']||0), backgroundColor:C_GREEN+'cc', borderRadius:4 },
      { label:'Siem Reap',  data: delivered.map(r => r['Siem Reap']||0),  backgroundColor:C_BLUE+'cc',  borderRadius:4 },
      { label:'Battambang', data: delivered.map(r => r['Battambang']||0), backgroundColor:C_YELLOW+'cc', borderRadius:4 },
    ],
    { scales:{ x:{grid:{display:false},ticks:{font:{size:9}}}, y:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}} } }
  ));

  // Actual Need by City
  destroyChart('actualNeed');
  const ctx2 = document.getElementById('actualNeedChart').getContext('2d');
  charts['actualNeed'] = new Chart(ctx2, chartDefaults('bar',
    categories.map(c => truncate(c, 20)),
    [
      { label:'Phnom Penh', data: needed.map(r => r['Phnom Penh']||0), backgroundColor:C_GREEN+'cc', borderRadius:4 },
      { label:'Siem Reap',  data: needed.map(r => r['Siem Reap']||0),  backgroundColor:C_BLUE+'cc',  borderRadius:4 },
      { label:'Battambang', data: needed.map(r => r['Battambang']||0), backgroundColor:C_YELLOW+'cc', borderRadius:4 },
    ],
    { scales:{ x:{grid:{display:false},ticks:{font:{size:9}}}, y:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}} } }
  ));

  // Gap Analysis
  const gapData = SNA.eso_gap_analysis;
  const deliveredOverall = gapData.map(r => r['Overall_E']||0);
  const neededOverall    = gapData.map(r => r['Overall_A']||0);
  destroyChart('gap');
  const ctx3 = document.getElementById('gapChart').getContext('2d');
  charts['gap'] = new Chart(ctx3, chartDefaults('bar',
    gapData.map(r => truncate(r['Support'],24)),
    [
      { label:'Delivered', data: deliveredOverall, backgroundColor:C_GREEN+'cc', borderRadius:4 },
      { label:'Needed',    data: neededOverall,    backgroundColor:C_RED+'88',   borderRadius:4 },
    ],
    { scales:{ x:{grid:{display:false},ticks:{font:{size:9}}}, y:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}} } }
  ));

  // ESO Providers Chart
  destroyChart('esoProviders');
  const ctx4 = document.getElementById('esoProvidersChart').getContext('2d');
  charts['esoProviders'] = new Chart(ctx4, chartDefaults('bar',
    providers.map(r => r['ESOs']),
    [
      { label:'Phnom Penh', data: providers.map(r => r['Phnom Penh']||0), backgroundColor:C_GREEN+'cc', borderRadius:4 },
      { label:'Siem Reap',  data: providers.map(r => r['Siem Reap']||0),  backgroundColor:C_BLUE+'cc',  borderRadius:4 },
      { label:'Battambang', data: providers.map(r => r['Battambang']||0), backgroundColor:C_YELLOW+'cc', borderRadius:4 },
    ],
    { scales:{ x:{grid:{display:false}}, y:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}} } }
  ));

  // Table
  const tbody = document.getElementById('eso-table-body');
  tbody.innerHTML = gapData.map(r => {
    const gap = (r['Overall_A']||0) - (r['Overall_E']||0);
    return `<tr>
      <td>${r['Support']}</td>
      <td>${r['Phnom Penh_E']||0}</td>
      <td>${r['Siem Reap_E']||0}</td>
      <td>${r['Battambang_E']||0}</td>
      <td><strong>${r['Overall_E']||0}</strong></td>
      <td><strong>${r['Overall_A']||0}</strong></td>
      <td class="${gap > 0 ? 'gap-neg':'gap-pos'}">${gap > 0 ? '+'+gap : gap}</td>
    </tr>`;
  }).join('');
}

// ══════════════════════════════════════
// PAGE: FUNDING
// ══════════════════════════════════════
function renderFundingPage() {
  const funding = SNA.external_funding;
  const types   = funding.map(r => r['Type of External Funding']);

  // Overall Donut
  destroyChart('fundingOverall');
  const ctx1 = document.getElementById('fundingOverallChart').getContext('2d');
  charts['fundingOverall'] = new Chart(ctx1, chartDefaults('doughnut',
    types,
    [{ data: funding.map(r => r['Overall']||0), backgroundColor:[C_BLUE+'cc',C_GREEN+'cc',C_YELLOW+'cc',C_ORANGE+'cc',C_RED+'cc'], hoverOffset:8 }],
    { plugins:{ legend:{ position:'right', labels:{font:{family:'Poppins',size:10},boxWidth:11} } } }
  ));

  // By City Bar
  destroyChart('fundingCity');
  const ctx2 = document.getElementById('fundingCityChart').getContext('2d');
  charts['fundingCity'] = new Chart(ctx2, chartDefaults('bar',
    types.map(t => truncate(t,22)),
    [
      { label:'Phnom Penh', data: funding.map(r => r['Phnom Penh']||0), backgroundColor:C_GREEN+'cc', borderRadius:4 },
      { label:'Siem Reap',  data: funding.map(r => r['Siem Reap']||0),  backgroundColor:C_BLUE+'cc',  borderRadius:4 },
      { label:'Battambang', data: funding.map(r => r['Battambang']||0), backgroundColor:C_YELLOW+'cc', borderRadius:4 },
    ],
    { indexAxis:'y', scales:{ x:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}}, y:{grid:{display:false},ticks:{font:{size:10}}} } }
  ));

  // Stacked
  destroyChart('fundingStacked');
  const ctx3 = document.getElementById('fundingStackedChart').getContext('2d');
  charts['fundingStacked'] = new Chart(ctx3, chartDefaults('bar',
    ['Phnom Penh','Siem Reap','Battambang'],
    types.map((t,i) => ({
      label: truncate(t,20),
      data: funding.map(r => r[['Phnom Penh','Siem Reap','Battambang'][0]]||0), // placeholder approach below
      backgroundColor: [C_BLUE,C_GREEN,C_YELLOW,C_ORANGE,C_RED][i]+'cc',
      borderRadius:4
    })),
    { scales:{ x:{stacked:true,grid:{display:false}}, y:{stacked:true,beginAtZero:true,grid:{color:'rgba(53, 42, 42, 0.07)'}} } }
  ));
  // Update stacked properly
  const cities = ['Phnom Penh','Siem Reap','Battambang'];
  charts['fundingStacked'].data.datasets = types.map((t,i) => ({
    label: truncate(t, 20),
    data: cities.map(city => {
      const row = funding.find(r => r['Type of External Funding'] === t);
      return row ? (row[city]||0) : 0;
    }),
    backgroundColor: [C_BLUE,C_GREEN,C_YELLOW,C_ORANGE,C_RED][i]+'cc',
    borderRadius:4,
    stack:'stack0'
  }));
  charts['fundingStacked'].update();

  // Funding by Business Type (from entrepreneur records)
  const ents = SNA.entrepreneurs;
  const btypes = ['Traditional business','Social business','Innovative venture','Livelihood sustaining'];
  const fundByType = btypes.map(t => ents.filter(e => e.business_type===t && (e.external_funding||'').toLowerCase()==='yes').length);
  const totalByType = btypes.map(t => ents.filter(e => e.business_type===t).length);
  destroyChart('fundingByType');
  const ctx4 = document.getElementById('fundingByTypeChart').getContext('2d');
  charts['fundingByType'] = new Chart(ctx4, chartDefaults('bar',
    ['Traditional','Social','Innovative','Livelihood'],
    [
      { label:'Funded',    data: fundByType,   backgroundColor:C_GREEN+'cc', borderRadius:5 },
      { label:'Not Funded',data: totalByType.map((t,i) => t - fundByType[i]), backgroundColor:C_RED+'44', borderRadius:5 },
    ],
    { scales:{ x:{stacked:true,grid:{display:false}}, y:{stacked:true,beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}} } }
  ));

  // Insights
  document.getElementById('funding-insights').innerHTML = `
    <div class="insight-item">
      <div class="insight-item-title">🏦 Loans Dominate — But Equity is Emerging</div>
      <div class="insight-item-text">75 entrepreneurs received loans from BFIs, making it the primary funding channel. Equity investment (12) remains nascent but signals growing investor interest in the SME space.</div>
    </div>
    <div class="insight-item blue-accent">
      <div class="insight-item-title">📍 Phnom Penh Leads All Funding Categories</div>
      <div class="insight-item-text">Phnom Penh entrepreneurs access more of every funding type, reflecting the capital's denser financial ecosystem. Battambang shows relatively strong grant uptake (21) vs its size.</div>
    </div>
    <div class="insight-item warn-accent">
      <div class="insight-item-title">⚠️ Siem Reap Gap in Equity & Debt Finance</div>
      <div class="insight-item-text">Siem Reap has 0 equity investments and 0 debt financing from investors, pointing to a critical gap in non-bank capital access for tourism-driven entrepreneurs.</div>
    </div>`;
}

// ══════════════════════════════════════
// PAGE: MENTORSHIP
// ══════════════════════════════════════
function renderMentorshipPage() {
  const benefits = SNA.mentor_benefits;
  const overall  = SNA.sna_overall;

  // Mentorship Benefits Overall (horizontal bar)
  destroyChart('mentorBenefit');
  const ctx1 = document.getElementById('mentorBenefitChart').getContext('2d');
  charts['mentorBenefit'] = new Chart(ctx1, chartDefaults('bar',
    benefits.map(r => truncate(r['Benefit'],28)),
    [{ label:'Overall', data: benefits.map(r => r['Overall']||0), backgroundColor:[C_GREEN,C_BLUE,C_YELLOW,C_ORANGE,C_RED,C_GREEN_L,C_BLUE_L,'#9b59b6'].map(c=>c+'cc'), borderRadius:6 }],
    {
      indexAxis:'y',
      plugins:{ legend:{display:false} },
      scales:{ x:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}}, y:{grid:{display:false},ticks:{font:{size:10}}} }
    }
  ));

  // Mentorship Benefits by City
  destroyChart('mentorCity');
  const ctx2 = document.getElementById('mentorCityChart').getContext('2d');
  charts['mentorCity'] = new Chart(ctx2, chartDefaults('bar',
    benefits.map(r => truncate(r['Benefit'],20)),
    [
      { label:'Phnom Penh', data: benefits.map(r => r['Phnom Penh']||0), backgroundColor:C_GREEN+'cc', borderRadius:4 },
      { label:'Siem Reap',  data: benefits.map(r => r['Siem Reap']||0),  backgroundColor:C_BLUE+'cc',  borderRadius:4 },
      { label:'Battambang', data: benefits.map(r => r['Battambang']||0), backgroundColor:C_YELLOW+'cc', borderRadius:4 },
    ],
    { scales:{ x:{grid:{display:false},ticks:{font:{size:9}}}, y:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}} } }
  ));

  // Network Compare (Mentorship vs Peer vs Funding by city)
  destroyChart('networkCompare');
  const ctx3 = document.getElementById('networkCompareChart').getContext('2d');
  charts['networkCompare'] = new Chart(ctx3, chartDefaults('bar',
    ['Phnom Penh','Siem Reap','Battambang'],
    [
      { label:'Mentorship', data: overall.map(r => r['Mentorship received']||0), backgroundColor:C_GREEN+'cc', borderRadius:4 },
      { label:'Peer Exchange', data: overall.map(r => r['Peer Exchange']||0), backgroundColor:C_BLUE+'cc', borderRadius:4 },
      { label:'External Funding', data: overall.map(r => r['External Funding Received']||0), backgroundColor:C_YELLOW+'cc', borderRadius:4 },
    ],
    { scales:{ x:{grid:{display:false}}, y:{beginAtZero:true,grid:{color:'rgba(26,107,181,0.07)'}} } }
  ));

  // Mentorship Rate by City (%)
  const mentorPcts = overall.map(r => Math.round((r['Mentorship received']||0) / r['Total Entrepreneurs'] * 100));
  destroyChart('mentorRate');
  const ctx4 = document.getElementById('mentorRateChart').getContext('2d');
  charts['mentorRate'] = new Chart(ctx4, chartDefaults('doughnut',
    ['Phnom Penh ('+mentorPcts[0]+'%)', 'Siem Reap ('+mentorPcts[1]+'%)', 'Battambang ('+mentorPcts[2]+'%)'],
    [{ data: mentorPcts, backgroundColor:[C_GREEN+'cc',C_BLUE+'cc',C_YELLOW+'cc'], hoverOffset:6 }],
    { plugins:{ legend:{ position:'bottom', labels:{font:{family:'Poppins',size:10}} } } }
  ));

  // Mentor insights
  document.getElementById('mentor-insights').innerHTML = `
    <div class="insight-item">
      <div class="insight-item-title">🎯 Guidance & Expertise is the #1 Benefit</div>
      <div class="insight-item-text">118 entrepreneurs cited guidance & expertise as the primary value of mentorship, followed by personal development (106) and problem solving (97).</div>
    </div>
    <div class="insight-item blue-accent">
      <div class="insight-item-title">📊 Battambang Has Highest Mentorship Rate</div>
      <div class="insight-item-text">Despite having only 60 entrepreneurs, Battambang records a 68% mentorship uptake — the highest of the 3 cities — suggesting strong local mentor networks.</div>
    </div>
    <div class="insight-item blue-accent">
      <div class="insight-item-title">🤝 Peer Exchange Nearly Matches Mentorship</div>
      <div class="insight-item-text">158 entrepreneurs engaged in peer exchange across all 3 cities, approaching the 160 who received formal mentorship — indicating robust informal knowledge networks.</div>
    </div>
    <div class="insight-item warn-accent">
      <div class="insight-item-title">⚠️ Siem Reap Lags in Networking Benefits</div>
      <div class="insight-item-text">Siem Reap reports low networking opportunity benefits from mentorship (7), signalling a need for more ESO-facilitated connection events in the region.</div>
    </div>`;
}

// ══════════════════════════════════════
// PAGE: ENTREPRENEURS DIRECTORY
// ══════════════════════════════════════
function populateSectorFilter() {
  const sectors = [...new Set(SNA.entrepreneurs.map(e => e.sector).filter(Boolean))].sort();
  const sel = document.getElementById('ent-sector');
  sectors.forEach(s => { sel.innerHTML += `<option value="${s}">${s}</option>`; });
}

function filterEntrepreneurs() {
  const city   = document.getElementById('ent-city').value;
  const type   = document.getElementById('ent-type').value;
  const sector = document.getElementById('ent-sector').value;
  const gender = document.getElementById('ent-gender').value;
  filteredEntrepreneurs = SNA.entrepreneurs.filter(e =>
    (!city   || e.city === city) &&
    (!type   || e.business_type === type) &&
    (!sector || e.sector === sector) &&
    (!gender || e.gender === gender)
  );
  renderEntrepreneursPage();
}

function resetEntFilters() {
  ['ent-city','ent-type','ent-sector','ent-gender'].forEach(id => document.getElementById(id).value = '');
  filteredEntrepreneurs = SNA.entrepreneurs;
  renderEntrepreneursPage();
}

function renderEntrepreneursPage() {
  const ents = filteredEntrepreneurs;
  const total = ents.length;
  const esoYes   = ents.filter(e => (e.eso_support||'').toLowerCase()==='yes').length;
  const mentYes  = ents.filter(e => (e.mentorship||'').toLowerCase()==='yes').length;
  const fundYes  = ents.filter(e => (e.external_funding||'').toLowerCase()==='yes').length;

  document.getElementById('ent-count-kpi').textContent = total;
  document.getElementById('ent-eso-kpi').textContent   = Math.round(esoYes/Math.max(total,1)*100) + '%';
  document.getElementById('ent-mentor-kpi').textContent = Math.round(mentYes/Math.max(total,1)*100) + '%';
  document.getElementById('ent-fund-kpi').textContent   = Math.round(fundYes/Math.max(total,1)*100) + '%';
  document.getElementById('ent-table-count').textContent = total;

  const tbody = document.getElementById('ent-table-body');
  tbody.innerHTML = ents.slice(0, 300).map((e, i) => {
    const yesNo = (val) => (val||'').toLowerCase()==='yes'
      ? '<span class="badge-yes">Yes</span>'
      : '<span class="badge-no">No</span>';
    const cityBadgeClass = e.city==='Phnom Penh'?'pp':e.city==='Siem Reap'?'sr':'bb';
    return `<tr>
      <td>${i+1}</td>
      <td>${e.name||'—'}</td>
      <td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.business||'—'}</td>
      <td><span class="badge-city">${CITY_SHORT[e.city]||e.city||'—'}</span></td>
      <td>${truncate(e.sector||'—',18)}</td>
      <td style="font-size:10px">${truncate(e.business_type||'—',14)}</td>
      <td>${e.gender||'—'}</td>
      <td>${e.registered||'—'}</td>
      <td>${yesNo(e.eso_support)}</td>
      <td>${yesNo(e.mentorship)}</td>
      <td>${yesNo(e.external_funding)}</td>
    </tr>`;
  }).join('');
  if (ents.length > 300) {
    tbody.innerHTML += `<tr><td colspan="11" style="text-align:center;padding:12px;font-size:11px;color:var(--text-light)">Showing 300 of ${total} — use filters to narrow results</td></tr>`;
  }
}

// ─── UTILS ───
function truncate(str, maxLen) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}

// ─── INIT ───
window.addEventListener('DOMContentLoaded', loadData);

