import { FlatList, StyleSheet, View } from "react-native";
import { MealGoal } from "../../components/challenge/myGoal/MealGoal";
import { EtcGoal } from "../../components/challenge/myGoal/ectGoal";
import { ExerciseGoal } from "../../components/challenge/myGoal/exerciseGoal";

export default function MyGoalScreen() {
  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.Wrapper}>
          <EtcGoal />
          <MealGoal />
        </View>
      )}
      data={[]} // ExerciseGoal은 실제 목록 항목이 아니므로 data는 비어 있음
      renderItem={null} // ExerciseGoal을 renderItem으로 사용하지 않음
      ListFooterComponent={ExerciseGoal} // ExerciseGoal을 목록의 마지막 컴포넌트로 추가
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 24,
        gap: 24,
      }}
    />
  );
}
const styles = StyleSheet.create({
  Wrapper: {
    gap: 24,
  },
});
