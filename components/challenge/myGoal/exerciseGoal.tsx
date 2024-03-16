import { AntDesign, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useRecoilState } from "recoil";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import SwapChallengeIcon from "../../../assets/icon/challenge/swapChallenge.svg";
import {
  IExercise,
  exerciseOptions,
} from "../../../data/personalChallenge/personalChallengeData";
import { updateExerciseGoal } from "../../../data/personalChallenge/personalChallengeDataHandler";
import { userDataInMyRecord } from "../../../data/user/userData";
import { Header } from "./header";

interface IProps {
  id: number;
  goals: IExercise;
}
export function ExerciseGoal({ id, goals }: IProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(
    goals.durationInSeconds
  );
  const [caloriesBurned, setCaloriesBurned] = useState<number>(
    goals.exerciseCalorie
  );
  const [lastCalorieBurned, setLastCalorieBurned] = useState<number>(
    goals.exerciseCalorie
  );
  const [selectedExercise, setSelectedExercise] = useState<string>("running");
  const [userData, setUserData] = useRecoilState(userDataInMyRecord);

  useEffect(() => {
    let interval: any = null;

    if (isActive && selectedExercise) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
        const exercise = exerciseOptions.find(
          (e) => e.value === selectedExercise
        );
        if (exercise) {
          setCaloriesBurned(
            (prevCalories) => prevCalories + exercise.caloriesPerSecond
          );
        }
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, selectedExercise]);

  const toggleStopwatch = async () => {
    setIsActive(!isActive);

    if (isActive) {
      const calorie = caloriesBurned - lastCalorieBurned;
      setUserData((prevData) => ({
        ...prevData,
        intakedCalorie: prevData.intakedCalorie - calorie,
      }));
      setLastCalorieBurned(caloriesBurned);

      const goalAchieved = elapsedTime >= 900;
      await updateExerciseGoal(calorie, goalAchieved, elapsedTime, id);
    }
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <View style={styles.Wrapper}>
      <Header text="운동" />
      <View style={styles.Content}>
        <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
        <View style={styles.picker}>
          <View style={[styles.circle, { backgroundColor: "#A9AEB8" }]}>
            <Text style={[fontStyle.RG14, { color: Colors.basic.white }]}>
              {caloriesBurned.toFixed(2)} kcal
            </Text>
          </View>
          <RNPickerSelect
            onValueChange={(value) => setSelectedExercise(value)}
            items={exerciseOptions.map((exercise) => ({
              label: exercise.label,
              value: exercise.value,
            }))}
            placeholder={{ label: "운동 종목을 선택하세요...", value: null }}
            value={selectedExercise} // RNPickerSelect에 현재 선택된 값을 전달
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                paddingRight: 20,
              },
            }}
            useNativeAndroidPickerStyle={false} // Android에서도 iOS 스타일 적용
            Icon={() => <SwapChallengeIcon />}
          />
        </View>
        <LinearGradient
          colors={["#FF6278", "#FF8731"]}
          start={{ x: 0.0682, y: 0 }}
          end={{ x: 0.9469, y: 1 }}
          style={styles.gradient}
        >
          <TouchableOpacity style={styles.button} onPress={toggleStopwatch}>
            {isActive ? (
              <Entypo name="controller-stop" size={44} color="white" />
            ) : (
              <AntDesign name="caretright" size={44} color="white" />
            )}
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.lastFont}>기록을 시작해 볼까요?</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Wrapper: { gap: 8 },
  Content: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 15,
    alignItems: "center",
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
  },

  timeText: {
    color: "#C3C4D1",
    fontSize: 64,
    fontStyle: "normal",
    fontWeight: "600",
  },
  gradient: {
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.13)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    width: 88,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "stretch",
  },
  circle: {
    height: 36,
    paddingHorizontal: 16,
    alignItems: "center",

    flexDirection: "row",
    borderRadius: 40,
  },
  lastFont: {
    fontSize: 13,
    fontFamily: "Pretendard-Medium",
    color: "#CCC",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 36,
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 25,

    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",

    color: "#646464",
    borderRadius: 20,
    backgroundColor: "#F2F3F5",
    paddingRight: 50,
  },
  inputAndroid: {
    height: 36,
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 25,

    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",

    color: "#646464",
    borderRadius: 20,
    backgroundColor: "#F2F3F5",
    paddingRight: 50,
  },
});
