import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  AppState,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilState, useRecoilValue } from "recoil";
import { Colors } from "../assets/color/color";
import { fontStyle } from "../assets/font/font";
import { apiClient } from "../data/apiClient";
import { stopwatchData } from "../data/stopwatch";

import { baseURLData } from "../data/user/userData";
import { DefaultButton } from "../uitll/defaultButton";

export default function TimerScreen() {
  const insets = useSafeAreaInsets();
  const baseURL = useRecoilValue(baseURLData);
  const [startTime, setStartTime] = useState(0); // 시작 시간
  const [remainingTime, setRemainingTime] = useState(60); // 남은 시간
  const [isRunning, setIsRunning] = useState(false); // 타이머 상태 (시작/정지)
  const [appState, setAppState] = useState(AppState.currentState);
  const [stopwatchTargets, setStopwatchTargets] = useRecoilState(stopwatchData); // 목표 데이터
  const [selectedTarget, setSelectedTarget] = useState(
    stopwatchTargets[0]?.target || ""
  );
  const [newTarget, setNewTarget] = useState("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["70%"], []);
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

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState === "active" && nextAppState.match(/inactive|background/)) {
        setStartTime(Date.now() - remainingTime * 1000);
      } else if (nextAppState === "active") {
        if (isRunning) {
          setRemainingTime(
            (prev) => prev - Math.floor((Date.now() - startTime) / 1000)
          );
        }
      }
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, [appState, isRunning, startTime, remainingTime]);

  // 기존 목표에 맞는 타이머 값 설정
  useEffect(() => {
    const selectedTargetData = stopwatchTargets.find(
      (target) => target.target === selectedTarget
    );
    if (selectedTargetData) {
      const [hours, minutes, seconds] = selectedTargetData.time
        .split(":")
        .map(Number);
      const newRemainingTime = hours * 3600 + minutes * 60 + seconds;
      setRemainingTime(newRemainingTime);
    }
  }, [selectedTarget]);

  const startTimer = () => {
    setStartTime(Date.now()); // 타이머 시작 시간 설정
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false); // 타이머 정지
    submitTimerTime(); // 타이머 종료 시 시간 업데이트
  };

  // 매 1초마다 남은 시간 업데이트
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0)); // 1초마다 감소
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  // 시간 형식 변환 함수
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const submitTimerTime = async () => {
    const formattedTime = formatTime(remainingTime); // 포맷된 시간을 서버로 전송
    await apiClient(baseURL, "/stopwatch/update-time", "PUT", {
      target: selectedTarget,
      time: formattedTime,
    });
  };

  // 목표 추가 함수
  const addTarget = async () => {
    if (!newTarget) return;

    await apiClient(baseURL, `/add-stopwatch-target`, "PUT", null, {
      add: newTarget,
    });

    setStopwatchTargets((prev) => [
      ...prev,
      { target: newTarget, time: "00:00:00" },
    ]);

    setNewTarget(""); // 입력값 초기화
    bottomSheetModalRef.current?.close(); // 모달 닫기
  };

  // 목표 삭제 함수
  const removeTarget = async (targetToRemove: string) => {
    Alert.alert(
      "목표 삭제",
      "해당 목표를 삭제하시겠습니까? 삭제 후 기존 타이머 기록을 볼 수 없습니다.",
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
            bottomSheetModalRef.current?.close(); // 목표 삭제 후 모달 닫기
          },
        },
      ]
    );
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.rootContainer, { paddingTop: insets.top }]}>
        <View style={styles.container}>
          <View style={styles.pickerRow}>
            <Text style={fontStyle.BD20}>목표 : </Text>
            <View style={styles.pickerWrapper}>
              <RNPickerSelect
                onValueChange={(value) => setSelectedTarget(value)}
                items={stopwatchTargets.map((target) => ({
                  label: target.target,
                  value: target.target,
                }))}
                value={selectedTarget}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
          <Text
            style={[fontStyle.BD36, { fontSize: 46 }, { lineHeight: 45 * 1.2 }]}
          >
            {formatTime(remainingTime)}
          </Text>
          <View style={styles.timerInput}>
            <TextInput
              style={styles.timeInput}
              value={String(remainingTime)}
              keyboardType="numeric"
              onChangeText={(text) => {
                const num = parseInt(text, 10);
                if (!isNaN(num)) {
                  setRemainingTime(num); // 선택한 시간 설정
                }
              }}
            />
            <Text style={{ fontSize: 20 }}>초</Text>
          </View>
          <DefaultButton
            pressHandler={isRunning ? stopTimer : startTimer}
            text={isRunning ? "정지" : "시작"}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handlePresentModalPress}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
        >
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <View>
              <Text style={[fontStyle.BD24]}>목표 삭제</Text>
              <Text style={[fontStyle.RG15, styles.warningText]}>
                * 목표를 삭제하면 기존의 타이머 기록을 볼 수 없어요!
              </Text>
              {stopwatchTargets.map((target) => (
                <View key={target.target} style={styles.targetItem}>
                  <Text>{target.target}</Text>
                  <TouchableOpacity
                    onPress={() => removeTarget(target.target)}
                    style={styles.removeButton}
                  >
                    <Text style={{ color: "red" }}>삭제</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View>
              <Text style={[fontStyle.BD24]}>목표 추가</Text>
              <TextInput
                placeholder="새 목표 입력"
                value={newTarget}
                onChangeText={setNewTarget}
                style={styles.input}
              />
              <DefaultButton pressHandler={addTarget} text="목표 추가" />
            </View>
          </ScrollView>
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
    marginTop: 50,
    gap: 50,
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerWrapper: {
    borderBottomWidth: 1,
    borderColor: "black",
    width: 150, // 적절한 width 설정
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  warningText: {
    marginTop: 10,
    alignSelf: "flex-end",
    color: Colors.basic.warning,
  },
  addButtonText: {
    fontSize: 30,
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignSelf: "center",
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
    marginTop: 30,
  },
  targetItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  removeButton: {
    padding: 5,
  },
  timerInput: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  timeInput: {
    fontSize: 20,
    textAlign: "center",
    borderBottomWidth: 1,
    width: 60,
    marginRight: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    textAlign: "center",
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    textAlign: "center",
    color: "black",
  },
});
