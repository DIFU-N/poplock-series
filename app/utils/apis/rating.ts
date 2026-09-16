import { RateShowRequest, UpdateRateShowRequest } from "../types/rating";
import { api } from "./auth";

export const getAverageRating = async (showId: string) => {
  const response = await api.get(`/rating/average/${showId}`);
  return response.data;
};

export const rateShow = async (input: RateShowRequest) => {
  const response = await api.post(`/rating`, input);
  return response.data;
};

export const getDadamansRating = async (showId: string) => {
  const response = await api.get(`/rating/${showId}/dadaman`);
  return response.data;
};

export const getAllUsersRatings = async () => {
  const response = await api.get(`/rating/me`);
  return response.data;
};

export const updateRating = async (input: UpdateRateShowRequest) => {
  const response = await api.put(`/rating`, input);
  return response.data;
};

export const getUserRating = async (showId: string) => {
  const response = await api.get(`/rating/${showId}/me`);
  return response.data;
};
