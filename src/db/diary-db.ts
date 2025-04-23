import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase;

export async function initDB() {
  db = await SQLite.openDatabase({ name: "diary.db", location: "default" });
  await db.executeSql(`
        CREATE TABLE IF NOT EXISTS diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            date TEXT NOT NULL);`);
  return db;
}

export async function addEntry(title: string, content: string, date: string) {
  const result = await db.executeSql(
    "INSERT INTO diary (title, content, date) VALUES (?, ?, ?)",
    [title, content, date]
  );
  return result[0].insertId;
}

export async function getAllEntries() {
  const result = await db.executeSql("SELECT * FROM diary ORDER BY date DESC");
  const entries: { id: number; title: string; content: string; date: string }[] = [];
  result[0].rows.raw().forEach((row) => {
    entries.push(row);
  });
  return entries;
}

export async function getEntryById(id: number) {
  const results = await db.executeSql('SELECT * FROM diary WHERE id = ?', [id]);
  return results[0].rows.item(0);
}


export async function updateEntry(id: number, title: string, content: string, date: string) {
  await db.executeSql(
    "UPDATE diary SET title = ?, content = ?, date = ? WHERE id = ?",
    [title, content, date, id]
  );
}

export async function deleteEntry(id: number) {
  await db.executeSql("DELETE FROM diary WHERE id = ?", [id]);
}
