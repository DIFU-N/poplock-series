import { Country, NetworkType } from "./shows";

export type TvMazeResponse = {
  id: number;
  tvMazeId: number;
  name: string;
  language: string;
  status: string;
  runtime?: number;
  averageRuntime?: number;
  premiered?: string;
  ended?: string;
  officialSite: string;
  rating?: TvMazeRating;
  genreIds: [string];
  image?: TvMazeImage;
  summary: string;
  network?: NetworkType;
};

export type TvMazeImage = {
  medium: string;
  original: string;
};

export type TvMazeRating = {
  average: number;
};

export type TvMazeNetworkType = {
  id: number;
  name: string;
  officialSite: string;
  country: Country;
};

export type singleSearchResponse = {
  show: TvMazeResponse;
  score: number;
}

export type searchShowResponse = singleSearchResponse[];
