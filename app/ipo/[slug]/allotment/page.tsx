import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, ExternalLink, Search } from 'lucide-react';
import { getIpoBySlug } from '@/lib/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SITE_URL } from '@/lib/constants';
import { generateBreadcrumbJsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ipo = getIpoBySlug(params.slug);
  if (!ipo) return { title: 'IPO Not Found' };

  const title = `${ipo.company_name} IPO Allotment Status — Check Online`;
  const description = `Check ${ipo.company_name} IPO allotment status online. Find out if shares are allotted using PAN or application number.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/ipo/${ipo.id}/allotment`,
    },
  };
}

export default function AllotmentPage({ params }: PageProps) {
  const ipo = getIpoBySlug(params.slug);
  if (!ipo) notFound();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: `${ipo.company_name} IPO`, url: `/ipo/${ipo.id}` },
    { name: 'Allotment Status', url: `/ipo/${ipo.id}/allotment` },
  ]);

  const registrarLinks: Record<string, { name: string; url: string }> = {
    'KFin Technologies': { name: 'KFintech', url: 'https://kosmic.kfintech.com/ipostatus' },
    'Link Intime India': { name: 'Link Intime', url: 'https://linkintime.co.in/initial_offer' },
    'Bigshare Services': { name: 'Bigshare', url: 'https://ipo.bigshareonline.com/IPO_Status.html' },
    'Skyline Financial Services': { name: 'Skyline', url: 'https://www.skylinerta.com/ipo.php' },
  };

  const registrar = ipo.registrar ? registrarLinks[ipo.registrar] : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-indigo-500">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/ipo/${ipo.id}`} className="hover:text-indigo-500">{ipo.company_name} IPO</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gray-900 dark:text-white">Allotment Status</span>
        </nav>

        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {ipo.company_name} IPO Allotment Status
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Check if you have been allotted shares in {ipo.company_name} IPO.
        </p>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-indigo-500" />
              Check Allotment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              The allotment status for {ipo.company_name} IPO can be checked on the registrar&apos;s website.
              {ipo.registrar && ` The registrar for this IPO is ${ipo.registrar}.`}
            </p>

            <div className="space-y-3">
              {registrar && (
                <a href={registrar.url} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full gap-2">
                    Check on {registrar.name} <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              )}

              {ipo.allotment_status_url && ipo.allotment_status_url !== registrar?.url && (
                <a href={ipo.allotment_status_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="mt-2 w-full gap-2">
                    Direct Allotment Link <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              )}

              <a href="https://www.bseindia.com/investors/appli_check.aspx" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="mt-2 w-full gap-2">
                  Check on BSE <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Check Allotment</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <strong className="text-gray-900 dark:text-white">Visit the registrar website</strong> — Click one of the links above to go to the registrar&apos;s IPO allotment page.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Select the IPO</strong> — Choose &quot;{ipo.company_name}&quot; from the dropdown list.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Enter your details</strong> — You can check using PAN number, Application Number, or Demat Account number.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Submit and view results</strong> — The page will show whether shares have been allotted to you and the number of shares.
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href={`/ipo/${ipo.id}`} className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400">
            &larr; Back to {ipo.company_name} IPO Details
          </Link>
        </div>
      </div>
    </>
  );
}
