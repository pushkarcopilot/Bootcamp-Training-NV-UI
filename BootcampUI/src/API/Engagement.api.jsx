import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5239/api", //add your local api
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEngagements = async (params = {}) => {
  const { data } = await axiosInstance.get("/Engagement");
  return data;
};

export const getDropdownValues = async (params = {}) => {
  const { data } = await axiosInstance.get("/Engagement/Dropdown");
  return data;
};

export const createEngagement = async (params) => {
  await axiosInstance.post('/Engagement/Create', params)
};

export const saveEngagementSettings = async (params) =>
  await axiosInstance.post("/Engagement/AddBackupSetting", params);
