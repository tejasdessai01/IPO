import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // In development, allow without auth
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const results: Record<string, string> = {};

  try {
    // Scrape IPO data
    results.ipos = 'Scraper module ready — configure data sources to enable';

    // Scrape GMP data
    results.gmp = 'GMP scraper ready — configure data sources to enable';

    // Scrape subscription data
    results.subscriptions = 'Subscription scraper ready — configure data sources to enable';

    // AI enrichment
    results.ai = 'AI enrichment ready — add ANTHROPIC_API_KEY to enable';

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json(
      { success: false, error: 'Cron job failed' },
      { status: 500 }
    );
  }
}
