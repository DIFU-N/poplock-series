import axios from "axios";
import { Rating } from "../types/rating";
import { API_BASE } from "./auth";

export const getAverageRating = async (showId: string) => {
  const response = await axios.get(`${API_BASE}/rating/average/${showId}`);
  console.log(response);
};

export const rateShow = async (input: Rating) => {
  const response = await axios.post(`${API_BASE}/rating`, { input });
  return response.data;
};

export const getDadamansRating = async (showId: string) => {
  const response = await axios.get(`${API_BASE}/rating/${showId}/dadaman`);
  return response.data;
};

export const getAllUsersRatings = async () => {
  const response = await axios.get(`${API_BASE}/rating/me`);
  return response.data;
};

export const updateRating = async (input: Rating) => {
  const response = await axios.put(`${API_BASE}/rating`, { input });
  return response.data;
};

export const getUserRating = async (showId: string) => {
  const response = await axios.get(`${API_BASE}/rating/${showId}`);
  return response.data;
};
