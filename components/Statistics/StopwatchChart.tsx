import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { fontStyle } from "../../assets/font/font";
import { IAllStopwatch } from "../../data/stopwatch";

export default function StopwatchChart({
  stopwatchData,
  screenWidth,
}: {
  stopwatchData: IAllStopwatch[];
  screenWidth: number;
}) {
  // 모든 날짜를 수집하는 함수
  const collectAllDates = (data: IAllStopwatch[]) => {
    const allDates = new Set<string>();
    data.forEach((stopwatch) => {
      stopwatch.dateTimeList.forEach((dateTime) => {
        const dateLabel = new Date(dateTime.date)
          .toISOString()
          .slice(5, 10)
          .replace("-", "/");
        allDates.add(dateLabel);
      });
    });
    return Array.from(allDates).sort(); // 날짜를 정렬된 배열로 반환
  };

  // 모든 날짜를 수집
  const allDates = collectAllDates(stopwatchData);

  // LineChart에 필요한 데이터 형식으로 변환하는 함수
  const createChartData = (data: IAllStopwatch, allDates: string[]) => {
    // 각 날짜에 대해 처리
    return allDates.map((date) => {
      // 현재 날짜에 해당하는 time이 있으면 그 값을 사용하고, 없으면 0을 사용
      const dateTime = data.dateTimeList.find((dt) => {
        const dateLabel = new Date(dt.date)
          .toISOString()
          .slice(5, 10)
          .replace("-", "/");
        return dateLabel === date;
      });

      let timeInMinutes = 0;

      if (dateTime) {
        // 시간을 바로 분 단위로 변환
        timeInMinutes =
          parseInt(dateTime.time.split(":")[0]) * 60 + // 시 -> 분 변환
          parseInt(dateTime.time.split(":")[1]); // 분 그대로 사용
      }

      return {
        value: timeInMinutes, // 바로 분으로 사용
        label: date, // 월/일 형식으로 변환된 날짜 라벨
      };
    });
  };

  // 최대 5개의 데이터를 각각 변환
  const sortedStopwatchData = [...stopwatchData]
    .sort((a, b) => b.dateTimeList.length - a.dateTimeList.length)
    .slice(0, 5); // 최대 5개 선택

  const chartData1 = sortedStopwatchData[0]
    ? createChartData(sortedStopwatchData[0], allDates)
    : [];
  const chartData2 = sortedStopwatchData[1]
    ? createChartData(sortedStopwatchData[1], allDates)
    : [];
  const chartData3 = sortedStopwatchData[2]
    ? createChartData(sortedStopwatchData[2], allDates)
    : [];
  const chartData4 = sortedStopwatchData[3]
    ? createChartData(sortedStopwatchData[3], allDates)
    : [];
  const chartData5 = sortedStopwatchData[4]
    ? createChartData(sortedStopwatchData[4], allDates)
    : [];
  const calculateMaxValue = () => {
    const maxValue = Math.max(
      ...chartData1.map((item) => item.value),
      ...chartData2.map((item) => item.value),
      ...chartData3.map((item) => item.value),
      ...chartData4.map((item) => item.value),
      ...chartData5.map((item) => item.value)
    );

    // 최소값을 60으로 설정
    return maxValue < 60 ? 60 : maxValue;
  };
  const renderTitle = () => {
    return (
      <View>
        <Text style={[{ textAlign: "center" }, fontStyle.BD20]}>생활 습관</Text>
        <View style={styles.navigator}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[styles.navigatorCircle, { backgroundColor: "skyblue" }]}
            />
            <Text>{sortedStopwatchData[0]?.target || "Target 1"}</Text>
          </View>
          {sortedStopwatchData[1] && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={[styles.navigatorCircle, { backgroundColor: "orange" }]}
              />
              <Text>{sortedStopwatchData[1]?.target || "Target 2"}</Text>
            </View>
          )}
          {sortedStopwatchData[2] && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={[styles.navigatorCircle, { backgroundColor: "purple" }]}
              />
              <Text>{sortedStopwatchData[2]?.target || "Target 3"}</Text>
            </View>
          )}
          {sortedStopwatchData[3] && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={[styles.navigatorCircle, { backgroundColor: "green" }]}
              />
              <Text>{sortedStopwatchData[3]?.target || "Target 4"}</Text>
            </View>
          )}
          {sortedStopwatchData[4] && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={[styles.navigatorCircle, { backgroundColor: "red" }]}
              />
              <Text>{sortedStopwatchData[4]?.target || "Target 5"}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[fontStyle.BD16, { color: "gray" }]}>
          데이터가 없습니다.
        </Text>
        <Text style={[fontStyle.RG14, { color: "gray", marginTop: 8 }]}>
          생활 습관을 기록해주세요.
        </Text>
      </View>
    );
  };

  if (stopwatchData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[{ textAlign: "center" }, fontStyle.BD20]}>생활 습관</Text>
        {renderEmptyState()}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {renderTitle()}
        <LineChart
          areaChart={true}
          data={chartData1}
          data2={chartData2}
          data3={chartData3}
          data4={chartData4}
          data5={chartData5}
          width={screenWidth - 65}
          height={150}
          xAxisLength={screenWidth - 65}
          verticalLinesColor="#E0E0E0"
          yAxisThickness={0}
          yAxisTextStyle={{ color: "gray" }}
          formatYLabel={(yValue) => Math.floor(Number(yValue)).toString()}
          xAxisLabelTextStyle={{ color: "gray", paddingLeft: 15 }}
          xAxisColor={"gray"}
          spacing={60}
          initialSpacing={15}
          endSpacing={15}
          noOfSections={4}
          maxValue={calculateMaxValue()}
          scrollToEnd={true}
          scrollAnimation={true}
          color1="skyblue"
          color2="orange"
          color3="purple"
          color4="green"
          color5="red"
          textColor1="green"
          hideDataPoints
          dataPointsColor1="blue"
          dataPointsColor2="red"
          dataPointsColor3="purple"
          dataPointsColor4="green"
          dataPointsColor5="red"
          startFillColor1="skyblue"
          startFillColor2="orange"
          startFillColor3="purple"
          startFillColor4="green"
          startFillColor5="red"
          startOpacity={0.8}
          endOpacity={0.6}
          yAxisLabelSuffix="분"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  targetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  navigator: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 12,
  },
  navigatorCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  yAxisText: {
    color: "gray",
    textAlign: "center",
  },

  xAxisStyle: {
    color: "gray",
    textAlign: "center",
  },

  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 150, // 적당한 높이 설정
  },
});
