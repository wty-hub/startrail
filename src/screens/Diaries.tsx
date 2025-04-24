import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import Search from "../components/SearchButton";
import { DiaryEntry } from "../types/types";
import { getAllEntries } from "../db/diary-service";
import DiaryCard from "../components/DiaryCard";
import { useFocusEffect } from "@react-navigation/native";
import { daystringToLocalString } from "../utils/date-service";

const Diaries = ({ navigation }: BottomTabScreenProps<any, any>) => {
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

  // 从数据库加载日记
  const refreshDiaries = async () => {
    setRefreshingDiaries(true);
    try {
      const data = await getAllEntries(); // 从数据库获取日记
      setDiaries(data);
    } catch (error) {
      console.error("Error fetching diaries:", error);
    } finally {
      setRefreshingDiaries(false);
    }
  };

  // 初始化
  useEffect(() => {
    refreshDiaries();
  }, []);

  // 页面聚焦时刷新数据
  useFocusEffect(
    React.useCallback(() => {
      refreshDiaries();
    }, [])
  );

  // 设置导航栏右侧的搜索按钮
  useEffect(() => {
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
        daystringToLocalString(item.date).includes(searchQuery.toLowerCase())
    );

  // 渲染单个日记项
  const renderItem = ({ item }: { item: DiaryEntry }) => (
    <DiaryCard
      entry={item}
      onPress={() => {
        navigation.navigate("DiaryDetail", { diaryId: item.id });
      }}
      onDelete={() => {
        // 删除日记的逻辑
        console.log(`Delete diary with id: ${item.id}`);
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
            onRefresh={refreshDiaries}
          />
        }
        contentContainerStyle={[styles.list, { paddingBottom: 80 }]} // 为底部留出空间
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>还没有日记……按 ‘➕’ 创建一个吧</Text>
          </View>
        }
        keyboardShouldPersistTaps="handled"
      />
    </ScreenLayout>
  );
};

export default Diaries;

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
});
