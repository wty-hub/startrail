import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import FlashMessage from "react-native-flash-message";

import AppNavigation from "./src/navigation/Navigation";
const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.light}
        customMapping={{ ...eva.mapping }}
      >
        <SafeAreaProvider>
          {/* <View style={styles.container}>
            <Text style={styles.title}>Welcome to Startrail Diary!</Text>
            <Text style={styles.subtitle}>Start writing your thoughts today.</Text>
          </View> */}
          <AppNavigation />
        </SafeAreaProvider>
        <FlashMessage position="top" />
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});

export default App;