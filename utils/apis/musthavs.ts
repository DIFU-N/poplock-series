import axios from "axios";
import { API_BASE } from "./auth";
import { MustHav } from "../types/musthavs";
import { ShowRanking } from "../types/showRanking";

export const addMustHav = async (musthav: MustHav) => {
  const response = await axios.post(`${API_BASE}/musthavs/add`, { musthav });
  return response.data;
};

export const addTopTenFamFriends = async (
  showRanking: ShowRanking,
  token: string,
) => {
  const response = await axios.post(`${API_BASE}/musthavs/add/top10`, {
    showRanking,
    token,
  });
  return response.data;
};
