import { Check, Circle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TimelineStep {
  label: string;
  date: string | null;
  completed: boolean;
  active: boolean;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export function Timeline({ steps }: TimelineProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex min-w-[500px] items-center justify-between px-4">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
                  step.completed
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : step.active
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                    : 'border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-500'
                )}
              >
                {step.completed ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-medium',
                  step.completed || step.active
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-400 dark:text-gray-500'
                )}
              >
                {step.label}
              </span>
              <span className="mt-0.5 text-[11px] tabular-nums text-gray-500 dark:text-gray-400">
                {step.date ? formatDate(step.date) : 'TBA'}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'mx-2 h-0.5 w-12 sm:w-20',
                  step.completed
                    ? 'bg-emerald-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
