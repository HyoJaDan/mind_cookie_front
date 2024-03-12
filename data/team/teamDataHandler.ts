import axios from "axios";

export const fetchAllTeamData = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/team`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team data:", error);
  }
};
