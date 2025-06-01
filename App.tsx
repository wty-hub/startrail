import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import FlashMessage from "react-native-flash-message";

import { useEffect } from "react";
import {
  initDB,
} from "./src/db/diary-service";

import AppNavigation from "./src/navigation/Navigation";

import { test } from "./test";

import { LogBox } from 'react-native';
import { DiaryRefreshProvider } from "./src/context/DiaryRefreshContext";

const App = () => {

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  useEffect(() => {
    initDB()
      .then(() => {
        console.log("Database initialized");
      })
      .catch((error) => {
        console.error("Error initializing database:", error);
      });
  });
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.light}
        customMapping={{ ...eva.mapping }}
      >
        <DiaryRefreshProvider>
          <SafeAreaProvider>
            {/* <View style={styles.container}>
              <Text style={styles.title}>Welcome to Startrail Diary!</Text>
              <Text style={styles.subtitle}>Start writing your thoughts today.</Text>
            </View> */}
            <AppNavigation />
            {__DEV__ && ( // 仅在开发模式下显示按钮
              <View>
                <Button title="Run Test Script" onPress={test} />
              </View>
            )}
          </SafeAreaProvider>
          <FlashMessage position="top" />
        </DiaryRefreshProvider>
      </ApplicationProvider>
    </>
  );
};

export default App;
