import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";

import RNPickerSelect from "react-native-picker-select"; // RNPickerSelect 임포트
import { fontStyle } from "../assets/font/font";
import { apiClient } from "../data/apiClient";
import {
  HobbitStatus,
  IStatusByDate,
  PrimaryHobbit,
  statusByDateData,
  tempTodoData,
  top3SucceessData,
} from "../data/todo";
import { baseURLData } from "../data/userData";
import { DefaultButton } from "../uitl/defaultButton";
import DatePicker from "./DatePicker";

const TodoList = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: string;
  setSelectedDate: any;
}) => {
  const [todos, setTodos] = useState<PrimaryHobbit[]>([]);
  const [tempTodos, setTempTodos] = useRecoilState(tempTodoData);
  const [statusByDate, setStatusByDate] = useRecoilState(statusByDateData);
  const [isInitialized, setIsInitialized] = useState(false);
  const [top3Succeed, setTop3Succeed] = useRecoilState(top3SucceessData);
  const [selectedColor, setSelectedColor] = useState("");
  const [newPrimaryHobbit, setNewPrimaryHobbit] = useState("");
  const [newHobbit, setNewHobbit] = useState("");
  const [selectedPrimaryHobbit, setSelectedPrimaryHobbit] = useState("");
  const baseURL = useRecoilValue(baseURLData);

  const colorOptions = [
    "#7985CD",
    "#D44245",
    "#B093E7",
    "#81AAE8",
    "#4D7ADF",
    "#63D1D2",
    "#5FC59D",
    "#69B054",
    "#FFC904",
    "#E69F5D",
    "#F27198",
    "#A9A9A9",
  ];

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);
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
    if (tempTodos.length === 0) {
      return;
    }
    if (todos.length === 0) {
      // 처음 로딩 시 tempTodoData에서 모든 데이터를 가져옴

      const initialTodos = tempTodos.map((tempPrimaryHobbit) => {
        const hobbitStatuses = tempPrimaryHobbit.hobbitStatuses.map(
          (hobbit) => ({
            hobbitId: hobbit.hobbitId,
            hobbit: hobbit.hobbit,
            done: false, // 초기값은 false로 설정
          })
        );

        return {
          primaryHobbitId: tempPrimaryHobbit.primaryHobbitId,
          primaryHobbit: tempPrimaryHobbit.primaryHobbit,
          color: tempPrimaryHobbit.color,
          hobbitStatuses,
        };
      });

      setTodos(initialTodos); // 초기 todoData 설정
    }
    setIsInitialized(true); // 초기화 완료 상태로 설정
  }, [tempTodos]);

  // selectedDate가 변경될 때마다 isDone 값을 업데이트하는 로직
  useEffect(() => {
    if (isInitialized && todos.length > 0) {
      // selectedDate에 맞는 statusByDate 데이터를 찾음
      const statusForSelectedDate: IStatusByDate = statusByDate.find(
        (status) => status.date === selectedDate
      );
      // 선택된 날짜에 대한 status가 없을 경우에는 더 진행하지 않음
      if (!statusForSelectedDate) return;

      // 새로운 isDone 상태를 할당하기 위해 hobbit의 순서를 유지하며 업데이트
      let statusIndex = 0; // hobbitStatuses의 index 관리
      const updatedTodos = todos.map((primaryHobbit) => {
        const updatedHobbitStatuses = primaryHobbit.hobbitStatuses.map(
          (hobbit) => {
            // hobbitStatuses의 순서대로 done 값을 업데이트
            const done = statusForSelectedDate.hobbitStatus[statusIndex];
            statusIndex += 1; // 다음 hobbit의 done 상태로 넘어가기 위한 index 증가
            return {
              ...hobbit,
              done, // isDone 값 업데이트
            };
          }
        );

        return {
          ...primaryHobbit,
          hobbitStatuses: updatedHobbitStatuses,
        };
      });

      setTodos(updatedTodos); // todoData 업데이트
    }
  }, [selectedDate, isInitialized]);

  const handleHobbitClick = async (
    primaryHobbitId: number,
    primaryHobbit: string,
    hobbitId: number
  ) => {
    const response = await apiClient(
      baseURL,
      `/update-status/${primaryHobbitId}/${hobbitId}`,
      "PUT",
      null,
      {
        date: selectedDate,
      }
    );
    if (response.status === 200) {
      const updatedTodos = todos.map((primaryHobbit) => {
        if (primaryHobbit.primaryHobbitId === primaryHobbitId) {
          return {
            ...primaryHobbit,
            hobbitStatuses: primaryHobbit.hobbitStatuses.map((hobbit) =>
              hobbit.hobbitId === hobbitId
                ? { ...hobbit, done: !hobbit.done }
                : hobbit
            ),
          };
        }
        return primaryHobbit;
      });

      setTodos(updatedTodos);
      // statusByDate 업데이트
      const updatedStatusByDate = statusByDate.map((status) => {
        if (status.date === selectedDate) {
          const updatedHobbitStatus = [...status.hobbitStatus];

          // 해당 hobbitId의 인덱스를 찾아 상태를 토글
          const hobbitIndex = todos
            .flatMap((primaryHobbit) => primaryHobbit.hobbitStatuses)
            .findIndex((hobbit) => hobbit.hobbitId === hobbitId);

          if (hobbitIndex !== -1) {
            updatedHobbitStatus[hobbitIndex] =
              !updatedHobbitStatus[hobbitIndex];
          }

          return {
            ...status,
            hobbitStatus: updatedHobbitStatus,
          };
        }
        return status;
      });

      setStatusByDate(updatedStatusByDate);
    }
  };

  const handleAddTodo = async () => {
    if ((!newPrimaryHobbit && !selectedPrimaryHobbit) || !newHobbit) {
      Alert.alert("모든 필드를 채워주세요.");
      return;
    }

    const response = await apiClient(baseURL, "/add-hobbit", "POST", {
      primaryHobbit: newPrimaryHobbit || selectedPrimaryHobbit,
      hobbit: newHobbit,
      color: newPrimaryHobbit ? selectedColor : null,
    });
    if (response.status === 200) {
      const addedHobbit = response.data;
      bottomSheetModalRef.current?.close();

      if (newPrimaryHobbit) {
        const newPrimaryHobbitData = {
          primaryHobbitId: addedHobbit.primaryHobbitId,
          primaryHobbit: newPrimaryHobbit,
          color: selectedColor,
          hobbitStatuses: [
            {
              hobbitId: addedHobbit.hobbitStatuses[0].hobbitId,
              hobbit: newHobbit,
              done: false,
            },
          ],
        };

        setTodos((prevTodos) => [...prevTodos, newPrimaryHobbitData]);
      } else if (selectedPrimaryHobbit) {
        setTodos((prevTodos) =>
          prevTodos.map((primaryHobbit) =>
            primaryHobbit.primaryHobbit === selectedPrimaryHobbit
              ? {
                  ...primaryHobbit,
                  hobbitStatuses: [
                    ...primaryHobbit.hobbitStatuses,
                    {
                      hobbitId: addedHobbit.hobbitId,
                      hobbit: newHobbit,
                      done: false,
                    },
                  ],
                }
              : primaryHobbit
          )
        );
      }

      setNewPrimaryHobbit("");
      setNewHobbit("");
      setSelectedPrimaryHobbit("");
      setSelectedColor("");
    }
  };

  const renderHobbitStatus = (
    primaryHobbit: PrimaryHobbit,
    hobbit: HobbitStatus
  ) => {
    const backgroundColor = primaryHobbit.color || "#f2f2f2"; // 기본 색상 지정
    return (
      <TouchableOpacity
        key={hobbit.hobbitId}
        style={[
          styles.hobbitStatusContainer,
          { backgroundColor: hobbit.done ? "#d4edda" : backgroundColor },
        ]}
        onPress={() =>
          handleHobbitClick(
            primaryHobbit.primaryHobbitId,
            primaryHobbit.primaryHobbit,
            hobbit.hobbitId
          )
        }
      >
        <Text style={[styles.hobbitText, hobbit.done && styles.hobbitTextDone]}>
          {hobbit.hobbit}
        </Text>
        <Text style={styles.primaryHobbitInfo}>
          #{primaryHobbit.primaryHobbit}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModalProvider>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <View style={styles.container}>
        {todos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[fontStyle.BD24, styles.emptyText]}>
              투두리스트가 아직 없습니다!
            </Text>
            <Text style={styles.instructions}>
              목표를 추가하려면 아래 '+' 버튼을 눌러
            </Text>
            <Text style={styles.instructions}>새 목표를 설정하세요.</Text>
          </View>
        ) : (
          <FlatList
            data={todos}
            renderItem={({ item: primaryHobbit }) =>
              primaryHobbit.hobbitStatuses.map((hobbit) =>
                renderHobbitStatus(primaryHobbit, hobbit)
              )
            }
            keyExtractor={(item) => item.primaryHobbitId.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )}
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
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <RNPickerSelect
                onValueChange={(itemValue) =>
                  setSelectedPrimaryHobbit(itemValue)
                }
                items={todos.map((primaryHobbit) => ({
                  label: primaryHobbit.primaryHobbit,
                  value: primaryHobbit.primaryHobbit,
                  key: primaryHobbit.primaryHobbitId,
                }))}
                placeholder={{ label: "기존 상위 목표 선택", value: "" }}
                style={pickerSelectStyles}
              />
              <TextInput
                placeholder="새로운 상위 목표 입력"
                style={styles.input}
                value={newPrimaryHobbit}
                onChangeText={(text) => {
                  setNewPrimaryHobbit(text);
                  setSelectedPrimaryHobbit("");
                }}
              />
              <TextInput
                placeholder="세부 목표 입력"
                style={styles.input}
                value={newHobbit}
                onChangeText={setNewHobbit}
                autoFocus={true}
              />
              {newPrimaryHobbit !== "" && (
                <View>
                  <Text style={[fontStyle.MD16, { marginBottom: 20 }]}>
                    고유색 선택
                  </Text>
                  <View style={styles.colorPickerContainer}>
                    {colorOptions.map((color, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.colorCircle,
                          {
                            backgroundColor: color,
                            borderColor:
                              selectedColor === color ? "#000" : "transparent",
                          },
                        ]}
                        onPress={() => setSelectedColor(color)}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>

            <DefaultButton
              pressHandler={handleAddTodo}
              text="새로운 목표 추가"
            />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  hobbitStatusContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  hobbitText: {
    fontSize: 16,
  },
  hobbitTextDone: {
    textDecorationLine: "line-through",
    color: "#6c757d",
  },
  primaryHobbitInfo: {
    fontSize: 12,
    color: "#999",
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
  addButtonText: {
    fontSize: 30,
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  colorPickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    marginBottom: 20,
    color: "#4CAF50",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
});

export default TodoList;
