// 日记卡片界面

import { Pressable, Text, View, StyleSheet } from "react-native";
import { DiaryEntry } from "../types/types";
import dayjs from "dayjs";

const DiaryCard = ({ entry, onPress, onDelete }: { entry: DiaryEntry; onPress: () => void; onDelete: () => void }) => {
  const dateString = dayjs(entry.date).format("YYYY年M月D日 dddd");

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.content}>{entry.content}</Text>
      <Text style={styles.date}>{dateString}</Text>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>删除</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  deleteButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#FF4D4F",
    borderRadius: 4,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default DiaryCard;