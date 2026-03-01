import { ipos, gmpHistory, timelineEvents, type IPORecord, type GmpHistoryRecord, type TimelineEventRecord } from './data';

export type IPO = IPORecord;
export type GmpHistory = GmpHistoryRecord;
export type TimelineEvent = TimelineEventRecord;

export function getAllIpos(): IPO[] {
  return [...ipos].sort((a, b) => (b.open_date ?? '').localeCompare(a.open_date ?? ''));
}

export function getIposByStatus(status: string): IPO[] {
  return ipos
    .filter((i) => i.status === status)
    .sort((a, b) => (b.open_date ?? '').localeCompare(a.open_date ?? ''));
}

export function getIposByType(type: string): IPO[] {
  return ipos
    .filter((i) => i.ipo_type === type)
    .sort((a, b) => (b.open_date ?? '').localeCompare(a.open_date ?? ''));
}

export function getIposByTypeAndStatus(type: string, status?: string): IPO[] {
  return ipos
    .filter((i) => i.ipo_type === type && (!status || i.status === status))
    .sort((a, b) => (b.open_date ?? '').localeCompare(a.open_date ?? ''));
}

export function getIpoBySlug(slug: string): IPO | undefined {
  return ipos.find((i) => i.id === slug);
}

export function getOpenIpos(): IPO[] {
  return ipos
    .filter((i) => i.status === 'open')
    .sort((a, b) => (a.close_date ?? '').localeCompare(b.close_date ?? ''));
}

export function getUpcomingIpos(): IPO[] {
  return ipos
    .filter((i) => i.status === 'upcoming')
    .sort((a, b) => (a.open_date ?? '').localeCompare(b.open_date ?? ''));
}

export function getListedIpos(): IPO[] {
  return ipos
    .filter((i) => i.status === 'listed')
    .sort((a, b) => (b.listing_date ?? '').localeCompare(a.listing_date ?? ''));
}

export function getClosedIpos(): IPO[] {
  return ipos
    .filter((i) => i.status === 'closed')
    .sort((a, b) => (b.close_date ?? '').localeCompare(a.close_date ?? ''));
}

export function getRecentIpos(limit: number = 10): IPO[] {
  return ipos
    .filter((i) => i.status === 'listed' || i.status === 'closed')
    .sort((a, b) => (b.listing_date ?? b.close_date ?? '').localeCompare(a.listing_date ?? a.close_date ?? ''))
    .slice(0, limit);
}

export function getIposWithGmp(): IPO[] {
  return ipos
    .filter((i) => ['upcoming', 'open', 'closed'].includes(i.status) && i.gmp !== 0)
    .sort((a, b) => (b.gmp_percent ?? 0) - (a.gmp_percent ?? 0));
}

export function getAllIposForGmp(): IPO[] {
  return ipos
    .filter((i) => ['upcoming', 'open', 'closed'].includes(i.status))
    .sort((a, b) => (b.open_date ?? '').localeCompare(a.open_date ?? ''));
}

export function getGmpHistory(ipoId: string): GmpHistory[] {
  return gmpHistory
    .filter((g) => g.ipo_id === ipoId)
    .sort((a, b) => a.recorded_at.localeCompare(b.recorded_at));
}

export function getTimelineEvents(ipoId: string): TimelineEvent[] {
  return timelineEvents
    .filter((t) => t.ipo_id === ipoId)
    .sort((a, b) => a.event_date.localeCompare(b.event_date));
}

export function getRelatedIpos(ipoId: string, industry: string | null, limit: number = 3): IPO[] {
  const filtered = industry
    ? ipos.filter((i) => i.id !== ipoId && i.industry === industry)
    : ipos.filter((i) => i.id !== ipoId);
  return filtered
    .sort((a, b) => (b.open_date ?? '').localeCompare(a.open_date ?? ''))
    .slice(0, limit);
}

export function getCalendarEvents(): Array<{ date: string; events: Array<{ type: string; company: string; slug: string }> }> {
  const dateMap: Record<string, Array<{ type: string; company: string; slug: string }>> = {};

  for (const ipo of ipos) {
    if (!ipo.open_date) continue;
    const addEvent = (date: string | null, type: string) => {
      if (!date) return;
      if (!dateMap[date]) dateMap[date] = [];
      dateMap[date].push({ type, company: ipo.company_name, slug: ipo.id });
    };
    addEvent(ipo.open_date, 'open');
    addEvent(ipo.close_date, 'close');
    addEvent(ipo.allotment_date, 'allotment');
    addEvent(ipo.listing_date, 'listing');
  }

  return Object.entries(dateMap)
    .map(([date, events]) => ({ date, events }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function searchIpos(query: string): IPO[] {
  const q = query.toLowerCase();
  return ipos
    .filter((i) =>
      i.company_name.toLowerCase().includes(q) ||
      (i.industry && i.industry.toLowerCase().includes(q))
    )
    .slice(0, 20);
}

export function getIpoCount(): { total: number; open: number; upcoming: number; listed: number } {
  return {
    total: ipos.length,
    open: ipos.filter((i) => i.status === 'open').length,
    upcoming: ipos.filter((i) => i.status === 'upcoming').length,
    listed: ipos.filter((i) => i.status === 'listed').length,
  };
}
