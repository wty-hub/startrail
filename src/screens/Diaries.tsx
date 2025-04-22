import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";

const Diaries = ({ navigation, route }: BottomTabScreenProps<any, any>) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchToggle = (status: boolean) => {
    if (!status) {
      setSearchQuery("");
    }
  };

  const handleSearchInput = (query: string) => {
    setSearchQuery(query);
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => ({
  //       <Search onToggle={clearSearchQuery: onSearchToggle} onChangeText={handleSearchInput} />;
  //     })
  //   }), [navigation]);
  return (
    <ScreenLayout>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Diaries Screen</Text>
      </View>
      {/* <Search onToggle={dummy} />
      <List
        style={styles.list}
        contentContainerStyle={styles.contentContainerStyle}
        data={filteredData}
        extraData={toJS(store.entries)}
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
