import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Stop,
  TSpan,
  Text,
} from "react-native-svg";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";

const PieText = ({
  title,
  currentCalroy,
}: {
  title: string;
  currentCalroy: number;
}) => {
  return (
    <Text x="50%" y="50%" textAnchor="middle">
      <TSpan x="50%" dy={-30} fill={"#646464"} {...fontStyle.RG12}>
        {title}
      </TSpan>
      <TSpan
        fill="#FDE17F"
        fontFamily="Pretendard"
        fontSize={60}
        fontStyle="normal"
        fontWeight="bold"
        dy={64} // 해당 값은 SVG에서의 y축 위치를 조정합니다. 필요에 따라 알맞게 조정해주세요.
        textLength={32} // 'line-height'에 해당하는 속성입니다. SVG에서는 이 속성이 텍스트의 전체 길이를 정의합니다.
        lengthAdjust="spacingAndGlyphs" // 이 속성은 'letter-spacing'과 비슷하게 작동합니다. 'spacingAndGlyphs'는 글자와 글자 사이의 간격을 조정합니다.
        x="50%"
      >{`${currentCalroy}`}</TSpan>
    </Text>
  );
};

const PieCircle = ({
  color,
  pct,
  radius = 50,
  borderWidth = 2,
  arcSweepAngle = 250,
  isFullCircle,
}: {
  color: string;
  pct?: number;
  radius: number;
  borderWidth: number;
  arcSweepAngle: number;
  isOverlapped: boolean;
  isFullCircle: boolean;
}) => {
  let circ = 2 * Math.PI * radius;
  let strokePct = ((100 - pct) * circ) / 100;

  if (isFullCircle) {
    if (pct > 80) {
      return (
        <Circle
          r={radius}
          cx={radius + borderWidth}
          cy={radius + borderWidth}
          fill="transparent"
          fillRule={"nonzero"}
          stroke={(color = "red")}
          strokeWidth={borderWidth}
          strokeDasharray={circ}
          strokeDashoffset={pct ? strokePct : 0}
          strokeLinecap="round"
        ></Circle>
      );
    } else {
      return (
        <Circle
          r={radius}
          cx={radius + borderWidth}
          cy={radius + borderWidth}
          fill="transparent"
          fillRule={"nonzero"}
          stroke={pct > 0 ? color : ""}
          strokeWidth={borderWidth}
          strokeDasharray={circ}
          strokeDashoffset={pct ? strokePct : 0}
          strokeLinecap="round"
        ></Circle>
      );
    }
  }
  //배경이면
  return (
    <Circle
      r={radius}
      cx={radius + borderWidth}
      cy={radius + borderWidth}
      fill="transparent"
      fillRule={"nonzero"}
      stroke={pct > 0 ? color : ""}
      strokeWidth={borderWidth}
      strokeDasharray={`${circ * (arcSweepAngle / 360)} ${circ}`}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></Circle>
  );
};

const Pie = ({
  percentage,
  title,
  radius = 50,
  borderWidth = 2,
  rotation = 235,
  arcSweepAngle = 250,
  currentCalroy,
}: {
  percentage: number;
  color: string;
  title: string;
  radius: number;
  borderWidth: number;
  rotation: number;
  arcSweepAngle: number;
  currentCalroy: number;
}) => {
  const fullSize = radius * 2 + borderWidth * 2;
  return (
    <Svg width={fullSize} height={fullSize}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#FFA8A2" stopOpacity="1" />
          <Stop offset="52.08%" stopColor="#EFFF8F" stopOpacity="1" />
          <Stop offset="100%" stopColor="#49FFB0" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <G
        transform={`rotate(${-90 + rotation} ${radius + borderWidth} ${
          radius + borderWidth
        })`}
        fill={"white"}
      >
        <PieCircle
          borderWidth={borderWidth}
          radius={radius}
          color="#e3e3e3"
          pct={100}
          arcSweepAngle={arcSweepAngle}
          isFullCircle={false}
        />
        <PieCircle
          borderWidth={borderWidth}
          radius={radius}
          color="url(#grad)"
          pct={percentage}
          arcSweepAngle={arcSweepAngle}
          isFullCircle={true}
        />
      </G>
      <PieText title={title} currentCalroy={currentCalroy} />
    </Svg>
  );
};
export const DailyCalory = () => {
  const [totalCalory, setTotalCalory] = useState(1000);
  //이 데이터는 백엔드에서 받아오면됨
  const [currentCalroy, setCurrentCalory] = useState(700);
  const [caloryRate, setCaloryRate] = useState(0);

  useEffect(() => {
    //이 함수가, 지금 70%일때 100%가 차니까, 총량을 늘려버림
    setTotalCalory((totalCalory * 100) / 70);
  }, [currentCalroy]);
  useEffect(() => {
    setCaloryRate((currentCalroy * 100) / totalCalory);
  }, [totalCalory]);

  return (
    <View style={styles.dailyCaloryWrapper}>
      <Pie
        radius={100}
        borderWidth={10}
        percentage={caloryRate}
        color={"#E3E3E3"}
        title={"오늘의 섭취 칼로리"}
        currentCalroy={currentCalroy}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dailyCaloryWrapper: {
    width: 240,
    height: 240,
    backgroundColor: Colors.basic.white,
    borderRadius: 999, // px is not needed in React Native
    shadowColor: "#F2EFED",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1, // This controls the opacity of the shadow. Adjust as needed.
    shadowRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },
});
