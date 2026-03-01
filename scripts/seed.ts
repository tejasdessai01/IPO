import { ipos, gmpHistory, timelineEvents } from '../lib/data';

console.log(`Data store contains:`);
console.log(`  - ${ipos.length} IPOs`);
console.log(`  - ${gmpHistory.length} GMP history records`);
console.log(`  - ${timelineEvents.length} timeline events`);
console.log(`\nStatuses:`);

const statusCounts: Record<string, number> = {};
for (const ipo of ipos) {
  statusCounts[ipo.status] = (statusCounts[ipo.status] || 0) + 1;
}
for (const [status, count] of Object.entries(statusCounts)) {
  console.log(`  - ${status}: ${count}`);
}

console.log('\nAll data is served from lib/data.ts. No seeding needed.');
