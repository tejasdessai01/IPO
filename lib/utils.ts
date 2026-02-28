import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyCompact(amountInCr: number | null | undefined): string {
  if (amountInCr == null) return '—';
  if (amountInCr >= 1000) {
    return `₹${(amountInCr / 1000).toFixed(1)}K Cr`;
  }
  return `₹${amountInCr.toLocaleString('en-IN')} Cr`;
}

export function formatNumber(num: number | null | undefined): string {
  if (num == null) return '—';
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateShort(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
  });
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

export function formatSubscription(times: number | null | undefined): string {
  if (times == null || times === 0) return '—';
  return `${times.toFixed(2)}x`;
}

export function timeAgo(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const now = new Date();
  const past = new Date(dateStr);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getGmpColor(gmp: number | null | undefined): string {
  if (gmp == null || gmp === 0) return 'text-gray-500';
  return gmp > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';
}

export function getGmpBg(gmp: number | null | undefined): string {
  if (gmp == null || gmp === 0) return 'bg-gray-100 dark:bg-gray-800';
  return gmp > 0 ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20';
}

export function getListingGainColor(gain: number | null | undefined): string {
  if (gain == null) return 'text-gray-500';
  return gain >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';
}

export function generateWhatsAppMessage(ipo: {
  company_name: string;
  price_band_low: number | null;
  price_band_high: number | null;
  gmp: number | null;
  gmp_percent: number | null;
  ai_score: number | null;
  id: string;
}): string {
  const price = ipo.price_band_low && ipo.price_band_high
    ? `₹${ipo.price_band_low}-₹${ipo.price_band_high}`
    : 'TBA';
  const gmp = ipo.gmp ? `+₹${ipo.gmp} (${ipo.gmp_percent?.toFixed(1)}%)` : 'N/A';
  const score = ipo.ai_score ? `${ipo.ai_score}/10` : 'N/A';

  return encodeURIComponent(
    `🚀 ${ipo.company_name} IPO — Price: ${price} | GMP: ${gmp} | AI Score: ${score}\nCheck details: https://ipodekho.com/ipo/${ipo.id}`
  );
}

export function generateTwitterMessage(ipo: {
  company_name: string;
  price_band_high: number | null;
  gmp: number | null;
  id: string;
}): string {
  return encodeURIComponent(
    `${ipo.company_name} IPO — GMP: ${ipo.gmp ? `+₹${ipo.gmp}` : 'N/A'}\n\nCheck details on @IPODekho:\nhttps://ipodekho.com/ipo/${ipo.id}`
  );
}

export function parseJsonSafe<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
