import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
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
      <View style={styles.modalContent}>
        <RNPickerSelect
          onValueChange={(itemValue) => {
            setNewPrimaryHobbit("");
            setSelectedPrimaryHobbit(itemValue);
          }}
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
        />
        <Text style={[fontStyle.SB12, styles.inputNav]}>
          *기존 상위 목표나, 새로운 상위 목표중 하나만 선택할수 있습니다.
        </Text>
        {newPrimaryHobbit !== "" && (
          <View>
            <Text style={[fontStyle.MD16, { marginBottom: 10 }]}>
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
      <DefaultButton pressHandler={handleAddTodo} text="새로운 목표 추가" />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  modalContent: { alignItems: "center", width: "100%", gap: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  colorPickerContainer: { flexDirection: "row", flexWrap: "wrap" },
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
    position: "relative",
    top: -10,
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

export default ModalContent;
