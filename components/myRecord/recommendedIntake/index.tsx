import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import Bacon from "../../../assets/icon/bacon.svg";
import Bread from "../../../assets/icon/bread.svg";
import Meat from "../../../assets/icon/meat.svg";
import { Commonstyles } from "../../../uitll/defaultStyle";
import { Nutrition } from "./nutrition";

interface RecommendedIntakeProps {
  carbohydrate: number;
  protein: number;
  fat: number;
}

export default function RecommendedIntake({ intake }: { intake: number }) {
  const [recommendedIntake, setRecommendedIntake] =
    useState<RecommendedIntakeProps>();
  useEffect(() => {
    setRecommendedIntake({
      carbohydrate: intake * 0.3,
      protein: intake * 0.5,
      fat: intake * 0.2,
    });
  }, [intake]);

  return (
    <View style={styles.Wrapper}>
      <Text style={[fontStyle.BD20, { color: Colors.basic.text_default }]}>
        섭취 추천
      </Text>
      <Nutrition
        color="#FFEDAE"
        icon={<Bread />}
        text="탄수화물"
        amount={recommendedIntake?.carbohydrate}
      />
      <View style={Commonstyles.line} />
      <Nutrition
        color="#FFDDC2"
        icon={<Meat />}
        text="단백질"
        amount={recommendedIntake?.protein}
      />
      <View style={Commonstyles.line} />
      <Nutrition
        color="#FFDEEC"
        icon={<Bacon />}
        text="지방"
        amount={recommendedIntake?.fat}
      />
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
    marginBottom: 24,
  },
  Component: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  FontStyle: {
    flexDirection: "row",
  },
});
