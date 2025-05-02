import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";

const DiaryDetail = ({
  visible,
  onClose,
  dateString,
  content,
  onContentChange,
}: {
  visible: boolean;
  onClose: () => void;
  dateString: string;
  content: string;
  onContentChange: (newContent: string) => void; // 回调函数，用于实时更新内容
}) => {
  const [editedContent, setEditedContent] = useState(content);

  const handleContentChange = (newContent: string) => {
    setEditedContent(newContent);
    onContentChange(newContent); // 调用回调函数，将修改后的内容传递给父组件
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.detailContainer}>
        <View style={styles.detailContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
          <Text style={styles.detailDate}>{dateString}</Text>
          <ScrollView style={styles.scrollView}>
            <TextInput
              style={styles.textInput}
              value={editedContent}
              onChangeText={handleContentChange}
              multiline={true}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  detailContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  detailDate: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    marginLeft: 50,
    textAlign: "right",
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    maxHeight: 300,
  },
  closeButton: {
    position: "absolute", // 绝对定位
    top: 10, // 距顶部 10 像素
    left: 10, // 距左侧 10 像素
    width: 40,
    height: 30,    backgroundColor: "transparent", // 设置为透明背景
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#333", // 深色文字
    fontSize: 25,
    fontWeight: "bold",
  },
  scrollView: {
    maxHeight: 300,
    marginBottom: 16,
  },
});

export default DiaryDetail;