import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import FoodImage from "../../../assets/icon/challenge/croissant.svg";
import { Commonstyles } from "../../../uitll/defaultStyle";
import { Header } from "./header";

export type MealOrSnack = {
  id: string;
  type: "meal" | "snack";
  title: string;
  imageUrl: string | null;
};

export type MealDetailScreenParams = {
  MyGoalScreen: undefined;
  MealDetailScreen: { item: MealOrSnack };
};

export function MealGoal() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MealDetailScreenParams>>();
  const [items, setItems] = useState<MealOrSnack[]>([
    {
      id: Date.now().toString(),
      type: "meal",
      title: `오늘의 1번째 식사`,
      imageUrl: null,
    },
  ]);

  useEffect(() => {
    // 백엔드에서 데이터 가져오기
    const fetchData = async () => {
      try {
        const response = await axios.get<MealOrSnack[]>("/api/meals");
        setItems(response.data);
      } catch (error) {
        //console.error("Error fetching meals and snacks:", error);
      }
    };

    fetchData();
  }, [items]);

  const pressHandler = (item: MealOrSnack) => {
    console.log("끼니 추가하기 버튼 클릭");
    navigation.navigate("MealDetailScreen", { item });
  };

  const addMealHandler = () => {
    // 백엔드에 새 식사 추가 요청
    // 이 예제에서는 새로운 식사를 로컬 상태에 추가하는 것으로 대체합니다.
    const newMeal: MealOrSnack = {
      id: Date.now().toString(),
      type: "meal",
      title: `오늘의 ${
        items.filter((item) => item.type === "meal").length + 1
      }번째 식사`,
      imageUrl: null,
    };
    setItems((currentItems) => [...currentItems, newMeal]);
  };

  const addSnackHandler = () => {
    // 백엔드에 새 간식 추가 요청
    // 이 예제에서는 새로운 간식을 로컬 상태에 추가하는 것으로 대체합니다.
    const newSnack: MealOrSnack = {
      id: Date.now().toString(),
      type: "snack",
      title: `오늘의 ${
        items.filter((item) => item.type === "snack").length + 1
      }번째 간식`,
      imageUrl: null,
    };
    setItems((currentItems) => [...currentItems, newSnack]);
  };

  return (
    <View style={styles.Wrapper}>
      <Header text="식단" />
      <View style={styles.ContentWrapper}>
        {items.map((item, index) => {
          if (item.imageUrl) {
            // 이미지가 있는 경우
            return (
              <Image
                key={index}
                source={{ uri: item.imageUrl }}
                style={{ width: 50, height: 50 }}
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
                    onPress={() => pressHandler(item)}
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
              onPress={addMealHandler}
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
              onPress={addSnackHandler}
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
