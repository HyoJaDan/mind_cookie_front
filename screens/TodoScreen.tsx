import { SafeAreaView, StyleSheet } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../assets/color/color";
import TodoList from "../components/todo";

export default function TodoScreen() {
  const insets = useSafeAreaInsets();
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
    backgroundColor: Colors.basic.bachground,
  },
});
