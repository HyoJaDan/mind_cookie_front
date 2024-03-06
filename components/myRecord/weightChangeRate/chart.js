import { LineChart } from "react-native-chart-kit";
import { Line, Svg } from "react-native-svg";

const CustomChart = () => (
  <Svg height="100%" width="100%">
    {/* 가로선 */}
    <Line x1="0" y1="50%" x2="100%" y2="50%" stroke="black" strokeWidth="2" />
    {/* 세로선은 제외 */}
  </Svg>
);

export const WeightChangeRateChart = ({ weight }) => {
  const data = {
    labels: weight.map((item) => item.date.slice(5, 10).split("-").join(".")), // date를 추출하고, MM.DD 형식으로 변환
    datasets: [
      {
        data: weight.map((item) => item.weight), // weight를 추출
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
