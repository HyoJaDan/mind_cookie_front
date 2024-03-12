// screens/ChallengeDetailScreen.tsx
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { Colors } from "../../assets/color/color";
import { fontStyle } from "../../assets/font/font";
import MyDetail from "../../components/findChallenge/challengeDetail/myDetail";
import { ITeams } from "../../data/team/teamData";
import { userDataInProfile, userId } from "../../data/user/userData";
import {
  putUserEtcGoal,
  putUserteamUserName,
} from "../../data/user/userDataHandler";
import { formatDate } from "../../uitll/dateConverter";
import { DefaultButton } from "../../uitll/defaultBotton";
import { generateID } from "../../uitll/generateID";

// TypeScript 인터페이스를 사용하여 route.params의 타입 정의
interface ChallengeDetailScreenProps {
  route: {
    params: {
      currentTeam: ITeams;
    };
  };
}

// RenderChallengeType 컴포넌트 정의
const RenderChallengeType = ({ challengeType }: { challengeType: string }) => {
  const challengeText =
    {
      increase: "증량 챌린지",
      reduce: "감량 챌린지",
      maintain: "유지 챌린지",
    }[challengeType] || "챌린지 종류";

  return (
    <Text style={[fontStyle.MD16, { color: Colors.basic.text_default }]}>
      {challengeText}
    </Text>
  );
};

// DetailItem 컴포넌트로 중복 코드 제거
const DetailItem: React.FC<{ label: string; content: JSX.Element }> = ({
  label,
  content,
}) => (
  <View style={styles.textArea}>
    <Text style={[fontStyle.SB15, { color: Colors.basic.text_extralight }]}>
      {label}
    </Text>
    {content}
  </View>
);

export interface GoalItem {
  id: string;
  value: string;
}

export const ChallengeDetailScreen: React.FC<ChallengeDetailScreenProps> = ({
  route,
}) => {
  const id = useRecoilValue(userId);
  const [user, setUser] = useRecoilState(userDataInProfile);
  const [goals, setGoals] = useState<GoalItem[]>([
    { id: generateID(), value: "식단 기록" },
    { id: generateID(), value: "운동 기록" },
  ]);
  const { currentTeam } = route.params;

  const date = `${formatDate(currentTeam.startDate)} ~ ${formatDate(
    currentTeam.endDate
  )}`;
  const pressHandler = async () => {
    const parsedGoals = JSON.stringify(
      goals.slice(2).map((item) => item.value.toLowerCase())
    );

    await putUserteamUserName(id as number, user.userName);
    await putUserEtcGoal(id as number, parsedGoals, currentTeam.startDate);
  };
  return (
    <SafeAreaView style={styles.Wrapper}>
      <Text style={[fontStyle.BD24, { color: Colors.basic.text_default }]}>
        {currentTeam.teamName}
      </Text>
      <View style={styles.circle}>
        <DetailItem
          label="종류"
          content={
            <RenderChallengeType challengeType={currentTeam.challngeType} />
          }
        />
        <DetailItem
          label="기간"
          content={
            <Text
              style={[fontStyle.BD16, { color: Colors.basic.text_default }]}
            >
              {date} (5주)
            </Text>
          }
        />
        <DetailItem
          label="인원"
          content={
            <Text
              style={[fontStyle.BD16, { color: Colors.basic.text_default }]}
            >
              {currentTeam.numOfMember}/{currentTeam.maxTeamMemberNumber}명
            </Text>
          }
        />
      </View>
      <MyDetail
        id={id}
        user={user}
        setUser={setUser}
        goals={goals}
        setGoals={setGoals}
      />
      <DefaultButton pressHandler={pressHandler} text="참가하기" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.basic.white,
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 24,
  },
  circle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.basic.line_light,
    display: "flex",
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: 16,
  },
  textArea: {
    flexDirection: "row",
    gap: 40,
  },
  dates: {
    flexDirection: "row",
    gap: 4,
  },
});

export default ChallengeDetailScreen;