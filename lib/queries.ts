import { getDb } from './db';

export interface IPO {
  id: string;
  company_name: string;
  logo_url: string | null;
  status: string;
  ipo_type: string;
  open_date: string | null;
  close_date: string | null;
  listing_date: string | null;
  price_band_low: number | null;
  price_band_high: number | null;
  face_value: number | null;
  lot_size: number | null;
  min_investment: number | null;
  issue_size_cr: number | null;
  fresh_issue_cr: number | null;
  ofs_cr: number | null;
  subscription_retail: number;
  subscription_nii: number;
  subscription_qib: number;
  subscription_total: number;
  gmp: number;
  gmp_percent: number;
  gmp_updated_at: string | null;
  listing_price: number | null;
  listing_gain_percent: number | null;
  current_price: number | null;
  industry: string | null;
  description: string | null;
  about: string | null;
  business_model: string | null;
  strengths: string | null;
  risks: string | null;
  financials_json: string | null;
  promoters: string | null;
  lead_managers: string | null;
  registrar: string | null;
  drhp_url: string | null;
  rhp_url: string | null;
  ai_summary: string | null;
  ai_verdict: string | null;
  ai_score: number | null;
  allotment_date: string | null;
  allotment_status_url: string | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface GmpHistory {
  id: number;
  ipo_id: string;
  gmp: number;
  recorded_at: string;
}

export interface TimelineEvent {
  id: number;
  ipo_id: string;
  event_type: string;
  event_date: string;
  label: string;
}

export function getAllIpos(): IPO[] {
  const db = getDb();
  return db.prepare('SELECT * FROM ipos ORDER BY open_date DESC').all() as IPO[];
}

export function getIposByStatus(status: string): IPO[] {
  const db = getDb();
  return db.prepare('SELECT * FROM ipos WHERE status = ? ORDER BY open_date DESC').all(status) as IPO[];
}

export function getIposByType(type: string): IPO[] {
  const db = getDb();
  return db.prepare('SELECT * FROM ipos WHERE ipo_type = ? ORDER BY open_date DESC').all(type) as IPO[];
}

export function getIposByTypeAndStatus(type: string, status?: string): IPO[] {
  const db = getDb();
  if (status) {
    return db.prepare('SELECT * FROM ipos WHERE ipo_type = ? AND status = ? ORDER BY open_date DESC').all(type, status) as IPO[];
  }
  return db.prepare('SELECT * FROM ipos WHERE ipo_type = ? ORDER BY open_date DESC').all(type) as IPO[];
}

export function getIpoBySlug(slug: string): IPO | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM ipos WHERE id = ?').get(slug) as IPO | undefined;
}

export function getOpenIpos(): IPO[] {
  const db = getDb();
  return db.prepare("SELECT * FROM ipos WHERE status = 'open' ORDER BY close_date ASC").all() as IPO[];
}

export function getUpcomingIpos(): IPO[] {
  const db = getDb();
  return db.prepare("SELECT * FROM ipos WHERE status = 'upcoming' ORDER BY open_date ASC").all() as IPO[];
}

export function getListedIpos(): IPO[] {
  const db = getDb();
  return db.prepare("SELECT * FROM ipos WHERE status = 'listed' ORDER BY listing_date DESC").all() as IPO[];
}

export function getClosedIpos(): IPO[] {
  const db = getDb();
  return db.prepare("SELECT * FROM ipos WHERE status = 'closed' ORDER BY close_date DESC").all() as IPO[];
}

export function getRecentIpos(limit: number = 10): IPO[] {
  const db = getDb();
  return db.prepare("SELECT * FROM ipos WHERE status IN ('listed', 'closed') ORDER BY listing_date DESC, close_date DESC LIMIT ?").all(limit) as IPO[];
}

export function getIposWithGmp(): IPO[] {
  const db = getDb();
  return db.prepare("SELECT * FROM ipos WHERE status IN ('upcoming', 'open', 'closed') AND gmp != 0 ORDER BY gmp_percent DESC").all() as IPO[];
}

