import axios from "axios";
import { MEMBER_URL, TEAM_URL } from "../../uitll/url";

export const fetchAllTeamData = async () => {
  try {
    const response = await axios.get(`${TEAM_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetchAllTeamData", error);
    throw error;
  }
};

export const putUserInTeam = async (teamId: number, memberId: number) => {
  try {
    const response = await axios.put(
      `${MEMBER_URL}/${memberId}/team/${teamId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error putUserInTeam", error);
    throw error;
  }
};

export const getTeamData = async (teamId: number) => {
  const url = `${TEAM_URL}/${teamId}/getEveryData`;

  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error getTeamData", error);
    throw error;
  }
};
