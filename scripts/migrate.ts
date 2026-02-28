import { getDb, closeDb } from '../lib/db';

function main() {
  console.log('Running database migration...');
  const db = getDb();
  console.log('Database schema initialized successfully.');

  const count = (db.prepare('SELECT COUNT(*) as count FROM ipos').get() as { count: number }).count;
  console.log(`Current IPO count: ${count}`);

  closeDb();
  console.log('Migration complete.');
}

main();
