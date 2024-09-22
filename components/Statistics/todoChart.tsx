import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontStyle } from "../../assets/font/font";
import { ITop3Succeess } from "../../data/todoList/todo";

export default function TodoChart({
  top3Succeess,
}: {
  top3Succeess: ITop3Succeess[];
}) {
  console.log(top3Succeess);
  const renderTitle = () => {
    return (
      <View>
        <Text style={fontStyle.BD20}>생활 습관</Text>
        <Text style={fontStyle.BD20}>생활 습관</Text>
      </View>
    );
  };
  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[fontStyle.BD16, { color: "gray" }]}>
          데이터가 없습니다.
        </Text>
        <Text style={[fontStyle.RG14, { color: "gray", marginTop: 8 }]}>
          생활 습관을 기록해주세요.
        </Text>
      </View>
    );
  };

  if (top3Succeess.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[{ textAlign: "center" }, fontStyle.BD20]}>생활 습관</Text>
        {renderEmptyState()}
      </View>
    );
  } else {
    return (
      <View>
        {top3Succeess.map((item, index) => {
          return (
            <View key={index} style={styles.container}>
              <Text style={fontStyle.MD18}>{item.name}</Text>
              <Text style={fontStyle.SB15}>{item.numOfSucceed}번 달성</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 150, // 적당한 높이 설정
  },
});
