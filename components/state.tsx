import Slider from "@react-native-community/slider";
import React, { useEffect } from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { fontStyle } from "../assets/font/font";
import { apiClient } from "../data/apiClient";
import { StateDTO, stateData } from "../data/state/stateData";
import { baseURLData } from "../data/user/userData";
import { DefaultButton } from "../uitll/defaultButton";

const screenWidth = Dimensions.get("window").width;

const State = ({ selectedDate }: { selectedDate }) => {
  const [state, setState] = useRecoilState(stateData);

  const baseURL = useRecoilValue(baseURLData);
  useEffect(() => {
    const fetchStateForSelectedDate = async () => {
      try {
        const response = await apiClient(baseURL, "/myState", "GET", null, {
          date: selectedDate,
        });

        setState({
          positive: response.data.positive,
          negative: response.data.negative,
          lifeSatisfaction: response.data.lifeSatisfaction,
          physicalCondition: response.data.physicalCondition,
        });
      } catch (error) {
        console.error("선택한 날짜의 상태를 가져오는 중 오류 발생:", error);
      }
    };
    fetchStateForSelectedDate();
  }, [selectedDate]);

  const updateState = (key: keyof StateDTO, value: number) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const getStatusDescription = (value: number) => {
    if (value <= 5) return "매우 그렇지 않다";
    if (value <= 15) return "그렇지 않다";
    if (value <= 30) return "약간 그렇지 않다";
    if (value <= 70) return "보통";
    if (value <= 85) return "약간 그렇다";
    if (value <= 95) return "그렇다";
    return "매우 그렇다";
  };

  const renderSlider = (
    label: string,
    value: number,
    key: keyof StateDTO,
    color: string
  ) => {
    const minCircleSize = 30;
    const maxCircleSize = 170;

    const circleSize =
      minCircleSize + (maxCircleSize - minCircleSize) * (value / 100);

    return (
      <View style={styles.boxContainer}>
        <Text style={styles.labelText}>{label}</Text>
        <View style={styles.circleWrapper}>
          <View
            style={[
              styles.circle,
              {
                width: circleSize,
                height: circleSize,
                backgroundColor: color,
              },
            ]}
          />
        </View>
        <Text style={[styles.statusText, fontStyle.MD16]}>
          {getStatusDescription(value)}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={value}
          onValueChange={(newValue) => updateState(key, newValue)}
          minimumTrackTintColor={color}
          maximumTrackTintColor="#000000"
        />
      </View>
    );
  };

  const saveStateFunction = async () => {
    try {
      await apiClient(
        baseURL,
        `/myState`,
        "PUT",
        {
          positive: state.positive,
          negative: state.negative,
          lifeSatisfaction: state.lifeSatisfaction,
          physicalCondition: state.physicalCondition,
        },
        { date: selectedDate }
      );

      Alert.alert("상태가 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("상태 저장 중 오류 발생:", error);
      Alert.alert("오류", "상태 저장 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {renderSlider("긍정 감각", state.positive, "positive", "#E45252")}
      {renderSlider("부정 감각", state.negative, "negative", "#5284E4")}
      {renderSlider(
        "삶의 만족도",
        state.lifeSatisfaction,
        "lifeSatisfaction",
        "#52E48C"
      )}
      {renderSlider(
        "몸 상태",
        state.physicalCondition,
        "physicalCondition",
        "#E4DE52"
      )}
      <DefaultButton
        pressHandler={saveStateFunction}
        text="오늘 상태 저장하기"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 24,
  },
  boxContainer: {
    width: 327,
    height: 344,
    padding: 20,
    flexShrink: 0,
    borderRadius: 16,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 18, 38, 0.03)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 190,
    marginBottom: 20,
  },
  circle: {
    borderRadius: 100,
  },

  labelText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 16,
    color: "#333",
  },
  slider: {
    width: screenWidth * 0.65,
    height: 40,
  },
});

export default State;
