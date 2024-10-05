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
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";

import HobbitItem from "./HobbitItem";
import ModalContent from "./ModalContent";
import {
  addHobbitToExistingPrimary,
  addNewPrimaryHobbit,
  isHobbitDuplicate,
  isPrimaryHobbitDuplicate,
  toggleHobbitStatus,
  updateStatusByDate,
} from "./todoHelpers";

import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { apiClient } from "../../data/apiClient";
import { PrimaryHobbit, statusByDateData, tempTodoData } from "../../data/todo";
import { baseURLData } from "../../data/userData";
import DatePicker from "../DatePicker";
import EmptyTodo from "./EmptyTodo";

const TodoList = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [todos, setTodos] = useState<PrimaryHobbit[]>([]);
  const [tempTodos] = useRecoilState(tempTodoData);
  const [statusByDate, setStatusByDate] = useRecoilState(statusByDateData);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedPrimaryHobbit, setSelectedPrimaryHobbit] =
    useState<string>("");
  const [newPrimaryHobbit, setNewPrimaryHobbit] = useState<string>("");
  const [newHobbit, setNewHobbit] = useState<string>("");
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

  const handlePresentModalPress = useCallback(
    () => bottomSheetModalRef.current?.present(),
    []
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleSheetChanges = useCallback(() => {}, []);
  const snapPoints = useMemo(() => ["90%"], []);
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
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
    const backAction = () => {
      if (bottomSheetModalRef.current) {
        bottomSheetModalRef.current.close(); // 모달 닫기
        return true; // 뒤로가기 기본 동작 방지
      }
      return false; // 기본 동작 허용
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    setIsInitialized(true);
    if (tempTodos.length === 0 || todos.length > 0) return;

    const initialTodos = tempTodos.map((tempPrimaryHobbit) => ({
      ...tempPrimaryHobbit,
      hobbitStatuses: tempPrimaryHobbit.hobbitStatuses.map((hobbit) => ({
        ...hobbit,
        done: false,
      })),
    }));

    setTodos(initialTodos);
  }, [tempTodos]);
  useEffect(() => {
    if (!isInitialized || todos.length === 0) return;

    const statusForSelectedDate = statusByDate.find(
      (status) => status.date === selectedDate
    );
    if (!statusForSelectedDate) return;

    let statusIndex = 0;
    const updatedTodos = todos.map((primaryHobbit) => ({
      ...primaryHobbit,
      hobbitStatuses: primaryHobbit.hobbitStatuses.map((hobbit) => ({
        ...hobbit,
        done: statusForSelectedDate.hobbitStatus[statusIndex++],
      })),
    }));

    setTodos(updatedTodos);
  }, [selectedDate, isInitialized]);

  // 상위 목표와 세부 목표 추가
  const handleAddTodo = async () => {
    if ((!newPrimaryHobbit && !selectedPrimaryHobbit) || !newHobbit) {
      Alert.alert("모든 필드를 채워주세요.");
      return;
    }
    if (newPrimaryHobbit && selectedColor === "") {
      Alert.alert("색을 정해주세요. 상위 목표를 구분하는데 사용됩니다.");
      return;
    }

    if (
      isHobbitDuplicate(
        todos,
        newPrimaryHobbit,
        selectedPrimaryHobbit,
        newHobbit
      )
    ) {
      Alert.alert("이미 동일한 목표와 세부 목표가 존재합니다.");
      return;
    }

    if (isPrimaryHobbitDuplicate(todos, newPrimaryHobbit)) {
      Alert.alert(
        "이미 동일한 상위 목표가 존재합니다. 기존 상위 목표를 선택해주세요."
      );
      return;
    }

    const response = await apiClient(baseURL, "/add-hobbit", "POST", {
      primaryHobbit: newPrimaryHobbit || selectedPrimaryHobbit,
      hobbit: newHobbit,
      color: newPrimaryHobbit ? selectedColor : null,
    });

    if (response.status === 200) {
      const addedHobbit: PrimaryHobbit = response.data;

      const updatedTodos = newPrimaryHobbit
        ? addNewPrimaryHobbit(
            todos,
            addedHobbit,
            newPrimaryHobbit,
            selectedColor,
            newHobbit
          )
        : addHobbitToExistingPrimary(
            todos,
            addedHobbit,
            selectedPrimaryHobbit,
            newHobbit
          );

      setTodos(updatedTodos);
      const updatedStatusByDate = statusByDate.map((status) => ({
        ...status,
        hobbitStatus: [...status.hobbitStatus, false],
      }));
      setStatusByDate(updatedStatusByDate);
      bottomSheetModalRef.current?.close();
      setNewPrimaryHobbit("");
      setNewHobbit("");
      setSelectedPrimaryHobbit("");
      setSelectedColor("");
    }
  };

  // 세부 목표 클릭 시 상태 토글
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
      const updatedTodos = toggleHobbitStatus(todos, primaryHobbitId, hobbitId);
      setTodos(updatedTodos);
      const updatedStatusByDate = updateStatusByDate(
        statusByDate,
        selectedDate,
        hobbitId,
        todos
      );
      setStatusByDate(updatedStatusByDate);
    }
  };

  return (
    <BottomSheetModalProvider>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <View style={styles.container}>
        {todos.length === 0 ? (
          <EmptyTodo />
        ) : (
          <FlatList
            data={todos}
            renderItem={({ item: primaryHobbit }) =>
              primaryHobbit.hobbitStatuses.map((hobbit) => (
                <HobbitItem
                  key={hobbit.hobbitId}
                  primaryHobbit={primaryHobbit}
                  hobbit={hobbit}
                  onClick={handleHobbitClick}
                />
              ))
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
          <ModalContent
            todos={todos}
            newPrimaryHobbit={newPrimaryHobbit}
            selectedPrimaryHobbit={selectedPrimaryHobbit}
            newHobbit={newHobbit}
            selectedColor={selectedColor}
            colorOptions={colorOptions}
            setNewPrimaryHobbit={setNewPrimaryHobbit}
            setSelectedPrimaryHobbit={setSelectedPrimaryHobbit}
            setNewHobbit={setNewHobbit}
            setSelectedColor={setSelectedColor}
            handleAddTodo={handleAddTodo}
          />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainer: { padding: 20, backgroundColor: "#f9f9f9" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: { marginBottom: 20, color: "#4CAF50" },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
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
  },
  addButtonText: { fontSize: 30, color: "#fff" },
});

export default TodoList;
