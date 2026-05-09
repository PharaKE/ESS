/* ════════════════════════════════
   KE · AI Business Chatbot — chatbot.js
   Clean & minimal logic
════════════════════════════════ */

const BOT_RESPONSES = {
  register: {
    keywords:['register','registration','ministry','formal','license','permit','moc','incorporate','set up business','open a business','start a business','business license','patent tax','tin number','tax id'],
    answer:`To register your business in Cambodia, here's what you need:\n\n**1. Choose your business structure**\n• Sole Proprietorship (simple, low cost)\n• Private Limited Company (LLC equivalent)\n• General Partnership\n• Branch or Representative Office\n\n**2. Register with the Ministry of Commerce (MoC)**\n• Visit the MoC Business Registration Portal\n• Fee: ~USD 100–250 depending on type\n• Timeline: 3–7 business days\n\n**3. Tax Registration (GDT)**\n• Register with the General Department of Taxation\n• Obtain a Tax Identification Number (TIN)\n• Self-Assessment Regime (SAR) for larger businesses\n\n**4. Other licenses**\n• Sector-specific permits (food, health, tourism, construction)\n• Patent Tax registration\n• Labor registration for employees\n\n**KE Tip:** In 2024, 240 out of 390 surveyed entrepreneurs were registered. Registered businesses have a 60% higher chance of accessing ESO programs and formal funding.`
  },
  funding: {
    keywords:['funding','fund','invest','loan','grant','capital','money','finance','investor','microfinance','equity','debt','bootstrap','seed','series','venture','vc','angel','credit'],
    answer:`Here are the main **funding options** for Cambodian entrepreneurs:\n\n**Grants & Subsidies**\n• Khmer Enterprise Startup Grant (up to USD 10,000)\n• USAID MSME Development Fund\n• EU Development Grants for social enterprises\n• SDC / Swiss-backed innovation grants\n\n**Loans & Microfinance**\n• ACLEDA Bank SME Loan (6–18% interest)\n• Hattha Bank Business Loan\n• PRASAC Microfinance\n• AMK Microfinance (rural focus)\n\n**Equity / Investment**\n• Mekong Strategic Partners (Seed/Series A)\n• Insitor Fund (social enterprise focus)\n• IFC Cambodia (larger rounds, USD 500k+)\n• Seedstars Cambodia (startup competitions)\n\n**How to Get Investment-Ready**\n1. Complete business registration\n2. Prepare financial statements (2–3 years)\n3. Create a business plan / pitch deck\n4. Attend KE Investment Readiness Program\n\n**2024 Data:** 84 Phnom Penh entrepreneurs received external funding. 154 need access to funding support. A significant gap still exists. 86 entrepreneurs need help getting investment-ready.`
  },
  eso: {
    keywords:['eso','support organization','ngo','program','khmer enterprise','ke','assistance','support program','ecosystem support','help my business','3ei','swisscontact','sdc','koica','giz','usaid'],
    answer:`The **ESO (Entrepreneurship Support Organization)** ecosystem in Cambodia:\n\n**Government & Public**\n• Khmer Enterprise (KE). Primary SME support agency\n• Ministry of Economy and Finance\n• General Department of SME (DGSME)\n\n**International Development Partners**\n• Swisscontact / SDC (3Ei Initiative)\n• KOICA (Korean development cooperation)\n• USAID Harvest II (agriculture/food)\n• GIZ / Deutsche Gesellschaft\n• IFC Cambodia (finance & investment)\n\n**Local Organizations**\n• Impact Hub Phnom Penh (social ventures)\n• Battambang Business Innovation Centre\n• Angkor Enterprise Hub (Siem Reap, tourism focus)\n• CAMFEBA (private sector federation)\n• YEA (Young Entrepreneurs Association)\n\n**Top Support Areas in 2024 (overall):**\n1. Business Planning & Strategy. 124 entrepreneurs helped\n2. Digital Literacy. 107 entrepreneurs helped\n3. Financial Management. 97 entrepreneurs helped\n4. Marketing & Branding. 76 helped\n5. Entrepreneurial Skills Training. 71 helped\n\nUse the **Ecosystem Matching** tool for personalized ESO recommendations!`
  },
  scale: {
    keywords:['scale','grow','growth','expand','expansion','bigger','scaling','level up','next stage','grow my business'],
    answer:`Here's a **scaling roadmap** for Cambodian SMEs:\n\n**Phase 1: Foundation (0–6 months)**\n• Formalize your business structure & register\n• Set up accounting & financial systems\n• Build your core team (2–5 people)\n• Define your target market clearly\n\n**Phase 2: Growth (6–18 months)**\n• Expand to 2nd city (Phnom Penh to Siem Reap or Battambang)\n• Implement digital marketing & branding\n• Join peer exchange networks\n• Apply for SME growth funding\n\n**Phase 3: Scale (18–36 months)**\n• Regional expansion (Vietnam, Thailand, Laos)\n• Hire specialized team members\n• Consider manufacturing/production partnerships\n• Build digital products or platforms\n\n**2024 Data:** Only 25 entrepreneurs across all 3 cities were at scaling stage (9 in Phnom Penh, 13 in Battambang, 3 in Siem Reap). This is a huge opportunity. Very little competition at the top! Battambang actually leads in scaling-stage entrepreneurs.`
  },
  marketing: {
    keywords:['marketing','brand','branding','social media','promotion','advertise','customer','market','tiktok','facebook','digital marketing','content','seo','e-commerce'],
    answer:`**Marketing & Branding for Cambodian SMEs:**\n\n**Digital Marketing (Priority #1)**\n• Facebook & TikTok (highest reach in Cambodia)\n• Telegram groups for business communities\n• Google My Business (free local SEO)\n• E-commerce: Lazada, Shopee Cambodia, Maka\n\n**Traditional Marketing**\n• Local markets & trade fairs\n• Word-of-mouth + referral programs\n• Radio (still strong outside Phnom Penh)\n• Print in local newspapers\n\n**Low-Cost Strategies**\n1. Join the KE Digital Marketing Workshop (free)\n2. Partner with complementary businesses\n3. Create content in Khmer. It outperforms English 3:1\n4. Use WhatsApp Business for customer management\n5. Leverage user-generated content (UGC)\n\n**Budget Guidance:**\n• Micro businesses: $50–200/month on digital ads\n• SMEs: $500–2,000/month\n\n**2024 Data:** 76 entrepreneurs received marketing & branding ESO support. 104 entrepreneurs still need marketing support. A gap of 28 businesses.`
  },
  mentor: {
    keywords:['mentor','mentorship','coach','coaching','advisor','advice','guidance','role model','business coach'],
    answer:`**Mentorship Programs in Cambodia:**\n\n**KE Mentorship Program**\n• Free for registered businesses\n• 6-month structured program\n• One-on-one sessions twice monthly\n• Apply at: khmerenterprise.gov.kh\n\n**Impact Data (2024)**\n• 160 total entrepreneurs received mentorship (41% of all surveyed)\n• Phnom Penh: 98 mentored entrepreneurs\n• Battambang: 41 mentored (highest % rate relative to city size)\n• Siem Reap: 21 mentored entrepreneurs\n\n**Finding a Mentor:**\n1. Register with KE Mentorship Network\n2. Attend CAMFEBA events\n3. Join YEA (Young Entrepreneurs Association)\n4. LinkedIn networking with senior business leaders\n5. Impact Hub Phnom Penh community\n\n**What makes a good mentor match?**\n• Same industry or sector experience\n• Available 2+ hours/month\n• Has scaled a business before\n• Strong local network in Cambodia\n\nMentored businesses grow 40% faster on average!`
  },
  phnompenh: {
    keywords:['phnom penh','capital city','pp ecosystem','phnom penh business','phnom penh entrepreneur'],
    answer:`**Phnom Penh Entrepreneurial Ecosystem (2024 SNA Data):**\n\n**Overview**\n• 270 entrepreneurs surveyed (69% of total sample)\n• 160 registered businesses\n• 83 not yet registered\n\n**Business Stages**\n• Livelihood Sustaining: 87 (32%)\n• Traditional Business: 122 (45%)\n• Social Business: 40 (15%)\n• Innovative Venture: 21 (8%)\n• Early/Operational: 50\n• Scaling: 9\n• Ideation/Prototype: 1\n\n**Support Metrics**\n• 98 received mentorship\n• 90 participated in peer exchange\n• 84 received external funding (31%)\n\n**Top Needs in Phnom Penh:**\n1. Market Access. 138 entrepreneurs need help\n2. Business Planning. 141 need help\n3. Networking & Partnerships. 137 need help\n4. Digital Literacy. 98 need help\n5. Innovation & R&D. 90 need help\n\nPhnom Penh is the most developed ecosystem in Cambodia, with the highest density of ESOs and funding opportunities.`
  },
  siemreap: {
    keywords:['siem reap','angkor','tourism business','siem reap entrepreneur','siem reap ecosystem'],
    answer:`**Siem Reap Entrepreneurial Ecosystem (2024 SNA Data):**\n\n**Overview**\n• 60 entrepreneurs surveyed\n• 50 registered (83%. Highest registration rate!)\n• 10 not registered\n\n**Business Mix**\n• Traditional Business: 48 (80%. Tourism-driven)\n• Social Business: 9\n• Innovative Venture: 2\n• Early/Operational: 8\n• Scaling Stage: 3\n\n**Support Metrics**\n• 21 received mentorship (35%)\n• 29 participated in peer exchange\n• 25 received external funding (42%. Highest rate!)\n\n**Top ESO Support Received:**\n1. Digital Literacy. 45 (highest of any city!)\n2. Business Planning & Strategy. 33\n3. Financial Management. 30\n\n**Siem Reap Insight:** The ecosystem is heavily tourism-dependent. Post-COVID recovery has driven a need for digital skills and market diversification. The Angkor Enterprise Hub serves as the main ESO hub here.`
  },
  battambang: {
    keywords:['battambang','northwest','battambang business','battambang entrepreneur','battambang ecosystem'],
    answer:`**Battambang Entrepreneurial Ecosystem (2024 SNA Data):**\n\n**Overview**\n• 60 entrepreneurs surveyed\n• 30 registered (50%. Room to improve)\n• 29 not registered\n\n**Business Mix**\n• Traditional Business: 32\n• Social Business: 18\n• Innovative Venture: 10\n• Ideation/Prototype: 5\n• Early/Operational: 10\n• **Scaling Stage: 13** (highest of any city!)\n\n**Support Metrics**\n• 41 received mentorship (68%. HIGHEST rate!)\n• 39 participated in peer exchange (65%)\n• 29 received external funding\n\n**Top ESO Support Received:**\n1. Business Planning & Strategy. 40\n2. Digital Literacy. 35\n3. Financial Management. 26\n\n**Battambang Insight:** Despite being a smaller city, Battambang punches above its weight. It has the highest mentorship engagement rate and the most scaling-stage entrepreneurs. It's a rising ecosystem with strong community ties and agriculture/manufacturing strengths.`
  },
  gei: {
    keywords:['gei','global entrepreneurship index','index score','cambodia score','global ranking','entrepreneurship index','benchmark','compare countries','pillar score'],
    answer:`**Global Entrepreneurship Index (GEI). Opinium 2025:**\n\nThe GEI measures entrepreneurial conditions across 5 pillars:\n1. **Economic & Financial Access**. Credit, investment, financial services\n2. **Human Capital**. Education, skills, talent\n3. **Connectedness**. Networks, digital infrastructure, trade\n4. **Governance**. Rule of law, regulation, transparency\n5. **Market Potential**. Market size, demand, competition\n\n**Cambodia (2025 GEI):**\n• Overall Score: **37/100**\n• Region: East Asia & Pacific\n• Income Group: Lower Middle Income\n• Strongest Pillar: Connectedness\n• Weakest Pillar: Governance\n\n**Regional Context (East Asia & Pacific avg: 60.4)**\n• Singapore leads Southeast Asia with ~85\n• Vietnam: ~55 | Thailand: ~65 | Malaysia: ~67\n• Cambodia's score has been gradually improving since 2011 (score: 29)\n\n**What this means:** Cambodia has made meaningful progress in connectivity and market access but faces challenges in governance, financial inclusion, and human capital development. These gaps represent priority areas for KE programs.\n\nCheck the **GEI dashboard** for full country-by-country comparisons!`
  },
  sna: {
    keywords:['sna','social network','network analysis','ecosystem map','who connects','key players','ecosystem study','ecosystem analysis','2024 study','2021 study'],
    answer:`**Social Network Analysis (SNA) of Cambodia's Ecosystem:**\n\n**What is SNA?**\nSNA maps how information, funding, and talent flow between entrepreneurs and ESOs. It identifies key connectors, gaps, and clusters in the ecosystem.\n\n**2024 Study Scope**\n• Conducted July–December 2024\n• 390 entrepreneurs across 3 cities\n• Phnom Penh (270), Siem Reap (60), Battambang (60)\n• Co-implemented by Khmer Enterprise & Swisscontact (3Ei Initiative)\n• Funded by SDC, KOICA, and Khmer Enterprise\n\n**Key Findings**\n• Phnom Penh: Strongest & most connected ecosystem\n• Battambang: Highest mentorship & scaling engagement\n• Siem Reap: Highest registration rate & funding access rate\n• Overall: Major gaps in market access (194 need help) and business planning (187 need help)\n\n**Compared to 2021:**\n• 2021 study covered Phnom Penh only\n• 2024 expanded to 3 cities for the first time\n• Next SNA planned for 2026\n\nView the full **SNA Dashboard** for network visualizations!`
  },
  network: {
    keywords:['network','networking','peer','peer exchange','connect','connection','community','business group','association','event','meetup'],
    answer:`**Networking & Peer Exchange in Cambodia:**\n\n**2024 Data**\n• 158 entrepreneurs participated in peer exchange (41% of total)\n• Phnom Penh: 90 | Battambang: 39 | Siem Reap: 29\n• 166 still need networking & partnerships support\n\n**Key Networking Platforms**\n• KE Entrepreneur Networks (by sector/city)\n• CAMFEBA (private sector)\n• YEA Cambodia (young entrepreneurs under 35)\n• Impact Hub Phnom Penh (innovation community)\n• Angkor Enterprise Hub (Siem Reap)\n• Battambang Business Innovation Centre\n\n**How to Network Effectively**\n1. Attend KE-organized entrepreneur meetups\n2. Join sector-specific WhatsApp/Telegram groups\n3. Participate in trade fairs (CAMFEST, Phnom Penh Trade Fair)\n4. Online: LinkedIn, KE Facebook page\n5. International: Mekong Business Initiative events\n\n**Pro Tip:** Battambang has the highest peer exchange participation rate (65%). A testament to its tight-knit business community. Phnom Penh's network is broader but less tight.`
  },
  digital: {
    keywords:['digital','technology','tech','app','software','website','ecommerce','e-commerce','online','platform','digitize','digital transformation','it','automation'],
    answer:`**Digital Transformation for Cambodian Businesses:**\n\n**Why Digital Matters**\n• Digital Literacy is the #2 most-needed support (176 entrepreneurs)\n• Siem Reap has the highest digital literacy gap (41 needed help, 45 received. Nearly 1:1)\n• Cambodia's internet penetration has exceeded 60%, with mobile-first usage\n\n**Quick Wins for SMEs**\n1. **Google My Business**. Free, boosts local discoverability\n2. **Facebook Shop / TikTok Shop**. Free storefronts with built-in audience\n3. **QR code payments**. KHQR (ABA, Wing, etc.)\n4. **Accounting software**. QuickBooks, Wave (free), or local tools\n5. **WhatsApp Business**. Customer management at zero cost\n\n**E-commerce Platforms in Cambodia**\n• Lazada Cambodia, Shopee Cambodia, Maka.com.kh\n• Nham24 / Grab (food/delivery sector)\n\n**KE Digital Programs**\n• Digital Literacy Workshops (free for registered entrepreneurs)\n• E-commerce onboarding support\n• Coding bootcamp partnerships\n\n**GEI Insight:** Cambodia scores relatively well on Connectedness. The infrastructure is there. The gap is in skills and adoption.`
  },
  women: {
    keywords:['women','female','gender','woman entrepreneur','women business','girl','she','her business','women-led'],
    answer:`**Women Entrepreneurship in Cambodia:**\n\n**2024 SNA Data**\n• Women make up a significant share of entrepreneurs, especially in traditional and social business sectors\n• Female-led businesses are concentrated in manufacturing, retail, food & beverage, and handicrafts\n• Notable examples from Battambang: 7 Women Brand Fish Sauce, Trey Meas Fish Sauce, various manufacturing cooperatives\n\n**Key Support Programs**\n• KE Women Entrepreneur Program (dedicated fund)\n• Insitor Fund. Focuses on women-led and gender-lens investments\n• USAID WE RISE (Women's Economic Empowerment)\n• GIZ gender-inclusive business development\n• IFC SheWins program\n\n**EER Roadmap Priorities for Women**\n• F2: Data-driven inclusive financing for women entrepreneurs\n• Reducing barriers to formal registration\n• Mentorship matching with successful women leaders\n\n**Challenges**\n• Access to formal credit remains harder for women\n• Household responsibilities limit time for training\n• Social norms in some provinces affect networking access\n\nKhmer Enterprise is committed to gender-inclusive programs across all its initiatives.`
  },
  social: {
    keywords:['social enterprise','social business','impact','social impact','ngo to business','b corp','social venture','community business','cooperative'],
    answer:`**Social Enterprise in Cambodia:**\n\n**2024 SNA Data**\n• 67 social businesses surveyed (out of 390 total)\n• Phnom Penh: 40 | Battambang: 18 | Siem Reap: 9\n• Social businesses often have higher ESO engagement rates\n\n**Definition**\nA social enterprise prioritizes social/environmental impact alongside financial sustainability. Examples: cooperatives, education-linked businesses, eco-tourism, handicraft collectives.\n\n**Key Examples (from SNA)**\n• 7 Women Brand Fish Sauce (Battambang). Women's cooperative\n• Caritas Social Enterprise (Battambang). Handicraft\n• Good Solar Innovation (Battambang). Renewable energy\n• Atelier (Battambang). E-commerce, social mission\n• Various social tourism ventures in Siem Reap\n\n**Dedicated Support**\n• Impact Hub Phnom Penh (co-working + community)\n• Insitor Fund (social enterprise investment)\n• EU Social Enterprise Grants\n• KE Social Innovation Program\n\n**EER Roadmap:** The Entrepreneurial Ecosystem Roadmap emphasizes "Culture" as a domain. Including embracing failure, diversity, and social impact as pathways to entrepreneurial success.`
  },
  sector: {
    keywords:['sector','industry','agriculture','agribusiness','food','manufacturing','tourism','hospitality','retail','wholesale','healthcare','handicraft','energy','technology','fintech','construction','education','logistics'],
    answer:`**Key Business Sectors in Cambodia's Entrepreneurial Ecosystem:**\n\n**Top Sectors by Entrepreneur Count (2024 SNA)**\n1. **Retail & Wholesale**. Large share, especially in Phnom Penh & Battambang\n2. **Manufacturing**. Strong in Battambang (fish sauce, food processing, handicrafts)\n3. **Agriculture & Agribusiness**. Growing, especially in rural provinces\n4. **Tourism & Hospitality**. Dominant in Siem Reap\n5. **E-commerce**. Growing across all cities\n6. **Healthcare**. Small but active in Battambang\n7. **Energy**. Emerging (solar, renewable energy startups)\n\n**Sector-Specific ESOs**\n• Agriculture: USAID Harvest II, Agri-business development projects\n• Tourism: Angkor Enterprise Hub, Ministry of Tourism programs\n• Manufacturing: KE Business Incubation, DFDL regulatory support\n• Fintech/Digital: Seedstars, Smart Axiata Digital Innovation Fund\n\n**EER Roadmap Priorities**\n• Market linkages & export readiness\n• Value chain development in agriculture\n• Tourism diversification beyond Angkor Wat\n• Green/circular economy businesses\n\nTell me your sector and I can give more targeted advice!`
  },
  legal: {
    keywords:['legal','law','compliance','contract','intellectual property','ip','trademark','tax','vat','regulation','regulatory','ministry','permit','court','dispute'],
    answer:`**Legal & Compliance for Cambodian Businesses:**\n\n**2024 Data:** 81 entrepreneurs needed legal/compliance support; only 48 received it. A gap of 33.\n\n**Key Legal Requirements**\n1. **Business Registration**. Ministry of Commerce\n2. **Tax Registration**. GDT (TIN number)\n3. **Monthly Tax Filing**. VAT (10%), withholding tax, income tax\n4. **Labor Law Compliance**. Employment contracts, NSSF registration for employees\n5. **Sector Licenses**. Health, food safety, construction, etc.\n\n**Intellectual Property**\n• Trademark registration via Ministry of Commerce\n• Patent applications available for innovations\n• Cambodia IP Law modernized in recent years\n\n**Key Legal Resources**\n• DFDL Law Firm (SME-friendly, Phnom Penh)\n• BNG Legal (startup-focused)\n• KE Legal Clinics (free sessions for registered businesses)\n• Cambodia Chamber of Commerce legal desk\n\n**EER Roadmap. Policy Domain:**\n• Streamlining business registration\n• Reducing regulatory burden for MSMEs\n• Improving contract enforcement\n\n**Tip:** Legal issues rank #10 in ESO support needs but #6 in actual needs. Many businesses don't realize they need legal help until it's urgent.`
  },
  hiring: {
    keywords:['hire','hiring','staff','employee','team','hr','human resource','recruit','talent','labor','workforce','salary','payroll','nssf','employment'],
    answer:`**Hiring & HR for Cambodian SMEs:**\n\n**2024 Data:** 84 entrepreneurs needed HR support; 53 received it.\n\n**Cambodia Labor Law Basics**\n1. **Written contracts** required for all employees\n2. **NSSF Registration**. Mandatory national social security\n3. **Minimum wage** (garment sector: ~USD 202/month; varies by sector)\n4. **Annual leave:** 18 days/year (increases with tenure)\n5. **Severance pay** rules apply after probation\n\n**Hiring Tips for Small Businesses**\n• Start with part-time or contract roles to test fit\n• Use local platforms: Bong Thom, Camhr, LinkedIn\n• Tap KE apprenticeship and internship programs\n• Partner with local universities (RUPP, ITC, Build Bright)\n\n**Talent Challenges**\n• Brain drain to larger companies or overseas\n• Skill gaps in digital, technical, and managerial roles\n• Returnee Khmer talent (overseas Cambodians) = underutilized resource\n\n**EER Roadmap. Human Capital Domain:**\n• Building future-ready workforce\n• Bridging gaps in entrepreneurial education\n• Strengthening links between education and industry\n\nAre you hiring for a specific role or sector? I can give more targeted advice.`
  },
  innovation: {
    keywords:['innovation','r&d','research','prototype','ideation','product development','new product','startup idea','mvp','minimum viable','incubator','accelerator','lab'],
    answer:`**Innovation & R&D in Cambodia's Ecosystem:**\n\n**2024 Data:** 118 entrepreneurs need innovation/R&D support; only 43 received it. One of the biggest gaps!\n\n**Innovation Resources**\n• KE Innovation Grant (up to USD 10,000 for innovative ventures)\n• Smart Axiata Digital Innovation Fund\n• Seedstars Phnom Penh (startup competition)\n• NIPTICT Technology Incubator (government-linked)\n• Royal University of Phnom Penh (RUPP). Innovation partnerships\n• Institute of Technology of Cambodia (ITC). Tech R&D\n\n**Business Types Involved in Innovation**\n• 33 Innovative Ventures surveyed (2024 SNA)\n• Phnom Penh: 21 | Battambang: 10 | Siem Reap: 2\n\n**Incubators & Accelerators**\n• Impact Hub Phnom Penh (social innovation)\n• NIPTICT Startup Hub\n• Small World Accelerator\n• Mekong Business Initiative\n\n**EER Roadmap Priorities**\n• Build culture of experimentation and learning from failure\n• Connect entrepreneurs with regional R&D networks\n• Support tech transfer from universities to businesses\n\nIf you're at ideation/prototype stage, KE has specific programs to help you validate and build your MVP!`
  },
  roadmap: {
    keywords:['roadmap','ecosystem roadmap','eer','strategy','policy','recommendation','future','plan','2025','2026','vision','ecosystem plan','thematic'],
    answer:`**Cambodia Entrepreneurial Ecosystem Roadmap (EER):**\n\nThe EER is a strategic document developed collaboratively with ecosystem stakeholders. It outlines 6 domains of action:\n\n**6 Domains**\n1. **Support (S):** Strengthening holistic support systems for sustainable growth\n2. **Finance (F):** Enhancing MSME & startup finance via innovation and inclusivity\n3. **Market (M):** Bridging local growth and global markets\n4. **Culture (C):** Empowering entrepreneurs by normalizing failure and amplifying diversity\n5. **Policy (P):** Integrated policy and operational reforms to boost MSMEs\n6. **Human (H):** Building a future-ready workforce\n\n**Key Recommendations**\n• S3: Expand tailored support programs to rural areas\n• F2: Enable data-driven inclusive financing for women\n• F4: Standardize investment readiness & enhance networks\n• M1: Enhance market linkages & global competitiveness\n• M2: Develop a National Market Expansion Program\n• C1: Build inclusive and inspiring entrepreneurial culture\n• C2: Embrace failure as a path to success\n• H: Bridge gaps in entrepreneurial education\n\n**Implementation:** Thematic Coordination Groups (TCGs) will be established for each domain, bringing together government, private sector, ESOs, and development partners.\n\nThe roadmap is a **living document**. Updated regularly to reflect evolving needs.`
  },
  initiative3ei: {
    keywords:['3ei','3e','enhancing entrepreneurial','initiative','sdc','koica','swisscontact program'],
    answer:`**The 3Ei Initiative (Enhancing Entrepreneurial Ecosystem & Investments):**\n\n**What is 3Ei?**\nThe 3Ei Initiative is a multi-year program designed to strengthen Cambodia's entrepreneurial ecosystem. It co-finances and co-implements key programs across research, support, and investment.\n\n**Funders**\n• Swiss Agency for Development & Cooperation (SDC)\n• Korea International Cooperation Agency (KOICA)\n• Khmer Enterprise (KE)\n\n**Implementers**\n• Khmer Enterprise\n• Swisscontact Cambodia\n\n**Key Activities**\n• Social Network Analysis (SNA) studies (2021, 2024, planned 2026)\n• Entrepreneurial Ecosystem Roadmap (EER) development\n• ESO capacity building\n• Investment readiness programs\n• Data and knowledge management (reports, dashboards)\n\n**Significance**\nThe 3Ei Initiative is one of the most comprehensive ecosystem-building programs in Cambodia, combining research with practical support. It has directly engaged 390+ entrepreneurs and dozens of ESOs.`
  },
  businessplan: {
    keywords:['business plan','pitch','pitch deck','plan','write a plan','financial projection','forecast','revenue model','business model','canvas','lean canvas'],
    answer:`**Creating a Business Plan for Cambodia:**\n\n**2024 Data:** Business Planning is the #1 ESO support need. 187 entrepreneurs need it!\n\n**Essential Sections**\n1. **Executive Summary**. 1-page overview of your business\n2. **Problem & Solution**. What need you address and how\n3. **Market Analysis**. Target customers, size, competition\n4. **Business Model**. How you make money (revenue streams)\n5. **Operations Plan**. How you deliver your product/service\n6. **Team**. Founders and key staff\n7. **Financial Projections**. 3-year revenue, costs, and cash flow\n8. **Funding Ask** (if seeking investment)\n\n**Free Templates & Tools**\n• KE Business Plan Template (khmerenterprise.gov.kh)\n• Lean Canvas (free online, 1-page model)\n• SCORE Business Plan Builder (free)\n\n**Common Mistakes**\n• Overestimating market size\n• No clear customer persona\n• Ignoring competition\n• Unrealistic financial projections\n\n**KE Programs:**\n• Free Business Planning workshops in Phnom Penh, Siem Reap, Battambang\n• One-on-one ESO business planning support\n• KE Startup Lab for early-stage businesses\n\nWould you like guidance on any specific section of your business plan?`
  },
  logistics: {
    keywords:['logistics','supply chain','shipping','import','export','warehouse','distribution','delivery','freight','customs','border'],
    answer:`**Logistics & Supply Chain for Cambodian Businesses:**\n\n**2024 Data:** 106 entrepreneurs need logistics support; only 29 received it. A large gap!\n\n**Cambodia Logistics Overview**\n• Main port: Sihanoukville (Preah Sihanouk) for sea freight\n• Phnom Penh Special Economic Zone (PPSEZ)\n• Road networks improving but rural access still challenging\n• Phnom Penh International Airport for air cargo\n\n**Key Logistics Providers**\n• DHL, FedEx, UPS (international)\n• Ninja Van, J&T Express (domestic)\n• Kerry Logistics (regional)\n• Local trucking companies for inter-city\n\n**Export Support**\n• Ministry of Commerce Export Promotion Department\n• EuroCham trade facilitation\n• Mekong Business Initiative (ASEAN trade)\n• EVFTA (EU-Vietnam FTA) opportunities for Cambodia\n\n**E-commerce Logistics**\n• Nham24, Lalamove (same-day delivery)\n• Shopee/Lazada integrated logistics\n\n**EER Roadmap:** Market domain recommends developing a National Market Expansion Program to improve domestic and export logistics for MSMEs.`
  },
  rural: {
    keywords:['rural','province','provincial','countryside','village','kampong','kampot','takeo','prey veng','kandal','kratie','mondulkiri','ratanakiri','pursat','kampong thom','kampong cham','svay rieng'],
    answer:`**Entrepreneurship Outside the Major Cities:**\n\n**Current Coverage**\n• 2024 SNA covers Phnom Penh, Siem Reap, and Battambang\n• Rural provinces (Kampong Cham, Kampot, Kandal, etc.) have growing SME activity\n• KE has provincial offices and partners in multiple provinces\n\n**Challenges for Rural Entrepreneurs**\n• Limited access to ESOs and mentors\n• Lower digital connectivity\n• Fewer formal financing options\n• Smaller local markets. Need to sell to Phnom Penh or export\n\n**EER Recommendation (S3)**\n• Expand tailored support programs to rural areas\n• Create provincial business development hubs\n• Mobile ESO teams to reach underserved areas\n\n**Opportunities**\n• Agriculture & agribusiness (high potential)\n• Eco-tourism and cultural tourism\n• Handicrafts and artisan goods\n• ASEAN connectivity improvements opening new corridors\n\n**Support Available**\n• KE provincial outreach programs\n• USAID Harvest II (agriculture focus)\n• AMK Microfinance (rural focus)\n• Swisscontact vocational programs in provinces\n\nAre you based in a specific province? I can try to identify the nearest support resources for you.`
  },
  whatiske: {
    keywords:['what is khmer enterprise','about ke','about khmer enterprise','who is khmer enterprise','ke mission','ke vision','ke programs','what does ke do'],
    answer:`**About Khmer Enterprise (KE):**\n\n**What is Khmer Enterprise?**\nKhmer Enterprise is Cambodia's national agency for SME and entrepreneurship support. It is attached to the Ministry of Economy and Finance and serves as the primary government body driving entrepreneurship development across the country.\n\n**Mission**\nTo foster a competitive, inclusive, and innovative entrepreneurial ecosystem that drives economic growth and job creation in Cambodia.\n\n**Key Programs**\n• KE Startup Grant (up to USD 10,000)\n• KE Mentorship Network\n• KE Digital Literacy Workshops\n• KE Investment Readiness Program\n• KE Business Planning Support\n• 3Ei Initiative (with Swisscontact, SDC, KOICA)\n\n**Geographic Reach**\n• Headquarters: Phnom Penh\n• Active programs in Siem Reap and Battambang\n• Expanding to provincial areas\n\n**Key Leadership**\n• H.E. Dr. Vanmunin Chhieng (CEO)\n\n**Contact**\n• Website: khmerenterprise.gov.kh\n• Facebook: Khmer Enterprise\n• Email: info@ke.gov.kh\n\nKhmer Enterprise is the backbone of Cambodia's entrepreneurship support infrastructure.`
  },
  compare: {
    keywords:['compare','comparison','benchmark','versus','vs','better than','rank','ranking','how does cambodia compare','asean','southeast asia','neighbor'],
    answer:`**Cambodia vs Regional Peers. Entrepreneurship Benchmarking:**\n\n**GEI 2025 Scores (Southeast Asia)**\n| Country | GEI Score |\n|---|---|\n| Singapore | ~85 |\n| Malaysia | ~67 |\n| Thailand | ~65 |\n| Vietnam | ~55 |\n| Philippines | ~52 |\n| Indonesia | ~50 |\n| **Cambodia** | **~37** |\n| Laos | ~35 |\n| Myanmar | ~30 |\n\n**Cambodia's Strengths vs Region**\n• Strong mobile internet adoption (Connectedness pillar)\n• Improving regulatory environment (new investment law)\n• Young population with entrepreneurial mindset\n• Dollarized economy reduces currency risk for foreign investors\n\n**Cambodia's Gaps vs Region**\n• Governance & rule of law (weakest pillar)\n• Human capital depth (skills, technical education)\n• Financial inclusion (access to credit for SMEs)\n• R&D and innovation investment\n\n**Trend:** Cambodia's GEI score has improved from 29 (2011) to 37 (2025). Consistent upward trajectory of about 0.5 points per year.\n\nUse the **GEI Dashboard** to explore detailed pillar-by-pillar comparisons!`
  },
  challenges: {
    keywords:['challenge','problem','obstacle','barrier','difficulty','struggling','hard','issue','pain point','what is the biggest','main problem'],
    answer:`**Top Challenges for Cambodian Entrepreneurs (2024 Data):**\n\n**By Number of Entrepreneurs Who Need Support:**\n1. Market Access. **194 need help** (largest gap)\n2. Business Planning & Strategy. **187 need help**\n3. Digital Literacy. **176 need help**\n4. Networking & Partnerships. **166 need help**\n5. Access to Funding. **154 need help**\n6. Entrepreneurial Skills Training. **126 need help**\n7. Innovation & R&D. **118 need help**\n8. Financial Management. **115 need help**\n9. Technical & Operational Support. **124 need help**\n10. Logistics & Supply Chain. **106 need help**\n\n**Key Insights**\n• Support/demand gap is largest for Market Access and Business Planning\n• Digital Literacy gap is especially pronounced in Siem Reap\n• Investment readiness is a bottleneck for scaling businesses\n• Networking gaps are serious in Phnom Penh (137 need it)\n\n**What this means for you:**\nIf you're facing any of these challenges, you're not alone. KE has programs addressing each one. Which challenge resonates most with your situation?`
  },
  default: [
    `That's a great question! As your KE Business Assistant, I can help you with:\n\n**Business Registration**. Step-by-step guides\n**Funding & Investment**. Grants, loans, equity options\n**ESO Support**. Finding the right organizations\n**Scaling Strategies**. Growth roadmaps\n**Marketing & Digital**. Reach more customers\n**Mentorship**. Finding mentors and programs\n**Ecosystem Data**. SNA 2024 & GEI insights\n**Sector Guidance**. Agriculture, tourism, manufacturing, tech and more\n**Legal & Compliance**. Tax, labor, permits\n\nCould you tell me more about your situation? For example:\n• What sector are you in?\n• What stage is your business?\n• Which city are you based in?\n• What's your biggest challenge right now?`,
    `Based on the **KE 2024 SNA Data**, the top challenges for Cambodian entrepreneurs are:\n\n1. **Market Access**. 194 entrepreneurs need help\n2. **Business Planning**. 187 need help\n3. **Digital Literacy**. 176 need help\n4. **Networking & Partnerships**. 166 need help\n5. **Access to Funding**. 154 need help\n\nWhich of these resonates with your situation? Or describe your specific challenge and I'll give you a tailored response!`,
    `The Cambodian entrepreneurship ecosystem is growing rapidly. **390 SMEs** were surveyed across Phnom Penh, Siem Reap, and Battambang in the 2024 SNA study.\n\n**Quick facts:**\n• 41% of entrepreneurs received mentorship\n• 41% participated in peer exchange\n• Cambodia's GEI score improved from 29 (2011) to 37 (2025)\n• Battambang has the highest mentorship rate & most scaling-stage entrepreneurs\n\nI can help you with registration, funding, ESOs, digital tools, legal questions, sector insights, and much more. What would be most helpful for your business today?`
  ]
};

