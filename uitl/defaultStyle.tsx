import { StyleSheet } from "react-native";
import { Colors } from "../assets/color/color";

export const Commonstyles = StyleSheet.create({
  SpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  SpaceBetweenAndAlignTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  flexGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  line: {
    borderWidth: 1,
    borderColor: Colors.basic.line_light,
    width: "100%",
  },
  Line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
