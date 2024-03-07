import { StyleSheet, View } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Colors } from "../../../assets/color/color";
import { IWeight } from "../../../data/myRecord/userData";
import { Header } from "./Header";
import { WeightButton } from "./WeightButton";
import { WeightChangeRateChart } from "./chart";

interface IProps {
  handlePresentModalPress: Function;
  weight: IWeight[];
}

export default function WeightChangeRate({
  handlePresentModalPress,
  weight,
}: IProps) {
  return (
    <BottomSheetModalProvider>
      <View style={styles.Wrapper}>
        <Header weight={weight} />
        <WeightChangeRateChart weight={weight} />
        <WeightButton handlePresentModalPress={handlePresentModalPress} />
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
