import DiaryCard from "@/src/components/DiaryCard";
import { ScreenLayout } from "@/src/components/ScreenLayout";
import Search from "@/src/components/Search";
import {
  deleteEntry,
  getAllEntries,
  queryEntryByDaystring,
} from "@/src/db/diary-service";
import { DiaryEntry } from "@/src/types/types";
import {
  daystringToLocalString,
  getTodayDaystring,
} from "@/src/utils/date-utils";
import React, { useState, useCallback, useEffect } from "react";
import { useDiaryRefresh } from "@/src/context/DiaryRefreshContext";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  RefreshControl,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
} from "react-native";

const DiaryList: React.FC = ({ route, navigation }: any) => {
  // 搜索相关状态
  const [searchQuery, setSearchQuery] = useState("");
  const onSearchToggle = (status: boolean) => {
    if (!status) {
      setSearchQuery("");
    }
  };
  const handleSearchInput = (query: string) => {
    setSearchQuery(query);
  };

  // 日记数据相关状态
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [refreshingDiaries, setRefreshingDiaries] = useState(false);

  // 删除确认模态框相关状态
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [diaryToDelete, setDiaryToDelete] = useState<DiaryEntry | null>(null);

  // 从数据库加载日记
  const refreshDiaries = useCallback(async () => {
    setRefreshingDiaries(true);
    try {
      const data = await getAllEntries(); // 从数据库获取日记
      const sortedData = data.sort((a, b) => {
        // date 为 YYYY-MM-DD 格式
        if (a.daystring < b.daystring) return 1;
        if (a.daystring > b.daystring) return -1;
        return 0;
      });
      setDiaries(sortedData);
    } catch (error) {
      console.error("Error fetching diaries:", error);
    } finally {
      setRefreshingDiaries(false);
    }
  }, []);
  const { setRefresh } = useDiaryRefresh();
  useEffect(() => {
    setRefresh(refreshDiaries);
  }, [refreshDiaries, setRefresh]);

  // 使用 useFocusEffect 在屏幕聚焦时刷新数据
  useFocusEffect(
    useCallback(() => {
      console.log("屏幕聚焦，刷新数据");
      refreshDiaries();
    }, [refreshDiaries])
  );

  // 设置导航栏右侧的按钮
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Search onToggle={onSearchToggle} onChangeText={handleSearchInput} />
      ),
    });
  }, [navigation]);

  // 过滤日记数据
  const getFilteredData = () =>
    diaries.filter(
      (item) =>
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        daystringToLocalString(item.daystring).includes(searchQuery.toLowerCase())
    );

  // 新增日记的逻辑
  const handleAddDiary = async () => {
    const todayEntry = await queryEntryByDaystring(getTodayDaystring());
    if (todayEntry === null) {
      const newDiary: DiaryEntry = {
        id: Date.now(), // 使用时间戳作为唯一 ID
        daystring: getTodayDaystring(), // 当前日期
        content: "", // 新增日记时内容为空
      };
      // navigation.navigate("DiaryDetail", { id: newDiary.id, refreshHandle: refreshDiaries });
      navigateToDetail(newDiary.id, newDiary.daystring);
    } else {
      // navigation.navigate("DiaryDetail", { id: todayEntry.id, refreshHandle: refreshDiaries });
      navigateToDetail(todayEntry.id, getTodayDaystring());
    }
  };

  // 显示确认删除模态框
  const showDeleteConfirm = (item: DiaryEntry) => {
    setDiaryToDelete(item);
    setIsConfirmModalVisible(true);
  };

  // 处理确认删除
  const handleDeleteConfirm = async () => {
    if (diaryToDelete) {
      console.log(`Delete diary with id: ${diaryToDelete.id}`);
      await deleteEntry(diaryToDelete.id);
      refreshDiaries();
      setDiaryToDelete(null); // 清空
    }
    setIsConfirmModalVisible(false); // 关闭模态框
  };

  // 处理取消删除
  const handleDeleteCancel = () => {
    setDiaryToDelete(null); // 清空
    setIsConfirmModalVisible(false); // 关闭模态框
  };

  const navigateToDetail = (id: number, daystring: string) => {
    navigation.navigate("DiaryDetail", {
      id: id,
      daystring: daystring
      // refreshHandle: refreshDiaries,
    });
  };

  // 渲染单个日记项
  const renderItem = ({ item }: { item: DiaryEntry }) => (
    <DiaryCard
      entry={item}
      onContentPressedCallback={() => {
        // navigation.navigate("DiaryDetail", { id: item.id, refreshHandle: refreshDiaries });
        navigateToDetail(item.id, item.daystring);
      }}
      onDeletePressedCallback={() => {
        showDeleteConfirm(item); // 调用显示自定义模态框的函数
      }}
    />
  );

  return (
    <ScreenLayout>
      <FlatList
        data={getFilteredData()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshingDiaries}
            onRefresh={refreshDiaries} // 保留手动刷新功能
          />
        }
        contentContainerStyle={[styles.list, { paddingBottom: 120 }]} // 为底部留出空间
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>还没有日记……按 ‘今日’ 创建一个吧</Text>
          </View>
        }
        keyboardShouldPersistTaps="handled"
      />

      <View style={styles.floatingButtonContainer}>
        {/* 选择日期按钮 */}
        <TouchableOpacity
          style={[styles.floatingButton, styles.dateButton]}
          onPress={() => {
            console.log("选择日期");
          }}
        >
          <Text style={styles.floatingButtonText}>选择日期</Text>
        </TouchableOpacity>

        {/* 新增日记按钮 */}
        <TouchableOpacity
          style={[styles.floatingButton, styles.addButton]}
          onPress={handleAddDiary} // 调用新增日记逻辑
        >
          <Text style={styles.floatingButtonText}>今日</Text>
        </TouchableOpacity>
      </View>

      {/* 自定义确认模态框 */}
      <Modal
        visible={isConfirmModalVisible}
        transparent={true} // 设置为透明背景
        animationType="fade" // 可以选择动画效果
        onRequestClose={handleDeleteCancel} // Android 返回按钮处理
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>
              确定要删除这篇日记吗？此操作无法撤销。
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleDeleteCancel}
              >
                <Text style={styles.modalButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDeleteConfirm}
              >
                <Text style={styles.modalButtonText}>确认</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
};

export default DiaryList;

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 60,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between", // 平均分布
    alignItems: "center",
  },
  floatingButton: {
    flex: 1, // 占据相等空间
    height: 48, // 按钮高度
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4, // 按钮之间的间距
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 20,
  },
  dateButton: {
    backgroundColor: "#6C63FF", // 柔和紫蓝色
    flex: 1,
  },
  addButton: {
    backgroundColor: "#00BFA6", // 清新的绿蓝色
    flex: 1,
  },
  floatingButtonText: {
    color: "white", // 保证在深色背景上清晰可见
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 半透明黑色背景
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%", // 模态框宽度
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1, // 让按钮平分空间
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5, // 按钮间距
  },
  cancelButton: {
    backgroundColor: "#ccc", // 灰色背景
  },
  confirmButton: {
    backgroundColor: "#FF6347", // 红色背景 (Tomato)
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
