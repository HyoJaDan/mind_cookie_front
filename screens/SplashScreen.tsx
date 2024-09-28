import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import { fontStyle } from "../assets/font/font";
import SplashIcon from "../assets/icon/main.svg";
import { apiClient } from "../data/apiClient";
import { dateData } from "../data/date";
import { eventData } from "../data/event";
import { screenWidthData } from "../data/screen";
import { stateData } from "../data/stateData";
import { allStopwatchData, stopwatchData } from "../data/stopwatch";
import { statusByDateData, tempTodoData, top3SucceessData } from "../data/todo";
import { baseURLData, memberData, userToken } from "../data/userData";
import { BASE_URL } from "../util/url";

const SplashScreen = ({ navigation }: { navigation: any }) => {
  const [animating, setAnimating] = useState(true);
  const setMemberState = useSetRecoilState(memberData);
  const setState = useSetRecoilState(stateData);
  const setStopwatch = useSetRecoilState(stopwatchData);
  const setAllStopwatch = useSetRecoilState(allStopwatchData);
  const setDate = useSetRecoilState(dateData);
  const setScreenWidth = useSetRecoilState(screenWidthData);
  const setToken = useSetRecoilState(userToken);
  const setEvent = useSetRecoilState(eventData);
  const setTempTodoData = useSetRecoilState(tempTodoData);
  const setTop3Succeess = useSetRecoilState(top3SucceessData);
  const setStatusByDate = useSetRecoilState(statusByDateData);
  const [baseURL, setBaseURL] = useRecoilState(baseURLData);

  useEffect(() => {
    const loadInitialData = async () => {
      // const newBaseURL = Platform.OS === "android" ? Android_URL : IOS_URL;
      // setBaseURL(newBaseURL);
      setBaseURL(BASE_URL);
    };

    setScreenWidth(Dimensions.get("window").width);
    loadInitialData();
  }, [setBaseURL]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("user_token");
      if (!token) {
        navigation.replace("Auth");
        return;
      }

      setToken(token as string);

      const todayDate = new Date().toISOString().split("T")[0];
      setDate(todayDate);

      try {
        const [
          memberResponse,
          temp,
          stateResponse,
          stopwatchResponse,
          eventResponse,
          allStopwatchResponse,
        ] = await Promise.all([
          apiClient(baseURL, "/member", "GET"),
          apiClient(baseURL, "/hobbit-status", "GET"),
          apiClient(baseURL, "/all-state", "GET"),
          apiClient(baseURL, "/stopwatch/today", "GET"),
          apiClient(baseURL, "/event-list", "GET", null, {
            date: todayDate,
          }),
          apiClient(baseURL, "/stopwatch/all", "GET"),
        ]);
        setMemberState(memberResponse.data);
        setTempTodoData(temp.data.primaryHobbits);
        setTop3Succeess(temp.data.top3Success);
        setStatusByDate(temp.data.statusByDate);
        setState(stateResponse.data);
        setStopwatch(stopwatchResponse.data);
        setEvent(eventResponse.data);
        setAllStopwatch(allStopwatchResponse.data);
        navigation.replace("AuthenticatedStack"); //AuthenticatedStack
      } catch (error) {
        navigation.replace("Auth");
      } finally {
        setAnimating(false);
      }
    };

    if (baseURL) {
      fetchData();
    }
  }, [baseURL, navigation]);

  return (
    <View style={styles.container}>
      <SplashIcon />
      <Text style={fontStyle.BD20}>마인드 쿠키</Text>
      <ActivityIndicator
        animating={animating}
        color="#307ecc"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
