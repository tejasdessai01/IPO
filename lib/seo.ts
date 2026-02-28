import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants';
import type { Metadata } from 'next';

export function generatePageMeta({
  title,
  description,
  path = '',
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || `${SITE_URL}/og-image.png`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
  };
}

export function generateIpoJsonLd(ipo: {
  company_name: string;
  id: string;
  description: string | null;
  price_band_low: number | null;
  price_band_high: number | null;
  open_date: string | null;
  close_date: string | null;
  ai_summary: string | null;
  status: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${ipo.company_name} IPO`,
    description: ipo.description || ipo.ai_summary || `${ipo.company_name} Initial Public Offering details and analysis`,
    url: `${SITE_URL}/ipo/${ipo.id}`,
    brand: {
      '@type': 'Brand',
      name: ipo.company_name,
    },
    offers: ipo.price_band_high ? {
      '@type': 'Offer',
      price: ipo.price_band_high,
      priceCurrency: 'INR',
      availability: ipo.status === 'open' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      validFrom: ipo.open_date,
      validThrough: ipo.close_date,
    } : undefined,
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
