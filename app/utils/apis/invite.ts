import { CreateInviteRequest } from "../types/invite";
import { api } from "./auth";

export const fetchInvite = async (token: string) => {
  const response = await api.get(`/invite/${token}`);
  return response.data;
};

export const adminCreateInvite = async (name: string) => {
  const response = await api.post(`admin/create-invite`, { name });
  return response.data;
};

export const createInvite = async ({ token, name }: CreateInviteRequest) => {
  const response = await api.post(`invite/create`, {
    name,
    token,
  });
  return response.data;
};
