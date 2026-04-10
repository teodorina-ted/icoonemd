-- ─────────────────────────────────────────────────────────────────────────────
-- EFFLEURE · D1 Schema
-- Run once with:  wrangler d1 execute effleure_db --file=schema.sql
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  email       TEXT,
  phone       TEXT    NOT NULL,
  message     TEXT,
  service     TEXT    NOT NULL DEFAULT 'General',
  gclid       TEXT,                          -- Google Click ID for ads attribution
  ip          TEXT,                          -- CF-Connecting-IP (for dedup)
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Index for fast lookup by date (admin queries)
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);

-- Index for gclid attribution reports
CREATE INDEX IF NOT EXISTS idx_leads_gclid ON leads(gclid) WHERE gclid IS NOT NULL;
