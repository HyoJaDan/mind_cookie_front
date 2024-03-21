import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import FoodImage from "../../../assets/icon/challenge/croissant.svg";
import {
  ITodayPersonalChallenge,
  mealRecords,
} from "../../../data/personalChallenge/personalChallengeData";
import { Commonstyles } from "../../../uitll/defaultStyle";
import { Header } from "./header";

export type MealDetailScreenParams = {
  MyGoalScreen: undefined;
  MealDetailScreen: { index: number };
};

interface MealGoalProps {
  data: ITodayPersonalChallenge;
  setItems: Function;
}

export function MealGoal({ data, setItems }: MealGoalProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MealDetailScreenParams>>();
  const items: mealRecords[] = data.challenge.mealRecords;
  const pressDetailHandler = (index: number) => {
    navigation.navigate("MealDetailScreen", { index });
  };

  const addNewMealOrSnack = (mealType: "meal" | "snack") => {
    const newMeal: mealRecords = {
      id: Date.now().toString(),
      createdTime: new Date().toISOString(),
      calorie: 0,
      content: "",
      type: mealType,
      title: `오늘의 ${
        items.filter((item) => item.type === mealType).length + 1
      }번째 ${mealType === "meal" ? "식사" : "간식"}`,
      imageUrl: null,
    };

    const updatedItems = [...items, newMeal];

    setItems((prevData: ITodayPersonalChallenge) => ({
      ...prevData,
      challenge: {
        ...prevData.challenge,
        mealRecords: updatedItems,
      },
    }));
  };

  return (
    <View style={styles.Wrapper}>
      <Header text="식단" />
      <View style={styles.ContentWrapper}>
        {items.map((item, index) => {
          if (item.imageUrl) {
            return (
              <Image
                key={index}
                source={{ uri: item.imageUrl }}
                style={styles.image}
              />
            );
          } else {
            return (
              <View key={index} style={styles.MainContent}>
                <View style={Commonstyles.flexRow}>
                  <FoodImage />
                  <Text style={[fontStyle.MD16, styles.Text]}>
                    {item.title}
                  </Text>
                </View>
                <View style={ButtonStyle.buttonOuterContainer}>
                  <Pressable
                    style={({ pressed }) =>
                      pressed ? ButtonStyle.pressed : null
                    }
                    onPress={() => pressDetailHandler(index)}
                  >
                    <Text
                      style={[
                        fontStyle.MD14,
                        { color: Colors.primary.primary },
                      ]}
                    >
                      추가
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          }
        })}

        <View style={Commonstyles.Line}>
          <View style={SecondaryButtonStyle.buttonContainer}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [ButtonStyle.pressed, SecondaryButtonStyle.button]
                  : SecondaryButtonStyle.button
              }
              onPress={() => addNewMealOrSnack("meal")}
            >
              <Text
                style={[
                  fontStyle.RG14,
                  { color: Colors.basic.text_extralight },
                ]}
              >
                +끼니 추가하기
              </Text>
            </Pressable>
          </View>
          <View style={SecondaryButtonStyle.buttonContainer}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [ButtonStyle.pressed, SecondaryButtonStyle.button]
                  : SecondaryButtonStyle.button
              }
              onPress={() => addNewMealOrSnack("snack")}
            >
              <Text
                style={[
                  fontStyle.RG14,
                  { color: Colors.basic.text_extralight },
                ]}
              >
                +간식 추가하기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Wrapper: { gap: 8 },
  ContentWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 15,
    alignItems: "flex-start",
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
  },
  MainContent: {
    padding: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderRadius: 10,
    backgroundColor: Colors.grayscale.gray100,
  },
  Text: {
    color: Colors.basic.text_default,
    fontSize: 18,
  },
  image: { width: "100%", height: 150, borderRadius: 10 },
});

const ButtonStyle = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonOuterContainer: {
    overflow: "hidden",
    display: "flex",
    height: 36,
    paddingHorizontal: 16, // React Native에서 padding: 6px 16px; 대신 사용
    alignItems: "center",
    justifyContent: "center", // 텍스트를 버튼 중앙에 위치시킵니다.
    flexDirection: "row", // 내부 요소(예: 아이콘과 텍스트)를 가로로 배치
    gap: 8, // React Native에서는 gap 속성을 지원하지 않습니다. 대신 요소간 마진을 조정해야 합니다.
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "#B8D3FF", // CSS var() 대신 직접 색상 코드를 사용
  },
  addButtonContainer: {},
});

const SecondaryButtonStyle = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minWidth: "100%",
    flexDirection: "row", // 내부 아이템을 가로로 배열
    alignItems: "center", // 세로 방향으로 중앙 정렬
    justifyContent: "center", // 가로 방향으로 중앙 정렬
    height: 45,
    paddingHorizontal: 16, // 좌우 패딩
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.basic.line_light,
    backgroundColor: Colors.basic.white,
  },
});
