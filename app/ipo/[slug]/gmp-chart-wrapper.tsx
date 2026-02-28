'use client';

import { GmpChart } from '@/components/gmp-chart';
import type { GmpHistory } from '@/lib/queries';

interface GmpChartWrapperProps {
  history: GmpHistory[];
  priceHigh: number | null;
}

export function GmpChartWrapper({ history, priceHigh }: GmpChartWrapperProps) {
  return <GmpChart history={history} priceHigh={priceHigh} />;
}
