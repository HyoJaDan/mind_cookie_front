import axios from "axios";
import { MEMBER_URL } from "../../uitll/url";

export const fetchUserDataInProfile = async (userId: number) => {
  try {
    const response = await axios.get(`${MEMBER_URL}/${userId}/profile`);

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchUserDataInMyRecord = async (userId: number) => {
  try {
    const response = await axios.get(`${MEMBER_URL}/${userId}/myRecord`);

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
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

export const getIsMemberWithTeam = async (userId: number) => {
  try {
    const response = await axios.get(
      `${MEMBER_URL}/${userId}/isMemberWithTeam`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching isMemberWithTeam:", error);
    throw error;
  }
};
