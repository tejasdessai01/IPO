import { MetadataRoute } from 'next';
import { getAllIpos } from '@/lib/queries';
import { LEARN_ARTICLES, SITE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const ipos = getAllIpos();

  const ipoPages = ipos.map((ipo) => ({
    url: `${SITE_URL}/ipo/${ipo.id}`,
    lastModified: new Date(ipo.updated_at),
    changeFrequency: ipo.status === 'open' ? 'hourly' as const : 'daily' as const,
    priority: ipo.status === 'open' ? 0.9 : 0.7,
  }));

  const allotmentPages = ipos
    .filter((ipo) => ipo.allotment_status_url)
    .map((ipo) => ({
      url: `${SITE_URL}/ipo/${ipo.id}/allotment`,
      lastModified: new Date(ipo.updated_at),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

  const learnPages = LEARN_ARTICLES.map((article) => ({
    url: `${SITE_URL}/learn/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/gmp`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/calendar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sme`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/listed`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...ipoPages,
    ...allotmentPages,
    ...learnPages,
  ];
}
