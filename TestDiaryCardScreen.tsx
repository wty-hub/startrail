import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import DiaryCard from "./src/components/DiaryCard";
import { DiaryEntry } from "./src/types/types";

const testEntries: DiaryEntry[] = [
  { id: 1, content: "测试日记1", date: "2025-04-24" },
  { id: 2, content: "测试日记2", date: "2025-04-23" },
  { id: 3, content: "测试日记3", date: "2025-04-22" },
];

const TestDiaryCardScreen = () => {
  const handlePress = (id: number) => {
    console.log(`Pressed diary entry with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleted diary entry with id: ${id}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={testEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DiaryCard
            entry={item}
            onPress={() => handlePress(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
});

export default TestDiaryCardScreen;