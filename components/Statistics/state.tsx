import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { fontStyle } from "../../assets/font/font";
import { StateDTO } from "../../data/state/stateData";

export default function StateBar({ stateList }: { stateList: StateDTO[] }) {
  const screenWidth = Dimensions.get("window").width;

  // 날짜 기준으로 정렬된 데이터
  const sortedStateList = [...stateList].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const barData = sortedStateList.flatMap((state) => [
    {
      value: state.positive,
      label: state.date.split("-").slice(1).join("/"),
      frontColor: "#E45252",
      spacing: 2,
      labelWidth: 50,
      labelTextStyle: { color: "gray" },
    },
    {
      value: state.negative,
      frontColor: "#5284E4",
    },
  ]);

  const lineData = sortedStateList.map((state) => ({
    value: state.lifeSatisfaction,
  }));

  const lineData2 = sortedStateList.map((state) => ({
    value: state.physicalConnection,
  }));

  const renderTitle = () => {
    return (
      <View>
        <Text style={[{ textAlign: "center" }, fontStyle.BD20]}>상태 통계</Text>
        <View style={styles.navigator}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[styles.navigatorCircle, { backgroundColor: "#E45252" }]}
            />
            <Text>긍정 지표</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[styles.navigatorCircle, { backgroundColor: "#5284E4" }]}
            />
            <Text>부정 지표</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[styles.navigatorCircle, { backgroundColor: "#52E48C" }]}
            />
            <Text>삶의 만족도</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[styles.navigatorCircle, { backgroundColor: "#E4DE52" }]}
            />
            <Text>몸 상태</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTitle()}
      <View style={{ flexDirection: "row" }}>
        <BarChart
          data={barData}
          barWidth={16}
          initialSpacing={20}
          spacing={30}
          scrollToEnd={true}
          scrollAnimation={true}
          disablePress={false}
          barBorderTopLeftRadius={4}
          barBorderTopRightRadius={4}
          minHeight={5}
          parentWidth={Math.max(barData.length * 30, screenWidth)}
          maxValue={100}
          noOfSections={4}
          xAxisLength={screenWidth}
          rulesLength={screenWidth}
          yAxisThickness={0}
          yAxisTextStyle={{ color: "gray" }}
          showLine
          lineData={lineData}
          lineConfig={{
            initialSpacing: 28,
            spacing: 48,
            thickness: 2,
            color: "#52E48C",
            hideDataPoints: false,
            dataPointsColor: "#52E48C",
            dataPointsRadius: 4,
          }}
          lineData2={lineData2}
          lineConfig2={{
            initialSpacing: 28,
            spacing: 48,
            thickness: 2,
            color: "#E4DE52",
            dataPointsColor: "#E4DE52",
            hideDataPoints: false,
            dataPointsRadius: 4,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  navigator: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
  },
  navigatorCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  yAxisContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    marginRight: 10,
  },
  yAxisText: {
    color: "gray",
    textAlign: "center",
  },

  xAxisStyle: {
    color: "gray",
    textAlign: "center",
  },
});
