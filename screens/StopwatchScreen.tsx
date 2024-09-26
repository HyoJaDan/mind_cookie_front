import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  AppState,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilState, useRecoilValue } from "recoil";
import { Colors } from "../assets/color/color";
import { fontStyle } from "../assets/font/font";
import { apiClient } from "../data/apiClient";
import { allStopwatchData, stopwatchData } from "../data/stopwatch";
import { baseURLData } from "../data/userData";
import { formatDate3 } from "../util/dateConverter";
import { DefaultButton } from "../util/defaultButton";

export default function StopwatchScreen() {
  const insets = useSafeAreaInsets();
  const baseURL = useRecoilValue(baseURLData);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [stopwatchTargets, setStopwatchTargets] = useRecoilState(stopwatchData);
  const [selectedTarget, setSelectedTarget] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [totalElapsedTime, setTotalElapsedTime] = useState(0); // 총 집중량 시간
  const [allStopwatchTargets, setAllStopwatchTargets] =
    useRecoilState(allStopwatchData);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  // FlatList 렌더링 전에 총 집중량 초기값 계산
  useEffect(() => {
    const totalInitialTime = stopwatchTargets.reduce((acc, target) => {
      const [hours, minutes, seconds] = target.time.split(":").map(Number);
      return acc + (hours * 3600 + minutes * 60 + seconds) * 1000;
    }, 0);
    setTotalElapsedTime(totalInitialTime);
  }, [stopwatchTargets]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState === "active" && nextAppState.match(/inactive|background/)) {
        setStartTime(Date.now() - elapsedTime);
      } else if (nextAppState === "active") {
        if (isRunning) {
          setElapsedTime(Date.now() - startTime);
        }
      }
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, [appState, isRunning, startTime, elapsedTime]);

  const startStopwatch = (target: string) => {
    const selectedTargetData = stopwatchTargets.find(
      (item) => item.target === target
    );
    if (selectedTargetData) {
      const [hours, minutes, seconds] = selectedTargetData.time
        .split(":")
        .map(Number);
      const newElapsedTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
      setElapsedTime(newElapsedTime);
    }

    setSelectedTarget(target);
    setStartTime(Date.now() - elapsedTime);
    setIsRunning(true);
  };
  const updateAllStopwatchData = (target: string) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`; // yyyy-MM-dd 형식으로 날짜 포맷
    const formattedTime = formatTime(elapsedTime); // 기존의 시간 포맷 함수

    setAllStopwatchTargets((prevTargets) => {
      const targetIndex = prevTargets.findIndex(
        (item) => item.target === target
      );

      if (targetIndex >= 0) {
        // 타겟이 이미 존재할 경우
        const existingDateIndex = prevTargets[
          targetIndex
        ].dateTimeList.findIndex((dateTime) => dateTime.date === formattedDate);

        let updatedDateTimeList;
        if (existingDateIndex >= 0) {
          // 이미 해당 날짜가 존재할 경우 시간 업데이트
          updatedDateTimeList = prevTargets[targetIndex].dateTimeList.map(
            (dateTime, index) =>
              index === existingDateIndex
                ? { ...dateTime, time: formattedTime }
                : dateTime
          );
        } else {
          // 해당 날짜가 존재하지 않을 경우 새로 추가
          updatedDateTimeList = [
            ...prevTargets[targetIndex].dateTimeList,
            { date: formattedDate, time: formattedTime },
          ];
        }

        const updatedTarget = {
          ...prevTargets[targetIndex],
          dateTimeList: updatedDateTimeList,
        };
        return [
          ...prevTargets.slice(0, targetIndex),
          updatedTarget,
          ...prevTargets.slice(targetIndex + 1),
        ];
      } else {
        // 타겟이 존재하지 않을 경우 새로 추가
        return [
          ...prevTargets,
          {
            target: target,
            dateTimeList: [{ date: formattedDate, time: formattedTime }],
          },
        ];
      }
    });
  };

  const stopStopwatch = (target: string) => {
    setIsRunning(false);
    submitStopwatchTime(target);
    updateAllStopwatchData(target);
  };

  // 매 1초마다 남은 시간 업데이트 및 해당 타이머의 시간 업데이트
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1000); // 현재 선택된 타이머 시간 증가
        setTotalElapsedTime((prev) => prev + 1000); // 총 집중량 시간 증가

        // 선택된 타이머의 시간 업데이트
        setStopwatchTargets((prevTargets) =>
          prevTargets.map((target) =>
            target.target === selectedTarget
              ? {
                  ...target,
                  time: formatTime(elapsedTime + 1000),
                }
              : target
          )
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, elapsedTime, selectedTarget]);

  const formatTime = (timeInMilliseconds: number) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const submitStopwatchTime = async (target: string) => {
    const formattedTime = formatTime(elapsedTime);
    await apiClient(baseURL, "/stopwatch/update-time", "PUT", {
      target,
      time: formattedTime,
    });
  };

  const addTarget = async () => {
    if (!newTarget) return;

    await apiClient(baseURL, `/add-stopwatch-target`, "PUT", null, {
      add: newTarget,
    });

    setStopwatchTargets((prev) => [
      ...prev,
      { target: newTarget, time: "00:00:00" },
    ]);

    setNewTarget("");
    bottomSheetModalRef.current?.close();
  };

  const removeTarget = async (targetToRemove: string) => {
    Alert.alert(
      "목표 삭제",
      "진짜 해당 스탑워치를 삭제하시겠어요? \n* 목표를 삭제하면 기존의 스탑워치 기록을 볼 수 없어요!",
      [
        {
          text: "아니오",
          style: "cancel",
        },
        {
          text: "예",
          onPress: async () => {
            await apiClient(baseURL, `/remove-stopwatch-target`, "PUT", null, {
              targetToRemove,
            });

            setStopwatchTargets((prev) =>
              prev.filter((target) => target.target !== targetToRemove)
            );
            bottomSheetModalRef.current?.close();
          },
        },
      ]
    );
  };

  const renderTargetItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.targetItem}
      onPress={() =>
        isRunning && selectedTarget === item.target
          ? stopStopwatch(item.target)
          : startStopwatch(item.target)
      }
    >
      <Ionicons
        name={isRunning && selectedTarget === item.target ? "stop" : "play"}
        size={24}
        color={isRunning && selectedTarget === item.target ? "red" : "black"}
      />
      <View style={styles.targetDetails}>
        <Text>{item.target}</Text>
        <Text>{item.time}</Text>
      </View>
      <TouchableOpacity onPress={() => removeTarget(item.target)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <BottomSheetModalProvider>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#2D81FF", "#8785FF"]}
        style={styles.timeContainer}
      >
        <Text
          style={[fontStyle.MD14, { color: "white" }, { marginBottom: 20 }]}
        >
          {formatDate3()} 총 집중량
        </Text>
        <View>
          <Text style={[fontStyle.BD50, { color: "white" }]}>
            {formatTime(totalElapsedTime)}
          </Text>
        </View>
      </LinearGradient>
      <SafeAreaView style={[styles.rootContainer, { paddingTop: insets.top }]}>
        <View style={styles.container}>
          <FlatList
            data={stopwatchTargets}
            renderItem={renderTargetItem}
            keyExtractor={(item) => item.target}
            ListFooterComponent={() => (
              <TouchableOpacity
                style={styles.addTargetButton}
                onPress={handlePresentModalPress}
              >
                <Ionicons name="add" size={20} color="black" />
                <Text style={fontStyle.MD16}>목표 추가</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <View>
                <Text style={[fontStyle.BD24, { alignSelf: "flex-start" }]}>
                  목표 추가
                </Text>
                <TextInput
                  placeholder="새 목표 입력"
                  value={newTarget}
                  onChangeText={setNewTarget}
                  style={styles.input}
                  autoFocus={true}
                />
              </View>
              <DefaultButton pressHandler={addTarget} text="목표 추가" />
            </View>
          </TouchableWithoutFeedback>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    gap: 24,
    backgroundColor: Colors.basic.bachground,
  },
  container: {
    alignItems: "center",
    padding: 20,
    gap: 50,
  },
  targetItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  targetDetails: {
    flex: 1,
    marginLeft: 15,
  },
  timeContainer: {
    width: "100%",
    height: "25%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addTargetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 30,
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});
