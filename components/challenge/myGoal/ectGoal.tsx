import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../assets/color/color";
import CheckIcon from "../../../assets/icon/challenge/checkbox.svg";

import {
  EtcGoal,
  ITodayPersonalChallenge,
} from "../../../data/personalChallenge/personalChallengeData";
import { updateEtcGoalIsDone } from "../../../data/personalChallenge/personalChallengeDataHandler";
import { Header } from "./header";

interface EtcGoalProps {
  data: ITodayPersonalChallenge;
  setData: Function;
}

export function EtcGoalFunction({ data, setData }: EtcGoalProps) {
  const goals = data.challenge.etcGoals;
  const CustomCheckbox = ({
    goal,
    toggleCheckbox,
  }: {
    goal: EtcGoal;
    toggleCheckbox: (id: number) => void;
  }) => {
    return (
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => toggleCheckbox(goal.id as number)}
      >
        <View
          style={goal.done ? styles.checkboxChecked : styles.checkboxUnchecked}
        >
          {goal.done && <CheckIcon />}
        </View>
        <Text style={styles.goalText}>{goal.goalName}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: EtcGoal }) => (
    <CustomCheckbox goal={item} toggleCheckbox={toggleCheckbox} />
  );
  const toggleCheckbox = async (goalId: number) => {
    const newGoals = data.challenge.etcGoals.map((goal) => {
      if (goal.id === goalId) {
        return { ...goal, done: !goal.done };
      }
      return goal;
    });

    try {
      await updateEtcGoalIsDone(
        goalId,
        !data.challenge.etcGoals.find((goal) => goal.id === goalId)?.done
      );

      setData((prevData: any) => ({
        ...prevData,
        challenge: {
          ...prevData.challenge,
          etcGoals: newGoals,
        },
      }));
    } catch (error) {}
  };

  const ItemSeparator = () => <View style={{ height: 15 }} />;
  return (
    <View style={styles.Wrapper}>
      <Header text="목표" />
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
