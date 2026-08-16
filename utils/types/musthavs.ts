import { ShowRanking } from "./showRanking";

export type MustHav = {
  id: string;
  name: string;
  description: string;
  showId: [string];
};

export type addMustHavResponse = {
  message: string;
  mustHav: MustHav;
};

export type addTopTenResponse = {
  message: string;
  showRanking: ShowRanking;
};
