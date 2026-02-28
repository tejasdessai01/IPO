'use client';

import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateWhatsAppMessage, generateTwitterMessage } from '@/lib/utils';

interface ShareButtonsProps {
  ipo: {
    company_name: string;
    price_band_low: number | null;
    price_band_high: number | null;
    gmp: number | null;
    gmp_percent: number | null;
    ai_score: number | null;
    id: string;
  };
}

export function ShareButtons({ ipo }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://ipodekho.com/ipo/${ipo.id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <Share2 className="h-4 w-4" /> Share:
      </span>
      <a
        href={`https://wa.me/?text=${generateWhatsAppMessage(ipo)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm" className="gap-1.5 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
          WhatsApp
        </Button>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${generateTwitterMessage(ipo)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm" className="gap-1.5 text-blue-500 hover:text-blue-600">
          Twitter
        </Button>
      </a>
      <Button variant="outline" size="sm" className="gap-1.5" onClick={copyLink}>
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
    </div>
  );
}
