export type ShowRanking = {
  id: string;
  userId?: string;
  showId: string;
  rank: number;
  participantsName?: string;
};

export type ShowRankingType = {
  showId: string;
  points: number;
};
