// screens/ChallengeDetailScreen.tsx
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Colors } from "../../assets/color/color";
import { fontStyle } from "../../assets/font/font";
import MyDetail from "../../components/findChallenge/challengeDetail/myDetail";
import { todayPersonalChallenge } from "../../data/personalChallenge/personalChallengeData";
import { putEtcGoal } from "../../data/personalChallenge/personalChallengeDataHandler";
import { ITeams } from "../../data/team/teamData";
import { putUserInTeam } from "../../data/team/teamDataHandler";
import {
  IsMemberWithTeam,
  userDataInProfile,
  userId,
} from "../../data/user/userData";
import { putUserteamUserName } from "../../data/user/userDataHandler";
import { formatDate } from "../../uitll/dateConverter";
import { DefaultButton } from "../../uitll/defaultButton";
import { Commonstyles } from "../../uitll/defaultStyle";
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

export function ChallengeDetailScreen({ route }: { route: any }) {
  const id = useRecoilValue(userId);
  const [user, setUser] = useRecoilState(userDataInProfile);

  const [goals, setGoals] = useState<GoalItem[]>([
    { id: generateID(), value: "식단 기록" },
    { id: generateID(), value: "운동 기록" },
  ]);
  const setTodayPersonalChallenge = useSetRecoilState(todayPersonalChallenge);
  const { currentTeam } = route.params;
  const setIsMemberWithTeam = useSetRecoilState(IsMemberWithTeam);

  const date = `${formatDate(currentTeam.startDate)} ~ ${formatDate(
    currentTeam.endDate
  )}`;

  const pressHandler = async () => {
    const newGoals = goals.slice(2);

    // newGoals를 통해 업데이트 될 EtcGoals 생성
    const updatedEtcGoals = newGoals.map((goal) => ({
      id: goal.id, // 실제 사용에 맞게 조정 필요
      goalName: goal.value,
      done: false,
    }));

    // todayPersonalChallenge 상태 업데이트
    setTodayPersonalChallenge((prev) => ({
      ...prev,
      challenge: {
        ...prev.challenge,
        etcGoals: [...prev.challenge.etcGoals, ...updatedEtcGoals],
      },
    }));

    const parsedGoals = JSON.stringify(
      goals.slice(2).map((item) => item.value.toLowerCase())
    );
    await putUserteamUserName(id as number, user.userName);
    await putEtcGoal(id as number, parsedGoals, currentTeam.startDate); //성공
    await putUserInTeam(currentTeam.id as number, id as number);
    setIsMemberWithTeam(true);
  };

  return (
    <SafeAreaView style={Commonstyles.rootContainer}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.Wrapper}>
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
        </View>
        <View style={styles.footer}>
          <DefaultButton pressHandler={pressHandler} text="참가하기" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.basic.white,
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 24,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  footer: {
    padding: 24, // 하단 버튼 주변의 여백
    backgroundColor: Colors.basic.white, // 필요에 따라 배경색 조정
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
