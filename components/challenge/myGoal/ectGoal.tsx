import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilValue } from "recoil";
import { Colors } from "../../../assets/color/color";
import CheckIcon from "../../../assets/icon/challenge/checkbox.svg";
import {
  IGoal,
  updateGoalIsDone,
} from "../../../data/personalChallenge/personalChallengeData";
import { getEtcGoal } from "../../../data/personalChallenge/personalChallengeDataHandler";
import { userId } from "../../../data/user/userData";
import { Header } from "./header";
export function EtcGoal() {
  const id = useRecoilValue(userId);
  const [goals, setGoals] = useState<IGoal[]>([]);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await getEtcGoal(id);
      if (data) setGoals(data);
    };

    loadUserData();
  }, []);
  console.log(goals, "oals");

  const CustomCheckbox = ({
    goal,
    toggleCheckbox,
  }: {
    goal: IGoal;
    toggleCheckbox: (id: number) => void;
  }) => {
    return (
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => toggleCheckbox(goal.id)}
      >
        <View
          style={
            goal.isDone ? styles.checkboxChecked : styles.checkboxUnchecked
          }
        >
          {goal.isDone && <CheckIcon />}
        </View>
        <Text style={styles.goalText}>{goal.goalName}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: IGoal }) => (
    <CustomCheckbox goal={item} toggleCheckbox={toggleCheckbox} />
  );
  const toggleCheckbox = async (goalId: number) => {
    // 현재 클릭된 목표의 isDone 상태 찾기
    const currentGoal = goals.find((goal) => goal.id === goalId);
    if (!currentGoal) return; // 해당 ID를 가진 목표가 없는 경우 함수 종료

    const newIsDone = !currentGoal.isDone;

    try {
      // 백엔드에 isDone 상태 업데이트 요청
      await updateGoalIsDone(goalId, newIsDone);

      // 성공적으로 업데이트된 경우, 로컬 상태 업데이트
      setGoals(
        goals.map((goal) =>
          goal.id === goalId ? { ...goal, isDone: newIsDone } : goal
        )
      );
    } catch (error) {
      console.error("Error toggling goal:", error);
      // 오류 처리 로직 (예: 사용자에게 오류 메시지 표시)
    }
  };

  const ItemSeparator = () => <View style={{ height: 15 }} />;
  return (
    <View style={styles.Wrapper}>
      <Header text="Meal Goal" />
      <View style={styles.Content}>
        <FlatList
          data={goals}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Wrapper: { gap: 8 },
  Content: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 15,
    alignItems: "flex-start",
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  goalText: {
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkboxUnchecked: {
    display: "flex",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000", // 또는 원하는 색상
    borderRadius: 4, // 원하는 만큼의 둥근 모서리
  },

  checkboxChecked: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    gap: 15,
  },
});
