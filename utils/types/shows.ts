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
  scheduleFeatured?: boolean;
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

export type getAllShowsResponse = {
  shows: Show[];
};

export type importShowResponse = Show;

// export type singleSearchResponse = {
//   show: Show;
//   score: number;
// }

// export type searchShowResponse = singleSearchResponse[];

export type fetchGenresResponse = {
  genres: Genre[];
};

export type setFeaturedInputValues = string[];

export type someOfShow = {
  id: string;
  tvMazeId: number;
  title: string;
};

export type bestPerformers = {
  id: string;
  realName: string;
  character: string;
  showId: string;
};
