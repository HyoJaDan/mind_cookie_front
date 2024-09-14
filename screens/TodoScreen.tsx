import { SafeAreaView, StyleSheet } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import TodoList from "../components/todo";
import { todoData } from "../data/todoList/todo";

export default function TodoScreen() {
  const insets = useSafeAreaInsets();
  const todo = useRecoilValue(todoData);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.rootContainer, { paddingTop: insets.top }]}>
        <TodoList
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white", //Colors.backgroundColor,
  },
});
