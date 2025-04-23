import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";
import Search from "../components/SearchButton";
import { List } from "@ui-kitten/components";

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Search onToggle={onSearchToggle} onChangeText={handleSearchInput} />
      ),
    });
  }, [navigation]);

  return (
    <ScreenLayout>
      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Diaries Screen</Text>
      </View> */}
      {/* <List
      style={styles.list}
      contentContainerStyle={styles.contentContainerStyle}
      data={[]}
      extraData={[]}

      ></List> */}
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
