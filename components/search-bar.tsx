'use client';

import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { STATUS_COLORS } from '@/lib/constants';

interface SearchResult {
  id: string;
  company_name: string;
  status: string;
  industry: string | null;
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/ipos?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.slice(0, 5));
        setOpen(true);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search IPOs..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {results.map((r) => {
            const colors = STATUS_COLORS[r.status] || STATUS_COLORS.upcoming;
            return (
              <Link
                key={r.id}
                href={`/ipo/${r.id}`}
                onClick={() => { setOpen(false); setQuery(''); }}
                className="flex items-center justify-between px-3 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{r.company_name}</p>
                  {r.industry && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{r.industry}</p>
                  )}
                </div>
                <Badge className={`${colors.bg} ${colors.text} border-0 text-[10px]`}>
                  {r.status}
                </Badge>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
