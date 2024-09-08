import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DatePicker from "../components/DatePicker";
import State from "../components/state";

export default function MyRecordScreen() {
  const insets = useSafeAreaInsets();
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.rootContainer, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            backgroundColor: "#FCFCFC", //Colors.backgroundColor,
          }}
          showsVerticalScrollIndicator={false}
        >
          <DatePicker />
          <State />
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    gap: 24,
    backgroundColor: "white", //Colors.backgroundColor,
  },
});
