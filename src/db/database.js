import sqlite3 from "sqlite3";

export const db=new sqlite3.Database("zsk.db");

db.serialize(()=>{
db.run(`
CREATE TABLE IF NOT EXISTS chats(
id INTEGER PRIMARY KEY AUTOINCREMENT,
provider TEXT,
prompt TEXT,
response TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);
});
