import axios from "axios";

export const fetchUserData = async (userId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/member/${userId}`
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
