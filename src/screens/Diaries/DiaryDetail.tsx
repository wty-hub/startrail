import React, { useEffect, useState } from "react";
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
import {
  insertOrUpdateEntryWithId,
  getEntryById,
} from "../../db/diary-service";
import {
  daystringToLocalString,
  getTodayString,
} from "../../utils/date-service";
import { DiaryEntry } from "../../types/types";
import { useDiaryRefresh } from "../../context/DiaryRefreshContext";

const DiaryDetail: React.FC = ({ route, navigation }: any) => {
  const { id }: { id: number } = route.params;

  // console.log(`DiaryDetail id: ${id}`);

  const { refresh } = useDiaryRefresh();

  const [editingContent, setEditingContent] = useState("");
  const [modified, setModified] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [dayString, setDayString] = useState(getTodayString());

  const opacityValue = new Animated.Value(1);

  const loadDiaryContent = async () => {
    const entry: DiaryEntry | null = await getEntryById(id);
    if (entry !== null) {
      setEditingContent(entry.content);
      setDayString(entry.date);
    } else {
      setEditingContent("");
      setDayString(getTodayString());
    }
  };
  useEffect(() => {
    loadDiaryContent();
  }, []);

  const saveBuffer = async () => {
    if (modified) {
      // console.log(`保存日记：${editingContent}`);
      setModified(false);
      await insertOrUpdateEntryWithId(id, editingContent, dayString);
    }
  };

  const handleContentChange = (content: string) => {
    setModified(true);
    setEditingContent(content);
    console.log(`修改日记：${content}`);
    if (!timer) {
      const newTimer = setTimeout(async () => {
        await saveBuffer();
        setTimer(null);
      }, 3000);
      setTimer(newTimer);
    }
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

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGoBack = async () => {
    if (modified) {
      await saveBuffer();
      refresh(); // 调用全局刷新
    }
    navigation.goBack();
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
            onChangeText={handleContentChange}
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
