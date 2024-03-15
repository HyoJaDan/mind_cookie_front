import axios from "axios";
import { BASE_URL, USER_URL } from "../../uitll/url";

export const putEtcGoal = async (
  userId: number,
  parsedGoals: string,
  date: string
) => {
  const url = `${USER_URL}/${userId}/startDay/personal-challenges/addEtcGoals?startDate=${date}`;

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
  const url = `${USER_URL}/${userId}/etc-personal-challenges`;

  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

/** 목표의 etc-goal의 isDone 값을 업데이트하는 함수 */
export const updateEtcGoalIsDone = async (goalId: number, isDone: boolean) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/goals/${goalId}/done?done=${isDone}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 목표의  운동 목표를 업데이트 하는 함수*/
export const updateExerciseGoal = async (
  caloriesBurned: number,
  goalAchieved: boolean
) => {
  try {
    const data = {
      exerciseCalorie: caloriesBurned,
      done: goalAchieved,
    };

    const response = await axios.put(
      `${BASE_URL}/personal-challenge/1/exercise`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
