import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import IncreaseIcon from "../../../assets/icon/teamList/increase.svg";
import MaintainIcon from "../../../assets/icon/teamList/maintain.svg";
import ReduceIcon from "../../../assets/icon/teamList/reduce.svg";
import { ITeams } from "../../../data/team/teamData";
import { calculateDaysFromNow, formatDate } from "../../../uitll/dateConverter";

interface RenderItemProps {
  item: ITeams;
  onPress: () => void; // 추가: 클릭 이벤트 핸들러 prop
}

export const RenderItemComponent: FC<RenderItemProps> = ({ item, onPress }) => {
  formatDate(item.startDate);
  const date = `${formatDate(item.startDate)} ~ ${formatDate(item.endDate)}`;
  const startDayFromNow = calculateDaysFromNow(item.startDate);

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View style={styles.Wrapper}>
          <RenderChallengeType challengeType={item.challngeType} />
          <Text style={[fontStyle.BD16, { color: Colors.basic.text_default }]}>
            {item.teamName}
          </Text>
          <View style={styles.date}>
            <View style={styles.dates}>
              <Text
                style={[fontStyle.RG14, { color: Colors.basic.text_light }]}
              >
                {date}
              </Text>
              <Text
                style={[fontStyle.RG14, { color: Colors.primary.primary500 }]}
              >
                (5주)
              </Text>
            </View>
            <View style={styles.Circle}>
              <Text style={[fontStyle.SB10, { color: Colors.basic.white }]}>
                D-{startDayFromNow}
              </Text>
            </View>
          </View>
          <View style={[styles.participatePeople]}>
            <Text
              style={[fontStyle.RG14, { color: Colors.basic.text_extralight }]}
            >
              {item.numOfMember}/{item.maxTeamMemberNumber}명
            </Text>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    </TouchableOpacity>
  );
};

interface ChallengeTypeConfig {
  [key: string]: {
    // 인덱스 시그니처 추가
    Icon: FC<SvgProps>;
    text: string;
  };
}

const challengeTypeConfig: ChallengeTypeConfig = {
  reduce: { Icon: ReduceIcon, text: "감량" },
  increase: { Icon: IncreaseIcon, text: "증량" },
  maintain: { Icon: MaintainIcon, text: "유지" },
};

const RenderChallengeType = ({ challengeType }: { challengeType: string }) => {
  const config = challengeTypeConfig[challengeType];
  if (config) {
    const { Icon, text } = config;
    return (
      <View style={styles.header}>
        <Icon />
        <Text style={[fontStyle.SB13, { color: Colors.basic.text_light }]}>
          {text}
        </Text>
      </View>
    );
  }

  return null; // 유효하지 않은 challengeType인 경우
};

const styles = StyleSheet.create({
  Wrapper: {
    gap: 8,
    marginHorizontal: 24,
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    gap: 4,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dates: {
    flexDirection: "row",
  },
  participatePeople: {
    flexDirection: "row",
  },
  Circle: {
    borderRadius: 4,
    backgroundColor: Colors.primary.primary500,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.basic.line_light,
  },
});
