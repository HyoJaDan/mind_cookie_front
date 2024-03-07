import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import { IWeight } from "../../../data/myRecord/userData";

// 날짜를 "YY.MM.DD" 형식으로 변환하는 함수
function formatDate(isoDateString: string, weight: number) {
  const date = new Date(isoDateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDateTime = `${year}.${month}.${day} ${hours}:${minutes}`;
  const lastWeight = weight;

  return { formattedDateTime, lastWeight };
}

function parseLastWeightDate(weight: IWeight[]) {
  if (weight.length === 0) {
    throw new Error("Weight array is empty");
  }

  const lastWeight = weight[weight.length - 1];
  return formatDate(lastWeight.date, lastWeight.weight);
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
