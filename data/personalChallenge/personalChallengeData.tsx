import axios from "axios";

export interface IGoal {
  id: number;
  goalName: string;
  isDone: boolean;
}

// 백엔드 API의 기본 URL
const BASE_URL = "http://localhost:8080/api";

// 목표의 isDone 값을 업데이트하는 함수
export const updateGoalIsDone = async (goalId: number, isDone: boolean) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/goals/${goalId}/done?done=${isDone}`
    );
    console.log("Goal updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
};
