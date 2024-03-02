import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../assets/color/color";
import { fontStyle } from "../../assets/font/font";

export const Today = () => {
  const dateToStr = (date: Date) => {
    var week = new Array("일", "월", "화", "수", "목", "금", "토");
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dayName = week[date.getDay()];

    return (
      <View style={styles.fontWrapper}>
        <Text style={[fontStyle.BD16, styles.date]}>
          {month}월 {day}일
        </Text>
        <View style={styles.dayContainer}>
          <Text style={[fontStyle.RG14, styles.day]}>{dayName}요일</Text>
        </View>
      </View>
    );
  };
  const temp = dateToStr(new Date());
  return <View style={styles.wrapper}>{temp}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.basic.white,
    borderRadius: 99,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  fontWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  date: {
    color: Colors.basic.text_light,
    textShadowColor: "#464646",
    /* textShadowColor: "rgba(70,70,70,0.12)", */
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
    shadowOpacity: 0.12,
  },
  dayContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary.primary100,
    borderRadius: 40,
  },
  day: {
    color: Colors.primary.primary400,
  },
});
