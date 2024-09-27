import Slider from "@react-native-community/slider";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { fontStyle } from "../../assets/font/font";

const screenWidth = Dimensions.get("window").width;

interface StateSliderProps {
  label: string;
  value: number;
  color: string;
  onValueChange: (newValue: number) => void;
}

const getStatusDescription = (value: number): string => {
  if (value <= 5) return "매우 그렇지 않다";
  if (value <= 15) return "그렇지 않다";
  if (value <= 30) return "약간 그렇지 않다";
  if (value <= 70) return "보통";
  if (value <= 85) return "약간 그렇다";
  if (value <= 95) return "그렇다";
  return "매우 그렇다";
};

const StateSlider: React.FC<StateSliderProps> = ({
  label,
  value,
  color,
  onValueChange,
}) => {
  const minCircleSize = 30;
  const maxCircleSize = 170;

  const circleSize =
    minCircleSize + (maxCircleSize - minCircleSize) * (value / 100);

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.circleWrapper}>
        <View
          style={[
            styles.circle,
            {
              width: circleSize,
              height: circleSize,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      <Text style={[styles.statusText, fontStyle.MD16]}>
        {getStatusDescription(value)}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={color}
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    width: 327,
    height: 344,
    padding: 20,
    flexShrink: 0,
    borderRadius: 16,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 18, 38, 0.03)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 190,
    marginBottom: 20,
  },
  circle: {
    borderRadius: 100,
  },
  labelText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 16,
    color: "#333",
  },
  slider: {
    width: screenWidth * 0.65,
    height: 40,
  },
});

export default StateSlider;
