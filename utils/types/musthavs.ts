import { ShowRanking } from "./showRanking";
import { someOfShow } from "./shows";

export type MustHav = {
  id?: string;
  name: string;
  description: string;
  tvMazeIds: number[];
};

export type addMustHavResponse = {
  message: string;
  mustHav: MustHav;
};

export type addTopTenResponse = {
  message: string;
  showRanking: ShowRanking;
};

export type GetMustHavResponse = {
  id?: string;
  name: string;
  description: string;
  shows: someOfShow[];
};
