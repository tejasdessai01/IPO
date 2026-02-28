import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'ipo-dekho.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  initializeSchema(db);
  return db;
}

function initializeSchema(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS ipos (
      id TEXT PRIMARY KEY,
      company_name TEXT NOT NULL,
      logo_url TEXT,
      status TEXT NOT NULL DEFAULT 'upcoming',
      ipo_type TEXT DEFAULT 'mainboard',
      open_date TEXT,
      close_date TEXT,
      listing_date TEXT,
      price_band_low REAL,
      price_band_high REAL,
      face_value REAL,
      lot_size INTEGER,
      min_investment REAL,
      issue_size_cr REAL,
      fresh_issue_cr REAL,
      ofs_cr REAL,
      subscription_retail REAL DEFAULT 0,
      subscription_nii REAL DEFAULT 0,
      subscription_qib REAL DEFAULT 0,
      subscription_total REAL DEFAULT 0,
      gmp REAL DEFAULT 0,
      gmp_percent REAL DEFAULT 0,
      gmp_updated_at TEXT,
      listing_price REAL,
      listing_gain_percent REAL,
      current_price REAL,
      industry TEXT,
      description TEXT,
      about TEXT,
      business_model TEXT,
      strengths TEXT,
      risks TEXT,
      financials_json TEXT,
      promoters TEXT,
      lead_managers TEXT,
      registrar TEXT,
      drhp_url TEXT,
      rhp_url TEXT,
      ai_summary TEXT,
      ai_verdict TEXT,
      ai_score INTEGER,
      allotment_date TEXT,
      allotment_status_url TEXT,
      source_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gmp_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ipo_id TEXT REFERENCES ipos(id),
      gmp REAL,
      recorded_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS timeline_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ipo_id TEXT REFERENCES ipos(id),
      event_type TEXT,
      event_date TEXT,
      label TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_ipos_status ON ipos(status);
    CREATE INDEX IF NOT EXISTS idx_ipos_open_date ON ipos(open_date);
    CREATE INDEX IF NOT EXISTS idx_gmp_history_ipo ON gmp_history(ipo_id);
  `);
}

export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}
