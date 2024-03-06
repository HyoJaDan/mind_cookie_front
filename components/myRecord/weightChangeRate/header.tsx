import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";

interface IProps {
  calorie: number;
  intakedCalorie: number;
}

export const Header = () => {
  return (
    <View style={styles.Wrapper}>
      <Text style={[fontStyle.BD20, styles.Texts]}>체중변화량</Text>
      <View style={styles.Box}>
        <Text style={[fontStyle.RG14, styles.WeightText]}>23.07.31 23:13</Text>
        <Text style={[fontStyle.RG14, styles.Texts]}>58.6kg</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Texts: {
    color: Colors.basic.text_default,
  },
  WeightText: {
    color: Colors.grayscale.gray600,
  },
  Box: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.grayscale.gray100,
    borderRadius: 10,
  },
});
