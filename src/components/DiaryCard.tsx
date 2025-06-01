// 日记卡片界面

import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, AppState } from "react-native";
import { DiaryEntry } from "../types/types";
import { Icon } from "@ui-kitten/components";
import { daystringToLocalString } from "../utils/date-service";
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
  const onPress = () => {
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
