import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import { ScreenLayout } from "../components/ScreenLayout";

const DateSelector = ({ navigation, route }: BottomTabScreenProps<any, any>) => {
  return (
    <ScreenLayout>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>DateSelector Screen</Text>
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

export default DateSelector;
