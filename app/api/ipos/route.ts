import { NextRequest, NextResponse } from 'next/server';
import { getAllIpos, getIposByStatus, searchIpos } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  try {
    let ipos;

    if (search) {
      ipos = searchIpos(search);
    } else if (status) {
      ipos = getIposByStatus(status);
    } else {
      ipos = getAllIpos();
    }

    return NextResponse.json(ipos, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
