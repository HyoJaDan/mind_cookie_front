import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../assets/color/color";
import DatePicker from "../components/DatePicker";
import State from "../components/state";

export default function MyStateScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.rootContainer, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            backgroundColor: Colors.basic.bachground,
          }}
          showsVerticalScrollIndicator={false}
        >
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <State selectedDate={selectedDate} />
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
