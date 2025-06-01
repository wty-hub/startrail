import SQLite from "react-native-sqlite-storage";
import { DiaryEntry } from "../types/types";

SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase;

/**
 * 初始化数据库连接并创建表（如果尚未存在）。
 * @returns {Promise<SQLite.SQLiteDatabase>} 数据库实例
 */
export async function initDB() {
  db = await SQLite.openDatabase({ name: "diary.db", location: "default" });
  await db.executeSql(`
        CREATE TABLE IF NOT EXISTS diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            date TEXT NOT NULL);`);
  return db;
}

/**
 * 确保数据库已初始化。如果未初始化，则调用 initDB。
 */
async function ensureDBInitialized() {
  if (!db) {
    await initDB();
  }
}

/**
 * 添加一条新的日记条目。
 * @param {string} content 日记内容
 * @param {string} date 日期
 * @returns {Promise<number>} 新插入条目的 ID
 */
export async function addEntry(content: string, date: string) {
  await ensureDBInitialized();
  const result = await db.executeSql(
    "INSERT INTO diary (content, date) VALUES (?, ?)",
    [content, date]
  );
  return result[0].insertId;
}

/**
 * 插入或更新具有指定 ID 的日记条目。
 * 如果 ID 已存在，则更新条目；否则插入新条目。
 * @param {number} id 条目 ID
 * @param {string} content 日记内容
 * @param {string} date 日期
 * @returns {Promise<number>} 条目的 ID（新或旧）
 */
export async function insertOrUpdateEntryWithId(
  id: number,
  content: string,
  date: string
) {
  await ensureDBInitialized();
  const existingEntry = await db.executeSql(
    "SELECT * FROM diary WHERE ID = ?",
    [id]
  );
  if (existingEntry[0].rows.length > 0) {
    await db.executeSql("UPDATE diary SET content = ?, date = ? WHERE id = ?", [
      content,
      date,
      id,
    ]);
    return id;
  } else {
    const result = await db.executeSql(
      "INSERT INTO diary (id, content, date) VALUES (?, ?, ?)",
      [id, content, date]
    );
    return result[0].insertId;
  }
}

/**
 * 获取所有日记条目。
 * @returns {Promise<DiaryEntry[]>} 包含所有日记条目的数组
 */
export async function getAllEntries() {
  await ensureDBInitialized();
  const result = await db.executeSql("SELECT * FROM diary");
  const entries: DiaryEntry[] = [];
  result[0].rows.raw().forEach((row) => {
    entries.push(row);
  });
  return entries;
}

/**
 * 根据 ID 获取单个日记条目。
 * @param {number} id 条目 ID
 * @returns {Promise<DiaryEntry | null>} 日记条目对象或 null（如果未找到）
 */
export async function getEntryById(id: number): Promise<DiaryEntry | null> {
  await ensureDBInitialized();
  const results = await db.executeSql("SELECT * FROM diary WHERE id = ?", [id]);
  if (results[0].rows.length === 0) {
    return null;
  }
  return results[0].rows.item(0);
}

/**
 * 更新指定 ID 的日记条目。
 * @param {number} id 条目 ID
 * @param {string} content 日记内容
 * @param {string} date 日期
 */
export async function updateEntry(id: number, content: string, date: string) {
  await ensureDBInitialized();
  await db.executeSql("UPDATE diary SET content = ?, date = ? WHERE id = ?", [
    content,
    date,
    id,
  ]);
}

/**
 * 删除指定 ID 的日记条目。
 * @param {number} id 条目 ID
 */
export async function deleteEntry(id: number) {
  await ensureDBInitialized();
  await db.executeSql("DELETE FROM diary WHERE id = ?", [id]);
}

/**
 * 清空所有日记条目。
 */
export async function clearAllEntries() {
  await ensureDBInitialized();
  await db.executeSql("DELETE FROM diary");
}

/**
 * 根据日期字符串查询日记条目。
 * @param {string} daystring 日期字符串 YYYY-MM-DD
 * @returns {Promise<DiaryEntry | null>} 日记条目对象或 null（如果未找到）
 */
export async function queryEntryByDaystring(daystring: string) {
  await ensureDBInitialized();
  const result = await db.executeSql("SELECT * FROM diary WHERE date = ?", [
    daystring,
  ]);
  if (result[0].rows.length === 0) {
    return null;
  }
  return result[0].rows.item(0);
}