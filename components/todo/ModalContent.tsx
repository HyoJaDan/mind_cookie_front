import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../assets/color/color";
import { fontStyle } from "../../assets/font/font";
import { PrimaryHobbit } from "../../data/todo";
import { DefaultButton } from "../../util/defaultButton";

interface ModalContentProps {
  todos: PrimaryHobbit[];
  newPrimaryHobbit: string;
  selectedPrimaryHobbit: string;
  newHobbit: string;
  selectedColor: string;
  colorOptions: string[];
  setNewPrimaryHobbit: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPrimaryHobbit: React.Dispatch<React.SetStateAction<string>>;
  setNewHobbit: React.Dispatch<React.SetStateAction<string>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({
  todos,
  newPrimaryHobbit,
  selectedPrimaryHobbit,
  newHobbit,
  selectedColor,
  colorOptions,
  setNewPrimaryHobbit,
  setSelectedPrimaryHobbit,
  setNewHobbit,
  setSelectedColor,
  handleAddTodo,
}) => {
  return (
    <View style={styles.modalContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[fontStyle.BD24, { marginBottom: 20 }]}>
          목표를 추가하세요
        </Text>
        <Text style={fontStyle.BD16}>상위 목표</Text>
        <View style={styles.modalContent}>
          <TextInput
            placeholder={
              selectedPrimaryHobbit === ""
                ? "새로운 상위 목표 입력"
                : selectedPrimaryHobbit
            }
            style={styles.newPrimaryHobbitInput}
            onChangeText={(text) => {
              setNewPrimaryHobbit(text);
              setSelectedPrimaryHobbit("");
            }}
          />
          <View style={styles.existingGoalsContainer}>
            {todos.map((primaryHobbit) => (
              <TouchableOpacity
                key={primaryHobbit.primaryHobbitId}
                style={[
                  styles.existingGoalItem,
                  selectedPrimaryHobbit === primaryHobbit.primaryHobbit
                    ? styles.selectedGoalItem
                    : { backgroundColor: Colors.grayscale.gray400 },
                ]}
                onPress={() => {
                  setNewPrimaryHobbit("");
                  setSelectedPrimaryHobbit(primaryHobbit.primaryHobbit);
                }}
              >
                <Text style={styles.existingGoalText}>
                  {primaryHobbit.primaryHobbit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={fontStyle.BD16}>세부 목표</Text>
          <TextInput
            placeholder="세부 목표 입력"
            style={styles.input}
            onChangeText={setNewHobbit}
          />
          {newPrimaryHobbit !== "" && selectedPrimaryHobbit === "" && (
            <View style={{ gap: 10, marginVertical: 20 }}>
              <Text style={fontStyle.BD16}>고유색 선택</Text>
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
      </ScrollView>
      <DefaultButton pressHandler={handleAddTodo} text="새로운 목표 추가" />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  content: {
    width: "100%",
  },
  modalContent: {
    width: "100%",
    gap: 10,
  },
  newPrimaryHobbitInput: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#0000FF",
    paddingVertical: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  existingGoalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  existingGoalItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedGoalItem: {
    backgroundColor: "#d0e8ff", // 선택된 항목의 배경색
  },
  existingGoalText: {
    color: "#333",
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
  inputNav: {
    color: Colors.grayscale.gray800,
    textAlign: "right",
    width: "100%",
    marginTop: 10,
  },
  scrollViewContent: {
    flexGrow: 1, // ScrollView의 전체 콘텐츠가 채워지도록 설정
  },
});

export default ModalContent;
