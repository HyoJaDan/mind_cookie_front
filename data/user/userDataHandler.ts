import axios from "axios";

export const fetchUserDataInProfile = async (userId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/member/profile/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const fetchUserDataInMyRecord = async (userId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/member/myRecord/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const putUserData = async (userId: number, inputValue: string) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/member/${userId}/weight?weight=${inputValue}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating weight:", error);
  }
};

export const putUserteamUserName = async (userId: number, userName: string) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/member/${userId}/teamUserName?teamUserName=${userName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating weight:", error);
  }
};

export const getIsMemberWithTeam = async (userId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/memberWithTeam/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
