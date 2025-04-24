import { addEntry, clearAllEntries, getAllEntries } from "./src/db/diary-service";
import { DiaryEntry } from "./src/types/types";
import { daystringToDate, getTodayString } from "./src/utils/date-service";

export const test = () => {
  const testEntries: DiaryEntry[] = [
    {
      id: 1,
      content: "欢迎来到星轨日记！",
      date: "2025-04-25",
    },
  ]
  for (let e of testEntries) {
    addEntry(e.content, e.date)
      .then((id) => {
        console.log(`Entry added with ID: ${id}`);
      })
      .catch((error) => {
        console.error("Error adding entry:", error);
      });
  }
};
