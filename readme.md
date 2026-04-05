# Business Assistant — Question Coverage Guide

**Version 2.0 | Updated for chatbot.js expanded knowledge base**

This document lists all topics and example questions the KE AI Business Chatbot can respond to. Questions are matched by keyword detection against the user's input.

---

## Topic 1: Business Registration
**Trigger keywords:** register, registration, ministry, formal, license, permit, moc, incorporate, set up business, open a business, start a business, business license, patent tax, tin number, tax id

**Example questions:**
- How do I register my business in Cambodia?
- What is the process at the Ministry of Commerce?
- How much does a business license cost?
- What is a TIN number and how do I get one?
- What permits do I need for a food business?
- How do I incorporate a private limited company?

---

## Topic 2: Funding & Investment
**Trigger keywords:** funding, fund, invest, loan, grant, capital, money, finance, investor, microfinance, equity, debt, bootstrap, seed, series, venture, vc, angel, credit

**Example questions:**
- What funding options are available for my startup?
- Are there any grants for Cambodian entrepreneurs?
- How do I get a business loan from a bank?
- What microfinance institutions work with SMEs?
- How do I find investors for my business?
- What is the KE Startup Grant and how do I apply?
- How do I become investment-ready?

---

## Topic 3: ESO & Support Organizations
**Trigger keywords:** eso, support organization, ngo, program, khmer enterprise, ke, assistance, support program, ecosystem support, help my business, 3ei, swisscontact, sdc, koica, giz, usaid

**Example questions:**
- Which ESOs can help my business?
- What programs does Khmer Enterprise offer?
- Are there any NGOs supporting SMEs in Cambodia?
- What is Swisscontact doing for entrepreneurs?
- How can USAID help my business?
- What is the 3Ei Initiative?

---

## Topic 4: Scaling & Growth
**Trigger keywords:** scale, grow, growth, expand, expansion, bigger, scaling, level up, next stage, grow my business

**Example questions:**
- How do I scale my business?
- What is the growth roadmap for a Cambodian SME?
- How do I expand from Phnom Penh to other cities?
- When should I consider regional expansion?
- How do I go from early stage to scaling stage?

---

## Topic 5: Marketing & Branding
**Trigger keywords:** marketing, brand, branding, social media, promotion, advertise, customer, market, tiktok, facebook, digital marketing, content, seo, e-commerce

**Example questions:**
- How do I market my business in Cambodia?
- Should I use Facebook or TikTok for my business?
- How do I build a brand on a small budget?
- What e-commerce platforms work in Cambodia?
- How do I do SEO for my Cambodian business?
- How do I get customers online?

---

## Topic 6: Mentorship
**Trigger keywords:** mentor, mentorship, coach, coaching, advisor, advice, guidance, role model, business coach

**Example questions:**
- How do I find a mentor in Cambodia?
- What is the KE Mentorship Program?
- How does mentorship help my business?
- Where can I find a business coach in Phnom Penh?
- How many entrepreneurs received mentorship in 2024?

---

## Topic 7: Phnom Penh Ecosystem
**Trigger keywords:** phnom penh, capital city, pp ecosystem, phnom penh business, phnom penh entrepreneur

**Example questions:**
- What is the entrepreneurship ecosystem like in Phnom Penh?
- How many entrepreneurs are in Phnom Penh?
- What support is available for businesses in the capital?
- How developed is Phnom Penh's ecosystem vs other cities?

---

## Topic 8: Siem Reap Ecosystem
**Trigger keywords:** siem reap, angkor, tourism business, siem reap entrepreneur, siem reap ecosystem

**Example questions:**
- What is the business scene like in Siem Reap?
- Are there ESOs in Siem Reap?
- How many entrepreneurs are in Siem Reap?
- What support does Angkor Enterprise Hub provide?
- How is Siem Reap recovering post-COVID for tourism businesses?

---

## Topic 9: Battambang Ecosystem
**Trigger keywords:** battambang, northwest, battambang business, battambang entrepreneur, battambang ecosystem

**Example questions:**
- What is the entrepreneurship scene in Battambang?
- Why does Battambang have the most scaling-stage businesses?
- What business support is available in Battambang?
- How active is peer exchange in Battambang?

---

## Topic 10: Global Entrepreneurship Index (GEI)
**Trigger keywords:** gei, global entrepreneurship index, index score, cambodia score, global ranking, entrepreneurship index, benchmark, compare countries, pillar score

**Example questions:**
- What is Cambodia's GEI score?
- How does Cambodia rank in the Global Entrepreneurship Index?
- What are the 5 pillars of the GEI?
- How does Cambodia perform on governance vs connectivity?
- What is Cambodia's GEI trend since 2011?

---

*(… continue the same pattern for Topics 11–24 …)*

---

## Data Sources Used in This Chatbot
1. **SNA 2024 Report** — "Connecting the Cambodia Entrepreneurial Ecosystem" (Khmer Enterprise / Swisscontact / Sevea, Dec 2024)  
   - 390 entrepreneurs surveyed across Phnom Penh, Siem Reap, Battambang  
   - ESO support data, entrepreneur profiles, gap analysis

2. **SNA_2024_cleaned.json** — Structured data from the SNA study  
   - City-level breakdowns, support needs, funding stats, entrepreneur stage distribution

3. **gei_data.json** — Opinium Global Entrepreneurship Index 2025  
   - 130+ countries including Cambodia  
   - 5 pillars: Economic, Human Capital, Connectedness, Governance, Market Potential  
   - Historical trend data 2011–2025

4. **Khmer_Enterprise_All_Research_Report.txt** — Compiled reports:  
   - SNA 2024 full report  
   - SNA 2021 report (Phnom Penh baseline)  
   - Entrepreneurial Ecosystem Roadmap (EER)  
   - Supporting research and annexes

---

## Notes for Developers
- The chatbot uses **keyword matching** (not AI/NLP) for responses.  
- **Adding new topics:** Add a new key to `BOT_RESPONSES` in `chatbot.js` with a `keywords` array and an `answer` string.  
- **Markdown supported in answers:** `**bold**`, `*italic*`, `\n` for newlines.  
- The `default` array rotates through 3 fallback responses.  
- To upgrade to Claude API: replace `getBotResponse()` with an async API call to `/v1/messages` with context from the data files.

---

© 2026 Khmer Enterprise · Entrepreneurship Ecosystem Intelligence Platform