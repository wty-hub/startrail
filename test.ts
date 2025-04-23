import { addEntry, clearAllEntries, getAllEntries } from "./src/db/diary-db";
import { daystringToDate, getTodayString } from "./src/utils/date-service";

export const test = () => {
  // 清空数据库
  clearAllEntries();

  // 插入测试数据
  const today = getTodayString();
  const testEntries = [
    { content: "测试日记1", date: today },
    { content: "测试日记2", date: "2025-04-23" },
    { content: "测试日记3", date: "2025-04-22" },
  ];

  for (const entry of testEntries) {
    addEntry(entry.content, entry.date);
  }

  // 获取并打印所有数据
  getAllEntries().then((entries) => {
    console.log("所有日记条目：" + JSON.stringify(entries, null, 2));
  });
};
