// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// // API 호출 함수
// export const apiClient = async (
//   url: string,
//   method: "GET" | "POST" = "GET",
//   data: any = null
// ) => {
//   try {
//     // 토큰 가져오기
//     const token = await AsyncStorage.getItem("user_token");
//     if (!token) {
//       throw new Error("토큰이 존재하지 않습니다.");
//     }

//     // axios로 API 요청
//     const response = await axios({
//       method,
//       url: `http://localhost:8080${url}`,
//       headers: {
//         Authorization: `${token}`,
//         "Content-Type": "application/json",
//       },
//       data,
//     });

//     return response.data;
//   } catch (error) {
//     console.error("API 요청 중 오류 발생:", error);
//     throw error;
//   }
// };
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetRecoilState } from "recoil";
import { userToken } from "./user/userData";

// API 호출 함수 (fetch 사용)
export const apiClient = async (
  url: string,
  method: "GET" | "POST" = "GET",
  data: any = null
) => {
  try {
    const token = await AsyncStorage.getItem("user_token");

    if (!token) {
      throw new Error("토큰이 존재하지 않습니다.");
    }
    setToken(token);
    console.log(qq, "qqqqqqq");
    // fetch로 API 요청
    const response = await fetch(`http://localhost:8080${url}`, {
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
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
