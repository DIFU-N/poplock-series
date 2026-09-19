import { AdminRankingRequest, FFRankDTO, FFRanking } from "../types/ffranks";
import { api } from "./auth";

export const SubmitRanking = async (token: string, tvmazeIds: number[]) => {
  const response = await api.post(`/fnfranks/`, {
    token,
    tvmazeIds,
  });
  return response.data;
};

export const GetAllRankings = async (): Promise<FFRanking[]> => {
  const response = await api.get<FFRanking[]>(`/fnfranks/`);
  return response.data;
};

export const GetRankingByName = async (name: string): Promise<FFRanking> => {
  const response = await api.get<FFRanking>(`/fnfranks/name`, {
    params: { name },
  });
  return response.data;
};

export const GetTopTen = async (): Promise<FFRankDTO[]> => {
  const response = await api.get<FFRankDTO[]>(`/fnfranks/top10`);
  return response.data;
};

export const DeleteFriend = async (id: string): Promise<string> => {
  const response = await api.delete<string>(`/fnfranks/${id}`);
  return response.data;
};

export const CreateAdminRanking = async (
  request: AdminRankingRequest,
): Promise<FFRanking> => {
  const response = await api.post(`/fnfranks/ranking/admin`, request);
  return response.data;
};

export const GetDadamansRanking = async (): Promise<FFRanking> => {
  const response = await api.get<FFRanking>(`/fnfranks/dadaman`);
  return response.data;
};
