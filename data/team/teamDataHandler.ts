import axios from "axios";

export const fetchAllTeamData = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/team`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team data:", error);
  }
};

/* api/member/{memberId}/team/{teamId} */
export const putUserInTeam = async (teamId: number, memberId: number) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/member/${memberId}/team/${teamId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching team data:", error);
  }
};
