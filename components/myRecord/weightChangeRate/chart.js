import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export const WeightChangeRateChart = ({ weight }) => {
  const data = {
    labels: weight.map((item, index) => {
      if (index === 0 || index === weight.length - 1) {
        return item.date.slice(5, 10).split("-").join(".");
      }
      return "";
    }),
    datasets: [
      {
        data: weight.map((item) => item.weight),
        color: (opacity = 1) => `rgba(131, 131, 131, ${opacity})`,
        strokeWidth: 5,
      },
    ],
  };

  const chartConfig = {
    //1~4는 배경색
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0,

    //두개는 차트 아래의 색을 정의
    fillShadowGradientFrom: "#ffffff",
    fillShadowGradientTo: "#ffffff",

    propsForBackgroundLines: {
      strokeDasharray: "",
    },
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    //labelColor: () => "#c2c2c2",
    labelColor: () => "black",
    barPercentage: 0.5,

    decimalPlaces: 1,
  };
  const screenWidth = Dimensions.get("window").width;
  return (
    <LineChart
      data={data}
      width="287"
      height={220}
      chartConfig={chartConfig}
      bezier
      withVerticalLines={false}
      yLabelsOffset={35}
    />
  );
};
