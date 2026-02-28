import * as cheerio from 'cheerio';
import { getDb } from './db';

interface ScrapedIpo {
  company_name: string;
  status: string;
  ipo_type: string;
  open_date: string | null;
  close_date: string | null;
  price_band_low: number | null;
  price_band_high: number | null;
  lot_size: number | null;
  issue_size_cr: number | null;
}

export async function scrapeIpoListings(): Promise<ScrapedIpo[]> {
  const results: ScrapedIpo[] = [];

  try {
    const response = await fetch('https://www.investorgain.com/report/live-ipo-gmp/331/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch IPO listings:', response.status);
      return results;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    $('table tbody tr').each((_, row) => {
      const cells = $(row).find('td');
      if (cells.length < 4) return;

      const name = $(cells[0]).text().trim();
      const priceText = $(cells[1]).text().trim();

      if (name && priceText) {
        const priceParts = priceText.match(/(\d+)/g);
        results.push({
          company_name: name,
          status: 'upcoming',
          ipo_type: 'mainboard',
          open_date: null,
          close_date: null,
          price_band_low: priceParts ? parseInt(priceParts[0]) : null,
          price_band_high: priceParts && priceParts.length > 1 ? parseInt(priceParts[1]) : priceParts ? parseInt(priceParts[0]) : null,
          lot_size: null,
          issue_size_cr: null,
        });
      }
    });
  } catch (error) {
    console.error('Scraping error:', error);
  }

  return results;
}

export async function scrapeGmpData(): Promise<Array<{ company_name: string; gmp: number }>> {
  const results: Array<{ company_name: string; gmp: number }> = [];

  try {
    const response = await fetch('https://www.investorgain.com/report/live-ipo-gmp/331/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) return results;

    const html = await response.text();
    const $ = cheerio.load(html);

    $('table tbody tr').each((_, row) => {
      const cells = $(row).find('td');
      if (cells.length < 3) return;

      const name = $(cells[0]).text().trim();
      const gmpText = $(cells[2]).text().trim();
      const gmpMatch = gmpText.match(/([-+]?\d+)/);

      if (name && gmpMatch) {
        results.push({
          company_name: name,
          gmp: parseInt(gmpMatch[1]),
        });
      }
    });
  } catch (error) {
    console.error('GMP scraping error:', error);
  }

  return results;
}

export async function updateGmpInDb(gmpData: Array<{ company_name: string; gmp: number }>) {
  const db = getDb();

  const updateStmt = db.prepare(`
    UPDATE ipos SET gmp = ?, gmp_percent = ?, gmp_updated_at = datetime('now'), updated_at = datetime('now')
    WHERE company_name LIKE ? AND status IN ('upcoming', 'open', 'closed')
  `);

  const insertGmpHistory = db.prepare(`
    INSERT INTO gmp_history (ipo_id, gmp) VALUES (?, ?)
  `);

  const findIpo = db.prepare(`
    SELECT id, price_band_high FROM ipos WHERE company_name LIKE ? AND status IN ('upcoming', 'open', 'closed')
  `);

  const transaction = db.transaction(() => {
    for (const { company_name, gmp } of gmpData) {
      const searchName = `%${company_name}%`;
      const ipo = findIpo.get(searchName) as { id: string; price_band_high: number | null } | undefined;

      if (ipo) {
        const gmpPercent = ipo.price_band_high ? (gmp / ipo.price_band_high) * 100 : 0;
        updateStmt.run(gmp, gmpPercent, searchName);
        insertGmpHistory.run(ipo.id, gmp);
      }
    }
  });

  transaction();
}

export async function runScraper() {
  console.log('[Scraper] Starting IPO data scrape...');

  const ipoData = await scrapeIpoListings();
  console.log(`[Scraper] Found ${ipoData.length} IPO listings`);

  const gmpData = await scrapeGmpData();
  console.log(`[Scraper] Found ${gmpData.length} GMP entries`);

  if (gmpData.length > 0) {
    await updateGmpInDb(gmpData);
    console.log('[Scraper] GMP data updated in database');
  }

  return { iposFound: ipoData.length, gmpsUpdated: gmpData.length };
}
