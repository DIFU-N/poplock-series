import axios from "axios";
import { API_BASE } from "./auth";

export const fetchGenres = async () => {
  const response = await axios.get(`${API_BASE}/genres`);
  return response.data;
};

export const searchForShow = async (query: string) => {
  const response = await axios.post(`${API_BASE}/show/search`, { query });
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
