import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Today } from "../components/myRecord/Date";

import { DailyCaloryMain } from "../components/myRecord/dailyCalory";
import WeightChangeRate from "../components/myRecord/weightChangeRate";
import { AuthContext } from "../data/auth-context";

export default function MyRecordScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  useEffect(() => {
    axios
      .get(
        `https://hobby-96efd-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((response) => {
        setFetchedMessage(response.data);
      });
  });

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        style={styles.rootContainer}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          backgroundColor: Colors.backgroundColor,
        }}
      >
        <Today />
        <DailyCaloryMain />
        <WeightChangeRate />
        <Text>{fetchedMessage}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    gap: 24,
    /* padding: 32, */
    backgroundColor: Colors.backgroundColor,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