let defaultIdx = 0;
let micRecognition = null;
let isMicActive = false;
let historyPanelOpen = false;

/* ─────────────── USER PROFILE SYNC ─────────────── */
function loadUserData() {
  const name = localStorage.getItem('profileName') || 'Entrepreneur';
  const avatar = localStorage.getItem('profileAvatar') || '';
  const gender = localStorage.getItem('profileGender') || 'Male';

  // Default avatar images based on gender or stored path
  let avatarUrl = avatar;
  if (!avatarUrl) {
    if (gender.toLowerCase() === 'female') {
      avatarUrl = 'images/woman_profile.jpg';
    } else {
      avatarUrl = 'images/man_profile.jpg';
    }
  }

  // Update history panel
  const avatarEl = document.getElementById('chat-user-avatar');
  const nameEl = document.getElementById('chat-username');
  if (nameEl) nameEl.textContent = name;
  if (avatarEl) {
    if (avatarUrl) {
      avatarEl.innerHTML = `<img src="${avatarUrl}" alt="User avatar" style="width:100%;height:100%;object-fit:cover;">`;
    } else {
      avatarEl.textContent = name.charAt(0).toUpperCase();
    }
  }

  // Store for use in message avatars
  window._currentUserAvatar = avatarUrl;
  window._currentUserName = name;
}

