import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar as CalIcon } from 'lucide-react';
import { getCalendarEvents } from '@/lib/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SITE_URL } from '@/lib/constants';
import { generateBreadcrumbJsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'IPO Calendar 2025 — Upcoming IPO Dates in India',
  description: 'Complete IPO calendar for 2025. Track open, close, allotment, and listing dates for all upcoming and recent IPOs in India.',
  openGraph: {
    title: 'IPO Calendar 2025 — Upcoming IPO Dates in India | IPO Dekho',
    description: 'Complete IPO calendar with all important dates.',
    url: `${SITE_URL}/calendar`,
  },
};

const eventTypeConfig: Record<string, { label: string; color: string }> = {
  open: { label: 'Opens', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  close: { label: 'Closes', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
  allotment: { label: 'Allotment', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  listing: { label: 'Listing', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
};

export default function CalendarPage() {
  const calendarData = getCalendarEvents();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'IPO Calendar', url: '/calendar' },
  ]);

  // Group by month
  const monthGroups: Record<string, typeof calendarData> = {};
  for (const item of calendarData) {
    const d = new Date(item.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!monthGroups[key]) monthGroups[key] = [];
    monthGroups[key].push(item);
  }

  const sortedMonths = Object.keys(monthGroups).sort().reverse();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">IPO Calendar</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            All important IPO dates — open, close, allotment, and listing dates at a glance.
          </p>
        </div>

        {sortedMonths.length > 0 ? (
          <div className="space-y-6">
            {sortedMonths.map((monthKey) => {
              const items = monthGroups[monthKey];
              const monthDate = new Date(monthKey + '-01');
              const monthLabel = monthDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

              return (
                <Card key={monthKey}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalIcon className="h-5 w-5 text-indigo-500" />
                      {monthLabel}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.date} className="flex items-start gap-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                          <div className="min-w-[80px] text-center">
                            <p className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                              {new Date(item.date).getDate()}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(item.date).toLocaleDateString('en-IN', { weekday: 'short' })}
                            </p>
                          </div>
                          <div className="flex-1 space-y-2">
                            {item.events.map((ev, i) => {
                              const config = eventTypeConfig[ev.type] || eventTypeConfig.open;
                              return (
                                <div key={i} className="flex items-center gap-2">
                                  <Badge className={`${config.color} border-0 text-[10px]`}>{config.label}</Badge>
                                  <Link
                                    href={`/ipo/${ev.slug}`}
                                    className="text-sm font-medium text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                                  >
                                    {ev.company}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming IPO events.</p>
          </div>
        )}
      </div>
    </>
  );
}
