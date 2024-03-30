import React from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import { ITeamData, MealRecord } from "../../../data/team/teamData";
import { Commonstyles } from "../../../uitll/defaultStyle";
import { MealButton } from "../../../uitll/mealButton";
import TeamAchievementDashboard from "./TeamAchievementDashboard";

interface ExtendedMealRecord extends MealRecord {
  memberId: number;
  teamUserName: string;
}

type ExtendedMealRecords = ExtendedMealRecord[];

interface MealRecordBoardProps {
  data: ITeamData;
}

// MealRecordBoard 컴포넌트 정의
const MealRecordBoard: React.FC<MealRecordBoardProps> = ({ data }) => {
  console.log("COMMEDDATE", data);
  const extendedMealRecords: ExtendedMealRecords = data.memberDTOS.flatMap(
    (member) =>
      member.mealRecords.map((mealRecord) => ({
        ...mealRecord,
        memberId: member.memberId,
        teamUserName: member.teamUserName,
      }))
  );
  const extendedMealRecordsSorted: ExtendedMealRecords =
    extendedMealRecords.sort(
      (a, b) =>
        new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
    );

  let lastRenderedDate = "";
  const renderItem = ({ item }: ListRenderItemInfo<ExtendedMealRecord>) => {
    if (item === undefined) return null;
    const date = new Date(item.createdTime);

    const formattedDate = `${date.getMonth() + 1}/${date.getDate()} (${
      ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
    })`;

    // Format as "12:08 PM"
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    const dateDisplay =
      lastRenderedDate !== formattedDate ? (
        <Text style={[fontStyle.SB14, { color: Colors.basic.text_extralight }]}>
          {formattedDate}
        </Text>
      ) : null;
    lastRenderedDate = formattedDate;

    return (
      <View style={styles.flagListPadding}>
        {dateDisplay}
        <View style={styles.recordItem}>
          <View style={styles.renderHeader}>
            <View style={styles.circle} />
            <View style={styles.renderHeaderContent}>
              <Text>{item.teamUserName}</Text>
              <Text
                style={[
                  fontStyle.RG14,
                  { color: Colors.basic.text_extralight },
                ]}
              >
                {formattedTime}
              </Text>
            </View>
          </View>
          <MealButton
            type={item.recordType}
            title={item.title}
            backgroundColor={Colors.grayscale.gray100}
          />
          <Text style={[fontStyle.RG15, { color: Colors.basic.text_default }]}>
            {item.content}
          </Text>
          {item.imageUrl && (
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          )}
        </View>
        <View style={Commonstyles.line} />
      </View>
    );
  };

  return (
    <View style={styles.Wrapper}>
      {extendedMealRecordsSorted.length == 0 ? (
        <View>
          <TeamAchievementDashboard data={data} />
          <Text style={styles.flagListWrapper}>아직 식단 사진이 없습니다</Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.dashBoardWrapper}>
              <View style={styles.dashBoardPadding}>
                <TeamAchievementDashboard data={data} />
              </View>
            </View>
          )}
          data={extendedMealRecordsSorted}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: Colors.basic.white,
  },
  dashBoardWrapper: {
    backgroundColor: Colors.basic.bachground,
  },
  dashBoardPadding: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  flagListWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    minHeight: "100%",
    gap: 16,
  },
  flagListPadding: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },
  recordItem: {
    paddingBottom: 8,
    gap: 16,
  },
  renderHeader: {
    flexDirection: "row",
    gap: 8,
  },
  renderHeaderContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: Colors.basic.bachground,
  },
  image: {
    height: 257,
    borderRadius: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.basic.white,
  },
});

export default MealRecordBoard;