// Also listen for storage changes if user updates profile on another tab
window.addEventListener('storage', (e) => {
  if (e.key === 'profileName' || e.key === 'profileAvatar' || e.key === 'profileGender') {
    loadUserData();
  }
});

// ── History Panel Toggle ──
function toggleHistoryPanel() {
  const panel = document.getElementById('historyPanel');
  const isMobile = window.innerWidth <= 768;
  historyPanelOpen = !historyPanelOpen;
  if (isMobile) {
    if (historyPanelOpen) {
      panel.classList.add('open');
      document.getElementById('sidebarOverlay').classList.add('active');
    } else {
      panel.classList.remove('open');
      document.getElementById('sidebarOverlay').classList.remove('active');
    }
  } else {
    panel.classList.toggle('collapsed', !historyPanelOpen);
  }
}

// ── Mobile sidebar ──
function openMobileSidebar() {
  document.getElementById('navSidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('active');
}
function closeMobileSidebar() {
  document.getElementById('navSidebar').classList.remove('open');
  document.getElementById('historyPanel').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('active');
  historyPanelOpen = false;
}

// ── Chat Actions ──
function newChat() {
  document.getElementById('messages').innerHTML = '';
  document.getElementById('chat-welcome').style.display = 'flex';
  document.getElementById('chat-input').value = '';
  defaultIdx = 0;
  const list = document.getElementById('chat-history');
  list.querySelectorAll('.ch-item').forEach(el => el.classList.remove('active'));
  const item = document.createElement('div');
  item.className = 'ch-item active';
  item.innerHTML = `<div class="ch-title">New Conversation</div><div class="ch-time">Just now</div>`;
  item.onclick = () => selectChat(item);
  list.insertBefore(item, list.firstChild);
}

function selectChat(el) {
  document.querySelectorAll('.ch-item').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function searchChats(val) {
  document.querySelectorAll('.ch-item').forEach(item => {
    const t = item.querySelector('.ch-title').textContent.toLowerCase();
    item.style.display = !val || t.includes(val.toLowerCase()) ? '' : 'none';
  });
}

function clearChat() {
  if (!confirm('Clear this conversation?')) return;
  document.getElementById('messages').innerHTML = '';
  document.getElementById('chat-welcome').style.display = 'flex';
}

// ── Detect Khmer characters ──
function containsKhmer(text) {
  return /[\u1780-\u17FF]/.test(text);
}

// ── Messaging ──
function sendSuggestion(btn) {
  const text = btn.querySelector('.sg-text').textContent;
  document.getElementById('chat-welcome').style.display = 'none';
  appendUserMsg(text);
  showTyping();
  setTimeout(() => { removeTyping(); appendBotMsg(getBotResponse(text)); }, 1100 + Math.random() * 700);
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  
  // Detect and apply Khmer font if needed
  if (containsKhmer(text)) {
    input.classList.add('khmer-text');
  } else {
    input.classList.remove('khmer-text');
  }
  
  input.value = '';
  input.style.height = 'auto';
  document.getElementById('chat-welcome').style.display = 'none';
  appendUserMsg(text);
  showTyping();
  setTimeout(() => { removeTyping(); appendBotMsg(getBotResponse(text)); }, 1000 + Math.random() * 800);
}

function handleKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 130) + 'px';

  // ADD THIS: Detect Khmer while typing
  if (containsKhmer(el.value)) {
    el.style.fontFamily = "'Noto Sans Khmer', 'Poppins', sans-serif";
  } else {
    el.style.fontFamily = "'Poppins', sans-serif";
  }
}

