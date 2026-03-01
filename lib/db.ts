// Database module — currently using in-memory JSON data store (lib/data.ts).
// For production with persistent writes, swap to Turso (@libsql/client)
// or any other serverless-compatible database.

export function getDb(): never {
  throw new Error('SQLite database not available in serverless mode. Use lib/data.ts for reads.');
}

export function closeDb(): void {
  // no-op
}
