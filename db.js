import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./links.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS links (
      id TEXT PRIMARY KEY,
      original_url TEXT NOT NULL
    )
  `);
});

export default db;
