import { getOpenIpos, getUpcomingIpos, getListedIpos, getIpoCount } from '@/lib/queries';
import { HomeDashboard } from './home-dashboard';
import { generateWebsiteJsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const openIpos = getOpenIpos();
  const upcomingIpos = getUpcomingIpos();
  const listedIpos = getListedIpos();
  const counts = getIpoCount();
  const jsonLd = generateWebsiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            IPO Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track upcoming, open, and recently listed IPOs in India with live GMP and AI analysis.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <StatCard label="Open Now" value={counts.open} color="emerald" />
            <StatCard label="Upcoming" value={counts.upcoming} color="blue" />
            <StatCard label="Listed" value={counts.listed} color="amber" />
            <StatCard label="Total Tracked" value={counts.total} color="indigo" />
          </div>
        </div>

        <HomeDashboard
          openIpos={openIpos}
          upcomingIpos={upcomingIpos}
          listedIpos={listedIpos}
        />

        <div id="ad-slot-homepage-bottom" className="mt-8" />
      </div>
    </>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300',
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300',
    indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
  };

  return (
    <div className={`rounded-lg px-4 py-2 ${colorMap[color] || colorMap.indigo}`}>
      <span className="text-2xl font-bold tabular-nums">{value}</span>
      <span className="ml-1.5 text-sm opacity-80">{label}</span>
    </div>
  );
}
