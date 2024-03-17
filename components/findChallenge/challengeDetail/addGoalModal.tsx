import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import Trash from "../../../assets/icon/teamList/trash.svg";
import { DefaultButton } from "../../../uitll/defaultButton";
import { generateID } from "../../../uitll/generateID";
import { GoalItem } from "./myDetail";

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
