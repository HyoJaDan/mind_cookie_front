import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DatePicker = () => {
  const [dates, setDates] = useState<string[]>([]); // 날짜를 문자열로 저장 (예: '2024-04-27')
  const [selectedDate, setSelectedDate] = useState<string>(""); // 선택된 날짜를 저장
  const screenWidth = Dimensions.get("window").width; // 화면 너비 가져오기

  // 날짜 형식 변환 함수 (YYYY-MM-DD)
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  // 최근 7일 날짜 리스트 생성 함수
  const getLast7Days = (): string[] => {
    const today = new Date();
    const datesArray: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      datesArray.push(formatDate(date));
    }
    return datesArray;
  };

  useEffect(() => {
    const initialDates = getLast7Days(); // 최근 7일 날짜 생성
    setDates(initialDates);
    setSelectedDate(formatDate(new Date())); // 기본적으로 오늘 날짜 선택
  }, []);

  // 날짜 클릭 시 호출되는 함수
  const handleDatePress = (date: string) => {
    setSelectedDate(date); // 클릭한 날짜를 선택된 날짜로 설정
    console.log(date); // 클릭한 날짜 출력 (추후 데이터를 불러오는 작업 예정)
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        horizontal={true} // 가로 스크롤 사용 안함 (기본 7개로 고정)
        showsHorizontalScrollIndicator={false} // 스크롤바 숨김
        keyExtractor={(item) => item} // 고유한 날짜 문자열을 key로 사용
        renderItem={({ item }) => {
          const isSelected = item === selectedDate;
          return (
            <TouchableOpacity
              style={[
                styles.dateContainer,
                isSelected ? styles.selectedDateContainer : null,
                { width: screenWidth / 7 }, // 화면 너비를 7등분하여 각 날짜의 너비를 설정
              ]}
              onPress={() => handleDatePress(item)}
            >
              <Text
                style={[
                  styles.dateText,
                  isSelected ? styles.selectedDateText : null,
                ]}
              >
                {new Date(item).getDate()}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,

    backgroundColor: "white", // 기본 배경색
  },
  selectedDateContainer: {
    borderRadius: 10,
    backgroundColor: "#E0E0E0", // 선택된 날짜의 배경색
  },
  dateText: {
    fontSize: 18,
    color: "#333",
  },
  selectedDateText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default DatePicker;
