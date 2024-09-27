import { StyleSheet } from "react-native";

export const BottomSheetModalStyle = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 20,
    flexGrow: 1,
  },
});
