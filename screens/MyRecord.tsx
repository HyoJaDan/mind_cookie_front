import axios from "axios";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Today } from "../components/myRecord/Date";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { DailyCaloryMain } from "../components/myRecord/dailyCalory";
import WeightChangeRate from "../components/myRecord/weightChangeRate";
import { WeightButtonModal } from "../components/myRecord/weightChangeRate/WeightButtonModal";
import { AuthContext } from "../data/auth-context";

export default function MyRecordScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  useEffect(() => {
    axios
      .get(
        `https://hobby-96efd-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((response) => {
        setFetchedMessage(response.data);
      });
  });

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
          style={styles.rootContainer}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            backgroundColor: Colors.backgroundColor,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Today />
          <DailyCaloryMain />
          <WeightChangeRate handlePresentModalPress={handlePresentModalPress} />
          <Text>{fetchedMessage}</Text>
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
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
