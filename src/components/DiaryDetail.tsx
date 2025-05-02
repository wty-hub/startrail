import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

const DiaryDetail = ({
  visible,
  onClose,
  dateString,
  content,
}: {
  visible: boolean;
  onClose: () => void;
  dateString: string;
  content: string;
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade" // 设置动画为淡入淡出
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.detailContainer}>
        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>日记详情</Text>
          <Text style={styles.detailDate}>{dateString}</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.detailText}>{content}</Text>
          </ScrollView>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>关闭</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    justifyContent: "center", // 垂直居中
    alignItems: "center", // 水平居中
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 半透明背景
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
    transform: [{ scale: 1 }], // 默认大小
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  detailDate: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 32,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  scrollView: {
    maxHeight: 300,
    marginBottom: 16,
  },
});

export default DiaryDetail;