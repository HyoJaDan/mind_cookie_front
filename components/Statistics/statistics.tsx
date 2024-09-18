import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { memberData } from "../../data/user/userData";
import { todoData } from "../../data/todoList/todo";
import { stateData } from "../../data/state/stateData";
import { stopwatchData } from "../../data/stopwatch";
import { eventData } from "../../data/event";

export function Statistics() {
  const setMemberState = useRecoilValue(memberData);
  const setToDo = useRecoilValue(todoData);
  const setState = useRecoilValue(stateData);
  const setStopwatch = useRecoilValue(stopwatchData);

  const setEvent = useRecoilValue(eventData);
  console.log("member", setMemberState);
  console.log("todo", setToDo);
  console.log("setState", setState);
  console.log("Stopwatch,", setStopwatch);
  console.log("event", setEvent);
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.labelText}>제목</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 24,
  },
  boxContainer: {
    width: 327,
    height: 344,
    padding: 20,
    flexShrink: 0,
    borderRadius: 16,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 18, 38, 0.03)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
});
