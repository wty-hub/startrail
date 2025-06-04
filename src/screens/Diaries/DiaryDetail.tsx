import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  AppState,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  getEntryById,
  saveOrUpdateDiary,
} from "../../db/diary-service";
import {
  daystringToLocalString,
  getTodayDaystring,
} from "../../utils/date-utils";
import { DiaryEntry } from "../../types/types";
import { constant, debounce } from 'lodash';

const DiaryDetail: React.FC = ({ route, navigation }: any) => {
  let { id: diaryId, daystring: daystring }: { id: number, daystring: string } = route.params;

  const [editingContent, setEditingContent] = useState("");
  // const [modified, setModified] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  // 这里重复设计了
  const [dayString, setDayString] = useState(daystring);

  const opacityValue = new Animated.Value(1);

  const loadDiaryContent = async () => {
    const entry: DiaryEntry | null = await getEntryById(diaryId);
    if (entry !== null) {
      setEditingContent(entry.content);
      setDayString(entry.daystring);
    } else {
      setEditingContent("");
      setDayString(getTodayDaystring());
    }
  };

  // 读取日记内容（如果是已有的日记）
  useEffect(() => {
    loadDiaryContent();
  }, []);

  const saveBuffer = useCallback(
    debounce((text, daystring) => {
      console.log(`保存内容中，日期：${dayString}，内容：${text}`);
      saveOrUpdateDiary(text, daystring);
    }, 1000), []
  );
  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      appStateListener.remove();
    };
  }, []);

  // 使用 useFocusEffect 在页面失去焦点时保存数据
  useFocusEffect(
    useCallback(() => {
      return () => {
        // 页面失去焦点时（即用户离开页面时）保存数据
        console.log("DiaryDetail losing focus, saving data...");
        if (editingContent.trim()) {
          saveOrUpdateDiary(editingContent, dayString);
        }
      };
    }, [editingContent, dayString])
  );
  const handleAppStateChange = (nextAppState: any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // 当应用从后台恢复到前台时不做操作
    } else if (nextAppState === 'background') {
      // 应用进入后台时保存笔记
      saveBuffer(editingContent, dayString); // 这里使用当前的 state 值是正确的
    }
    setAppState(nextAppState);
  };
  const handleTextChange = (text: string) => {
    setEditingContent(text);
    saveBuffer(text, dayString); // 使用参数 text，而不是 state editingContent
  };

  return (
    <Animated.View style={[styles.detailContainer, { opacity: opacityValue }]}>
      {/* <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"< 返回"}</Text>
      </TouchableOpacity> */}
      <View style={styles.detailContent}>
        <Text style={styles.detailDate}>
          {daystringToLocalString(dayString)}
        </Text>
        <ScrollView style={styles.scrollView}>
          <TextInput
            style={styles.textInput}
            value={editingContent}
            onChangeText={handleTextChange}
            multiline={true}
            textAlignVertical="top"
          />
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
  },
  detailDate: {
    fontSize: 18,
    color: "#777777",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  detailContent: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,
    marginTop: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "flex-start",
  },
  textInput: {
    flex: 1,
    width: "100%",
    fontSize: 18,
    lineHeight: 28,
    color: "#333333",
    padding: 12,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    left: 15,
    width: 40,
    height: 30,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#333333",
    fontSize: 28,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    padding: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default DiaryDetail;
