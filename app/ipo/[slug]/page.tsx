import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ExternalLink, FileText, ChevronRight } from 'lucide-react';
import { getIpoBySlug, getGmpHistory, getRelatedIpos } from '@/lib/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IpoCard } from '@/components/ipo-card';
import { Timeline } from '@/components/timeline';
import { AiAnalysisCard } from '@/components/ai-analysis-card';
import { SubscriptionBars } from '@/components/subscription-bars';
import { FinancialsTable } from '@/components/financials-table';
import { ShareButtons } from '@/components/share-buttons';
import { GmpChartWrapper } from './gmp-chart-wrapper';
import { STATUS_COLORS, AFFILIATE_LINKS, SITE_URL } from '@/lib/constants';
import { formatCurrency, formatDate, formatPercent, getGmpColor, timeAgo, parseJsonSafe } from '@/lib/utils';
import { generateIpoJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ipo = getIpoBySlug(params.slug);
  if (!ipo) return { title: 'IPO Not Found' };

  const title = `${ipo.company_name} IPO — Price, GMP, Dates, Review & Analysis`;
  const description = ipo.description || `${ipo.company_name} IPO details — price band, GMP, subscription status, listing date, and expert analysis.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/ipo/${ipo.id}`,
      siteName: 'IPO Dekho',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function IpoDetailPage({ params }: PageProps) {
  const ipo = getIpoBySlug(params.slug);
  if (!ipo) notFound();

  const gmpHistory = getGmpHistory(ipo.id);
  const relatedIpos = getRelatedIpos(ipo.id, ipo.industry);
  const statusColors = STATUS_COLORS[ipo.status] || STATUS_COLORS.upcoming;
  const promoters = parseJsonSafe<string[]>(ipo.promoters, []);
  const leadManagers = parseJsonSafe<string[]>(ipo.lead_managers, []);

  const timelineSteps = [
    { label: 'Open', date: ipo.open_date, completed: ['open', 'closed', 'listed'].includes(ipo.status), active: ipo.status === 'open' },
    { label: 'Close', date: ipo.close_date, completed: ['closed', 'listed'].includes(ipo.status), active: false },
    { label: 'Allotment', date: ipo.allotment_date, completed: ipo.status === 'listed', active: ipo.status === 'closed' },
    { label: 'Listing', date: ipo.listing_date, completed: ipo.status === 'listed', active: false },
  ];

  const ipoJsonLd = generateIpoJsonLd(ipo);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'IPOs', url: '/' },
    { name: `${ipo.company_name} IPO`, url: `/ipo/${ipo.id}` },
  ]);

  const expectedListing = ipo.price_band_high && ipo.gmp ? ipo.price_band_high + ipo.gmp : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ipoJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-indigo-500">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gray-900 dark:text-white">{ipo.company_name} IPO</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Header Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                        {ipo.company_name} IPO
                      </h1>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge className={`${statusColors.bg} ${statusColors.text} border-0`}>
                        <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${statusColors.dot}`} />
                        {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
                      </Badge>
                      {ipo.ipo_type === 'sme' && (
                        <Badge variant="warning" className="border-0">SME</Badge>
                      )}
                      {ipo.industry && (
                        <Badge variant="secondary">{ipo.industry}</Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Price Band</p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-gray-900 dark:text-white">
                      {ipo.price_band_low && ipo.price_band_high
                        ? `${formatCurrency(ipo.price_band_low)} - ${formatCurrency(ipo.price_band_high)}`
                        : 'TBA'}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Issue Size</p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-gray-900 dark:text-white">
                      {ipo.issue_size_cr ? `${formatCurrency(ipo.issue_size_cr)} Cr` : 'TBA'}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Lot Size</p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-gray-900 dark:text-white">
                      {ipo.lot_size || 'TBA'}
                    </p>
                    {ipo.min_investment && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">Min: {formatCurrency(ipo.min_investment)}</p>
                    )}
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400">GMP</p>
                    <p className={`mt-1 text-lg font-bold tabular-nums ${getGmpColor(ipo.gmp)}`}>
                      {ipo.gmp ? `${ipo.gmp > 0 ? '+' : ''}${formatCurrency(ipo.gmp)}` : '—'}
                    </p>
                    {ipo.gmp_percent !== 0 && (
                      <p className={`text-xs tabular-nums ${getGmpColor(ipo.gmp)}`}>
                        ({formatPercent(ipo.gmp_percent)})
                      </p>
                    )}
                  </div>
                </div>

                {/* CTA Buttons */}
                {(ipo.status === 'open' || ipo.status === 'upcoming') && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a href={AFFILIATE_LINKS.zerodha} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="gap-1.5">
                        Apply on Zerodha <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                    <a href={AFFILIATE_LINKS.groww} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1.5">
                        Apply on Groww <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                    <a href={AFFILIATE_LINKS.upstox} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1.5">
                        Apply on Upstox <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                  </div>
                )}

                {/* Share */}
                <div className="mt-4">
                  <ShareButtons ipo={ipo} />
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>IPO Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline steps={timelineSteps} />
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Open Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(ipo.open_date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Close Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(ipo.close_date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Allotment</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(ipo.allotment_date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Listing</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(ipo.listing_date)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <AiAnalysisCard
              verdict={ipo.ai_verdict}
              score={ipo.ai_score}
              summary={ipo.ai_summary}
              strengths={ipo.strengths}
              risks={ipo.risks}
            />

            {/* Subscription Status */}
            {(ipo.status === 'open' || ipo.status === 'closed') && ipo.subscription_total > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <SubscriptionBars
                    retail={ipo.subscription_retail}
                    nii={ipo.subscription_nii}
                    qib={ipo.subscription_qib}
                    total={ipo.subscription_total}
                  />
                </CardContent>
              </Card>
            )}

            {/* GMP Tracker */}
            {gmpHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>GMP Trend</CardTitle>
                    {ipo.gmp_updated_at && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Updated {timeAgo(ipo.gmp_updated_at)}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Current GMP: </span>
                      <span className={`font-bold tabular-nums ${getGmpColor(ipo.gmp)}`}>
                        {ipo.gmp ? `${ipo.gmp > 0 ? '+' : ''}${formatCurrency(ipo.gmp)}` : '—'}
                      </span>
                    </div>
                    {expectedListing && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Expected Listing: </span>
                        <span className="font-bold tabular-nums text-gray-900 dark:text-white">
                          {formatCurrency(expectedListing)}
                        </span>
                      </div>
                    )}
                  </div>
                  <GmpChartWrapper history={gmpHistory} priceHigh={ipo.price_band_high} />
                </CardContent>
              </Card>
            )}

            {/* Company Overview */}
            {(ipo.about || ipo.business_model) && (
              <Card>
                <CardHeader>
                  <CardTitle>Company Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ipo.about && (
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">About</h3>
                      <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">
                        {ipo.about}
                      </div>
                    </div>
                  )}
                  {ipo.business_model && (
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Business Model</h3>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {ipo.business_model}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Financials */}
            {ipo.financials_json && (
              <Card>
                <CardHeader>
                  <CardTitle>Financial Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <FinancialsTable financialsJson={ipo.financials_json} />
                </CardContent>
              </Card>
            )}

            {/* Listing Info (for listed IPOs) */}
            {ipo.status === 'listed' && (
              <Card>
                <CardHeader>
                  <CardTitle>Listing Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Issue Price</p>
                      <p className="text-lg font-bold tabular-nums text-gray-900 dark:text-white">
                        {formatCurrency(ipo.price_band_high)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Listing Price</p>
                      <p className="text-lg font-bold tabular-nums text-gray-900 dark:text-white">
                        {ipo.listing_price ? formatCurrency(ipo.listing_price) : '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Listing Gain</p>
                      <p className={`text-lg font-bold tabular-nums ${ipo.listing_gain_percent && ipo.listing_gain_percent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {ipo.listing_gain_percent != null ? formatPercent(ipo.listing_gain_percent) : '—'}
                      </p>
                    </div>
                    {ipo.current_price && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
                        <p className="text-lg font-bold tabular-nums text-gray-900 dark:text-white">
                          {formatCurrency(ipo.current_price)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>IPO Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3 text-sm">
                  <DetailRow label="Face Value" value={ipo.face_value ? formatCurrency(ipo.face_value) : '—'} />
                  <DetailRow label="Fresh Issue" value={ipo.fresh_issue_cr ? `${formatCurrency(ipo.fresh_issue_cr)} Cr` : '—'} />
                  <DetailRow label="OFS" value={ipo.ofs_cr ? `${formatCurrency(ipo.ofs_cr)} Cr` : '—'} />
                  <DetailRow label="IPO Type" value={ipo.ipo_type === 'sme' ? 'SME' : 'Mainboard'} />
                  <DetailRow label="Registrar" value={ipo.registrar || '—'} />
                </dl>
              </CardContent>
            </Card>

            {/* Key People */}
            {(promoters.length > 0 || leadManagers.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Key People</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {promoters.length > 0 && (
                    <div>
                      <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Promoters</h4>
                      <ul className="space-y-1">
                        {promoters.map((p, i) => (
                          <li key={i} className="text-sm text-gray-700 dark:text-gray-300">{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {leadManagers.length > 0 && (
                    <div>
                      <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Lead Managers</h4>
                      <ul className="space-y-1">
                        {leadManagers.map((m, i) => (
                          <li key={i} className="text-sm text-gray-700 dark:text-gray-300">{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {ipo.drhp_url ? (
                  <a href={ipo.drhp_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" /> Download DRHP
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2" disabled>
                    <FileText className="h-4 w-4" /> DRHP Not Available
                  </Button>
                )}
                {ipo.rhp_url ? (
                  <a href={ipo.rhp_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" /> Download RHP
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2" disabled>
                    <FileText className="h-4 w-4" /> RHP Not Available
                  </Button>
                )}
                {ipo.allotment_status_url && (
                  <Link href={`/ipo/${ipo.id}/allotment`}>
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" /> Check Allotment Status
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Ad slot */}
            <div id="ad-slot-detail-sidebar" />
          </div>
        </div>

        {/* Related IPOs */}
        {relatedIpos.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Related IPOs</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedIpos.map((ripo) => (
                <IpoCard key={ripo.id} ipo={ripo} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="font-medium text-gray-900 dark:text-white">{value}</dd>
    </div>
  );
}
