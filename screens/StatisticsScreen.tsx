import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { Colors } from "../assets/color/color";
import StateBar from "../components/Statistics/state";
import { StateDTO, stateData } from "../data/state/stateData";
import { screenWidthData } from "../data/screen";

export default function StatisticsScreen() {
  const insets = useSafeAreaInsets();
  const stateList = useRecoilValue<StateDTO[]>(stateData);
  const screenWidth = useRecoilValue(screenWidthData);
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.Wrapper, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-start",
            backgroundColor: Colors.basic.bachground,
          }}
          showsVerticalScrollIndicator={false}
        >
          <StateBar stateList={stateList} screenWidth={screenWidth} />
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.basic.bachground,
  },
});
