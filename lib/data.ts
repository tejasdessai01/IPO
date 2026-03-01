export interface IPORecord {
  id: string;
  company_name: string;
  logo_url: string | null;
  status: string;
  ipo_type: string;
  open_date: string | null;
  close_date: string | null;
  listing_date: string | null;
  price_band_low: number | null;
  price_band_high: number | null;
  face_value: number | null;
  lot_size: number | null;
  min_investment: number | null;
  issue_size_cr: number | null;
  fresh_issue_cr: number | null;
  ofs_cr: number | null;
  subscription_retail: number;
  subscription_nii: number;
  subscription_qib: number;
  subscription_total: number;
  gmp: number;
  gmp_percent: number;
  gmp_updated_at: string | null;
  listing_price: number | null;
  listing_gain_percent: number | null;
  current_price: number | null;
  industry: string | null;
  description: string | null;
  about: string | null;
  business_model: string | null;
  strengths: string | null;
  risks: string | null;
  financials_json: string | null;
  promoters: string | null;
  lead_managers: string | null;
  registrar: string | null;
  drhp_url: string | null;
  rhp_url: string | null;
  ai_summary: string | null;
  ai_verdict: string | null;
  ai_score: number | null;
  allotment_date: string | null;
  allotment_status_url: string | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface GmpHistoryRecord {
  id: number;
  ipo_id: string;
  gmp: number;
  recorded_at: string;
}

export interface TimelineEventRecord {
  id: number;
  ipo_id: string;
  event_type: string;
  event_date: string;
  label: string;
}

function generateGmpHistory(ipoId: string, baseGmp: number, openDate: string): GmpHistoryRecord[] {
  const history: GmpHistoryRecord[] = [];
  const base = new Date(openDate);
  let id = 0;
  for (let i = -14; i <= 0; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    const variation = (Math.sin(i * 0.7 + ipoId.length) * 0.5) * baseGmp * 0.4;
    history.push({
      id: id++,
      ipo_id: ipoId,
      gmp: Math.round(baseGmp + variation),
      recorded_at: d.toISOString().split('T')[0] + 'T12:00:00Z',
    });
  }
  return history;
}

const now = new Date().toISOString();

export const ipos: IPORecord[] = [
  {
    id: 'hexaware-technologies-ipo',
    company_name: 'Hexaware Technologies',
    logo_url: null, status: 'listed', ipo_type: 'mainboard',
    open_date: '2025-02-12', close_date: '2025-02-14', listing_date: '2025-02-19',
    price_band_low: 674, price_band_high: 708, face_value: 2, lot_size: 21, min_investment: 14868,
    issue_size_cr: 8750, fresh_issue_cr: 0, ofs_cr: 8750,
    subscription_retail: 1.93, subscription_nii: 0.68, subscription_qib: 3.41, subscription_total: 2.66,
    gmp: 0, gmp_percent: 0, gmp_updated_at: '2025-02-19T10:00:00Z',
    listing_price: 731, listing_gain_percent: 3.25, current_price: 745,
    industry: 'IT Services',
    description: 'Hexaware Technologies is a global IT services company providing digital transformation, cloud, and automation solutions.',
    about: 'Hexaware Technologies Limited is a leading global provider of IT services and solutions. Founded in 1990, the company has grown to become one of India\'s prominent IT firms with a presence across Americas, Europe, and Asia-Pacific. The company serves clients across banking, financial services, healthcare, insurance, manufacturing, and travel industries.\n\nWith over 30,000 employees worldwide, Hexaware specializes in cloud transformation, data & AI, digital assurance, and application modernization. The company follows a unique "Automate Everything, Cloudify Everything, Transform Customer Experiences" philosophy that drives its service delivery.',
    business_model: 'Hexaware generates revenue primarily through IT services contracts with global enterprises. The company follows a project-based and managed services model, earning recurring revenue from long-term digital transformation engagements. Key revenue streams include cloud infrastructure services, application development and maintenance, business process services, and digital consulting.',
    strengths: JSON.stringify(['Strong client relationships with Fortune 500 companies', 'Robust cloud and digital capabilities', 'Consistent revenue growth with healthy margins', 'Diversified industry presence across 6+ verticals', 'Experienced management team with deep domain expertise']),
    risks: JSON.stringify(['High dependence on top 10 clients for majority revenue', 'Intense competition from larger IT services firms', 'Currency fluctuation risks due to global operations', 'Talent retention challenges in competitive IT market']),
    financials_json: JSON.stringify([
      { year: 'FY2022', revenue: 6872, pat: 897, networth: 3245 },
      { year: 'FY2023', revenue: 8156, pat: 1034, networth: 3890 },
      { year: 'FY2024', revenue: 9234, pat: 1189, networth: 4567 },
    ]),
    promoters: JSON.stringify(['Carlyle Group (74.7%)']),
    lead_managers: JSON.stringify(['Kotak Mahindra Capital', 'Citigroup', 'JP Morgan', 'IIFL Securities']),
    registrar: 'KFin Technologies',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Hexaware Technologies is a well-established IT services company backed by Carlyle Group. The IPO is a pure OFS (Offer for Sale) with no fresh issue component, meaning proceeds go entirely to the selling shareholder. The company demonstrates consistent revenue growth with healthy profitability margins. While valuations appear reasonable compared to mid-cap IT peers, the lack of fresh capital raise and concentrated client base are considerations. The company\'s strong cloud and digital capabilities position it well for future growth.',
    ai_verdict: 'subscribe', ai_score: 7,
    allotment_date: '2025-02-17', allotment_status_url: 'https://kosmic.kfintech.com/ipostatus',
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'dr-agarwals-health-care-ipo',
    company_name: 'Dr. Agarwals Health Care',
    logo_url: null, status: 'listed', ipo_type: 'mainboard',
    open_date: '2025-01-29', close_date: '2025-01-31', listing_date: '2025-02-05',
    price_band_low: 382, price_band_high: 402, face_value: 5, lot_size: 37, min_investment: 14874,
    issue_size_cr: 3027, fresh_issue_cr: 300, ofs_cr: 2727,
    subscription_retail: 5.12, subscription_nii: 3.89, subscription_qib: 22.45, subscription_total: 13.28,
    gmp: 0, gmp_percent: 0, gmp_updated_at: '2025-02-05T10:00:00Z',
    listing_price: 440, listing_gain_percent: 9.45, current_price: 458,
    industry: 'Healthcare',
    description: 'Dr. Agarwals Health Care is one of India\'s largest eye care chains with 160+ hospitals across India and Africa.',
    about: 'Dr. Agarwals Health Care Limited is among the largest eye care service networks in the world. Established in 1957, the company operates a chain of eye hospitals and clinics providing comprehensive eye care services including cataract surgery, refractive surgery, glaucoma management, and retina care.\n\nThe company operates over 160 eye hospitals across India, Africa, and other emerging markets. It has performed millions of eye surgeries and is known for its clinical excellence and affordable pricing model that serves patients across all socio-economic segments.',
    business_model: 'The company operates on a hub-and-spoke hospital model where large flagship hospitals serve as hubs supported by smaller satellite clinics. Revenue comes from surgical procedures (cataract, LASIK, retina), outpatient consultations, optical retail, and pharmacy sales. The company also earns from training programs and international patient inflow.',
    strengths: JSON.stringify(['Largest eye care chain with strong brand recognition', 'Asset-light expansion model with high ROE', 'Growing demand for eye care in aging population', 'Proven hub-and-spoke hospital network model', 'International presence in Africa adds growth runway']),
    risks: JSON.stringify(['High competition from regional eye care chains', 'Doctor dependency risk in specialized healthcare', 'Regulatory risks in healthcare sector', 'Integration risks from rapid expansion']),
    financials_json: JSON.stringify([
      { year: 'FY2022', revenue: 1845, pat: 187, networth: 1234 },
      { year: 'FY2023', revenue: 2234, pat: 245, networth: 1456 },
      { year: 'FY2024', revenue: 2678, pat: 312, networth: 1789 },
    ]),
    promoters: JSON.stringify(['Dr. Agarwal Family (48.2%)', 'TPG Growth (28.6%)', 'Temasek (12.4%)']),
    lead_managers: JSON.stringify(['Morgan Stanley', 'Jefferies', 'Kotak Mahindra Capital', 'Axis Capital']),
    registrar: 'Link Intime India',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Dr. Agarwals is a compelling healthcare story with a dominant position in the growing eye care market. The company benefits from India\'s aging demographics and increasing awareness about eye health. Revenue growth of 20%+ CAGR and improving margins reflect strong operational execution. The PE-backed ownership (TPG + Temasek) brings governance strength. However, at 65x PE, valuations are rich compared to hospital peers. Long-term investors with a 3-5 year horizon may find value as the network scales.',
    ai_verdict: 'subscribe', ai_score: 8,
    allotment_date: '2025-02-03', allotment_status_url: 'https://linkintime.co.in/initial_offer',
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'quality-power-electrical-ipo',
    company_name: 'Quality Power Electrical Equipments',
    logo_url: null, status: 'listed', ipo_type: 'mainboard',
    open_date: '2025-02-14', close_date: '2025-02-18', listing_date: '2025-02-21',
    price_band_low: 401, price_band_high: 425, face_value: 10, lot_size: 35, min_investment: 14875,
    issue_size_cr: 858, fresh_issue_cr: 500, ofs_cr: 358,
    subscription_retail: 7.56, subscription_nii: 12.34, subscription_qib: 45.67, subscription_total: 28.12,
    gmp: 0, gmp_percent: 0, gmp_updated_at: '2025-02-21T10:00:00Z',
    listing_price: 498, listing_gain_percent: 17.18, current_price: 512,
    industry: 'Power & Energy',
    description: 'Quality Power manufactures electrical equipment for power generation, transmission, and distribution sectors.',
    about: 'Quality Power Electrical Equipments Limited is a leading manufacturer of specialized electrical equipment serving India\'s power sector. The company designs, manufactures, and supplies transformers, switchgear, and other electrical infrastructure products used in power generation, transmission, and distribution networks.\n\nWith manufacturing facilities in Gujarat and Maharashtra, the company caters to both domestic and international markets. It serves major power utilities, industrial customers, and infrastructure developers across the country.',
    business_model: 'Quality Power earns revenue through manufacture and sale of electrical equipment including power transformers (up to 765 kV), distribution transformers, and switchgear. The company secures orders through competitive bidding from government utilities and private infrastructure developers. Export revenue contributes about 15% of total sales.',
    strengths: JSON.stringify(['Riding India\'s massive power infrastructure expansion', 'Order book provides revenue visibility for 2-3 years', 'Government push for renewable energy creates demand', 'Technical capabilities in high-voltage equipment']),
    risks: JSON.stringify(['Capital-intensive business with working capital needs', 'Dependence on government orders and policy changes', 'Raw material price fluctuation risk (copper, steel)', 'Competition from established players like ABB, Siemens']),
    financials_json: JSON.stringify([
      { year: 'FY2022', revenue: 567, pat: 45, networth: 234 },
      { year: 'FY2023', revenue: 789, pat: 78, networth: 312 },
      { year: 'FY2024', revenue: 1045, pat: 112, networth: 423 },
    ]),
    promoters: JSON.stringify(['Jitendra Patel (62.5%)']),
    lead_managers: JSON.stringify(['ICICI Securities', 'Motilal Oswal']),
    registrar: 'KFin Technologies',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Quality Power rides the India power infrastructure boom with strong order book visibility. Revenue has nearly doubled in 2 years reflecting the sector tailwinds. Fresh issue proceeds will fund capacity expansion which is much needed given order pipeline. The power equipment sector enjoys government policy support through transmission upgrades and renewable integration. Valuations at 30x FY24 PE are reasonable for the growth trajectory. A solid subscribe for investors betting on India\'s power story.',
    ai_verdict: 'subscribe', ai_score: 7,
    allotment_date: '2025-02-19', allotment_status_url: 'https://kosmic.kfintech.com/ipostatus',
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'capital-infra-trust-ipo',
    company_name: 'Capital Infra Trust InvIT',
    logo_url: null, status: 'listed', ipo_type: 'mainboard',
    open_date: '2025-01-07', close_date: '2025-01-09', listing_date: '2025-01-14',
    price_band_low: 99, price_band_high: 100, face_value: 10, lot_size: 150, min_investment: 15000,
    issue_size_cr: 2520, fresh_issue_cr: 2520, ofs_cr: 0,
    subscription_retail: 2.34, subscription_nii: 1.89, subscription_qib: 5.67, subscription_total: 3.78,
    gmp: 0, gmp_percent: 0, gmp_updated_at: '2025-01-14T10:00:00Z',
    listing_price: 101, listing_gain_percent: 1.0, current_price: 98,
    industry: 'Infrastructure',
    description: 'Capital Infra Trust is an InvIT focusing on road infrastructure assets with stable toll-based revenue.',
    about: 'Capital Infra Trust is an Infrastructure Investment Trust (InvIT) sponsored by Gawar Construction Limited. The trust holds a portfolio of road assets across India, generating stable cash flows through toll collection and annuity payments from NHAI.\n\nThe trust\'s portfolio includes operational road projects spanning several thousand kilometers across multiple states, providing geographical diversification and stable yield to investors.',
    business_model: 'The InvIT generates revenue through toll collections on its operational road assets and annuity payments from the National Highways Authority of India (NHAI). The stable, predictable cash flows are distributed to unitholders as regular distributions, making it similar to a dividend-yielding instrument.',
    strengths: JSON.stringify(['Stable toll-based revenue model', 'Government-backed annuity payments', 'Regular distribution yield for investors', 'Growing road infrastructure portfolio']),
    risks: JSON.stringify(['Interest rate sensitivity affecting valuations', 'Traffic volume depends on economic activity', 'Regulatory changes in toll collection', 'Limited capital appreciation potential']),
    financials_json: JSON.stringify([
      { year: 'FY2023', revenue: 890, pat: 234, networth: 2100 },
      { year: 'FY2024', revenue: 1045, pat: 289, networth: 2350 },
    ]),
    promoters: JSON.stringify(['Gawar Construction Limited']),
    lead_managers: JSON.stringify(['HDFC Bank', 'ICICI Securities', 'Nuvama Wealth']),
    registrar: 'KFin Technologies',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Capital Infra Trust InvIT offers stable yield play through road toll assets. At ₹100 unit price, the expected distribution yield of 8-9% is attractive compared to fixed deposits. However, InvITs have limited capital appreciation and are interest-rate sensitive. Suitable for income-seeking investors looking for infrastructure exposure. Not ideal for growth-oriented investors.',
    ai_verdict: 'neutral', ai_score: 6,
    allotment_date: '2025-01-10', allotment_status_url: 'https://kosmic.kfintech.com/ipostatus',
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'bajaj-housing-finance-ipo',
    company_name: 'Bajaj Housing Finance',
    logo_url: null, status: 'listed', ipo_type: 'mainboard',
    open_date: '2024-09-09', close_date: '2024-09-11', listing_date: '2024-09-16',
    price_band_low: 66, price_band_high: 70, face_value: 5, lot_size: 214, min_investment: 14980,
    issue_size_cr: 6560, fresh_issue_cr: 3560, ofs_cr: 3000,
    subscription_retail: 7.41, subscription_nii: 32.68, subscription_qib: 209.43, subscription_total: 63.61,
    gmp: 0, gmp_percent: 0, gmp_updated_at: '2024-09-16T10:00:00Z',
    listing_price: 150, listing_gain_percent: 114.29, current_price: 132,
    industry: 'Financial Services',
    description: 'Bajaj Housing Finance is a housing finance company and subsidiary of Bajaj Finance Ltd.',
    about: 'Bajaj Housing Finance Limited is a housing finance company and a wholly-owned subsidiary of Bajaj Finance Limited. The company offers home loans, loans against property, lease rental discounting, and developer finance products. It benefits from the strong brand and distribution network of the Bajaj Group.\n\nThe company has built a diversified loan book focused on salaried and self-employed home buyers across metros and tier-2 cities. Its technology-driven underwriting and the backing of Bajaj Finance give it a competitive edge in the housing finance market.',
    business_model: 'Revenue is primarily driven by interest income from its loan portfolio comprising home loans, loans against property (LAP), and developer finance. The company leverages Bajaj Finance\'s distribution network and technology platform to source and process loans efficiently, maintaining competitive NIMs.',
    strengths: JSON.stringify(['Strong Bajaj brand and parent company support', 'Fast-growing AUM with superior asset quality', 'Technology-driven lending platform', 'Diversified product mix across housing segments', 'Low cost of funds due to high credit rating']),
    risks: JSON.stringify(['Premium valuation compared to housing finance peers', 'Interest rate risk affecting margins', 'Real estate market cyclicality', 'Competition from banks and other HFCs']),
    financials_json: JSON.stringify([
      { year: 'FY2022', revenue: 3456, pat: 789, networth: 6789 },
      { year: 'FY2023', revenue: 5234, pat: 1234, networth: 8567 },
      { year: 'FY2024', revenue: 7890, pat: 1876, networth: 10456 },
    ]),
    promoters: JSON.stringify(['Bajaj Finance Limited (100%)']),
    lead_managers: JSON.stringify(['Kotak Mahindra Capital', 'BofA Securities', 'SBI Capital', 'Goldman Sachs', 'JM Financial']),
    registrar: 'KFin Technologies',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Bajaj Housing Finance was one of the most anticipated IPOs of 2024, backed by the Bajaj brand. The company showed exceptional growth with AUM growing 50%+ CAGR. Despite premium valuations, the listing was stellar at 114% premium. The Bajaj brand and parent support provide significant competitive advantages. Long-term holding potential remains strong given India\'s housing finance growth story.',
    ai_verdict: 'subscribe', ai_score: 9,
    allotment_date: '2024-09-12', allotment_status_url: 'https://kosmic.kfintech.com/ipostatus',
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'laxmi-dental-ipo',
    company_name: 'Laxmi Dental',
    logo_url: null, status: 'closed', ipo_type: 'mainboard',
    open_date: '2025-01-13', close_date: '2025-01-15', listing_date: '2025-01-20',
    price_band_low: 407, price_band_high: 428, face_value: 2, lot_size: 33, min_investment: 14124,
    issue_size_cr: 698, fresh_issue_cr: 138, ofs_cr: 560,
    subscription_retail: 3.45, subscription_nii: 8.12, subscription_qib: 56.78, subscription_total: 29.34,
    gmp: 45, gmp_percent: 10.51, gmp_updated_at: '2025-02-26T14:00:00Z',
    listing_price: null, listing_gain_percent: null, current_price: null,
    industry: 'Healthcare',
    description: 'Laxmi Dental is India\'s largest dental products manufacturer and distributor.',
    about: 'Laxmi Dental Limited is India\'s largest integrated dental products company. The company manufactures and distributes a wide range of dental products including dental prosthetics, aligners, pediatric dental products, and dental equipment. It serves over 25,000 dental professionals across India.\n\nFounded in 1990, Laxmi Dental has built a comprehensive ecosystem covering the entire dental value chain from manufacturing dental labs to distributing dental consumables and equipment. The company operates multiple manufacturing facilities and has a pan-India distribution network.',
    business_model: 'The company operates across three business segments: dental products manufacturing (prosthetics, crowns, bridges), dental distribution (consumables, equipment from global brands), and dental aligners (direct-to-consumer clear aligners). Revenue comes from B2B sales to dental clinics and labs, and growing D2C aligner sales.',
    strengths: JSON.stringify(['Market leader in Indian dental products', 'Integrated value chain from manufacturing to distribution', 'Growing dental aligner business (high-margin)', 'Expanding dental care market in India', 'Strong relationships with 25,000+ dental professionals']),
    risks: JSON.stringify(['Niche market with limited scale potential', 'High competition in aligner segment from global players', 'Dependence on dental industry growth', 'Low dental care awareness in India limits addressable market']),
    financials_json: JSON.stringify([
      { year: 'FY2022', revenue: 245, pat: 18, networth: 89 },
      { year: 'FY2023', revenue: 312, pat: 28, networth: 112 },
      { year: 'FY2024', revenue: 389, pat: 38, networth: 145 },
    ]),
    promoters: JSON.stringify(['Rajesh Vora (45.6%)', 'Vora Family (12.3%)']),
    lead_managers: JSON.stringify(['ICICI Securities', 'Nuvama Wealth']),
    registrar: 'Link Intime India',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Laxmi Dental offers unique exposure to India\'s underpenetrated dental care market. As the largest integrated player, it benefits from distribution moats. The aligner business adds a high-margin growth engine. However, the ₹698 Cr issue is mostly OFS (₹560 Cr), limiting fresh capital for growth. Valuations at 75x PE are steep for a dental products company. The positive GMP suggests listing gains, but long-term upside depends on aligner business scaling.',
    ai_verdict: 'risky', ai_score: 6,
    allotment_date: '2025-01-16', allotment_status_url: 'https://linkintime.co.in/initial_offer',
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'stallion-india-fluorochemicals-ipo',
    company_name: 'Stallion India Fluorochemicals',
    logo_url: null, status: 'closed', ipo_type: 'mainboard',
    open_date: '2025-01-16', close_date: '2025-01-20', listing_date: '2025-01-23',
    price_band_low: 85, price_band_high: 90, face_value: 10, lot_size: 165, min_investment: 14850,
    issue_size_cr: 501, fresh_issue_cr: 501, ofs_cr: 0,
    subscription_retail: 12.45, subscription_nii: 28.67, subscription_qib: 89.12, subscription_total: 54.23,
    gmp: 32, gmp_percent: 35.56, gmp_updated_at: '2025-02-26T14:00:00Z',
    listing_price: null, listing_gain_percent: null, current_price: null,
    industry: 'Chemicals',
    description: 'Stallion India is a refrigerant gas manufacturer and supplier serving industrial and automotive markets.',
    about: 'Stallion India Fluorochemicals Limited is engaged in the business of trading, blending, and packaging of refrigerant gases. The company is a key player in India\'s fluorochemical market, serving the HVAC (heating, ventilation, and air conditioning), automotive, and industrial sectors.\n\nThe company sources refrigerant gases, processes them at its blending facilities, and distributes under its own brands to OEMs, dealers, and institutional buyers across India.',
    business_model: 'Revenue comes from trading, blending, and distribution of refrigerant gases. The company procures raw gases from domestic and international manufacturers, blends them at its facilities, and sells through a dealer network. Growing demand from India\'s booming AC market drives volume growth.',
    strengths: JSON.stringify(['Riding India\'s AC and refrigeration market boom', 'Strong distribution network across India', 'Shift to eco-friendly refrigerants creates opportunities', 'Asset-light blending and distribution model']),
    risks: JSON.stringify(['Trading-oriented business with thin margins', 'Dependence on imported raw materials', 'Regulatory risks around refrigerant gases (HFC phase-down)', 'Intense competition in commodity trading']),
    financials_json: JSON.stringify([
      { year: 'FY2022', revenue: 345, pat: 23, networth: 78 },
      { year: 'FY2023', revenue: 456, pat: 34, networth: 112 },
      { year: 'FY2024', revenue: 567, pat: 48, networth: 156 },
    ]),
    promoters: JSON.stringify(['Agarwal Family (78.4%)']),
    lead_managers: JSON.stringify(['Pantomath Capital Advisors']),
    registrar: 'Bigshare Services',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Stallion India operates in the growing refrigerant gas market driven by India\'s booming AC penetration. While revenue growth is strong, the trading-oriented business has lower margin quality compared to manufacturers. The HFC phase-down regulation could be a headwind or opportunity depending on the company\'s product mix transition. At 45x PE, valuations reflect growth expectations. High subscription indicates market enthusiasm. Subscribe for listing gains.',
    ai_verdict: 'subscribe', ai_score: 6,
    allotment_date: '2025-01-21', allotment_status_url: null,
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'ather-energy-ipo',
    company_name: 'Ather Energy',
    logo_url: null, status: 'upcoming', ipo_type: 'mainboard',
    open_date: '2025-04-28', close_date: '2025-04-30', listing_date: null,
    price_band_low: 304, price_band_high: 321, face_value: 1, lot_size: 46, min_investment: 14766,
    issue_size_cr: 3100, fresh_issue_cr: 3100, ofs_cr: 0,
    subscription_retail: 0, subscription_nii: 0, subscription_qib: 0, subscription_total: 0,
    gmp: 22, gmp_percent: 6.85, gmp_updated_at: '2025-02-27T09:00:00Z',
    listing_price: null, listing_gain_percent: null, current_price: null,
    industry: 'Electric Vehicles',
    description: 'Ather Energy is India\'s leading electric scooter manufacturer known for Ather 450X and Ather 450S.',
    about: 'Ather Energy Private Limited is a pioneer in India\'s electric vehicle revolution, primarily focused on electric two-wheelers. Founded in 2013 by Tarun Mehta and Swapnil Jain (IIT Madras alumni), the company designs, manufactures, and sells premium electric scooters. The flagship Ather 450X is consistently among India\'s best-selling electric scooters.\n\nThe company has also built Ather Grid, one of India\'s largest public EV charging networks, and operates a state-of-the-art manufacturing facility in Hosur, Tamil Nadu with capacity for 4 lakh vehicles annually.',
    business_model: 'Ather Energy generates revenue through direct sale of electric scooters via company-owned experience centers and online channels. Additional revenue comes from accessories, extended warranties, and the Ather Grid charging network. The company follows a vertically integrated model, designing everything from the battery pack to the software in-house.',
    strengths: JSON.stringify(['Pioneer advantage in premium EV two-wheeler segment', 'Strong brand with loyal customer base', 'In-house R&D covering battery, motor, and software', 'Backed by Hero MotoCorp strategic investment', 'Growing Ather Grid charging infrastructure']),
    risks: JSON.stringify(['Still loss-making with path to profitability unclear', 'High competition from Ola Electric, TVS, Bajaj', 'FAME subsidy reduction impacts affordability', 'Battery raw material cost volatility', 'Limited product range (only scooters)']),
    financials_json: JSON.stringify([
      { year: 'FY2022', revenue: 412, pat: -345, networth: 678 },
      { year: 'FY2023', revenue: 1789, pat: -864, networth: 1234 },
      { year: 'FY2024', revenue: 1918, pat: -1060, networth: 890 },
    ]),
    promoters: JSON.stringify(['Tarun Mehta', 'Swapnil Jain', 'Hero MotoCorp (39.8%)']),
    lead_managers: JSON.stringify(['Axis Capital', 'Goldman Sachs', 'JM Financial', 'Kotak Mahindra Capital']),
    registrar: 'KFin Technologies',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Ather Energy is India\'s premium EV two-wheeler brand with strong engineering DNA. However, the company is deeply loss-making with ₹1,060 Cr PAT loss in FY24. While revenue growth has been impressive, the path to profitability remains uncertain amid intense competition and subsidy cuts. The ₹3,100 Cr fresh issue will fund capacity expansion and debt repayment. At expected valuations of 12-15x EV/Sales, it\'s priced for perfection. High-risk, high-reward bet on India\'s EV future.',
    ai_verdict: 'risky', ai_score: 5,
    allotment_date: null, allotment_status_url: null,
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'niva-bupa-health-insurance-ipo',
    company_name: 'Niva Bupa Health Insurance',
    logo_url: null, status: 'upcoming', ipo_type: 'mainboard',
    open_date: '2025-05-05', close_date: '2025-05-07', listing_date: null,
    price_band_low: 70, price_band_high: 74, face_value: 10, lot_size: 200, min_investment: 14800,
    issue_size_cr: 2200, fresh_issue_cr: 800, ofs_cr: 1400,
    subscription_retail: 0, subscription_nii: 0, subscription_qib: 0, subscription_total: 0,
    gmp: 8, gmp_percent: 10.81, gmp_updated_at: '2025-02-27T09:00:00Z',
    listing_price: null, listing_gain_percent: null, current_price: null,
    industry: 'Insurance',
    description: 'Niva Bupa is India\'s third-largest standalone health insurance company by gross written premium.',
    about: 'Niva Bupa Health Insurance Company Limited (formerly Max Bupa) is one of India\'s leading standalone health insurance companies. A joint venture between Fettle Tone LLP and Bupa Singapore Holdings, the company offers a comprehensive range of health insurance products for individuals, families, and corporates.\n\nWith over 10 million lives covered and a growing agent network of 130,000+, Niva Bupa has established itself as a trusted health insurer with innovative products like ReAssure and Health Companion.',
    business_model: 'Revenue is driven by gross written premiums (GWP) from health insurance policies. Distribution channels include individual agents, corporate partnerships, bancassurance, and digital direct sales. The company earns underwriting profit when claims ratios improve and invests the float for investment income.',
    strengths: JSON.stringify(['Third-largest SAHI by GWP with 30%+ growth', 'Underpenetrated health insurance market in India', 'Strong distribution with 130,000+ agents', 'Improving claims ratio and operational efficiency']),
    risks: JSON.stringify(['Health insurance claims can be volatile', 'Intense competition from PSU and private insurers', 'Regulatory changes in insurance sector', 'Low persistency ratios in health insurance']),
    financials_json: JSON.stringify([
      { year: 'FY2022', revenue: 3456, pat: -89, networth: 1234 },
      { year: 'FY2023', revenue: 4890, pat: 45, networth: 1345 },
      { year: 'FY2024', revenue: 6234, pat: 178, networth: 1567 },
    ]),
    promoters: JSON.stringify(['Fettle Tone LLP (56.2%)', 'Bupa Singapore (37.8%)']),
    lead_managers: JSON.stringify(['Morgan Stanley', 'Kotak Mahindra Capital', 'Axis Capital', 'HDFC Bank']),
    registrar: 'Link Intime India',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Niva Bupa offers pure-play exposure to India\'s health insurance sector, which is growing at 25%+ CAGR. The company turned profitable in FY23 and is scaling rapidly. Health insurance penetration in India is extremely low, providing a long growth runway. However, the insurance sector is competitive and claims can be volatile. At expected valuations, the IPO is reasonably priced for a high-growth insurer. Subscribe for long-term investors.',
    ai_verdict: 'subscribe', ai_score: 7,
    allotment_date: null, allotment_status_url: null,
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'ecom-express-ipo',
    company_name: 'Ecom Express',
    logo_url: null, status: 'upcoming', ipo_type: 'mainboard',
    open_date: '2025-05-15', close_date: '2025-05-19', listing_date: null,
    price_band_low: 310, price_band_high: 326, face_value: 5, lot_size: 46, min_investment: 14996,
    issue_size_cr: 2600, fresh_issue_cr: 1284, ofs_cr: 1316,
    subscription_retail: 0, subscription_nii: 0, subscription_qib: 0, subscription_total: 0,
    gmp: 15, gmp_percent: 4.6, gmp_updated_at: '2025-02-27T09:00:00Z',
    listing_price: null, listing_gain_percent: null, current_price: null,
    industry: 'Logistics',
    description: 'Ecom Express is a leading e-commerce logistics company providing end-to-end delivery solutions.',
    about: 'Ecom Express Limited is one of India\'s largest e-commerce focused logistics companies. The company provides end-to-end logistics solutions including first-mile pickup, warehousing, line-haul transportation, last-mile delivery, and reverse logistics for e-commerce companies.\n\nServing major e-commerce platforms and D2C brands, Ecom Express has built a network covering 27,000+ pin codes across India with a fleet of vehicles and delivery partners.',
    business_model: 'Revenue comes from per-shipment charges for e-commerce deliveries. The company earns from forward logistics (delivery), reverse logistics (returns), and value-added services like cash on delivery handling and warehousing. The asset-light model uses a mix of owned and partner fleet for last-mile delivery.',
    strengths: JSON.stringify(['Top 3 e-commerce logistics player in India', 'E-commerce market growing 25%+ annually', 'Wide pin code coverage across India', 'Technology-driven operations with route optimization']),
    risks: JSON.stringify(['Highly competitive and price-sensitive market', 'Dependence on e-commerce platform decisions', 'Loss-making with uncertain profitability timeline', 'Amazon and Flipkart building in-house logistics']),
    financials_json: JSON.stringify([
      { year: 'FY2022', revenue: 1678, pat: -234, networth: 890 },
      { year: 'FY2023', revenue: 2012, pat: -156, networth: 1234 },
      { year: 'FY2024', revenue: 2345, pat: -89, networth: 1345 },
    ]),
    promoters: JSON.stringify(['Warburg Pincus (44.2%)', 'Partners Group (23.8%)']),
    lead_managers: JSON.stringify(['Morgan Stanley', 'Goldman Sachs', 'CLSA', 'JM Financial']),
    registrar: 'KFin Technologies',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Ecom Express offers exposure to India\'s booming e-commerce logistics sector. While the company has been narrowing losses, profitability remains elusive. The competitive landscape is intense with Delhivery as a listed peer and Amazon/Flipkart building captive logistics. Fresh issue proceeds will fund fleet expansion and technology. At expected valuations of 3-4x EV/Revenue, pricing is aggressive for a loss-making logistics company. Wait for better entry points.',
    ai_verdict: 'avoid', ai_score: 4,
    allotment_date: null, allotment_status_url: null,
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'green-hydrogen-systems-ipo',
    company_name: 'Green Hydrogen Systems',
    logo_url: null, status: 'open', ipo_type: 'sme',
    open_date: '2025-02-26', close_date: '2025-02-28', listing_date: null,
    price_band_low: 220, price_band_high: 231, face_value: 10, lot_size: 64, min_investment: 14784,
    issue_size_cr: 78, fresh_issue_cr: 78, ofs_cr: 0,
    subscription_retail: 4.23, subscription_nii: 6.78, subscription_qib: 0, subscription_total: 4.89,
    gmp: 55, gmp_percent: 23.81, gmp_updated_at: '2025-02-28T08:00:00Z',
    listing_price: null, listing_gain_percent: null, current_price: null,
    industry: 'Clean Energy',
    description: 'Green Hydrogen Systems manufactures electrolyzers for green hydrogen production.',
    about: 'Green Hydrogen Systems Limited is a clean energy company focused on manufacturing electrolyzers used in green hydrogen production. As India pushes its National Green Hydrogen Mission, the company is positioned to benefit from the massive investments planned in hydrogen infrastructure.\n\nThe company provides turnkey electrolyzer solutions for industrial customers looking to produce green hydrogen for use in fertilizers, steel, refining, and transportation sectors.',
    business_model: 'Revenue comes from sale and installation of electrolyzer systems for green hydrogen production. The company also offers maintenance contracts and consulting services for hydrogen project development. The business is project-based with high-value contracts from industrial and government clients.',
    strengths: JSON.stringify(['Riding India\'s National Green Hydrogen Mission', 'Early mover in electrolyzer manufacturing', 'Government policy support with PLI incentives', 'Growing global green hydrogen demand']),
    risks: JSON.stringify(['Early-stage technology with limited track record', 'Capital-intensive manufacturing with long project cycles', 'SME IPO with lower liquidity', 'Technology risk from rapid innovation in hydrogen space']),
    financials_json: JSON.stringify([
      { year: 'FY2023', revenue: 34, pat: 4, networth: 23 },
      { year: 'FY2024', revenue: 56, pat: 8, networth: 31 },
    ]),
    promoters: JSON.stringify(['Vikram Sinha (67.8%)']),
    lead_managers: JSON.stringify(['Hem Securities']),
    registrar: 'Bigshare Services',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Green Hydrogen Systems is a thematic play on India\'s green hydrogen ambitions. The company is at an early stage with ₹56 Cr revenue in FY24. While the green hydrogen sector has massive long-term potential, the company\'s current scale is tiny. SME IPO with high GMP suggests speculative demand. High risk for long-term investors, but sector tailwinds could provide momentum. Only for investors with high risk appetite and long-term horizon.',
    ai_verdict: 'risky', ai_score: 5,
    allotment_date: null, allotment_status_url: null,
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'divine-power-energy-ipo',
    company_name: 'Divine Power Energy',
    logo_url: null, status: 'open', ipo_type: 'sme',
    open_date: '2025-02-25', close_date: '2025-02-28', listing_date: null,
    price_band_low: 36, price_band_high: 40, face_value: 10, lot_size: 3000, min_investment: 120000,
    issue_size_cr: 42, fresh_issue_cr: 42, ofs_cr: 0,
    subscription_retail: 15.34, subscription_nii: 22.56, subscription_qib: 0, subscription_total: 17.45,
    gmp: 18, gmp_percent: 45.0, gmp_updated_at: '2025-02-28T08:00:00Z',
    listing_price: null, listing_gain_percent: null, current_price: null,
    industry: 'Power & Energy',
    description: 'Divine Power Energy manufactures transformers and power equipment for domestic and international markets.',
    about: 'Divine Power Energy Limited is a manufacturer of power and distribution transformers. The company manufactures transformers ranging from 25 KVA to 5000 KVA for utility companies, industrial customers, and infrastructure projects. Based in Gujarat, the company serves both domestic and export markets.\n\nThe company benefits from India\'s massive push to upgrade its power transmission and distribution infrastructure, which is creating unprecedented demand for transformer manufacturers.',
    business_model: 'Revenue comes from manufacturing and selling transformers to state electricity boards, private utilities, and industrial customers. The company receives orders through competitive bidding and direct sales. Export revenue contributes about 20% of total sales.',
    strengths: JSON.stringify(['Strong order book from power sector capex', 'Government push for T&D infrastructure upgrade', 'Export presence adds growth dimension', 'Capacity expansion underway']),
    risks: JSON.stringify(['Small-scale SME with limited track record', 'Raw material (copper, CRGO steel) price volatility', 'Dependence on government orders', 'High competition from established transformer makers']),
    financials_json: JSON.stringify([
      { year: 'FY2023', revenue: 23, pat: 2, networth: 12 },
      { year: 'FY2024', revenue: 38, pat: 4, networth: 16 },
    ]),
    promoters: JSON.stringify(['Bhavesh Patel (72.4%)']),
    lead_managers: JSON.stringify(['Expert Global Consultants']),
    registrar: 'Bigshare Services',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Divine Power Energy is a small-cap transformer manufacturer riding the power sector boom. Revenue nearly doubled from FY23 to FY24. The company benefits from India\'s massive T&D investment cycle. However, as an SME IPO with ₹38 Cr revenue, the scale is very small. High GMP of 45% indicates speculative demand typical of SME IPOs. High risk, suitable only for investors comfortable with SME volatility.',
    ai_verdict: 'risky', ai_score: 5,
    allotment_date: null, allotment_status_url: null,
    source_url: null, created_at: now, updated_at: now,
  },
  {
    id: 'mankoo-manufacturing-ipo',
    company_name: 'Mankoo Manufacturing',
    logo_url: null, status: 'open', ipo_type: 'sme',
    open_date: '2025-02-27', close_date: '2025-03-03', listing_date: null,
    price_band_low: 55, price_band_high: 57, face_value: 10, lot_size: 2000, min_investment: 114000,
    issue_size_cr: 29, fresh_issue_cr: 29, ofs_cr: 0,
    subscription_retail: 2.12, subscription_nii: 3.45, subscription_qib: 0, subscription_total: 2.56,
    gmp: 12, gmp_percent: 21.05, gmp_updated_at: '2025-02-28T08:00:00Z',
    listing_price: null, listing_gain_percent: null, current_price: null,
    industry: 'Auto Components',
    description: 'Mankoo Manufacturing produces precision auto components for the automobile industry.',
    about: 'Mankoo Manufacturing Limited is a precision engineering company that manufactures auto components and parts for the Indian automotive industry. The company produces machined components, forgings, and assemblies used in two-wheelers, passenger vehicles, and commercial vehicles.\n\nBased in Ludhiana, Punjab, the company supplies to leading OEMs and tier-1 suppliers in the automotive sector, benefiting from India\'s growing vehicle production.',
    business_model: 'The company earns revenue from B2B supply of precision-machined auto components to OEMs and tier-1 suppliers. Orders are typically annual contracts with quarterly price revisions. The company also exports to Southeast Asian markets.',
    strengths: JSON.stringify(['India\'s auto production growing strongly post-COVID', 'Precision engineering capabilities', 'Diversified customer base across vehicle segments', 'EV transition creates new component demand']),
    risks: JSON.stringify(['Commodity price pass-through risks', 'Dependence on auto industry cyclicality', 'Small scale with limited bargaining power', 'Technology disruption from EV transition']),
    financials_json: JSON.stringify([
      { year: 'FY2023', revenue: 18, pat: 1.5, networth: 8 },
      { year: 'FY2024', revenue: 26, pat: 2.8, networth: 11 },
    ]),
    promoters: JSON.stringify(['Gurpreet Singh (68.9%)']),
    lead_managers: JSON.stringify(['Corpwis Advisors']),
    registrar: 'Skyline Financial Services',
    drhp_url: null, rhp_url: null,
    ai_summary: 'Mankoo Manufacturing is a small-cap auto component maker with ₹26 Cr revenue. The auto component sector is benefiting from India\'s strong vehicle production growth. However, the company\'s tiny scale and SME category mean higher risk. Moderate GMP indicates some market interest. Only for high-risk SME investors.',
    ai_verdict: 'neutral', ai_score: 4,
    allotment_date: null, allotment_status_url: null,
    source_url: null, created_at: now, updated_at: now,
  },
];

// Generate GMP history for IPOs with GMP data
export const gmpHistory: GmpHistoryRecord[] = ipos
  .filter((ipo) => ipo.gmp !== 0 && ipo.open_date)
  .flatMap((ipo) => generateGmpHistory(ipo.id, ipo.gmp, ipo.open_date!));

// Generate timeline events
let timelineId = 0;
export const timelineEvents: TimelineEventRecord[] = ipos.flatMap((ipo) => {
  const events: TimelineEventRecord[] = [];
  if (ipo.open_date) events.push({ id: timelineId++, ipo_id: ipo.id, event_type: 'open', event_date: ipo.open_date, label: 'IPO Opens' });
  if (ipo.close_date) events.push({ id: timelineId++, ipo_id: ipo.id, event_type: 'close', event_date: ipo.close_date, label: 'IPO Closes' });
  if (ipo.allotment_date) events.push({ id: timelineId++, ipo_id: ipo.id, event_type: 'allotment', event_date: ipo.allotment_date, label: 'Allotment' });
  if (ipo.listing_date) events.push({ id: timelineId++, ipo_id: ipo.id, event_type: 'listing', event_date: ipo.listing_date, label: 'Listing' });
  return events;
});
