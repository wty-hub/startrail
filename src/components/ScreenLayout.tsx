/**
 * 每个屏幕的基本布局
 */
import { LayoutProps, Layout } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export const ScreenLayout = ({ children }: LayoutProps) => {
  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Layout style={styles.layout}>{children}</Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  layout: {
    position: "relative",
    flex: 1,
    backgroundColor: "#E9ECF2",
  },
});
