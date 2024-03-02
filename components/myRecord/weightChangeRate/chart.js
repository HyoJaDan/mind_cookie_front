import { LineChart } from "react-native-chart-kit";
import { Line, Svg } from "react-native-svg";

const CustomChart = () => (
  <Svg height="100%" width="100%">
    {/* 가로선 */}
    <Line x1="0" y1="50%" x2="100%" y2="50%" stroke="black" strokeWidth="2" />
    {/* 세로선은 제외 */}
  </Svg>
);

export const WeightChangeRateChart = () => {
  const data = {
    labels: ["07.31", "08.30", "09.30", "10.30", "11.30", "01.30"],
    datasets: [
      {
        data: [63, 67, 65, 60, 58, 55],
        color: (opacity = 1) => `rgba(131, 131, 131, ${opacity})`, // 점들의 색
        strokeWidth: 5, // optional
      },
    ],
    //legend: ["Rainy Days"], // optional
  };
  const chartConfig = {
    //1~4는 배경색
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0,
    fillShadowGradientFrom: "#ffffff",
    fillShadowGradientTo: "#ffffff",
    propsForBackgroundLines: {
      strokeDasharray: "",
    },
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <LineChart
      data={data}
      width="290"
      height={220}
      chartConfig={chartConfig}
      verticalLabelRotation={30}
      bezier
      withVerticalLines={false}
      yLabelsOffset={30}
    />
  );
};
