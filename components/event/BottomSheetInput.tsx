import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { DefaultButton } from "../../util/defaultButton";

interface BottomSheetInputProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  newData: string;
  setNewData: (value: string) => void;
  handleAddNewData: (newDataType: string) => void;
  dataType: string;
  snapPoints: any;
  handleSheetChanges: any;
  renderBackdrop: any;
}

export const BottomSheetInput: React.FC<BottomSheetInputProps> = ({
  bottomSheetModalRef,
  newData,
  setNewData,
  handleAddNewData,
  dataType,
  snapPoints,
  handleSheetChanges,
  renderBackdrop,
}) => {
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.headerText}>새 {dataType} 추가</Text>
            <TextInput
              placeholder={`새 ${dataType} 입력`}
              autoFocus={true}
              autoCapitalize="none"
              autoCorrect={false}
              value={newData}
              onChangeText={setNewData}
              style={styles.textInput}
            />
          </View>
          <DefaultButton
            pressHandler={() => handleAddNewData(dataType)}
            text={`${dataType} 추가`}
          />
        </View>
      </TouchableWithoutFeedback>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
});
