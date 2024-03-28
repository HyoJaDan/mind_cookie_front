import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import MealRecordBoard from "../../components/challenge/myTeam/MealRecordBoard";
import { todayPersonalChallenge } from "../../data/personalChallenge/personalChallengeData";
import { ITeamData, teamData, teamId } from "../../data/team/teamData";
import { getTeamData } from "../../data/team/teamDataHandler";

export default function MyTeamScreen() {
  const id = useRecoilValue(teamId);
  const [data, setData] = useRecoilState<ITeamData>(teamData);
  const setLoadingState = useRecoilValue(todayPersonalChallenge);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTeamData(id);
      setData(result);
      setLoading(true);
    };
    fetchData();
  }, [id, setData, setLoadingState]);
  if (loading === false) return null;

  return <MealRecordBoard data={data} />;
}
