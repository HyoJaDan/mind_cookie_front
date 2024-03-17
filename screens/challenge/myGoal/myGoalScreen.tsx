import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { MealGoal } from "../../../components/challenge/myGoal/MealGoal";
import { EtcGoalFunction } from "../../../components/challenge/myGoal/ectGoal";
import { ExerciseGoal } from "../../../components/challenge/myGoal/exerciseGoal";
import { todayPersonalChallenge } from "../../../data/personalChallenge/personalChallengeData";
import { getMyGoalData } from "../../../data/personalChallenge/personalChallengeDataHandler";
import { userId } from "../../../data/user/userData";

export default function MyGoalScreen() {
  const id = useRecoilValue(userId);
  const [data, setData] = useRecoilState(todayPersonalChallenge);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMyGoalData(id);
      if (result) {
        setData(result);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.Wrapper}>
          {data?.status === "before" && (
            <Text>아직 첼린지가 시작하기 전이에요</Text>
          )}
          {data?.status === "after" && <Text>첼린지가 종료되었어요</Text>}
          <EtcGoalFunction data={data} setData={setData} />
          <MealGoal />
        </View>
      )}
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <ExerciseGoal id={data.challenge.id} goals={data.challenge.exercise} />
      )}
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
