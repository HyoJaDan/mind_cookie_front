import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useRecoilState } from "recoil";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import PlayIcon from "../../../assets/icon/challenge/play.svg";
import { default as SwapChallengeIcon } from "../../../assets/icon/challenge/swapChallenge.svg";
import MainIcon from "../../../assets/icon/mainIcon/main3.svg";
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
        <View style={styles.container}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedExercise(value)}
            items={exerciseOptions.map((exercise) => ({
              label: exercise.label,
              value: exercise.value,
            }))}
            placeholder={{ label: "운동 종목을 선택하세요...", value: null }}
            value={selectedExercise}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                paddingRight: 20,
              },
            }}
            useNativeAndroidPickerStyle={false}
            Icon={() => <SwapChallengeIcon />}
          />
          <View
            style={[
              styles.circle,
              { backgroundColor: Colors.grayscale.gray100 },
            ]}
          >
            <Text
              style={[fontStyle.RG14, { color: Colors.basic.text_default }]}
            >
              {caloriesBurned.toFixed(2)} kcal
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
          {isActive ? (
            <TouchableOpacity
              style={styles.playButton}
              onPress={toggleStopwatch}
            >
              <PlayIcon />
            </TouchableOpacity>
          ) : (
            <LinearGradient
              colors={["#FF6278", "#FF8731"]}
              start={{ x: 0.0682, y: 0 }}
              end={{ x: 0.9469, y: 1 }}
              style={styles.gradient}
            >
              <TouchableOpacity
                style={styles.stopButton}
                onPress={toggleStopwatch}
              >
                <AntDesign name="caretright" size={44} color="white" />
              </TouchableOpacity>
            </LinearGradient>
          )}
        </View>
        <View style={[styles.container, { gap: 10 }]}>
          <MainIcon />
          <View style={styles.textWrapper}>
            <Text style={[fontStyle.RG12, { color: Colors.primary.primary }]}>
              운동 목표를 달성하기 위해
            </Text>
            <Text style={[fontStyle.RG12, { color: Colors.primary.primary }]}>
              15분 이상의 운동이 필요해요!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Wrapper: { gap: 8 },
  Content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 24,
    alignItems: "center",
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    color: "#C3C4D1",
    fontSize: 64,
    fontStyle: "normal",
    fontWeight: "600",
  },
  gradient: {
    borderRadius: 999,
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.13)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  stopButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 64,
    height: 64,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 999,
    borderWidth: 5,
    borderColor: "#FF6278",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.14,
    shadowRadius: 11,
    elevation: 10,
  },
  circle: {
    height: 36,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDAD7",
    backgroundColor: "#F7F7F7",
  },
  textWrapper: {
    backgroundColor: Colors.primary.primary100,
    borderRadius: 10,
    padding: 16,
    flex: 1,
    justifyContent: "center",
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
