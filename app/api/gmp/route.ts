import { NextResponse } from 'next/server';
import { getAllIposForGmp } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ipos = getAllIposForGmp();

    const gmpData = ipos.map((ipo) => ({
      id: ipo.id,
      company_name: ipo.company_name,
      status: ipo.status,
      price_band_high: ipo.price_band_high,
      gmp: ipo.gmp,
      gmp_percent: ipo.gmp_percent,
      expected_listing: ipo.price_band_high && ipo.gmp ? ipo.price_band_high + ipo.gmp : null,
      gmp_updated_at: ipo.gmp_updated_at,
    }));

    return NextResponse.json(gmpData, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
