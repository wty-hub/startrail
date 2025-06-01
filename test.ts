import { addEntry, clearAllEntries, getAllEntries } from "./src/db/diary-service";
import { DiaryEntry } from "./src/types/types";
import { daystringToDate, getTodayString } from "./src/utils/date-service";

export const test = async () => {
  const entry1: DiaryEntry = {
    id: 10086,
    date: getTodayString(),
    content: "今天天气很好，心情也不错。",
  };

  const entry2: DiaryEntry = {
    id: 10087,
    date: "2025-05-04",
    content: "学习了新的编程知识，感觉很有收获。",
  };

  const entry3: DiaryEntry = {
    id: 10088,
    date: "2025-05-03",
    content: "和朋友一起出去玩，很开心。",
  };

  await addEntry(entry1.content, entry1.date);
  await addEntry(entry2.content, entry2.date);
  await addEntry(entry3.content, entry3.date);

  // console.log("示例日记已添加。");

  const allEntries = await getAllEntries();
  // console.log("所有日记:", allEntries);
};
