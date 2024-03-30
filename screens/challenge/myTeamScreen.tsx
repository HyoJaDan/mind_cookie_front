import { useEffect, useState } from "react";
import { Text } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import MealRecordBoard from "../../components/challenge/myTeam/MealRecordBoard";
import { todayPersonalChallenge } from "../../data/personalChallenge/personalChallengeData";
import { ITeamData, teamData, teamId } from "../../data/team/teamData";
import { getTeamData } from "../../data/team/teamDataHandler";

export default function MyTeamScreen() {
  const id = useRecoilValue(teamId);
  const [data, setData] = useRecoilState<ITeamData>(teamData);
  const personalChallenge = useRecoilValue(todayPersonalChallenge);
  const setLoadingState = useRecoilValue(todayPersonalChallenge);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await getTeamData(id);
        setData(result);
        setLoading(true);
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setData, setLoadingState]);

  if (loading === true) return null;
  if (personalChallenge.status === "before") {
    return <Text>아직 첼린지가 시작하기 전이에요</Text>;
  }
  if (personalChallenge.status === "after") {
    return <Text>첼린지가 종료되었어요</Text>;
  }
  return <MealRecordBoard data={data} />;
}
