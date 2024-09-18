import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../assets/color/color";
import { Statistics } from "../components/Statistics/statistics";

export default function StatisticsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.Wrapper, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            backgroundColor: Colors.basic.bachground,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Statistics />
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.basic.bachground,
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
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 190,
    marginBottom: 20,
  },
  circle: {
    borderRadius: 100,
  },

  labelText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
});
