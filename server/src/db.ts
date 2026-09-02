import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dataDir = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

export const db: Database.Database = new Database(path.join(dataDir, 'denizen.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  )
`);

const existingUser = db.prepare('SELECT * FROM users LIMIT 1').get();
if (!existingUser) {
  db.prepare('INSERT INTO users (id, name) VALUES (?, ?)').run('local-user', 'KJohnson');
}
