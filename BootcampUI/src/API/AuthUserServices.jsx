import axios from 'axios';

const BASE_URL = "https://localhost:7244/api/AuthUser";

const getUserDataByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/GetLoginUserData/${name}`);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export default {
  getUserDataByName,
};