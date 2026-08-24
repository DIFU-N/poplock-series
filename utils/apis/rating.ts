import axios from "axios";
import { RateShowRequest, Rating, UpdateRateShowRequest } from "../types/rating";
import { API_BASE } from "./auth";

export const getAverageRating = async (showId: string) => {
  const response = await axios.get(`${API_BASE}/rating/average/${showId}`);
  return response.data;
};

export const rateShow = async (input: RateShowRequest) => {
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

export const updateRating = async (input: UpdateRateShowRequest) => {
  const response = await axios.put(`${API_BASE}/rating`, { input });
  return response.data;
};

export const getUserRating = async (showId: string) => {
  const response = await axios.get(`${API_BASE}/rating/${showId}`);
  return response.data;
};
