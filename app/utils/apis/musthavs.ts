import { api} from "./auth";
import { MustHav } from "../types/musthavs";

export const addMustHav = async (musthav: MustHav) => {
  const response = await api.post(`/musthavs/add`, musthav);
  return response.data;
};

export const getMustHavs = async () => {
  const response = await api.get(`/musthavs/all`);
  return response.data;
};
