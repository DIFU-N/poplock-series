import axios from "axios";
import { API_BASE } from "./auth";

export const makeAdmin = async (username: string) => {
  const response = await axios.post(`${API_BASE}/make-admin`, { username });
  return response.data;
};

export const deleteAccount = async (username: string) => {
  const response = await axios.post(`${API_BASE}/delete-account`, { username });
  return response.data;
};

export const banAccount = async (username: string) => {
  const response = await axios.post(`${API_BASE}/ban-account`, { username });
  return response.data;
};

export const unbanAccount = async (username: string) => {
  const response = await axios.post(`${API_BASE}/unban-account`, { username });
  return response.data;
};

export const createInvite = async (name: string) => {
  const response = await axios.post(`${API_BASE}/create-invite`, { name });
  return response.data;
};
