'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IpoCard } from '@/components/ipo-card';
import { SearchBar } from '@/components/search-bar';
import type { IPO } from '@/lib/queries';

interface HomeDashboardProps {
  openIpos: IPO[];
  upcomingIpos: IPO[];
  listedIpos: IPO[];
}

export function HomeDashboard({ openIpos, upcomingIpos, listedIpos }: HomeDashboardProps) {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar />
      </div>

      <Tabs defaultValue={openIpos.length > 0 ? 'open' : 'upcoming'} className="w-full">
        <TabsList className="w-full justify-start sm:w-auto">
          <TabsTrigger value="open" className="gap-1.5">
            Open Now
            {openIpos.length > 0 && (
              <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {openIpos.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="gap-1.5">
            Upcoming
            {upcomingIpos.length > 0 && (
              <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {upcomingIpos.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="listed" className="gap-1.5">
            Recently Listed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="open">
          {openIpos.length > 0 ? (
            <IpoGrid ipos={openIpos} />
          ) : (
            <EmptyState message="No IPOs are currently open for subscription." />
          )}
        </TabsContent>

        <TabsContent value="upcoming">
          {upcomingIpos.length > 0 ? (
            <IpoGrid ipos={upcomingIpos} />
          ) : (
            <EmptyState message="No upcoming IPOs announced yet." />
          )}
        </TabsContent>

        <TabsContent value="listed">
          {listedIpos.length > 0 ? (
            <IpoGrid ipos={listedIpos} />
          ) : (
            <EmptyState message="No recently listed IPOs." />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function IpoGrid({ ipos }: { ipos: IPO[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ipos.map((ipo, i) => (
        <div key={ipo.id}>
          <IpoCard ipo={ipo} />
          {(i + 1) % 6 === 0 && (
            <div id={`ad-slot-card-${i}`} className="mt-4" />
          )}
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}
