import { StyleSheet, View } from "react-native";
import { MealGoal } from "../../components/challenge/myGoal/MealGoal";
import { EtcGoal } from "../../components/challenge/myGoal/ectGoal";
import { ExerciseGoal } from "../../components/challenge/myGoal/exerciseGoal";

export default function MyGoalScreen() {
  return (
    <View style={styles.Wrapper}>
      <EtcGoal />
      <MealGoal />
      <ExerciseGoal />
    </View>
  );
}
const styles = StyleSheet.create({
  Wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 24,
  },
});
