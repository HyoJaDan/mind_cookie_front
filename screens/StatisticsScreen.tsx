import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { Colors } from "../assets/color/color";
import StateChart from "../components/Statistics/StateChart";
import StopwatchChart from "../components/Statistics/StopwatchChart";
import TodoChart from "../components/Statistics/todoChart";
import { screenWidthData } from "../data/screen";
import { StateDTO, stateData } from "../data/stateData";
import { IAllStopwatch, allStopwatchData } from "../data/stopwatch";
import { ITop3Succeess, top3SucceessData } from "../data/todo";

export default function StatisticsScreen() {
  const insets = useSafeAreaInsets();
  const stateList = useRecoilValue<StateDTO[]>(stateData);
  const stopwatchList = useRecoilValue<IAllStopwatch[]>(allStopwatchData);
  const top3Succeess = useRecoilValue<ITop3Succeess[]>(top3SucceessData);
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
          <StateChart stateList={stateList} screenWidth={screenWidth} />
          <StopwatchChart
            stopwatchData={stopwatchList}
            screenWidth={screenWidth}
          />
          <TodoChart top3Succeess={top3Succeess} />
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
