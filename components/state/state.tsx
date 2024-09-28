import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiClient } from "../../data/apiClient";
import { StateDTO, stateData } from "../../data/stateData";
import { baseURLData } from "../../data/userData";
import { DefaultButton } from "../../util/defaultButton";
import NoDataMessage from "./NoDataMessage";
import StateSlider from "./stateSlider";

const State = ({ selectedDate }: { selectedDate: string }) => {
  const [stateList, setStateList] = useRecoilState<StateDTO[]>(stateData);
  const baseURL = useRecoilValue(baseURLData);
  const [isTodayDataExist, setIsTodayDataExist] = useState<boolean>(true);

  const selectedState: StateDTO = stateList.find(
    (state) => state.date === selectedDate
  ) || {
    date: selectedDate,
    positive: 50,
    negative: 50,
    lifeSatisfaction: 50,
    physicalConnection: 50,
  };

  useEffect(() => {
    const stateExists = stateList.some((state) => state.date === selectedDate);
    setIsTodayDataExist(stateExists);
  }, [selectedDate]);

  const updateState = (key: keyof StateDTO, value: number) => {
    setStateList((prevStateList) => {
      const stateExists = prevStateList.some(
        (state) => state.date === selectedDate
      );

      if (!stateExists) {
        return [
          ...prevStateList,
          {
            date: selectedDate,
            positive: 50,
            negative: 50,
            lifeSatisfaction: 50,
            physicalConnection: 50,
          },
        ].map((state) =>
          state.date === selectedDate ? { ...state, [key]: value } : state
        );
      }

      return prevStateList.map((state) =>
        state.date === selectedDate ? { ...state, [key]: value } : state
      );
    });
  };

  const saveStateFunction = async () => {
    setIsTodayDataExist(true);
    try {
      await apiClient(
        baseURL,
        `/myState`,
        "PUT",
        {
          positive: selectedState.positive,
          negative: selectedState.negative,
          lifeSatisfaction: selectedState.lifeSatisfaction,
          physicalConnection: selectedState.physicalConnection,
        },
        { date: selectedDate }
      );
      Alert.alert("상태가 성공적으로 저장되었습니다.");
    } catch (error) {
      Alert.alert("오류", "서버에 오류가 있습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {!isTodayDataExist && <NoDataMessage />}
      <StateSlider
        label="긍정 감각"
        value={selectedState.positive ?? 0}
        color="#E45252"
        onValueChange={(newValue) => updateState("positive", newValue)}
      />
      <StateSlider
        label="부정 감각"
        value={selectedState.negative ?? 0}
        color="#5284E4"
        onValueChange={(newValue) => updateState("negative", newValue)}
      />
      <StateSlider
        label="삶의 만족도"
        value={selectedState.lifeSatisfaction ?? 0}
        color="#52E48C"
        onValueChange={(newValue) => updateState("lifeSatisfaction", newValue)}
      />
      <StateSlider
        label="몸 상태"
        value={selectedState.physicalConnection ?? 0}
        color="#E4DE52"
        onValueChange={(newValue) =>
          updateState("physicalConnection", newValue)
        }
      />
      <DefaultButton pressHandler={saveStateFunction} text="상태 저장하기" />
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
});

export default State;
