import axios from "axios";
import { api, API_BASE } from "./auth";
import { MustHav } from "../types/musthavs";
import { ShowRanking } from "../types/showRanking";

export const addMustHav = async (musthav: MustHav) => {
  const response = await api.post(`/musthavs/add`, musthav);
  return response.data;
};

export const addTopTenFamFriends = async (
  showRanking: ShowRanking,
  // token: string,
) => {
  const response = await api.post(`/musthavs/add/top10`, {
    showRanking,
    // token,
  });
  return response.data;
};

export const getMustHavs = async () => {
  const response = await api.get(`/musthavs/all`);
  return response.data;
};