function getBotResponse(text) {
  const lower = text.toLowerCase();
  for (const key in BOT_RESPONSES) {
    if (key === 'default') continue;
    if (BOT_RESPONSES[key].keywords.some(kw => lower.includes(kw))) return BOT_RESPONSES[key].answer;
  }
  const ans = BOT_RESPONSES.default[defaultIdx % BOT_RESPONSES.default.length];
  defaultIdx++;
  return ans;
}

function getUserAvatarHTML() {
  const avatarUrl = window._currentUserAvatar;
  const name = window._currentUserName || 'E';
  if (avatarUrl) {
    return `<img src="${avatarUrl}" alt="User">`;
  }
  return name.charAt(0).toUpperCase();
}

function appendUserMsg(text) {
  const msgs = document.getElementById('messages');
  const now = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  const row = document.createElement('div');
  row.className = 'msg-row user';
  
  const hasKhmer = containsKhmer(text);
  const khmerClass = hasKhmer ? ' khmer-text' : '';
  
  row.innerHTML = `
    <div class="msg-avatar">${getUserAvatarHTML()}</div>
    <div class="msg-content">
      <div class="msg-bubble${khmerClass}">${escHtml(text)}</div>
      <div class="msg-time">${now}</div>
    </div>`;
  msgs.appendChild(row);
  scrollBottom();
}

