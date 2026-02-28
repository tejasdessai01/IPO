import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { LEARN_ARTICLES, SITE_URL } from '@/lib/constants';
import { generateBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Learn About IPOs — Guides & Articles',
  description: 'Learn everything about IPOs in India — how to apply, what is GMP, allotment process, and more. Beginner-friendly guides for Indian stock market investors.',
  openGraph: {
    title: 'Learn About IPOs — Guides & Articles | IPO Dekho',
    description: 'Beginner-friendly guides about IPOs in India.',
    url: `${SITE_URL}/learn`,
  },
};

export default function LearnPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Learn', url: '/learn' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learn About IPOs</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Everything you need to know about investing in IPOs in India. Beginner-friendly guides and articles.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {LEARN_ARTICLES.map((article) => (
            <Link key={article.slug} href={`/learn/${article.slug}`}>
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="flex h-full items-center gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                      {article.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {article.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-indigo-500" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
