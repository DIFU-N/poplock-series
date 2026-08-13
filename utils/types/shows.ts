export type Show = {
  id: string;
  tvMazeId: number;
  title: string;
  language: string;
  status: string;
  runtime?: number;
  averageRuntime?: number;
  premiered?: string;
  ended?: string;
  officialSite: string;
  rating?: number;
  genreIds: [string];
  image?: string;
  summary: string;
  network?: NetworkType;
};

export type NetworkType = {
  id: number;
  name: string;
  officialSite: string;
};

export type Country = {
  name: string;
  code: string;
  timezone: string;
};

export type Genre = {
  id: number;
  name: string;
};
