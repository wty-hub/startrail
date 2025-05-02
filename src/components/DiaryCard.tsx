// 日记卡片界面

import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, AppState } from "react-native";
import { DiaryEntry } from "../types/types";
import { Icon } from "@ui-kitten/components";
import { daystringToLocalString } from "../utils/date-service";
import DiaryDetail from "./DiaryDetail";
import { updateEntry } from "../db/diary-service";

const DiaryCard = ({
  entry,
  onContentPressedCallback,
  onDeletePressedCallback,
}: {
  entry: DiaryEntry;
  onContentPressedCallback: () => void;
  onDeletePressedCallback: () => void;
}) => {
  const [detailVisible, setDetailVisible] = useState(false);

  const onPress = () => {
    setDetailVisible(true);
    onContentPressedCallback();
  };

  const onDelete = () => {
    onDeletePressedCallback();
  };

  let intro = entry.content.substr(0, 40);
  if (intro.length >= 40) {
    intro += "...";
  }
  const dateString = daystringToLocalString(entry.date);

  // 自动保存实现
  /*
  在以下时机触发自动保存：
    - 文本编辑后间隔一定时间（如3秒无操作后）
    - 切换到其他应用或界面时（App 进入后台）
    - 应用被挂起、关闭前
  */
  const [modified, setModified] = useState(false);
  const [contentBuffer, setContentBuffer] = useState("");
  const [appState, setAppState] = useState(AppState.currentState);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const saveBuffer = () => {
    console.log(`保存日记：${contentBuffer}`);
    updateEntry(entry.id, contentBuffer, entry.date);
    setModified(false);
  };

  const handleContentChange = (content: string) => {
    setContentBuffer(content);
    setModified(true);

    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      saveBuffer();
    }, 3000); // 3 秒无操作后保存
    setTimer(newTimer);
  };

  const handleAppStateChange = (nextAppState: string) => {
    if (modified) {
      if (appState === "active" && nextAppState.match(/inactive|background/)) {
        saveBuffer();
      }
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [appState]);

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

      <DiaryDetail
        visible={detailVisible}
        onClose={() => {
          // console.log("close");
          setDetailVisible(false);
        }}
        dateString={dateString}
        content={entry.content}
        onContentChange={handleContentChange}
      />
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
});

export default DiaryCard;
