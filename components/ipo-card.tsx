import Link from 'next/link';
import { Calendar, TrendingUp, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { STATUS_COLORS, VERDICT_COLORS } from '@/lib/constants';
import { formatCurrency, formatDateShort, formatPercent, formatSubscription, getGmpColor } from '@/lib/utils';
import type { IPO } from '@/lib/queries';

interface IpoCardProps {
  ipo: IPO;
}

function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.upcoming;
  return (
    <Badge className={`${colors.bg} ${colors.text} border-0`}>
      <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${colors.dot}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

function SubscriptionBar({ label, value }: { label: string; value: number }) {
  const width = Math.min(value * 10, 100);
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs font-medium tabular-nums text-gray-700 dark:text-gray-300">
        {formatSubscription(value)}
      </span>
    </div>
  );
}

export function IpoCard({ ipo }: IpoCardProps) {
  const verdictConfig = ipo.ai_verdict ? VERDICT_COLORS[ipo.ai_verdict] : null;

  return (
    <Link href={`/ipo/${ipo.id}`}>
      <Card className="group h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:hover:border-gray-700">
        <div className="p-5">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {ipo.company_name}
              </h3>
              {ipo.industry && (
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{ipo.industry}</p>
              )}
            </div>
            <div className="ml-2 flex flex-col items-end gap-1.5">
              <StatusBadge status={ipo.status} />
              {ipo.ipo_type === 'sme' && (
                <Badge variant="warning" className="border-0 text-[10px]">SME</Badge>
              )}
            </div>
          </div>

          {/* Price & Details */}
          <div className="mb-3 space-y-1.5 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Price Band</span>
              <span className="font-semibold tabular-nums text-gray-900 dark:text-white">
                {ipo.price_band_low && ipo.price_band_high
                  ? `${formatCurrency(ipo.price_band_low)} - ${formatCurrency(ipo.price_band_high)}`
                  : 'TBA'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Lot Size</span>
              <span className="tabular-nums text-gray-700 dark:text-gray-300">
                {ipo.lot_size ? `${ipo.lot_size} shares (${formatCurrency(ipo.min_investment)})` : 'TBA'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Issue Size</span>
              <span className="tabular-nums text-gray-700 dark:text-gray-300">
                {ipo.issue_size_cr ? `${formatCurrency(ipo.issue_size_cr)} Cr` : 'TBA'}
              </span>
            </div>
          </div>

          {/* Dates */}
          {(ipo.open_date || ipo.close_date) && (
            <div className="mb-3 flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {formatDateShort(ipo.open_date)} &rarr; {formatDateShort(ipo.close_date)}
              </span>
            </div>
          )}

          {/* GMP */}
          <div className="mb-3 flex items-center justify-between rounded-lg bg-gray-50 p-2.5 dark:bg-gray-800/50">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">GMP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold tabular-nums ${getGmpColor(ipo.gmp)}`}>
                {ipo.gmp ? `${ipo.gmp > 0 ? '+' : ''}${formatCurrency(ipo.gmp)}` : '—'}
              </span>
              {ipo.gmp_percent !== 0 && (
                <span className={`text-xs tabular-nums ${getGmpColor(ipo.gmp)}`}>
                  ({formatPercent(ipo.gmp_percent)})
                </span>
              )}
            </div>
          </div>

          {/* Subscription bars (only when IPO is open or closed) */}
          {(ipo.status === 'open' || ipo.status === 'closed') && ipo.subscription_total > 0 && (
            <div className="mb-3 space-y-1">
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Users className="h-3.5 w-3.5" />
                <span>Subscription: {formatSubscription(ipo.subscription_total)}</span>
              </div>
              <SubscriptionBar label="RII" value={ipo.subscription_retail} />
              <SubscriptionBar label="NII" value={ipo.subscription_nii} />
              <SubscriptionBar label="QIB" value={ipo.subscription_qib} />
            </div>
          )}

          {/* Listing gain (for listed IPOs) */}
          {ipo.status === 'listed' && ipo.listing_gain_percent != null && (
            <div className="mb-3 flex items-center justify-between rounded-lg bg-gray-50 p-2.5 dark:bg-gray-800/50">
              <span className="text-sm text-gray-500 dark:text-gray-400">Listing Gain</span>
              <span className={`text-sm font-semibold tabular-nums ${ipo.listing_gain_percent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatPercent(ipo.listing_gain_percent)}
              </span>
            </div>
          )}

          {/* AI Score & Verdict */}
          {(ipo.ai_score || ipo.ai_verdict) && (
            <div className="flex items-center justify-between">
              {ipo.ai_score && (
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-500 dark:text-gray-400">AI Score:</span>
                  <span className="text-sm font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                    {ipo.ai_score}/10
                  </span>
                </div>
              )}
              {verdictConfig && (
                <Badge className={`${verdictConfig.bg} ${verdictConfig.text} border-0`}>
                  {verdictConfig.icon} {ipo.ai_verdict!.charAt(0).toUpperCase() + ipo.ai_verdict!.slice(1)}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

export function IpoCardSkeleton() {
  return (
    <Card className="h-full">
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <div className="h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mt-1.5 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="mb-3 space-y-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mb-3 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mb-3 h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </Card>
  );
}
