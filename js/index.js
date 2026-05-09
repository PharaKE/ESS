/* ════════════════════════════════
   KE · About — Index.js
   Includes Language Toggle (EN/KH)
════════════════════════════════ */

/* ── Nav scroll state ── */
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Mobile menu toggle ── */
function toggleMenu() {
  const links = document.getElementById('nav-links');
  const btn   = document.getElementById('hamburger');
  if (!links || !btn) return;
  const open = links.classList.toggle('open');
  // Animate hamburger to X
  const spans = btn.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link, .nav-cta').forEach(el => {
  el.addEventListener('click', () => {
    const links = document.getElementById('nav-links');
    const btn   = document.getElementById('hamburger');
    if (links && links.classList.contains('open')) {
      links.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
});

/* ════════════════════════════════
   LANGUAGE TOGGLE SYSTEM
════════════════════════════════ */

// Language data storage
let currentLang = localStorage.getItem('ke-lang') || 'en';
let translations = {};

// Translation dictionary
const langData = {
  en: {
    'nav.signin': 'Sign In',
    
    'hero.badge': 'Entrepreneur Support Platform · 2024–2026',
    'hero.title.line1': 'Empowering',
    'hero.title.line2': 'Cambodian',
    'hero.title.line3': 'Entrepreneurs',
    'hero.desc': 'KE Entrepreneur Support Platform is a data driven platform built to map, measure, and strengthen Cambodia\'s entrepreneurship landscape connecting founders, ESOs, and policymakers with actionable insights.',
    'hero.cta.primary': 'Get Started Free',
    'hero.cta.secondary': 'Learn More',
    'hero.stat1.label': 'Entrepreneurs',
    'hero.stat2.label': 'Cities',
    'hero.stat3.label': 'ESO Partners',
    'hero.stat4.label': 'GEI Indicators',
    'hero.photo1.label': 'Network Analysis',
    'hero.photo2.label': 'Community Events',
    'hero.photo3.label': 'Field Research',
    
    'mission.badge': 'Our Mission',
    'mission.title.line1': 'Built to Strengthen',
    'mission.title.line2': 'Cambodia\'s Ecosystem',
    'mission.desc': 'We believe data can transform how entrepreneurs connect, how support organizations operate, and how Cambodia competes globally.',
    'mission.card1.title': 'Map Connections',
    'mission.card1.desc': 'Visualize the hidden networks between entrepreneurs, ESOs, mentors, and investors across Phnom Penh, Siem Reap, and Battambang.',
    'mission.card2.title': 'Measure Progress',
    'mission.card2.desc': 'Track Cambodia\'s Global Entrepreneurship Index across 14 indicators from opportunity perception to risk acceptance and networking.',
    'mission.card3.title': 'Connect Resources',
    'mission.card3.desc': 'Match entrepreneurs to ESOs, funding opportunities, and mentors based on their industry, stage, and location in Cambodia.',
    'mission.card4.title': 'Enable Decisions',
    'mission.card4.desc': 'Empower policymakers, ESOs, and funders with evidence based insights to allocate resources and design interventions effectively.',
    
    'platform.badge': 'Platform Features',
    'platform.title.line1': 'Everything You Need to',
    'platform.title.line2': 'Thrive in Cambodia',
    'platform.desc': 'Four powerful tools, one unified platform built specifically for Cambodia\'s entrepreneurship ecosystem.',
    
    'feature1.tag': 'Social Network Analysis',
    'feature1.title': 'Visualize the Invisible Network',
    'feature1.desc': 'Map 390+ entrepreneur relationships across Phnom Penh, Siem Reap, and Battambang. Discover key connectors, identify collaboration gaps, and understand how knowledge flows through Cambodia\'s ecosystem.',
    'feature1.li1': 'Interactive network graph with 390+ nodes',
    'feature1.li2': 'Filter by city, sector, and ESO affiliation',
    'feature1.li3': 'Identify top connectors and bridge builders',
    'feature1.li4': 'Track network density over time',
    'feature1.link': 'Explore the Network Map',
    
    'feature2.tag': 'Global Entrepreneurship Index',
    'feature2.title': 'Track Cambodia\'s Global Standing',
    'feature2.desc': 'Monitor Cambodia\'s performance across 14 GEI indicators from opportunity perception and startup skills to risk acceptance and networking. See where Cambodia excels and where targeted support can make the biggest impact.',
    'feature2.li1': '14 GEI indicator dashboards',
    'feature2.li2': 'Year over year trend analysis',
    'feature2.li3': 'Regional benchmarking across ASEAN',
    'feature2.li4': 'Policy recommendation insights',
    'feature2.link': 'View GEI Dashboard',
    
    'feature3.tag': 'Knowledge Library',
    'feature3.title': 'KE Reports & Research',
    'feature3.desc': 'Explore our collection of annual reports, ecosystem research, and global entrepreneurship indices. All resources are open access and publicly available.',
    'feature3.link': 'Check out our reports',
    
    'feature4.tag': 'AI Business Assistant',
    'feature4.title': 'Expert Guidance, Instantly',
    'feature4.desc': 'Our AI chatbot understands the Cambodian business landscape. Get answers on regulations, funding, market entry, and entrepreneurship strategy available 24/7 in English and Khmer.',
    'feature4.chat1': 'Hello! How can I help you navigate Cambodia\'s entrepreneurship ecosystem today?',
    'feature4.chat2': 'What ESOs support agritech startups?',
    'feature4.chat3': 'I found 4 relevant ESOs for agritech including CEDAC, Mekong…',
    'feature4.link': 'Ask the Assistant',
    
    'gallery.badge': 'In the Field',
    'gallery.title.line1': 'Research & Community',
    'gallery.title.line2': 'On the Ground',
    'gallery.desc': 'Our data comes from direct field research, community events, and collaboration with entrepreneurs across Cambodia.',
    'gallery.item1.title': 'EER Community Gathering',
    'gallery.item1.sub': 'Phnom Penh, 2024',
    'gallery.item2.title': 'SNA Field Research',
    'gallery.item2.sub': 'Network Mapping',
    'gallery.item3.title': 'Research Team Meeting',
    'gallery.item3.sub': 'Data Validation 2024',
    
    'methodology.badge': 'Methodology',
    'methodology.title.line1': 'Rigorous Research,',
    'methodology.title.line2': 'Real World Data',
    'methodology.step1.year': '2024',
    'methodology.step1.title': 'Field Research & Data Collection',
    'methodology.step1.desc': 'Surveyed 390+ entrepreneurs across Phnom Penh, Siem Reap, and Battambang. Conducted community events, interviews, and SNA surveys.',
    'methodology.step2.year': '2026 March',
    'methodology.step2.title': 'Scoping & Framework Design',
    'methodology.step2.desc': 'Established the research framework for Cambodia\'s entrepreneurship ecosystem. Adapted GEI methodology for the Cambodian context.',
    'methodology.step3.year': '2026 APRIL-MAY',
    'methodology.step3.title': 'Platform Development',
    'methodology.step3.desc': 'Built the KE Ecosystem Intelligence Platform integrating SNA visualization, GEI tracking and the AI assistant.',
    'methodology.step4.year': '2026 JUNE-JULY',
    'methodology.step4.title': 'Launch & Ongoing Updates',
    'methodology.step4.desc': 'Platform launched with latest data. Continuous updates as the ecosystem evolves new entrepreneur nodes, ESO partners, and GEI scores.',
    
    'cta.badge': 'Join the Platform',
    'cta.title.line1': 'Ready to Explore',
    'cta.title.line2': 'Cambodia\'s Ecosystem?',
    'cta.desc': 'Get free access to SNA maps, GEI dashboards​ and the AI business assistant, all in one platform built for Cambodian entrepreneurs.',
    'cta.primary': 'Create Free Account',
    'cta.secondary': 'Sign In',
    'cta.note': 'No subscription required · Free access for entrepreneurs',
    
    'footer.about': 'A data driven platform empowering Cambodian entrepreneurs with network analysis, GEI insights, and smart ecosystem matching.',
    'footer.contact': 'Contact Us',
    'footer.findus': 'Find Us',
    'footer.address': 'Business Development Center (BDC) Building, 9th Floor, OCIC Blvd., Sangkat Chroy Changvar, Khan Chroy Changvar, Phnom Penh, Cambodia',
    'footer.copyright': '©2026 Khmer Enterprise · All rights reserved',
    'footer.map.link': 'Open in Google Maps',
    
    'media.sna.badge': '2024 Kumu Network Map',
    'media.gei.badge': 'GEI Dashboard',
  },
  
  kh: {
    'nav.signin': 'ចូលគណនី',
    
    'hero.badge': 'ថ្នាលគាំទ្រសហគ្រិនភាព · ២០២៤–២០២៦',
    'hero.title.line1': 'ការផ្តល់អតិភាព',
    'hero.title.line2': 'សម្រាប់សហគ្រិនភាព',
    'hero.title.line3': 'នៅកម្ពុជា',
    'hero.desc': 'KE Entrepreneur Support Platform​ គឺជាថ្នាលទិន្នន័យ ដែលត្រូវបានបង្កើតឡើងដើម្បីកំណត់ផែនទី វាស់ស្ទង់ និងពង្រឹងប្រព័ន្ធអេកូឡូសុីសហគ្រិនភាពនៅកម្ពុជា ដោយភ្ជាប់គ្នារវាងស្ថាបនិក និងអង្គការគាំទ្រសហគ្រិនភាព (ESOs) ព្រមទាំងរាជរដ្ឋាភិបាលជាមួយនឹងការយល់ដឹងពីទិន្នន័យជាក់ស្តែងដែលអាចយកទៅអនុវត្តបាន។',
    'hero.cta.primary': 'ចាប់ផ្តើមដោយឥតគិតថ្លៃ',
    'hero.cta.secondary': 'ស្វែងយល់បន្ថែម',
    'hero.stat1.label': 'សហគ្រិន',
    'hero.stat2.label': 'ទីក្រុងសិក្សា',
    'hero.stat3.label': 'ដៃគូ ESOs',
    'hero.stat4.label': 'សូចនាករ GEI',
    'hero.photo1.label': 'ការវិភាគ',
    'hero.photo2.label': 'ព្រឹត្តិការណ៍សហគមន៍',
    'hero.photo3.label': 'ការស្រាវជ្រាវ',
    
    'mission.badge': 'បេសកកម្មរបស់យើង',
    'mission.title.line1': 'បង្កើតឡើងដើម្បីពង្រឹង',
    'mission.title.line2': 'ប្រព័ន្ធអេកូឡូសុីសហគ្រិនភាពកម្ពុជា',
    'mission.desc': 'យើងជឿជាក់ថាទិន្នន័យអាចផ្លាស់ប្តូរនៅ របៀបដែលសហគ្រិនគ្រប់រូបអាចភ្ជាប់ទំនាក់ទំនងរវាងគ្នានិងគ្នា និងរបៀបដែលអង្គការគាំទ្រដំណើរការ ព្រមទាំងរបៀបដែលកម្ពុជាអាចប្រកួតប្រជែងលើឆាកអន្តរជាតិ។',
    'mission.card1.title': 'ការគូសផែនទីទំនាក់ទំនង',
    'mission.card1.desc': 'បង្ហាញរូបភាពនៅពីក្រោយបណ្តាញទំនាក់ទំនងរវាងសហគ្រិន​ និងអង្គការគាំទ្រសហគ្រិនភាព (ESOs) ព្រមទាំងអ្នកណែនាំ(គ្រូបង្គោល) និងអ្នកវិនិយោគនៅទូទាំងទីក្រុងភ្នំពេញ សៀមរាប និងបាត់ដំបង។',
    'mission.card2.title': 'ការវាស់វែងពីវឌ្ឍនភាព',
    'mission.card2.desc': 'តាមដានសន្ទស្សន៍សហគ្រិនភាពសកល​​ (Global Entrepreneurship Index) របស់កម្ពុជាលើសូចនាករចំនួន ១៤ រាប់ចាប់ពីការក្តាប់ចាប់យកឱកាសដែរមាន រហូតដល់ការត្រៀមទទួលយកនៅហានិភ័យដែលអាចកើតមាន និងការបង្កើតទំនាក់ទំនង។',
    'mission.card3.title': 'ការតភ្ជាប់ធនធាន',
    'mission.card3.desc': 'ការផ្គូផ្គងគ្នារវាង សហគ្រិនទៅនឹង ESOs ដែលអាចមានឱកាសទទួលបាននៅការផ្តល់មូលនិធិ និងអ្នកណែនាំដោយផ្អែកលើវិស័យដែលចាំបាច់ ដំណាក់កាល និងទីតាំងរបស់ពួកគេនៅកម្ពុជា។',
    'mission.card4.title': 'ការសម្រេចចិត្ត',
    'mission.card4.desc': 'ផ្តល់អតិភាពដល់អ្នកធ្វើគោលនយោបាយ និងអង្គការគាំទ្រសហគ្រិនភាព (ESOs) ព្រមទាំងអ្នកផ្តល់មូលនិធិជាមួយនឹងទិន្នន័យជាក់ស្តែងដោយផ្អែកលើភស្តុតាងដែលមានពិត ដែលអាចជួយក្នុងការបែងចែកធនធាន និងការរៀបចំអន្តរាគមន៍ដោះស្រាយប្រកបដោយប្រសិទ្ធភាព។',
    
    'platform.badge': 'មុខងារវេទិកា',
    'platform.title.line1': 'អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវការ',
    'platform.title.line2': 'ដើម្បីទទួលបានការអភិវឌ្ឍនិងការរីកចម្រើន',
    'platform.desc': 'ថ្នាលសំខាន់ៗចំនួនបួនដែលរួម បញ្ជូលទៅក្នុងវេទិការួមមួយដែលបង្កើតឡើងជាពិសេសសម្រាប់ប្រព័ន្ធអេកូឡូសុីសហគ្រិនភាពនៅកម្ពុជា។',
    
    'feature1.tag': 'ការវិភាគបណ្តាញសង្គម',
    'feature1.title': 'ការបង្ហាញរូបភាពបណ្តាញដែលមើលមិនអាចមើលឃើញ​ ​Invisible Network',
    'feature1.desc': 'ការគូសផែនទីទំនាក់ទំនងសហគ្រិនភាពជាង ៣៩០ នាក់នៅទូទាំងរាជធានីភ្នំពេញ សៀមរាប និងបាត់ដំបង។ ស្វែងយល់ពីឧបករណ៍តភ្ជាប់សំខាន់ៗ កំណត់គម្លាតនៃកិច្ចសហការ និងយល់ពីរបៀបនៃភាពយល់ដឹងហូរកាត់ប្រព័ន្ធអេកូឡូសុីសហគ្រិនភាពនៅកម្ពុជា។',
    'feature1.li1': 'Graph បណ្តាញអន្តរកម្មដែលមាន nodes ជាង ៣៩០',
    'feature1.li2': 'តម្រងនិងបែងចែកតាមទីក្រុង វិស័យ និងសម្ព័ន្ធភាព ESO',
    'feature1.li3': 'កំណត់អត្តសញ្ញាណអ្នកតភ្ជាប់កំពូល និងអ្នកសាងសង់ចំណង',
    'feature1.li4': 'ការតាមដានដង់ស៊ីតេបណ្តាញទំនាក់ទំនងរាល់ពេលវេលា',
    'feature1.link': 'ស្វែងរកបន្ថែមនៅផែនទីបណ្តាញ',
    
    'feature2.tag': 'សន្ទស្សន៍សហគ្រិនភាពសកល',
    'feature2.title': 'តាមដានកំរិតសហគ្រិនភាពសកលរបស់កម្ពុជា',
    'feature2.desc': 'តាមដានការអនុវត្តរបស់កម្ពុជាលើសូចនាករ GEI ចំនួន ១៤ រាប់ចាប់ពីការស្វែងរកឱកាស និងជំនាញចាប់ផ្តើមអាជីវកម្ម រហូតដល់ការទទួលយកនិងដោះស្រាយនៅហានិភ័យ និងបណ្តាញទំនាក់ទំនង។ មើលពីកន្លែងដែលកម្ពុជាពូកែ និងកន្លែងដែលការអាចជះឥទ្ធិពលធំបំផុត។',
    'feature2.li1': 'ផ្ទាំងគ្រប់គ្រងសូចនាករ GEI ចំនួន ១៤',
    'feature2.li2': 'ការវិភាគនិន្នាការប្រចាំឆ្នាំ',
    'feature2.li3': 'ការប្រៀបធៀបតំបន់ទូទាំងអាស៊ាន',
    'feature2.li4': 'ព័ត៌មានអនុសាសន៍​ និងគោលនយោបាយ',
    'feature2.link': 'មើលផ្ទាំងគ្រប់គ្រង GEI',
    
    'feature3.tag': 'បណ្ណាល័យចំណេះដឹង',
    'feature3.title': 'របាយការណ៍ និងការស្រាវជ្រាវរបស់ KE',
    'feature3.desc': 'ស្វែងរកការប្រមូលរបាយការណ៍ប្រចាំឆ្នាំ ការស្រាវជ្រាវប្រព័ន្ធអេកូឡូស៊ី និងសន្ទស្សន៍សហគ្រិនភាពសកលរបស់យើង។ Resources ទាំងអស់គឺបើកចំហ និងអាចរកបានជាសាធារណៈបាន។',
    'feature3.link': 'មើលរបាយការណ៍របស់យើង',
    
    'feature4.tag': 'ជំនួយការ AI',
    'feature4.title': 'ការណែនាំពីអ្នកជំនាញភ្លាមៗ',
    'feature4.desc': 'ជំនួយការ AI របស់យើងយល់ពីទិដ្ឋភាពអាជីវកម្មនៅកម្ពុជា។ ទទួលបានចម្លើយអំពីបទប្បញ្ញត្តិ មូលនិធិ ការចូលទីផ្សារ និងយុទ្ធសាស្រ្តសហគ្រិនភាព ដែលអាចប្រើបាន ២៤ ម៉ោង​ លើ​​ ២៤ ម៉ោង ជាភាសាអង់គ្លេស និងខ្មែរបាន។',
    'feature4.chat1': 'ជំរាបសួរ! តើខ្ញុំអាចជួយអ្នកក្នុងការស្វែងយល់ពី ប្រព័ន្ធអេកូសហគ្រិនភាពនៅកម្ពុជាថ្ងៃនេះបានដោយរបៀបណា?',
    'feature4.chat2': 'តើ ESOs ណាខ្លះគាំទ្រការចាប់ផ្តើមអាជីវកម្មបច្ចេកវិទ្យាកសិកម្ម?',
    'feature4.chat3': 'ខ្ញុំបានរកឃើញ ESOs ចំនួន ៤ ដែលពាក់ព័ន្ធសម្រាប់បច្ចេកវិទ្យាកសិកម្ម រួមទាំង CEDAC មេគង្គ…',
    'feature4.link': 'សួរជំនួយការ',
    
    'gallery.badge': 'នៅក្នុងការសិក្សារ',
    'gallery.title.line1': 'ការស្រាវជ្រាវ និងសហគមន៍',
    'gallery.title.line2': 'នៅនឹងទីតាំងផ្ទាល់',
    'gallery.desc': 'ទិន្នន័យរបស់យើងបានមកពីការសិក្សារស្រាវជ្រាវផ្ទាល់ និងព្រឹត្តិការណ៍សហគមន៍ ព្រមទាំងកិច្ចសហការជាមួយសហគ្រិននៅទូទាំងប្រទេសកម្ពុជា។',
    'gallery.item1.title': 'ការជួបជុំសហគមន៍ EER',
    'gallery.item1.sub': 'ភ្នំពេញ, ២០២៤',
    'gallery.item2.title': 'ការស្រាវជ្រាវពីបណ្តាញទំនាក់ទំនង SNA',
    'gallery.item2.sub': 'ការគូសផែនទីបណ្តាញ',
    'gallery.item3.title': 'កិច្ចប្រជុំក្រុមស្រាវជ្រាវ',
    'gallery.item3.sub': 'ការផ្ទៀងផ្ទាត់ទិន្នន័យ ២០២៤',
    
    'methodology.badge': 'វិធីសាស្រ្ត',
    'methodology.title.line1': 'ការស្រាវជ្រាវយ៉ាងម៉ត់ចត់,',
    'methodology.title.line2': 'ទិន្នន័យពិភពលោកពិត',
    'methodology.step1.year': '២០២៤',
    'methodology.step1.title': 'ការស្រាវជ្រាវផ្ទាល់ និងការប្រមូលទិន្នន័យ',
    'methodology.step1.desc': 'បានស្ទង់មតិសហគ្រិនជាង ៣៩០ នាក់នៅទូទាំងភ្នំពេញ សៀមរាប និងបាត់ដំបង។ បានរៀបចំព្រឹត្តិការណ៍សហគមន៍ សម្ភាសន៍ និងការស្ទង់មតិ SNA។',
    'methodology.step2.year': '២០២៦ មីនា',
    'methodology.step2.title': 'ការកំណត់វិសាលភាព និងការរចនាក្របខ័ណ្ឌ',
    'methodology.step2.desc': 'បានបង្កើតក្របខ័ណ្ឌស្រាវជ្រាវសម្រាប់ប្រព័ន្ធអេកូឡូសុីសហគ្រិនភាពកម្ពុជា។ បានកែសម្រួលវិធីសាស្រ្ត GEI សម្រាប់បរិបទនៅកម្ពុជា។',
    'methodology.step3.year': '២០២៦ មេសា-ឧសភា',
    'methodology.step3.title': 'ការអភិវឌ្ឍន៍វេទិកា ឬថ្នាល Website',
    'methodology.step3.desc': 'បានសាងសង់ KE Entrepreneur Support Platform ដោយរួមបញ្ចូលការបង្ហាញរូបភាព SNA ការតាមដាន GEI ការផ្គូផ្គងប្រព័ន្ធអេកូឡូសុី និងជំនួយការ AI Chatbot។',
    'methodology.step4.year': '២០២៦ មិថុនា-កក្កដា',
    'methodology.step4.title': 'ការបើកដំណើរការ និងការធ្វើបច្ចុប្បន្នភាពបន្ត',
    'methodology.step4.desc': 'វេទិកាបានបើកដំណើរការជាមួយទិន្នន័យចុងក្រោយគេបំផុត។ ការធ្វើបច្ចុប្បន្នភាពអាចបន្តបាននៅពេលដែលប្រព័ន្ធអេកូឡូសុីមានការវិវត្ត - មានចំនួនសហគ្រិនកើនឡើងថ្មីៗ ចំនួនដៃគូសហការ ESO និងពិន្ទុសហគ្រិនភាពថ្មីរបស់កម្ពុជា ពីការសិក្សាររបស់GEI។',
    
    'cta.badge': 'ចូលរួមថ្នាល់វេទិកា',
    'cta.title.line1': 'ត្រៀមខ្លួនរួចរាល់ក្នុងការស្វែងយល់ពី',
    'cta.title.line2': 'សហគ្រិនភាពឬនៅ?',
    'cta.desc': 'ទទួលបានការចូលប្រើដោយឥតគិតថ្លៃទៅកាន់ផែនទី SNA ផ្ទាំងគ្រប់គ្រង GEI និងជំនួយការអាជីវកម្ម AI ទាំងអស់នៅក្នុងវេទិកាមួយដែលបានបង្កើតឡើងសម្រាប់សហគ្រិនកម្ពុជា។',
    'cta.primary': 'បង្កើតគណនីឥតគិតថ្លៃ',
    'cta.secondary': 'ចូលគណនី',
    'cta.note': 'មិនត្រូវការការជាវ · ការចូលប្រើដោយឥតគិតថ្លៃសម្រាប់សហគ្រិន',
    
    'footer.about': 'វេទិកាដែលបង្កើតឡើងដោយទិន្នន័យ ពង្រឹងអតិភាពសហគ្រិនកម្ពុជាជាមួយនឹងការវិភាគទំនាក់ទំនង ព័ត៌មាន GEI និង AI Chatbot ឆ្លាតវៃ។',
    'footer.contact': 'ទំនាក់ទំនងព័ត៌មានបន្ថែម',
    'footer.findus': 'ស្វែងរកទីតាំងរបស់យើង',
    'footer.address': 'អគារមជ្ឈមណ្ឌលអភិវឌ្ឍធុរកិច្ច (BDC), ជាន់ទី​៩, មហាវិថី OCIC, សង្កាត់ជ្រោយចង្វារ, ខណ្ឌជ្រោយចង្វារ, រាជធានីភ្នំពេញ',
    'footer.copyright': '©២០២៦ ខ្មែរអង់គ្រេប្រាយ · រក្សាសិទ្ធិគ្រប់យ៉ាង',
    'footer.map.link': 'បើកក្នុង Google Maps',
    
    'media.sna.badge': 'ផែនទីបណ្តាញ Kumu ២០២៤',
    'media.gei.badge': 'ផ្ទាំងគ្រប់គ្រង GEI',
  }
};

/* ── Apply translations ── */
function applyTranslations(lang) {
  const data = langData[lang] || langData['en'];
  
  // Update all elements with lang-key attribute
  document.querySelectorAll('[lang-key]').forEach(el => {
    const key = el.getAttribute('lang-key');
    if (data[key]) {
      el.textContent = data[key];
    }
  });
  
  // Update specific elements that need special handling (titles with gradient spans)
  updateComplexElements(lang, data);
  
  // Update language toggle active state
  updateLangToggle(lang);
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update body class for font switching
  if (lang === 'kh') {
    document.body.classList.add('lang-kh');
  } else {
    document.body.classList.remove('lang-kh');
  }
  
  // Save preference
  localStorage.setItem('ke-lang', lang);
  currentLang = lang;
}

/* ── Update complex elements (titles with gradient spans, chat bubbles) ── */
function updateComplexElements(lang, data) {
  // Hero title
  if (data['hero.title.line1']) {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = `<span lang-key="hero.title.line1">${data['hero.title.line1']}</span><br>
        <span class="gradient-text" lang-key="hero.title.line2">${data['hero.title.line2']}</span><br>
        <span lang-key="hero.title.line3">${data['hero.title.line3']}</span>`;
    }
  }
  
  // Mission title
  if (data['mission.title.line1']) {
    const el = document.querySelector('#mission .section-title');
    if (el) {
      el.innerHTML = `<span lang-key="mission.title.line1">${data['mission.title.line1']}</span><br><span class="gradient-text" lang-key="mission.title.line2">${data['mission.title.line2']}</span>`;
    }
  }
  
  // Platform title
  if (data['platform.title.line1']) {
    const el = document.querySelector('#platform .section-title');
    if (el) {
      el.innerHTML = `<span lang-key="platform.title.line1">${data['platform.title.line1']}</span><br><span class="gradient-text" lang-key="platform.title.line2">${data['platform.title.line2']}</span>`;
    }
  }
  
  // Gallery title
  if (data['gallery.title.line1']) {
    const el = document.querySelector('#gallery .section-title');
    if (el) {
      el.innerHTML = `<span lang-key="gallery.title.line1">${data['gallery.title.line1']}</span><br><span class="gradient-text" lang-key="gallery.title.line2">${data['gallery.title.line2']}</span>`;
    }
  }
  
  // Methodology title
  if (data['methodology.title.line1']) {
    const el = document.querySelector('#methodology .section-title');
    if (el) {
      el.innerHTML = `<span lang-key="methodology.title.line1">${data['methodology.title.line1']}</span><br><span class="gradient-text" lang-key="methodology.title.line2">${data['methodology.title.line2']}</span>`;
    }
  }
  
  // CTA title
  if (data['cta.title.line1']) {
    const el = document.querySelector('.cta-title');
    if (el) {
      el.innerHTML = `<span lang-key="cta.title.line1">${data['cta.title.line1']}</span><br><span class="gradient-text" lang-key="cta.title.line2">${data['cta.title.line2']}</span>`;
    }
  }
  
  // Chatbot messages
  const chatBubbles = document.querySelectorAll('.chat-text');
  if (chatBubbles.length >= 3) {
    if (data['feature4.chat1']) chatBubbles[0].textContent = data['feature4.chat1'];
    if (data['feature4.chat2']) chatBubbles[1].textContent = data['feature4.chat2'];
    if (data['feature4.chat3']) chatBubbles[2].textContent = data['feature4.chat3'];
  }
  
  // Media badges
  const mediaBadges = document.querySelectorAll('.media-badge');
  mediaBadges.forEach(badge => {
    if (badge.classList.contains('media-badge-blue') && data['media.gei.badge']) {
      badge.textContent = data['media.gei.badge'];
    } else if (!badge.classList.contains('media-badge-blue') && data['media.sna.badge']) {
      badge.textContent = data['media.sna.badge'];
    }
  });
}

/* ── Update language toggle visual state ── */
function updateLangToggle(lang) {
  const enOpt = document.querySelector('.lang-option-en');
  const khOpt = document.querySelector('.lang-option-kh');
  
  if (enOpt && khOpt) {
    enOpt.classList.toggle('active', lang === 'en');
    khOpt.classList.toggle('active', lang === 'kh');
  }
}

/* ── Toggle language function ── */
function toggleLanguage() {
  const newLang = currentLang === 'en' ? 'kh' : 'en';
  applyTranslations(newLang);
}

/* ── Initialize language on load ── */
function initLanguage() {
  const savedLang = localStorage.getItem('ke-lang') || 'en';
  applyTranslations(savedLang);
}

/* ════════════════════════════════
   END LANGUAGE TOGGLE SYSTEM
════════════════════════════════ */

/* ── AOS (Animate On Scroll) — lightweight custom impl ── */
function initAOS() {
  const items = document.querySelectorAll('[data-aos]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.aosDelay || 0);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

/* ── Counter animation ── */
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// Trigger counter when hero stats come into view
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  let counted = false;
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      animateCounters();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(heroStats);
}

/* ── Active nav link on scroll ── */
function updateActiveNav() {
  const sections = ['mission', 'platform', 'gallery', 'methodology', 'cta'];
  const scrollY = window.scrollY + 120;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
      // Could add section-based nav highlighting here
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initAOS();
});