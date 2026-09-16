import { Show } from "./shows";

export type Episode = {
  id: string;
  tvMazeId: number;
  showId: string;
  title: string;
  season: string;
  number: number;
  airDate: string;
  airTime: string;
  airStamp: string;
  runtime: number;
  summary: string;
};

export type ScheduledShow = {
  show: Show;
  nextEpisode: Episode;
};
