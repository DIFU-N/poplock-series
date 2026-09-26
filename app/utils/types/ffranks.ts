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

export type FFPointsDTO = {
  showId: string;
  showName: string;
  showImage: string;
  points: number;
};

export type FFRankDTO = {
  showId: string;
  showName: string;
  showImage: string;
  rank: number;
  tvMazeId: number;
};

export type AdminRankingRequest = {
  name?: string;
  tvmazeIds: number[];
};


export type UserRankingRequest = {
  name: string;
  tvmazeIds: number[];
};

export type FFParticipantRanking = {
  name: string;
  rankings: FFRankDTO[];
};