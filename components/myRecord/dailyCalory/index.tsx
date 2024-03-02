import { StyleSheet, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import Fork from "../../../assets/icon/fork.svg";
import Spoon from "../../../assets/icon/spoon.svg";
import { DailyCalory } from "./DailyCalory";

export const DailyCaloryMain = () => {
  return (
    <View style={styles.wrapper}>
      <Spoon />
      <DailyCalory />
      <Fork />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 8,
    padding: 10,
  },
  dailyCaloryWrapper: {
    width: 240,
    height: 240,
    backgroundColor: Colors.basic.white,
    borderRadius: 999, // px is not needed in React Native
    shadowColor: "#F2EFED",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1, // This controls the opacity of the shadow. Adjust as needed.
    shadowRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },
});
