import axios from "axios";
import { BASE_URL, MEMBER_URL } from "../../uitll/url";

export const putEtcGoal = async (
  userId: number,
  parsedGoals: string,
  date: string
) => {
  const url = `${MEMBER_URL}/${userId}/startDay/personal-challenges/addEtcGoals?startDate=${date}`;

  try {
    await axios.put(url, parsedGoals, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error putEtcGoal", error);
    throw error;
  }
};

export const getMyGoalData = async (userId: number) => {
  const url = `${MEMBER_URL}/${userId}/today-personal-challenges`;
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error getMyGoalData", error);
    throw error;
  }
};

/** 목표의 etc-goal의 isDone 값을 업데이트하는 함수 */
export const updateEtcGoalIsDone = async (goalId: number, isDone: boolean) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/etc-personal-challenges/${goalId}/isDone?isDone=${isDone}`
    );
    return response.data;
  } catch (error) {
    console.log("Error updateEtcGoalIsDone", error);
    throw error;
  }
};

/** 목표의 운동 목표를 업데이트 하는 함수*/
export const updateExerciseGoal = async (
  caloriesBurned: number,
  goalAchieved: boolean,
  elapsedTime: number,
  personalChallengeId: number
) => {
  try {
    const data = {
      exerciseCalorie: caloriesBurned,
      durationInSeconds: elapsedTime,
      isDone: goalAchieved,
    };

    const response = await axios.put(
      `${BASE_URL}/personal-challenge/${personalChallengeId}/exercise`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error updateExerciseGoal", error);
    throw error;
  }
};

export const postMealGoal = async (FormData: any, MemberId: number) => {
  try {
    const response = await axios.post(
      `${MEMBER_URL}/${MemberId}/todayPersonalChallenge/saveMealRecord`,
      FormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const getMyMealData = async (id: number) => {
  const URL = `${MEMBER_URL}/${id}/todayPersonalChallenge/getPersonalMealRecord`;
  try {
    const response = await axios.get(URL);

    return response.data;
  } catch (error) {
    console.error("Error getMyMealData", error);
    throw error;
  }
};
