import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontStyle } from "../../assets/font/font";

interface EmptyTodoListProps {
  message?: string;
}

const EmptyTodo: React.FC<EmptyTodoListProps> = ({
  message = "투두리스트가 아직 없습니다!",
}) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={[fontStyle.BD24, styles.emptyText]}>{message}</Text>
      <Text style={styles.instructions}>
        목표를 추가하려면 아래 '+' 버튼을 눌러
      </Text>
      <Text style={styles.instructions}>새 목표를 설정하세요.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    marginBottom: 20,
    color: "#4CAF50",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
});

export default EmptyTodo;