function appendBotMsg(text) {
  const msgs = document.getElementById('messages');
  const now = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  const row = document.createElement('div');
  row.className = 'msg-row bot';
  
  const hasKhmer = containsKhmer(text);
  const khmerClass = hasKhmer ? ' khmer-text' : '';
  
  row.innerHTML = `
    <div class="msg-avatar">
      <img src="images/KEbot.png" alt="KE">
    </div>
    <div class="msg-content">
      <div class="msg-bubble${khmerClass}">${md2html(text)}</div>
      <div class="msg-time">${now}</div>
    </div>`;
  msgs.appendChild(row);
  scrollBottom();
}

function showTyping() {
  const msgs = document.getElementById('messages');
  const row = document.createElement('div');
  row.className = 'msg-row bot'; row.id = 'typing-row';
  row.innerHTML = `
    <div class="msg-avatar">
      <img src="images/KEbot.png" alt="KE">
    </div>
    <div class="msg-content">
      <div class="typing-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>
    </div>`;
  msgs.appendChild(row);
  scrollBottom();
}
function removeTyping() {
  const t = document.getElementById('typing-row');
  if (t) t.remove();
}
function scrollBottom() {
  const b = document.getElementById('chat-body');
  b.scrollTop = b.scrollHeight;
}

// ── Mic ──
function toggleMic() {
  if (isMicActive) { stopMic(); return; }
  startMic();
}

