import { StyleSheet, View } from "react-native";
import Fork from "../../assets/icon/fork.svg";
import Spoon from "../../assets/icon/spoon.svg";
export const DailyCalory = () => {
  return (
    <View style={styles.wrapper}>
      <Spoon />
      <Fork />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    padding: 10,
  },
});
