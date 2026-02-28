import { runScraper } from '../lib/scraper';

async function main() {
  console.log('Starting manual scrape...');
  const results = await runScraper();
  console.log('Scrape complete:', results);
  process.exit(0);
}

main().catch((error) => {
  console.error('Scrape failed:', error);
  process.exit(1);
});
