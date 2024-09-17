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
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilState, useRecoilValue } from "recoil";
import { Colors } from "../assets/color/color";
import { fontStyle } from "../assets/font/font";
import { apiClient } from "../data/apiClient";
import { stopwatchData } from "../data/stopwatch";
import { baseURLData } from "../data/user/userData";
import { formatDate3 } from "../uitll/dateConverter";
import { DefaultButton } from "../uitll/defaultButton";

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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);
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

  const stopStopwatch = (target: string) => {
    setIsRunning(false);
    submitStopwatchTime(target);
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
        <Text style={[fontStyle.BD50, { color: "white" }]}>
          {formatTime(totalElapsedTime)}
        </Text>
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
          <View style={styles.modalContainer}>
            <Text style={[fontStyle.BD24, { alignSelf: "flex-start" }]}>
              목표 추가
            </Text>
            <TextInput
              placeholder="새 목표 입력"
              value={newTarget}
              onChangeText={setNewTarget}
              style={styles.input}
            />
            <DefaultButton pressHandler={addTarget} text="목표 추가" />
          </View>
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
    justifyContent: "center",
    alignItems: "center",
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