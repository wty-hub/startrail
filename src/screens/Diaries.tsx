import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import DiaryDetail from "./Diaries/DiaryDetail";
import DiaryList from "./Diaries/DiaryList"

const Stack = createNativeStackNavigator();

const DiariesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // eslint-disable-next-line react/no-unstable-nested-components
        header: ({ navigation, route, options }) => {
          return (
            <Header
              title={options.title}
              navigation={navigation}
              // @ts-ignore
              hideBack={options?.customHideBack ?? true}
              accessoryRight={options.headerRight}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="DiaryList"
        component={DiaryList}
        options={{ title: "日记" }}
      ></Stack.Screen>
      <Stack.Screen
        name="DiaryDetail"
        component={DiaryDetail}
        options={{ 
          title: "详情",
          // 显式设置不隐藏返回按钮
          // @ts-ignore
          customHideBack: false 
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default DiariesStack;
