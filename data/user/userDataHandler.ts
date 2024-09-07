import axios from "axios";
import { MEMBER_URL, TEAM_URL } from "../../uitll/url";

export const fetchNewTeam = async (
  memberId: number,
  teamName: string,
  startDate: string,
  challengeType: string
) => {
  /* /api/team/create-team" */
  const api = `${TEAM_URL}/create-team`;

  try {
    const response = await axios.post(
      api,
      {
        memberId,
        teamName,
        startDate,
        challengeType,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating team:", error);
  }
};

export const fetchUserDataInProfile = async (userId: number) => {
  try {
    const response = await axios.get(`${MEMBER_URL}/${userId}/profile`);

    return response.data;
  } catch (error) {
    console.error("Error fetching user data in Profile:", error);
    throw error;
  }
};

export const fetchUserDataInMyRecord = async (userId: number) => {
  try {
    const response = await axios.get(`${MEMBER_URL}/${userId}/myRecord`);

    return response.data;
  } catch (error) {
    console.error("Error fetching user data in MyRecord:", error);
    throw error;
  }
};

export const putUserData = async (userId: number, inputValue: string) => {
  try {
    const response = await axios.put(
      `${MEMBER_URL}/${userId}/weight?weight=${inputValue}`
    );
    return response.data;
  } catch (error) {
    console.error("Error putUserData", error);
    throw error;
  }
};

export const putUserteamUserName = async (userId: number, userName: string) => {
  try {
    const response = await axios.put(
      `${MEMBER_URL}/${userId}/teamUserName?teamUserName=${userName}`
    );
    return response.data;
  } catch (error) {
    console.log("Error putUserteamUserName", error);
    throw error;
  }
};
