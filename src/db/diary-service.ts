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
 * @param {string} daystring 日期
 * @returns {Promise<number>} 新插入条目的 ID
 */
export async function addEntry(content: string, daystring: string): Promise<number> {
  await ensureDBInitialized();
  
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO diary (content, date) VALUES (?, ?)",
          [content, daystring],
          (_, result) => {
            console.log(`日期 ${daystring} 的内容 ${content} 已经成功保存`);
            resolve(result.insertId);
          },
          (_, error) => {
            console.error(`添加日记条目失败: ${error.message}`);
            reject(error);
            return false;
          }
        );
      },
      (error) => {
        console.error(`事务失败: ${error.message}`);
        reject(error);
      },
      () => {
        // 事务成功完成不需要额外处理
      }
    );
  });
}

/**
 * 根据日期保存或更新日记条目。
 * 如果指定日期已存在日记条目，则更新内容；否则创建新条目。
 * 整个操作在单个事务中完成，确保数据一致性。
 * @param {string} content 日记内容
 * @param {string} daystring 日期字符串 YYYY-MM-DD
 * @returns {Promise<number>} 条目的 ID（新或现有）
 */
export function saveOrUpdateDiary(content: string, daystring: string): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      await ensureDBInitialized();
      
      db.transaction(
        (tx) => {
          // 首先查询是否已存在该日期的条目
          tx.executeSql(
            "SELECT * FROM diary WHERE date = ?",
            [daystring],
            (_, result) => {
              if (result.rows.length > 0) {
                // 已存在条目，执行更新操作
                const existingEntry = result.rows.item(0);
                tx.executeSql(
                  "UPDATE diary SET content = ? WHERE id = ?",
                  [content, existingEntry.id],
                  (_, updateResult) => {
                    console.log(`日期 ${daystring} 的日记已更新`);
                    resolve(existingEntry.id);
                  },
                  (_, error) => {
                    console.error(`更新日记失败: ${error.message}`);
                    reject(error);
                    return false;
                  }
                );
              } else {
                // 不存在条目，执行插入操作
                tx.executeSql(
                  "INSERT INTO diary (content, date) VALUES (?, ?)",
                  [content, daystring],
                  (_, insertResult) => {
                    console.log(`日期 ${daystring} 的新日记已创建`);
                    resolve(insertResult.insertId);
                  },
                  (_, error) => {
                    console.error(`创建日记失败: ${error.message}`);
                    reject(error);
                    return false;
                  }
                );
              }
            },
            (_, error) => {
              console.error(`查询日记失败: ${error.message}`);
              reject(error);
              return false;
            }
          );
        },
        (transactionError) => {
          console.error(`事务执行失败: ${transactionError.message}`);
          reject(transactionError);
        },
        () => {
          // 事务成功完成不需要额外处理，因为在各个executeSql的成功回调中已经处理了resolve
        }
      );
    } catch (error: any) {
      console.error(`saveOrUpdateDiary 执行出错: ${error.message}`);
      reject(error);
    }
  });
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