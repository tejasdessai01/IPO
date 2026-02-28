import { formatSubscription } from '@/lib/utils';

interface SubscriptionBarsProps {
  retail: number;
  nii: number;
  qib: number;
  total: number;
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  const width = Math.min(value * 5, 100);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-semibold tabular-nums text-gray-900 dark:text-white">
          {formatSubscription(value)}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function SubscriptionBars({ retail, nii, qib, total }: SubscriptionBarsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subscription</span>
        <span className="text-lg font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
          {formatSubscription(total)}
        </span>
      </div>
      <ProgressBar label="Retail Individual (RII)" value={retail} color="bg-blue-500" />
      <ProgressBar label="Non-Institutional (NII)" value={nii} color="bg-purple-500" />
      <ProgressBar label="Qualified Institutional (QIB)" value={qib} color="bg-emerald-500" />
    </div>
  );
}
