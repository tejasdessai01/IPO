import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { getAllIposForGmp } from '@/lib/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { STATUS_COLORS, SITE_URL } from '@/lib/constants';
import { formatCurrency, formatPercent, getGmpColor, timeAgo } from '@/lib/utils';
import { generateBreadcrumbJsonLd, generateFaqJsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'IPO GMP Today — Live Grey Market Premium Tracker',
  description: 'Track live IPO GMP (Grey Market Premium) for all upcoming and open IPOs in India. Updated every 2 hours with expected listing price.',
  openGraph: {
    title: 'IPO GMP Today — Live Grey Market Premium Tracker | IPO Dekho',
    description: 'Track live IPO GMP for all upcoming and open IPOs.',
    url: `${SITE_URL}/gmp`,
  },
};

export default function GmpPage() {
  const ipos = getAllIposForGmp();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'GMP Tracker', url: '/gmp' },
  ]);

  const faqJsonLd = generateFaqJsonLd([
    {
      question: 'What is IPO GMP?',
      answer: 'IPO GMP (Grey Market Premium) is the premium at which IPO shares are traded in the unofficial grey market before listing. It indicates the expected listing price of an IPO.',
    },
    {
      question: 'How often is GMP updated?',
      answer: 'GMP data is updated every 2-4 hours from multiple sources. However, grey market prices can change rapidly based on market sentiment.',
    },
    {
      question: 'Is GMP reliable for predicting listing price?',
      answer: 'GMP gives a rough indication but is not always accurate. Actual listing price depends on overall market conditions, demand-supply, and company fundamentals.',
    },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">IPO GMP Today</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Live Grey Market Premium (GMP) for all upcoming and open IPOs in India.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
                GMP Tracker
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {ipos.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Price Band</TableHead>
                    <TableHead className="text-right">GMP</TableHead>
                    <TableHead className="text-right">GMP %</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Expected Listing</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ipos.map((ipo) => {
                    const statusColors = STATUS_COLORS[ipo.status] || STATUS_COLORS.upcoming;
                    const expectedListing = ipo.price_band_high && ipo.gmp ? ipo.price_band_high + ipo.gmp : null;
                    return (
                      <TableRow key={ipo.id}>
                        <TableCell>
                          <Link href={`/ipo/${ipo.id}`} className="group">
                            <p className="font-medium text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                              {ipo.company_name}
                            </p>
                            <div className="mt-0.5 flex items-center gap-1.5">
                              <Badge className={`${statusColors.bg} ${statusColors.text} border-0 text-[10px]`}>
                                {ipo.status}
                              </Badge>
                              {ipo.ipo_type === 'sme' && (
                                <Badge variant="warning" className="border-0 text-[10px]">SME</Badge>
                              )}
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {ipo.price_band_high ? formatCurrency(ipo.price_band_high) : '—'}
                        </TableCell>
                        <TableCell className={`text-right font-semibold tabular-nums ${getGmpColor(ipo.gmp)}`}>
                          {ipo.gmp ? `${ipo.gmp > 0 ? '+' : ''}${formatCurrency(ipo.gmp)}` : '—'}
                        </TableCell>
                        <TableCell className={`text-right tabular-nums ${getGmpColor(ipo.gmp)}`}>
                          {ipo.gmp_percent ? formatPercent(ipo.gmp_percent) : '—'}
                        </TableCell>
                        <TableCell className="text-right tabular-nums hidden sm:table-cell">
                          {expectedListing ? formatCurrency(expectedListing) : '—'}
                        </TableCell>
                        <TableCell className="text-right text-xs text-gray-500 hidden md:table-cell">
                          {timeAgo(ipo.gmp_updated_at)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No active IPOs with GMP data.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>What is IPO GMP?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong className="text-gray-900 dark:text-white">Grey Market Premium (GMP)</strong> is the premium
              at which IPO shares are traded in the unofficial grey market before their official listing on the stock exchange.
            </p>
            <p>
              For example, if an IPO has a price band of ₹100 and GMP is ₹20, the expected listing price
              would be ₹120 (₹100 + ₹20). A positive GMP indicates the market expects the IPO to list at a premium.
            </p>
            <p className="text-amber-600 dark:text-amber-400">
              Note: GMP is based on unofficial grey market activity and may not accurately predict the actual listing price.
              Always consider fundamentals before investing.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
