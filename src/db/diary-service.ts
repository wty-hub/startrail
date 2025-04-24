import SQLite from "react-native-sqlite-storage";
import { DiaryEntry } from "../types/types";

SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase;

export async function initDB() {
  db = await SQLite.openDatabase({ name: "diary.db", location: "default" });
  await db.executeSql(`
        CREATE TABLE IF NOT EXISTS diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            date TEXT NOT NULL);`);
  return db;
}

async function ensureDBInitialized() {
  if (!db) {
    await initDB();
  }
}

export async function addEntry(content: string, date: string) {
  await ensureDBInitialized();
  const result = await db.executeSql(
    "INSERT INTO diary (content, date) VALUES (?, ?)",
    [content, date]
  );
  return result[0].insertId;
}

export async function getAllEntries() {
  await ensureDBInitialized();
  const result = await db.executeSql("SELECT * FROM diary");
  const entries: DiaryEntry[] = [];
  result[0].rows.raw().forEach((row) => {
    entries.push(row);
  });
  return entries;
}

export async function getEntryById(id: number) {
  await ensureDBInitialized();
  const results = await db.executeSql("SELECT * FROM diary WHERE id = ?", [id]);
  return results[0].rows.item(0);
}

export async function updateEntry(id: number, content: string, date: string) {
  await ensureDBInitialized();
  await db.executeSql("UPDATE diary SET content = ?, date = ? WHERE id = ?", [
    content,
    date,
    id,
  ]);
}

export async function deleteEntry(id: number) {
  await ensureDBInitialized();
  await db.executeSql("DELETE FROM diary WHERE id = ?", [id]);
}

export async function clearAllEntries() {
  await ensureDBInitialized();
  await db.executeSql("DELETE FROM diary");
}
