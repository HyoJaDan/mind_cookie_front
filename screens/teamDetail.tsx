// screens/ChallengeDetailScreen.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ChallengeDetailScreen = ({ route }) => {
  console.log(route.params.teamName);

  return (
    <View style={styles.container}>
      <Text>Challenge Detail Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChallengeDetailScreen;
