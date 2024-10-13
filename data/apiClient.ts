import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiClient = async (
  baseURL: string,
  url: string,
  method: "GET" | "PUT" | "DELETE" | "POST" = "GET",
  data: any = null,
  params: any = null
) => {
  const token = await AsyncStorage.getItem("user_token");
  console.log(token);
  if (!token) {
    throw new Error("토큰이 존재하지 않습니다.");
  }
  const queryString = params
    ? "?" + new URLSearchParams(params).toString()
    : "";

  const response = await fetch(`${baseURL}${url}${queryString}`, {
    method,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: method !== "GET" ? JSON.stringify(data) : null, // GET 요청은 body가 필요 없음
  });

  const responseData = await response.json();
  return responseData;
};