export function getAllIposForGmp(): IPO[] {
  const db = getDb();
  return db.prepare("SELECT * FROM ipos WHERE status IN ('upcoming', 'open', 'closed') ORDER BY open_date DESC").all() as IPO[];
}

export function getGmpHistory(ipoId: string): GmpHistory[] {
  const db = getDb();
  return db.prepare('SELECT * FROM gmp_history WHERE ipo_id = ? ORDER BY recorded_at ASC').all(ipoId) as GmpHistory[];
}

export function getTimelineEvents(ipoId: string): TimelineEvent[] {
  const db = getDb();
  return db.prepare('SELECT * FROM timeline_events WHERE ipo_id = ? ORDER BY event_date ASC').all(ipoId) as TimelineEvent[];
}

export function getRelatedIpos(ipoId: string, industry: string | null, limit: number = 3): IPO[] {
  const db = getDb();
  if (industry) {
    return db.prepare('SELECT * FROM ipos WHERE id != ? AND industry = ? ORDER BY open_date DESC LIMIT ?').all(ipoId, industry, limit) as IPO[];
  }
  return db.prepare('SELECT * FROM ipos WHERE id != ? ORDER BY open_date DESC LIMIT ?').all(ipoId, limit) as IPO[];
}

export function getCalendarEvents(): Array<{ date: string; events: Array<{ type: string; company: string; slug: string }> }> {
  const db = getDb();
  const ipos = db.prepare("SELECT id, company_name, open_date, close_date, allotment_date, listing_date, status FROM ipos WHERE open_date IS NOT NULL ORDER BY open_date DESC").all() as IPO[];

  const dateMap: Record<string, Array<{ type: string; company: string; slug: string }>> = {};

  for (const ipo of ipos) {
    if (ipo.open_date) {
      if (!dateMap[ipo.open_date]) dateMap[ipo.open_date] = [];
      dateMap[ipo.open_date].push({ type: 'open', company: ipo.company_name, slug: ipo.id });
    }
    if (ipo.close_date) {
      if (!dateMap[ipo.close_date]) dateMap[ipo.close_date] = [];
      dateMap[ipo.close_date].push({ type: 'close', company: ipo.company_name, slug: ipo.id });
    }
    if (ipo.allotment_date) {
      if (!dateMap[ipo.allotment_date]) dateMap[ipo.allotment_date] = [];
      dateMap[ipo.allotment_date].push({ type: 'allotment', company: ipo.company_name, slug: ipo.id });
    }
    if (ipo.listing_date) {
      if (!dateMap[ipo.listing_date]) dateMap[ipo.listing_date] = [];
      dateMap[ipo.listing_date].push({ type: 'listing', company: ipo.company_name, slug: ipo.id });
    }
  }

  return Object.entries(dateMap)
    .map(([date, events]) => ({ date, events }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function searchIpos(query: string): IPO[] {
  const db = getDb();
  const searchTerm = `%${query}%`;
  return db.prepare('SELECT * FROM ipos WHERE company_name LIKE ? OR industry LIKE ? ORDER BY open_date DESC LIMIT 20').all(searchTerm, searchTerm) as IPO[];
}

export function getIpoCount(): { total: number; open: number; upcoming: number; listed: number } {
  const db = getDb();
  const total = (db.prepare('SELECT COUNT(*) as count FROM ipos').get() as { count: number }).count;
  const open = (db.prepare("SELECT COUNT(*) as count FROM ipos WHERE status = 'open'").get() as { count: number }).count;
  const upcoming = (db.prepare("SELECT COUNT(*) as count FROM ipos WHERE status = 'upcoming'").get() as { count: number }).count;
  const listed = (db.prepare("SELECT COUNT(*) as count FROM ipos WHERE status = 'listed'").get() as { count: number }).count;
  return { total, open, upcoming, listed };
}
