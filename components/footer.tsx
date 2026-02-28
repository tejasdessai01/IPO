import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { NAV_LINKS, LEARN_ARTICLES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                IPO <span className="text-indigo-500">Dekho</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              India&apos;s fastest IPO tracking platform with live GMP, AI analysis, and allotment updates.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 transition-colors hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Learn</h3>
            <ul className="space-y-2">
              {LEARN_ARTICLES.slice(0, 4).map((article) => (
                <li key={article.slug}>
                  <Link href={`/learn/${article.slug}`} className="text-sm text-gray-500 transition-colors hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">API</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/api/ipos" className="text-sm text-gray-500 transition-colors hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                  All IPOs API
                </Link>
              </li>
              <li>
                <Link href="/api/gmp" className="text-sm text-gray-500 transition-colors hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                  GMP Data API
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            IPO Dekho is for informational purposes only. Not SEBI registered. Not investment advice.
            Data may be delayed. Always verify with official sources before making investment decisions.
          </p>
          <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} IPO Dekho. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
