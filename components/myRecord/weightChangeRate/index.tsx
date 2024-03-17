import { StyleSheet, View } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Colors } from "../../../assets/color/color";
import { IWeight } from "../../../data/user/userData";
import { DefaultButton } from "../../../uitll/defaultButton";
import { Header } from "./Header";
import { WeightChangeRateChart } from "./chart";

interface IProps {
  handlePresentModalPress: Function;
  weight: IWeight[];
}

export default function WeightChangeRate({
  handlePresentModalPress,
  weight,
}: IProps) {
  function pressHandler() {
    handlePresentModalPress();
  }
  return (
    <BottomSheetModalProvider>
      <View style={styles.Wrapper}>
        <Header weight={weight} />
        <WeightChangeRateChart weight={weight} />
        <DefaultButton pressHandler={pressHandler} text="몸무게 기록하기" />
      </View>
    </BottomSheetModalProvider>
  );
}
const styles = StyleSheet.create({
  Wrapper: {
    width: 335,
    gap: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
  },
});
