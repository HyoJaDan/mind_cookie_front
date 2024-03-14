import axios from "axios";

export const putEtcGoal = async (
  userId: number,
  parsedGoals: string,
  date: string
) => {
  const url = `http://localhost:8080/api/member/${userId}/startDay/personal-challenges/addEtcGoals?startDate=${date}`;

  try {
    await axios.put(url, parsedGoals, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getEtcGoal = async (userId: number) => {
  const url = `http://localhost:8080/api/member/${userId}/personal-challenges`;

  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// 백엔드 API의 기본 URL
const BASE_URL = "http://localhost:8080/api";

// 목표의 isDone 값을 업데이트하는 함수
export const updateGoalIsDone = async (goalId: number, isDone: boolean) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/goals/${goalId}/done?done=${isDone}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
