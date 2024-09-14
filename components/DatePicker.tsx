import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilValue } from "recoil";
import { screenWidthData } from "../data/screen";

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const [dates, setDates] = useState<string[]>([]);
  const screenWidth = useRecoilValue(screenWidthData);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

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
    const initialDates = getLast7Days();
    setDates(initialDates);
    setSelectedDate(formatDate(new Date()));
  }, []);

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.Wrapper}>
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
  Wrapper: {
    height: 43,
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
