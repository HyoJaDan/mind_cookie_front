import { useCallback, useMemo, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Today } from "../components/myRecord/Date";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRecoilValue } from "recoil";
import { DailyCaloryMain } from "../components/myRecord/dailyCalory";
import RecommendedIntake from "../components/myRecord/recommendedIntake";
import WeightChangeRate from "../components/myRecord/weightChangeRate";
import { WeightButtonModal } from "../components/myRecord/weightChangeRate/WeightButtonModal";
import { userSelector } from "../data/myRecord";

export default function MyRecordScreen() {
  const user = useRecoilValue(userSelector);
  console.log(user);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = () => bottomSheetModalRef.current?.close();
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0} // 이거 추가
        disappearsOnIndex={-1} // 이거 추가
      />
    ),
    []
  );
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.rootContainer}>
        <ScrollView
          /*   style={styles.rootContainer} */
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            backgroundColor: Colors.backgroundColor,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Today />
          <DailyCaloryMain
            calorie={user.calorie}
            intakedCalorie={user.intakedCalorie}
          />
          <WeightChangeRate
            handlePresentModalPress={handlePresentModalPress}
            weight={user.weight}
          />
          <RecommendedIntake intake={user.calorie} />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            keyboardBehavior="interactive"
          >
            <WeightButtonModal handlePresentModalPress={handleClosePress} />
          </BottomSheetModal>
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    gap: 24,
    backgroundColor: Colors.backgroundColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
