export const SITE_NAME = 'IPO Dekho';
export const SITE_URL = 'https://ipodekho.com';
export const SITE_DESCRIPTION = "India's fastest IPO tracking platform — Live GMP, subscription status, AI analysis, and allotment updates.";

export const IPO_STATUS = {
  UPCOMING: 'upcoming',
  OPEN: 'open',
  CLOSED: 'closed',
  LISTED: 'listed',
  WITHDRAWN: 'withdrawn',
} as const;

export type IpoStatus = (typeof IPO_STATUS)[keyof typeof IPO_STATUS];

export const IPO_TYPE = {
  MAINBOARD: 'mainboard',
  SME: 'sme',
} as const;

export type IpoType = (typeof IPO_TYPE)[keyof typeof IPO_TYPE];

export const AI_VERDICT = {
  SUBSCRIBE: 'subscribe',
  AVOID: 'avoid',
  RISKY: 'risky',
  NEUTRAL: 'neutral',
} as const;

export type AiVerdict = (typeof AI_VERDICT)[keyof typeof AI_VERDICT];

export const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  upcoming: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
  open: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
  closed: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', dot: 'bg-gray-400' },
  listed: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
  withdrawn: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500' },
};

export const VERDICT_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  subscribe: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', icon: '✓' },
  avoid: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: '✗' },
  risky: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', icon: '⚠' },
  neutral: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', icon: '~' },
};

export const AFFILIATE_LINKS = {
  zerodha: 'https://zerodha.com/open-account?c=IPODEKHO',
  groww: 'https://groww.in/open-demat-account?utm_source=ipodekho',
  upstox: 'https://upstox.com/open-account/?f=IPODEKHO',
};

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/gmp', label: 'GMP Tracker' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/sme', label: 'SME IPOs' },
  { href: '/listed', label: 'Listed' },
  { href: '/learn', label: 'Learn' },
];

export const LEARN_ARTICLES = [
  {
    slug: 'how-to-apply-for-ipo',
    title: 'How to Apply for IPO',
    description: 'Step-by-step guide to applying for IPOs in India through UPI, ASBA, and net banking.',
    keywords: ['how to apply for ipo', 'ipo application process', 'apply ipo online'],
  },
  {
    slug: 'what-is-gmp-in-ipo',
    title: 'What is GMP in IPO?',
    description: 'Understanding Grey Market Premium (GMP) — what it means, how it works, and should you rely on it.',
    keywords: ['ipo gmp', 'grey market premium', 'what is gmp'],
  },
  {
    slug: 'ipo-allotment-process-explained',
    title: 'IPO Allotment Process Explained',
    description: 'How IPO shares are allotted to retail investors, the lottery system, and what affects your chances.',
    keywords: ['ipo allotment', 'ipo allotment process', 'how ipo allotment works'],
  },
  {
    slug: 'how-to-check-ipo-allotment-status',
    title: 'How to Check IPO Allotment Status',
    description: 'Check your IPO allotment status on BSE, KFintech, Link Intime, and other registrars.',
    keywords: ['check ipo allotment', 'ipo allotment status', 'ipo allotment result'],
  },
  {
    slug: 'ipo-vs-fpo',
    title: 'IPO vs FPO: What\'s the Difference?',
    description: 'Key differences between Initial Public Offering (IPO) and Follow-on Public Offering (FPO).',
    keywords: ['ipo vs fpo', 'difference between ipo and fpo', 'fpo meaning'],
  },
  {
    slug: 'best-demat-accounts-for-ipo',
    title: 'Best Demat Accounts for IPO',
    description: 'Top demat accounts in India for applying to IPOs — features, charges, and IPO success rates compared.',
    keywords: ['best demat account', 'demat account for ipo', 'ipo demat account'],
  },
];
