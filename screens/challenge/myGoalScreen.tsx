import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MealGoal } from "../../components/challenge/myGoal/MealGoal";
import { EtcGoalFunction } from "../../components/challenge/myGoal/ectGoal";
import { ExerciseGoal } from "../../components/challenge/myGoal/exerciseGoal";
import {
  ITodayPersonalChallenge,
  mealRecords,
  todayPersonalChallenge,
} from "../../data/personalChallenge/personalChallengeData";
import { getMyGoalData } from "../../data/personalChallenge/personalChallengeDataHandler";
import { teamId } from "../../data/team/teamData";
import { userId } from "../../data/user/userData";

export default function MyGoalScreen() {
  const id = useRecoilValue(userId);
  const [data, setData] = useRecoilState(todayPersonalChallenge);
  const setTeamId = useSetRecoilState(teamId);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result: ITodayPersonalChallenge = await getMyGoalData(id);

        if (result.status === "active" && result.challenge !== null) {
          if (
            !result.challenge.mealRecords ||
            result.challenge.mealRecords.length === 0
          ) {
            const defaultMealGoal: mealRecords = {
              id: Date.now().toString(),
              createdTime: new Date().toISOString(),
              calorie: 0,
              content: "",
              type: "meal",
              title: "오늘의 1번째 식사",
              imageUrl: null,
            };
            result.challenge.mealRecords = [defaultMealGoal];
          }
        }
        setData(result);
        setTeamId(result.team.teamId);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };
    fetchData();
  }, [id]);

  if (loading === true) {
    return null;
  }
  if (data.status === "before") {
    return <Text>아직 첼린지가 시작하기 전이에요</Text>;
  }
  if (data.status === "after") {
    return <Text>첼린지가 종료되었어요</Text>;
  }
  if (loading === false) {
    return (
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.Wrapper}>
            <EtcGoalFunction data={data} setData={setData} />
            <MealGoal data={data} setItems={setData} />
          </View>
        )}
        data={[]}
        renderItem={null}
        ListFooterComponent={() => (
          <ExerciseGoal
            id={data.challenge.id}
            goals={data.challenge.exercise}
          />
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
}
const styles = StyleSheet.create({
  Wrapper: {
    gap: 24,
  },
});
