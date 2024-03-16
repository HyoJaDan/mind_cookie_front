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
