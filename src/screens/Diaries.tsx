import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import Search from "../components/SearchButton";
import { List } from "@ui-kitten/components";
import { DiaryEntry } from "../types/types";

const Diaries = ({ navigation, route }: BottomTabScreenProps<any, any>) => {
  // 导航栏右侧搜索按钮处理
  const [searchQuery, setSearchQuery] = useState("");
  const onSearchToggle = (status: boolean) => {
    if (!status) {
      setSearchQuery("");
    }
  };
  const handleSearchInput = (query: string) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Search onToggle={onSearchToggle} onChangeText={handleSearchInput} />
      ),
    });
  }, [navigation]);

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [refreshingDiaries, setRefreshingDiaries] = useState(false);
  const refreshDiaries = () => {
    setRefreshingDiaries(true);

    setRefreshingDiaries(false);
  };
  const filteredData = diaries.filter((item) =>
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenLayout>
      {/* <List
        style={styles.list}
        contentContainerStyle={styles.contentContainerStyle}
        data={filteredData}
        extraData={diaries}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={refreshData}
        ListEmptyComponent={
          <NoData title="Add a new entry by pressing + button" />
        }
      /> */}
    </ScreenLayout>
  );
};

export default Diaries;

const styles = StyleSheet.create({
  dateWrp: {
    paddingHorizontal: 16,
  },
  list: {
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#E9ECF2",
  },
  contentContainerStyle: {
    paddingBottom: 100,
    flexGrow: 1,
  },
  btnWrpAbsolute: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  btnAdd: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
});