function startMic() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
    return;
  }
  micRecognition = new SpeechRecognition();
  micRecognition.lang = 'en-US';
  micRecognition.continuous = false;
  micRecognition.interimResults = true;
  const input = document.getElementById('chat-input');
  micRecognition.onresult = (e) => {
    let transcript = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      transcript += e.results[i][0].transcript;
    }
    input.value = transcript;
    autoResize(input);
  };
  micRecognition.onend = () => { stopMic(); };
  micRecognition.onerror = () => { stopMic(); };
  micRecognition.start();
  isMicActive = true;
  document.getElementById('mic-btn').classList.add('recording');
  document.getElementById('mic-toast').classList.add('visible');
}

function stopMic() {
  if (micRecognition) { micRecognition.stop(); micRecognition = null; }
  isMicActive = false;
  document.getElementById('mic-btn').classList.remove('recording');
  document.getElementById('mic-toast').classList.remove('visible');
}

// ── Helpers ──
function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function md2html(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/\n\n/g,'</p><p style="margin-top:8px">')
    .replace(/\n/g,'<br>')
    .replace(/^/,'<p>').replace(/$/,'</p>');
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  loadUserData();
  
  // Auto-close history panel on mobile
  if (window.innerWidth <= 768) {
    document.getElementById('historyPanel').classList.remove('open');
    historyPanelOpen = false;
  } else {
    historyPanelOpen = true;
  }
});