import { Brain, CheckCircle, XCircle, AlertTriangle, MinusCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { VERDICT_COLORS } from '@/lib/constants';
import { parseJsonSafe } from '@/lib/utils';

interface AiAnalysisCardProps {
  verdict: string | null;
  score: number | null;
  summary: string | null;
  strengths: string | null;
  risks: string | null;
}

const verdictIcons: Record<string, React.ReactNode> = {
  subscribe: <CheckCircle className="h-5 w-5" />,
  avoid: <XCircle className="h-5 w-5" />,
  risky: <AlertTriangle className="h-5 w-5" />,
  neutral: <MinusCircle className="h-5 w-5" />,
};

export function AiAnalysisCard({ verdict, score, summary, strengths, risks }: AiAnalysisCardProps) {
  if (!verdict && !score && !summary) return null;

  const verdictConfig = verdict ? VERDICT_COLORS[verdict] : null;
  const strengthsList = parseJsonSafe<string[]>(strengths, []);
  const risksList = parseJsonSafe<string[]>(risks, []);

  return (
    <Card className="overflow-hidden border-2 border-indigo-200 dark:border-indigo-800">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-4 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Analysis</h2>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap items-center gap-4">
          {verdictConfig && verdict && (
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${verdictConfig.bg}`}>
              <span className={verdictConfig.text}>{verdictIcons[verdict]}</span>
              <span className={`text-sm font-semibold ${verdictConfig.text}`}>
                {verdict.charAt(0).toUpperCase() + verdict.slice(1)}
              </span>
            </div>
          )}

          {score != null && (
            <div className="flex items-center gap-2">
              <div className="relative h-14 w-14">
                <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-200 dark:text-gray-700" />
                  <circle
                    cx="28" cy="28" r="24" fill="none" strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${(score / 10) * 150.8} 150.8`}
                    className={score >= 7 ? 'text-emerald-500' : score >= 5 ? 'text-amber-500' : 'text-red-500'}
                    stroke="currentColor"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white">
                  {score}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">out of 10</span>
            </div>
          )}
        </div>

        {summary && (
          <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {summary}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {strengthsList.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">Strengths</h4>
              <ul className="space-y-1.5">
                {strengthsList.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-1 text-emerald-500">+</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {risksList.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-red-700 dark:text-red-400">Risks</h4>
              <ul className="space-y-1.5">
                {risksList.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-1 text-red-500">-</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-4 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/10">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            AI-generated analysis. Not investment advice. Always do your own research before investing.
          </p>
        </div>
      </div>
    </Card>
  );
}
