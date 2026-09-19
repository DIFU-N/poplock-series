export type FFRanking = {
  id: string;
  participantsName: string;
  rankingList: ShowRanks[];
};

export type ShowRanks = {
  showId: string;
  rank: number;
};

export type RankingResult = {
  showId: string;
  points: number;
};

export type FFRankResponse = {
  showId: string;
  showName: string;
  showImage: string;
  points: number;
};
