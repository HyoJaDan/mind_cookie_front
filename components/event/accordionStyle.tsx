import { StyleSheet } from "react-native";
import { Colors } from "../../assets/color/color";

export const accordionStyle = StyleSheet.create({
  accordion: {
    backgroundColor: "white",
  },
  Header: {},
  accordionContent: {
    paddingTop: 10,
  },
  header: {
    textAlign: "left",
    width: "100%",
    color: Colors.basic.text_head,
  },
  boxContainer: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#E0E0E0", //"rgba(186, 169, 255, 0.43)",
    shadowColor: "rgba(0, 18, 38, 0.03)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  participantContainer: {
    flexDirection: "row", // 가로로 정렬
    flexWrap: "wrap", // 화면을 넘어가면 자동으로 줄바꿈
    justifyContent: "center", // 중앙 정렬
  },
  // 원형 스타일
  circle: {
    flexShrink: 1,
    paddingHorizontal: 10,
    height: 35,
    borderRadius: 10, // 원형으로 만들기 위해 반지름 설정
    backgroundColor: "white", //"#D9D9D9", // 배경색 설정
    alignItems: "center",
    justifyContent: "center",
    margin: 5, // 원들 간의 간격 설정
  },
  accordionOpen: {
    backgroundColor: "#BAA9FF", // 열렸을 때 배경색 변경
  },
  accordionClosed: {
    backgroundColor: "rgba(186, 169, 255, 0.43)", // 닫혔을 때 배경색
  },
  headerTouchable: {
    padding: 10, // 터치 영역을 넓혀 클릭하기 쉽게
    backgroundColor: "lightgray", // 헤더의 배경색 설정
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#FFF",
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
//"rgba(186, 169, 255, 0.43)",
