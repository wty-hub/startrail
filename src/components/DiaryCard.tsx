// 日记卡片界面

import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { DiaryEntry } from "../types/types";

import { Icon } from "@ui-kitten/components";
import { daystringToLocalString } from "../utils/date-service";
import React, { useState } from "react";

const DiaryCard = ({
  entry,
  onContentPressedCallback, // 上面传下来的
  onDeletePressedCallback, // 同上
}: {
  entry: DiaryEntry;
  onContentPressedCallback: () => void;
  onDeletePressedCallback: () => void;
}) => {
  // 内容处理
  let intro = entry.content.substr(0, 40);
  if (intro.length >= 40) {
    intro += "...";
  }
  const dateString = daystringToLocalString(entry.date);

  // 内容点击时处理
  const [detailVisible, setDetailVisible] = useState(false);
  const onPress = () => {
    setDetailVisible(true);
    onContentPressedCallback();
  };
  const onDelete = () => {
    onDeletePressedCallback();
  }

  return (
    <>
      <Pressable onPress={onPress} style={styles.card}>
        <Text style={styles.content}>{intro}</Text>
        <View style={styles.row}>
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Icon name="trash" color="#FF4D4F" />
          </Pressable>
          <Text style={styles.date}>{dateString}</Text>
        </View>
      </Pressable>

      {/* 日记详情 */}
      <Modal
        visible={detailVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDetailVisible(false)}
      >
        <View style={styles.detailContainer}>
          <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>日记详情</Text>
            <Text style={styles.detailDate}>{dateString}</Text>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.detailText}>{entry.content}</Text>
            </ScrollView>
            <Pressable
              style={styles.closeButton}
              onPress={() => setDetailVisible(false)}
            >
              <Text style={styles.closeButtonText}>关闭</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    height: 30,
    maxHeight: 30,
  },
  detailContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  detailContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  detailDate: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 32,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  scrollView: {
    marginBottom: 32,
  },
});

export default DiaryCard;
