import { NextResponse } from 'next/server';
import { getIpoBySlug, getGmpHistory, getTimelineEvents } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const ipo = getIpoBySlug(params.slug);

    if (!ipo) {
      return NextResponse.json({ error: 'IPO not found' }, { status: 404 });
    }

    const gmpHistory = getGmpHistory(ipo.id);
    const timeline = getTimelineEvents(ipo.id);

    return NextResponse.json(
      { ...ipo, gmpHistory, timeline },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
