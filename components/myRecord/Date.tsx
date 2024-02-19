import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../assets/color/color";

export const Today = () => {
  const dateToStr = (date: Date) => {
    var week = new Array("일", "월", "화", "수", "목", "금", "토");

    var localTime = date.toLocaleTimeString();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dayName = week[date.getDay()];

    return month + "월 " + day + "일 " + dayName + "요일 ";
  };
  const temp = dateToStr(new Date());
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{temp}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.basic.white,
    borderRadius: 99,
    paddingVertical: 8, // 이 값은 단위가 픽셀이 아니라 포인트입니다.
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Pretendard-Bold",
  },
});
