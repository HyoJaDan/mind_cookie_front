import { StyleSheet, Text, View } from "react-native";

import CoocieIcon from "../assets/icon/challenge/cookie.svg";
import FoodIcon from "../assets/icon/challenge/noodles.svg";
import { RecordType } from "../data/team/teamData";
import { Commonstyles } from "./defaultStyle";

interface IProp {
  type: string | RecordType;
  title: string;
  backgroundColor: string;
}

export function MealButton({ type, title, backgroundColor }: IProp) {
  const numberMatch = title.match(/\d+/);
  const number = numberMatch ? numberMatch[0] : "";
  return (
    <>
      {type === "meal" || type === RecordType.meal ? (
        <View style={Commonstyles.flexGap}>
          <View
            style={[
              Commonstyles.flexGap,
              styles.button,
              { backgroundColor: backgroundColor },
            ]}
          >
            <FoodIcon />
            <Text>{number}째끼</Text>
          </View>
        </View>
      ) : (
        <View style={Commonstyles.flexGap}>
          <View
            style={[
              Commonstyles.flexGap,
              styles.button,
              { backgroundColor: backgroundColor },
            ]}
          >
            <CoocieIcon />
            <Text>간식</Text>
          </View>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 40,
  },
});
