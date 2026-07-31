import Database from "better-sqlite3";

export const db = new Database("zsk.db");

db.exec(`
CREATE TABLE IF NOT EXISTS chats(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT,
  prompt TEXT,
  response TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);
