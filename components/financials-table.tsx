import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { parseJsonSafe } from '@/lib/utils';

interface Financial {
  year: string;
  revenue: number;
  pat: number;
  networth: number;
}

interface FinancialsTableProps {
  financialsJson: string | null;
}

export function FinancialsTable({ financialsJson }: FinancialsTableProps) {
  const financials = parseJsonSafe<Financial[]>(financialsJson, []);

  if (financials.length === 0) return null;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead className="text-right">Revenue (Cr)</TableHead>
            <TableHead className="text-right">PAT (Cr)</TableHead>
            <TableHead className="text-right">Net Worth (Cr)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {financials.map((f, i) => {
            const prevRevenue = i > 0 ? financials[i - 1].revenue : null;
            const revenueGrowth = prevRevenue ? ((f.revenue - prevRevenue) / prevRevenue) * 100 : null;

            return (
              <TableRow key={f.year}>
                <TableCell className="font-medium">{f.year}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(f.revenue)}
                  {revenueGrowth !== null && (
                    <span className={`ml-1 text-xs ${revenueGrowth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      ({revenueGrowth > 0 ? '+' : ''}{revenueGrowth.toFixed(0)}%)
                    </span>
                  )}
                </TableCell>
                <TableCell className={`text-right tabular-nums ${f.pat < 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
                  {formatCurrency(f.pat)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(f.networth)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
