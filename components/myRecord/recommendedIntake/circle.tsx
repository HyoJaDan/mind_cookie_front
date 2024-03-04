import React from "react";
import { StyleSheet, View } from "react-native";

interface ICircle {
  size: number;
  color: string;
  children: React.ReactNode;
}

const Circle: React.FC<ICircle> = ({ size, color, children }) => {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Circle;
