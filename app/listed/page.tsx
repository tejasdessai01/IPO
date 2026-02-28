import type { Metadata } from 'next';
import Link from 'next/link';
import { getListedIpos } from '@/lib/queries';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SITE_URL } from '@/lib/constants';
import { formatCurrency, formatPercent, formatDate, getListingGainColor } from '@/lib/utils';
import { generateBreadcrumbJsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Recently Listed IPOs — Listing Day Performance',
  description: 'Track recently listed IPOs in India. Compare issue price, listing price, listing gains, and current market price.',
  openGraph: {
    title: 'Recently Listed IPOs — Listing Day Performance | IPO Dekho',
    description: 'Track listing performance of recent IPOs.',
    url: `${SITE_URL}/listed`,
  },
};

export default function ListedPage() {
  const listedIpos = getListedIpos();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Listed IPOs', url: '/listed' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Recently Listed IPOs</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track post-listing performance of recently listed IPOs in India.
          </p>
        </div>

        <Card>
          <CardContent className="p-0 sm:p-0">
            {listedIpos.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Listing Date</TableHead>
                    <TableHead className="text-right">Issue Price</TableHead>
                    <TableHead className="text-right">Listing Price</TableHead>
                    <TableHead className="text-right">Listing Gain</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Current Price</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Current Return</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listedIpos.map((ipo) => {
                    const currentReturn = ipo.current_price && ipo.price_band_high
                      ? ((ipo.current_price - ipo.price_band_high) / ipo.price_band_high) * 100
                      : null;

                    return (
                      <TableRow key={ipo.id}>
                        <TableCell>
                          <Link href={`/ipo/${ipo.id}`} className="group">
                            <p className="font-medium text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                              {ipo.company_name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{ipo.industry}</p>
                          </Link>
                        </TableCell>
                        <TableCell className="text-right text-sm tabular-nums">
                          {formatDate(ipo.listing_date)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(ipo.price_band_high)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {ipo.listing_price ? formatCurrency(ipo.listing_price) : '—'}
                        </TableCell>
                        <TableCell className={`text-right font-semibold tabular-nums ${getListingGainColor(ipo.listing_gain_percent)}`}>
                          {ipo.listing_gain_percent != null ? formatPercent(ipo.listing_gain_percent) : '—'}
                        </TableCell>
                        <TableCell className="text-right tabular-nums hidden sm:table-cell">
                          {ipo.current_price ? formatCurrency(ipo.current_price) : '—'}
                        </TableCell>
                        <TableCell className={`text-right tabular-nums hidden md:table-cell font-medium ${getListingGainColor(currentReturn)}`}>
                          {currentReturn != null ? formatPercent(currentReturn) : '—'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No recently listed IPOs.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
