// 日记卡片界面

import { Pressable, Text, View, StyleSheet } from "react-native";
import { DiaryEntry } from "../types/types";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import zhLocale from "dayjs/locale/zh-cn";
import { Icon } from "@ui-kitten/components";

const DiaryCard = ({
  entry,
  onPress,
  onDelete,
}: {
  entry: DiaryEntry;
  onPress: () => void;
  onDelete: () => void;
}) => {
  dayjs.extend(localeData);
  dayjs.locale(zhLocale);
  const dateString = dayjs(entry.date).format("YYYY年M月D日 dddd");
  let intro = entry.content.substr(0, 40);
  if (intro.length >= 40) {
    intro += "...";
  }

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.content}>{intro}</Text>
      <View style={styles.row}>
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          {/* <Text style={styles.deleteButtonText}>删除</Text> */}
          <Icon name="trash" color="#FF4D4F"/>
        </Pressable>
        <Text style={styles.date}>{dateString}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    padding: 8,
    // backgroundColor: "#FF4D4F",
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    // width: 30,
    height: 30,
    maxHeight: 30,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default DiaryCard;
