import { api } from "./auth";

export const makeAdmin = async (username: string) => {
  const response = await api.post(`admin/make-admin`, { username });
  return response.data;
};

export const createInvite = async (name: string) => {
  const response = await api.post(`admin/create-invite`, {
    name,
  });
  return response.data;
};

export const deleteAccount = async (username: string) => {
  const response = await api.post(`admin/delete-account`, { username });
  return response.data;
};

export const banAccount = async (username: string) => {
  const response = await api.post(`admin/ban-account`, { username });
  return response.data;
};

export const unbanAccount = async (username: string) => {
  const response = await api.post(`admin/unban-account`, { username });
  return response.data;
};