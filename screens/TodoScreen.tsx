import { SafeAreaView, StyleSheet } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../assets/color/color";
import TodoList from "../components/todo/todo";

export default function TodoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.rootContainer, { paddingTop: insets.top }]}>
        <TodoList />
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
