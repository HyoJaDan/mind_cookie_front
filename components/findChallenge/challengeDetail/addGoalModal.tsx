import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useEffect, useState } from "react";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import Trash from "../../../assets/icon/teamList/trash.svg";
import { GoalItem } from "../../../screens/findChallenge/ChallengeDetail";
import { DefaultButton } from "../../../uitll/defaultButton";
import { generateID } from "../../../uitll/generateID";

interface IProps {
  handlePresentModalPress: Function;
  goals: GoalItem[];
  setGoals: Function;
}

export function AddGoalModal({
  handlePresentModalPress,
  goals,
  setGoals,
}: IProps) {
  const [modalVisible, setModalVisible] = useState(false);
  // 컴포넌트가 마운트될 때 모달을 표시
  useEffect(() => {
    setModalVisible(true);
  }, []);
  const data = [
    {
      title: "식사 후 스트레칭",
      content:
        "tn트레칭을 비롯해 몸을 움직이는 활동을 하면 음식물 소화에 도움이 돼요",
    },
    {
      title: "공복 몸무게 & 눈바디 기록",
      content: "매일 같은 시간 동일한 상태로 기록하면 정확도를 높일 수 있어요",
    },
    {
      title: "영양제 챙겨먹기",
      content: "아침 식사 후, 자기 전 등 루틴화하는 것이 좋아요",
    },
  ];

  const addGoal = () => {
    setGoals((currentGoals: GoalItem[]) => [
      ...currentGoals,
      { id: generateID(), value: "" },
    ]);
  };

  const removeGoal = (id: string) => {
    setGoals((currentGoals: GoalItem[]) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  };
  const pressHandler = async () => {
    handlePresentModalPress();
  };
  return (
    <View style={styles.bottomSheetContent}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalView}>
            <ScrollView>
              <View style={modalStyles.scrollView}>
                <View style={[modalStyles.textGap, { alignItems: "center" }]}>
                  <Text
                    style={[
                      fontStyle.BD20,
                      { color: Colors.basic.text_default },
                    ]}
                  >
                    목표 추천
                  </Text>
                  <Text
                    style={[fontStyle.RG14, { color: Colors.basic.text_light }]}
                  >
                    많이 사용되는 목표 예시를 설명해드릴게요
                  </Text>
                </View>
                {data.map((item, index) => (
                  <View key={index} style={modalStyles.textGap}>
                    <Text
                      style={[
                        fontStyle.BD16,
                        { color: Colors.basic.text_default },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        fontStyle.RG15,
                        { color: Colors.basic.text_light },
                      ]}
                    >
                      {item.content}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity
              style={modalStyles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[fontStyle.MD16, { color: Colors.basic.white }]}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={[fontStyle.BD16, { color: Colors.grayscale.gray900 }]}>
        목표 설정
      </Text>
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
      >
        {goals.map((goal, index) => (
          <View key={goal.id} style={styles.goalInputContainer}>
            <TextInput
              style={styles.input}
              placeholder={index < 2 ? goal.value : "새로운 목표를 입력하세요"}
              editable={index >= 2} // 처음 두 목표는 수정할 수 없음
              onChangeText={(text) =>
                setGoals((currentGoals: GoalItem[]) =>
                  currentGoals.map((g) =>
                    g.id === goal.id ? { ...g, value: text } : g
                  )
                )
              }
              value={goal.value}
            />
            {index >= 2 && (
              <TouchableOpacity onPress={() => removeGoal(goal.id)}>
                <Trash />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <Button title="추가" onPress={addGoal} />
      </ScrollView>
      <DefaultButton pressHandler={pressHandler} text="확인" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 24,
    gap: 27,
  },
  goalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.grayscale.gray300,
    borderRadius: 8,
  },
  buttonInnerContainer: {
    padding: 16,
    elevation: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonOuterContainer: {
    borderRadius: 8,

    overflow: "hidden",
  },
});

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 검정색 배경
  },
  modalView: {
    width: 343,
    height: 480,
    paddingVertical: 32,
    paddingHorizontal: 24,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#FFF",
    // React Native에서는 CSS의 boxShadow 속성에 직접적인 대응이 없습니다.
    // 대신 elevation(Android) 및 shadow 관련 속성(iOS)을 사용하여 유사한 효과를 낼 수 있습니다.
    shadowColor: "rgba(0, 0, 0, 0.10)",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.32,
    shadowRadius: 32,
    elevation: 10, // Android에서의 그림자 효과
  },
  button: {
    width: 150,
    height: 52,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.primary.primary,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  scrollView: {
    gap: 32,
  },
  textGap: {
    gap: 8,
  },
  itemText: {
    marginBottom: 10,
  },
});
