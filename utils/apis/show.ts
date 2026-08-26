import axios from "axios";
import { api, API_BASE } from "./auth";
import { setFeaturedInputValues } from "../types/shows";

export const fetchGenres = async () => {
  const response = await axios.get(`${API_BASE}/genres`);
  return response.data;
};

export const searchForShow = async (query: string) => {
  const response = await axios.get(`${API_BASE}/show/search`, {
    params: { query },
  });
  console.log(response);

  return response.data;
};

export const importShow = async (tvMazeId: number) => {
  const response = await axios.post(`${API_BASE}/show/import`, { tvMazeId });
  return response.data;
};

export const getAllShows = async () => {
  const response = await axios.get(`${API_BASE}/show`);
  return response.data;
};

export const setFeaturedShows = async (showIds: setFeaturedInputValues) => {
  const response = await api.put(`/show/featured/set`, showIds);
  return response.data;
};

export const getShowById = async (id: string) => {
  const response = await axios.post(`${API_BASE}/show/search/in`, { id });
  return response.data;
};

export const getScheduledEpisodes = async () => {
  const response = await axios.get(`${API_BASE}/episodes/scheduled`);
  return response.data.scheduled.result;
};
