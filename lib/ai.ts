interface IpoData {
  company_name: string;
  industry: string | null;
  issue_size_cr: number | null;
  price_band_low: number | null;
  price_band_high: number | null;
  financials_json: string | null;
  description: string | null;
}

interface AiAnalysis {
  about: string;
  business_model: string;
  strengths: string[];
  risks: string[];
  ai_summary: string;
  ai_verdict: 'subscribe' | 'avoid' | 'neutral' | 'risky';
  ai_score: number;
}

export async function generateIpoAnalysis(ipo: IpoData): Promise<AiAnalysis | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.log('[AI] No ANTHROPIC_API_KEY found, skipping AI enrichment');
    return null;
  }

  const prompt = `You are an expert Indian equity research analyst. Analyze this IPO:
Company: ${ipo.company_name}, Industry: ${ipo.industry || 'Unknown'}
Issue Size: ₹${ipo.issue_size_cr || 'Unknown'} Cr, Price Band: ₹${ipo.price_band_low || '?'}-₹${ipo.price_band_high || '?'}
Financials: ${ipo.financials_json || 'Not available'}
Description: ${ipo.description || 'Not available'}

Provide:
1. about: 2-paragraph company description
2. business_model: How they make money (1 paragraph)
3. strengths: Array of 3-5 key strengths
4. risks: Array of 3-5 key risks
5. ai_summary: 200-word analysis for retail investors
6. ai_verdict: "subscribe" | "avoid" | "neutral" | "risky"
7. ai_score: 1-10 investability score

Respond in JSON only. No markdown formatting.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('[AI] API error:', response.status);
      return null;
    }

    const data = await response.json();
    const text = data.content?.[0]?.text;
    if (!text) return null;

    const analysis = JSON.parse(text) as AiAnalysis;
    return analysis;
  } catch (error) {
    console.error('[AI] Error generating analysis:', error);
    return null;
  }
}

export async function enrichIpoWithAi(ipoId: string) {
  const { ipos } = await import('./data');

  const ipo = ipos.find((i) => i.id === ipoId);
  if (!ipo) {
    console.error(`[AI] IPO not found: ${ipoId}`);
    return null;
  }

  const analysis = await generateIpoAnalysis(ipo);
  if (!analysis) return null;

  // Note: In serverless mode, persist this to an external database.
  console.log(`[AI] Generated analysis for: ${ipo.company_name}`);
  return analysis;
}
