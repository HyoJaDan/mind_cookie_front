import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import { ITeamData } from "../../../data/team/teamData";
export default function TeamAchievementDashboard({
  data,
}: {
  data: ITeamData;
}) {
  return (
    <View style={styles.Wrapper}>
      <Text style={[fontStyle.BD16, { color: Colors.basic.text_default }]}>
        팀 달성 현황
      </Text>
      <View style={styles.Content}>
        <View style={styles.statusBarWrapper}>
          <Text style={[fontStyle.SB14, { color: Colors.basic.text_light }]}>
            목표
          </Text>
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={data.completedEtcGoals / data.totalEtcGoals}
              width={234}
              height={8}
              color={"rgba(146,182,255,1)"}
              unfilledColor={"rgba(92,114,157,0.06)"}
              borderColor={"rgba(92,114,157,0.06)"}
              animated={true}
              borderRadius={40}
            />
          </View>
          <Text
            style={[fontStyle.RG12, { color: Colors.basic.text_extralight }]}
          >
            {data.completedEtcGoals}/{data.totalEtcGoals}
          </Text>
        </View>
        <View style={styles.statusBarWrapper}>
          <Text style={[fontStyle.SB14, { color: Colors.basic.text_light }]}>
            식단
          </Text>
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={data.completedExercises / data.memberDTOS.length}
              width={234}
              height={8}
              color={"rgba(146,182,255,1)"}
              unfilledColor={"rgba(92,114,157,0.06)"}
              borderColor={"rgba(92,114,157,0.06)"}
              animated={true}
              borderRadius={40}
            />
          </View>
          <Text
            style={[fontStyle.RG12, { color: Colors.basic.text_extralight }]}
          >
            {data.completedEtcGoals}/{data.memberDTOS.length}
          </Text>
        </View>
        <View style={styles.statusBarWrapper}>
          <Text style={[fontStyle.SB14, { color: Colors.basic.text_light }]}>
            운동
          </Text>
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={data.completedExercises / data.memberDTOS.length}
              width={234}
              height={8}
              color={"rgba(146,182,255,1)"}
              unfilledColor={"rgba(92,114,157,0.06)"}
              borderColor={"rgba(92,114,157,0.06)"}
              animated={true}
              borderRadius={40}
            />
          </View>
          <Text
            style={[fontStyle.RG12, { color: Colors.basic.text_extralight }]}
          >
            {data.completedExercises}/{data.memberDTOS.length}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Wrapper: {
    gap: 16,
  },
  Content: {
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
    padding: 15,
    gap: 10,
  },
  statusBarWrapper: {
    flexDirection: "row",
    gap: 16,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
