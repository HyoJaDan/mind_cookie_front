import { StyleSheet, View } from "react-native";

import { Colors } from "../../../assets/color/color";
import { WeightChangeRateChart } from "./chart";
import { Header } from "./header";

export default function WeightChangeRate() {
  return (
    <View style={styles.Wrapper}>
      <Header />
      <WeightChangeRateChart />
    </View>
  );
}
const styles = StyleSheet.create({
  Wrapper: {
    width: 335,
    gap: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 24,
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
  },
});
