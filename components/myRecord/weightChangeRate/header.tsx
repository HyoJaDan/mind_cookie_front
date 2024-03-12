import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import { IWeight } from "../../../data/user/userData";
import { formatDateUntilMinute } from "../../../uitll/dateConverter";

function parseLastWeightDate(weight: IWeight[]) {
  if (weight.length === 0) {
    throw new Error("Weight array is empty");
  }

  const lastWeight = weight[weight.length - 1];
  return formatDateUntilMinute(lastWeight.date, lastWeight.weight);
}

export const Header = ({ weight }: { weight: IWeight[] }) => {
  const { formattedDateTime, lastWeight } = parseLastWeightDate(weight);

  return (
    <View style={styles.Wrapper}>
      <Text style={[fontStyle.BD20, styles.Texts]}>체중변화량</Text>
      <View style={styles.Box}>
        <Text style={[fontStyle.RG14, styles.WeightText]}>
          {formattedDateTime}
        </Text>
        <Text style={[fontStyle.RG14, styles.Texts]}>{lastWeight}kg</Text>
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
