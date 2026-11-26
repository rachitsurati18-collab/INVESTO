// ─────────────────────────────────────────────────────────────
//  All website copy lives here so it can be edited in one place.
//  Items marked [EDIT] are placeholders — replace with real details.
// ─────────────────────────────────────────────────────────────

export const FIRM = {
  brand: 'Investo Research',
  email: 'research@example.com', // [EDIT]
  phone: '+91 00000 00000', // [EDIT]
  hours: 'Mon – Fri, 9:30 AM – 6:00 PM IST', // [EDIT]
  registeredName: '[Registered Entity Name]', // [EDIT]
  sebiReg: 'INH000000000', // [EDIT] SEBI Research Analyst registration no.
  bseEnlistment: '0000', // [EDIT] BSE enlistment no.
  office: '[Registered office address, City, State – PIN]', // [EDIT]
  complianceOfficer: '[Name] · compliance@example.com', // [EDIT]
  grievance: '[Name] · grievance@example.com · +91 00000 00000', // [EDIT]
}

export const NAV = [
  { id: 'framework', label: 'Our Process' },
  { id: 'services', label: 'Services' },
  { id: 'report', label: 'Sample Report' },
  { id: 'calculator', label: 'SIP Calculator' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

// The FORT Research Framework — four sequential walls, six parameters each.
export const FORT = [
  {
    key: 'F',
    name: 'Fundamental',
    color: 'cyan',
    question: 'Is the business financially strong?',
    summary:
      'We start with the numbers. A company must show real, cash-backed growth, efficient use of capital, a manageable balance sheet and a sensible price.',
    params: [
      { name: 'Revenue & profit growth', criteria: 'Consistent multi-year growth in sales and net profit that is not driven by one-off gains.' },
      { name: 'Operating cash flow', criteria: 'Reported profits are backed by cash, with operating cash flow tracking earnings over time.' },
      { name: 'ROCE', criteria: 'Return on capital employed is assessed against the cost of capital and industry peers.' },
      { name: 'Debt-to-equity', criteria: 'Leverage the business can comfortably service through a full economic cycle.' },
      { name: 'Working capital', criteria: 'Receivable, inventory and payable cycles are stable or improving, not stretching.' },
      { name: 'Fair valuation', criteria: 'Market price is compared with intrinsic value estimates and historical and peer multiples.' },
    ],
    pass:
      'Sustained growth backed by operating cash flow, healthy ROCE, manageable debt, efficient working capital and a price at or below our fair-value range.',
  },
  {
    key: 'O',
    name: 'Overview',
    color: 'green',
    question: 'Is the business well placed to win?',
    summary:
      'Strong numbers need a strong story. We study the industry, the moat, the people running the company and the wider economy before writing a thesis.',
    params: [
      { name: 'Industry growth', criteria: 'Size, growth runway and structural tailwinds or headwinds of the industry.' },
      { name: 'Competitive advantage', criteria: 'Durability of the moat: brand, cost, network, switching costs or regulation.' },
      { name: 'Management quality', criteria: 'Track record, capital allocation decisions, disclosures and alignment with shareholders.' },
      { name: 'Macroeconomic factors', criteria: 'Sensitivity to interest rates, inflation, commodity prices, currency and policy.' },
      { name: 'Market share', criteria: 'Position within the industry and the direction of market share over time.' },
      { name: 'Investment thesis', criteria: 'A clear, written reason why the company can create value, and what would prove it wrong.' },
    ],
    pass:
      'A growing industry, a durable competitive edge, credible management and a clear written investment thesis that holds under current macro conditions.',
  },
  {
    key: 'R',
    name: 'Risk',
    color: 'gold',
    question: 'What could go wrong, and how badly?',
    summary:
      'Before any upside, we look for what can hurt. Governance, pledges, liquidity, valuation and regulation are stress-tested and a downside case is written.',
    params: [
      { name: 'Corporate governance', criteria: 'Related-party transactions, auditor remarks, board independence and disclosure quality.' },
      { name: 'Promoter pledging', criteria: 'Level and trend of pledged promoter holding and the risk of forced selling.' },
      { name: 'Liquidity', criteria: 'Trading volumes and free float, so positions can be entered and exited sensibly.' },
      { name: 'Valuation & regulatory risk', criteria: 'Risk of de-rating from stretched valuations, and exposure to regulatory or policy changes.' },
      { name: 'Downside potential', criteria: 'A written bear case estimating how far the price could fall if the thesis fails.' },
      { name: 'Portfolio allocation', criteria: 'A suggested maximum allocation that reflects the risk identified above.' },
    ],
    pass:
      'No material governance red flags or concerning promoter pledge, adequate liquidity, an acceptable downside case and a defined maximum allocation.',
  },
  {
    key: 'T',
    name: 'Trigger',
    color: 'orange',
    question: 'When to act, and when to step away?',
    summary:
      'A good company at the wrong time can still be a poor idea. The final wall defines the catalyst, the entry zone and the rules for review and exit.',
    params: [
      { name: 'Catalysts', criteria: 'Identifiable events such as capacity additions, margin recovery or sector re-rating.' },
      { name: 'Entry price zone', criteria: 'A defined price range where the risk-reward is considered attractive.' },
      { name: 'Technical confirmation', criteria: 'Price trend, volume and structure supporting the fundamental view.' },
      { name: 'Review conditions', criteria: 'Pre-defined events that prompt a re-assessment of the thesis.' },
      { name: 'Exit rules', criteria: 'Written conditions for exiting, whether the thesis plays out or breaks.' },
      { name: 'Target range & horizon', criteria: 'An expected value range and the investment horizon over which it is assessed.' },
    ],
    pass:
      'An identifiable catalyst, a defined entry zone with technical confirmation, and pre-written review and exit rules with a target range and investment horizon.',
  },
]

// [EDIT] Review the service copy and adjust details (pricing, coverage) as needed.
export const SERVICES = [
  {
    id: 'alphashift',
    name: 'Alpha Shift',
    tag: 'ETF research',
    color: 'cyan',
    text: 'Research on Exchange Traded Funds (ETFs) launched by Indian mutual fund houses and listed on NSE and BSE. We help you decide which ETFs to hold and when to shift between them.',
    features: [
      'Index, sector, gold and international ETFs covered',
      'Expense ratio, tracking error and liquidity checked',
      'Allocation shift alerts when conditions change',
      'Suited to low-cost, diversified investing',
    ],
    visual: ['Index ETFs', 'Sector ETFs', 'Gold & Silver ETFs', 'International ETFs'],
  },
  {
    id: 'edge',
    name: 'Edge',
    tag: 'Multibagger stock research',
    color: 'gold',
    text: 'Research on fundamentally strong small and mid-sized companies that we believe have the potential to grow many times over the long term. Every idea must clear all four FORT walls.',
    features: [
      'Focus on emerging small and mid-cap businesses',
      'Detailed FORT report for every idea',
      'Entry zone, review and exit rules defined',
      'Higher risk: suggested allocation limits included',
    ],
  },
  {
    id: 'sankalp',
    name: 'Sankalp',
    tag: 'Stock SIP research',
    color: 'green',
    text: 'A disciplined way to build a portfolio of quality stocks by investing a fixed amount every month, just like a mutual fund SIP, but directly in shares through your own demat account.',
    features: [
      'Monthly Stock SIP basket of FORT-cleared stocks',
      'Suggested amount split across stocks',
      'Quarterly review and rebalancing updates',
      'Start small and build wealth step by step',
    ],
  },
]

export const SAMPLE_REPORT = {
  company: 'Hypothetical Industries Ltd.',
  sector: 'Industrial Manufacturing',
  scores: { F: 82, O: 76, R: 71, T: 68 },
  risk: 'Moderate',
  horizon: '18 – 36 months',
  allocation: 'Up to 4% of equity portfolio',
  entry: { from: 820, to: 870 },
  target: { from: 1050, to: 1150 },
  review: [
    'Two consecutive quarters of revenue growth below 10%',
    'Operating cash flow falls below 70% of net profit',
    'Any increase in promoter pledge',
    'Change in key management personnel',
  ],
  exit: [
    'Price reaches the upper end of the target range',
    'The investment thesis is broken by a structural change',
    'Material governance concern is identified',
    'Price closes below the defined invalidation level',
  ],
}

export const DELIVERABLES = [
  { icon: 'report', title: 'Complete research reports', text: 'Detailed reports covering all four FORT walls, with scores, thesis, risks and trigger levels.' },
  { icon: 'refresh', title: 'Quarterly company updates', text: 'Every covered company is reviewed after its quarterly results against the original thesis.' },
  { icon: 'bell', title: 'Entry & exit alerts', text: 'Timely alerts when a stock enters its entry zone or meets a review or exit condition.' },
  { icon: 'chart', title: 'Monthly market outlook', text: 'A monthly view of the market, sectors and macro factors that matter to our coverage.' },
  { icon: 'chat', title: 'Analyst Q&A', text: 'Ask questions about our research and get clarity directly from the analyst team.' },
]

export const EXPECT = {
  can: [
    'Independent, process-driven research using the FORT framework',
    'Clear reasoning behind every idea, including risks and downside',
    'Defined entry zones, review conditions and exit rules',
    'Regular updates as results and conditions change',
    'Transparent communication and a clear grievance process',
  ],
  cannot: [
    'Guaranteed, assured or fixed returns of any kind',
    'Management of your money, portfolio or trading account',
    'Placing trades or executing orders on your behalf',
    'Holding your funds, securities or login credentials',
    'Tips through unofficial channels or unsolicited messages',
  ],
}

export const ONBOARDING = [
  { title: 'Initial contact', text: 'Reach out by email or phone. We explain our services, fees and research process.' },
  { title: 'KYC verification', text: 'Complete KYC as required by SEBI regulations for research analyst clients.' },
  { title: 'Risk profiling & agreement', text: 'We understand your risk profile and you review and accept the client agreement and terms.' },
  { title: 'Secure payment', text: 'Pay the research fee through official, traceable banking channels only.' },
  { title: 'Access research & alerts', text: 'Start receiving research reports, updates and alerts for your chosen service.' },
]

export const FAQS = [
  {
    q: 'Is Investo Research registered with SEBI?',
    a: `Yes. We are registered with SEBI as a Research Analyst and enlisted with BSE. Our registration and enlistment numbers are shown in the Contact & Regulatory Information section. Registration with SEBI and enlistment with BSE do not guarantee performance or returns.`,
  },
  {
    q: 'What exactly do your research services provide?',
    a: 'We provide stock market research and analysis: research reports, quarterly updates, entry and exit alerts, a monthly market outlook and analyst Q&A. Every company in our universe has passed all four stages of the FORT framework.',
  },
  {
    q: 'Do you manage my money or trade on my behalf?',
    a: 'No. We do not manage money, operate trading accounts or execute trades. All investment decisions and trades are made by you, through your own broker and account.',
  },
  {
    q: 'Are returns guaranteed?',
    a: 'No. Investments in the securities market are subject to market risks and returns are never guaranteed. Our research is designed to help you make informed decisions, but losses are possible.',
  },
  {
    q: 'What is a Stock SIP (Sankalp)?',
    a: 'A Stock SIP means investing a fixed amount at regular intervals, usually monthly, directly in selected shares instead of a mutual fund. Under Sankalp we provide the research and the suggested stock basket. You place the orders yourself through your own broker and demat account.',
  },
  {
    q: 'Why ETFs for Alpha Shift?',
    a: 'ETFs are low-cost funds launched by mutual fund houses and traded on NSE and BSE like shares. They give diversified exposure to an index, sector, gold or international markets. Alpha Shift research helps you choose suitable ETFs and decide when to shift allocation between them.',
  },
  {
    q: 'Does Edge guarantee multibagger returns?',
    a: 'No. Edge focuses on researching companies we believe have long-term multibagger potential, but small and mid-cap stocks carry higher risk and many ideas may not perform as expected. Allocation limits are suggested for every idea, and returns are never guaranteed.',
  },
  {
    q: 'How are research reports and alerts delivered?',
    a: 'Reports, updates and alerts are delivered through our official registered communication channels, such as email, to the contact details verified during onboarding.',
  },
  {
    q: 'What investment horizon do your ideas follow?',
    a: 'Each report states its own investment horizon in the Trigger stage. Horizons vary by idea and service, and are reviewed when review conditions are met.',
  },
  {
    q: 'How do I raise a complaint or grievance?',
    a: 'Contact our grievance officer first. If your complaint is not resolved satisfactorily, you can escalate it on SEBI SCORES and then pursue online dispute resolution through the SMART ODR portal.',
  },
]
