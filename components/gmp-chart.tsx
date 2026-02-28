'use client';

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { GmpHistory } from '@/lib/queries';

interface GmpChartProps {
  history: GmpHistory[];
  priceHigh: number | null;
}

export function GmpChart({ history, priceHigh }: GmpChartProps) {
  const data = useMemo(() => {
    return history.map((h) => ({
      date: new Date(h.recorded_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      gmp: h.gmp,
      expected: priceHigh ? priceHigh + h.gmp : h.gmp,
    }));
  }, [history, priceHigh]);

  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-gray-400">
        No GMP history available
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `₹${v}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value: number | undefined, name: string | undefined) => [
              `₹${value ?? 0}`,
              name === 'gmp' ? 'GMP' : 'Expected Listing',
            ]}
          />
          <Line
            type="monotone"
            dataKey="gmp"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3, fill: '#6366f1' }}
            activeDot={{ r: 5, fill: '#6366f1' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
