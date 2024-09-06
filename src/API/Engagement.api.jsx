import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:44341/api", //add your local api
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEngagements = async (params = {}) => {
  const { data } = await axiosInstance.get("/Engagement");
  return data;
};
