import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// API 호출 함수 (fetch 사용)
export const apiClient = async (
  baseURL: string,
  url: string,
  method: "GET" | "PUT" | "POST" = "GET",
  data: any = null,
  params: any = null
) => {
  try {
    const token = await AsyncStorage.getItem("user_token");

    if (!token) {
      throw new Error("토큰이 존재하지 않습니다.");
    }
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";

    // fetch로 API 요청
    const response = await fetch(`${baseURL}${url}${queryString}`, {
      method,
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: method !== "GET" ? JSON.stringify(data) : null, // GET 요청은 body가 필요 없음
    });

    // 응답이 성공적이지 않은 경우 에러 처리
    if (!response.ok) {
      throw new Error(
        `서버 응답에 실패했습니다. 상태 코드: ${response.status}`
      );
    }

    // JSON 데이터 변환 및 반환
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    Alert.alert("데이터 연동 실패", "서버에 문제가 있습니다.");
  }
};
