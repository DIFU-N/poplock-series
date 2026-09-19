export type ShowRanks = {
  showId: string;
  rank: number;
};

export type FFRanking = {
  id: string;
  participantsName: string;
  rankingList: ShowRanks[];
};

export type RankingResult = {
  showId: string;
  points: number;
};

export type FFRankDTO = {
  showId: string;
  showName: string;
  showImage: string;
  points: number;
};

export type AdminRankingRequest = {
  name?: string;
  tvmazeIds: number[];
};