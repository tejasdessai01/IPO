import type { Metadata } from 'next';
import { getIposByType } from '@/lib/queries';
import { IpoCard } from '@/components/ipo-card';
import { SITE_URL } from '@/lib/constants';
import { generateBreadcrumbJsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'SME IPOs — Upcoming & Open SME IPOs in India',
  description: 'Track all SME IPOs in India. Live GMP, subscription status, and AI analysis for SME IPOs on BSE SME and NSE Emerge platforms.',
  openGraph: {
    title: 'SME IPOs — Upcoming & Open SME IPOs in India | IPO Dekho',
    description: 'Track all SME IPOs with live GMP and subscription data.',
    url: `${SITE_URL}/sme`,
  },
};

export default function SmePage() {
  const smeIpos = getIposByType('sme');

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'SME IPOs', url: '/sme' },
  ]);

  const openSme = smeIpos.filter((i) => i.status === 'open');
  const upcomingSme = smeIpos.filter((i) => i.status === 'upcoming');
  const otherSme = smeIpos.filter((i) => !['open', 'upcoming'].includes(i.status));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SME IPOs</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track all SME IPOs on BSE SME and NSE Emerge platforms with live GMP and analysis.
          </p>
        </div>

        {openSme.length > 0 && (
          <Section title="Open Now" ipos={openSme} />
        )}

        {upcomingSme.length > 0 && (
          <Section title="Upcoming" ipos={upcomingSme} />
        )}

        {otherSme.length > 0 && (
          <Section title="Recently Closed & Listed" ipos={otherSme} />
        )}

        {smeIpos.length === 0 && (
          <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">No SME IPOs found.</p>
          </div>
        )}
      </div>
    </>
  );
}

function Section({ title, ipos }: { title: string; ipos: ReturnType<typeof getIposByType> }) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ipos.map((ipo) => (
          <IpoCard key={ipo.id} ipo={ipo} />
        ))}
      </div>
    </div>
  );
}
