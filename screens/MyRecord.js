import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Today } from "../components/myRecord/Date";

import { DailyCaloryMain } from "../components/myRecord/dailyCalory";
import WeightChangeRate from "../components/myRecord/weightChangeRate";
import { AuthContext } from "../data/auth-context";

function MyRecordScreen() {
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
    <View style={styles.rootContainer}>
      <Today />
      <DailyCaloryMain />
      <WeightChangeRate />
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default MyRecordScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    padding: 32,
    backgroundColor: Colors.backgroundColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
