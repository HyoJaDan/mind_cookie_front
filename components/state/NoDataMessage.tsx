import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../assets/color/color";
import { fontStyle } from "../../assets/font/font";

const NoDataMessage: React.FC = () => {
  return (
    <View style={styles.noDataContainer}>
      <Text style={[fontStyle.BD16, { color: Colors.basic.warning }]}>
        아직 상태를 추가하지 않았어요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 16,
    shadowColor: "rgba(0, 18, 38, 0.03)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
});

export default NoDataMessage;
