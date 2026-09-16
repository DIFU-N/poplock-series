import { Show } from "./shows";

export type Rating = {
  id: string;
  userId: string;
  showId: string;
  score: number;
  createdAt: string;
  updatedAt: string;
};

export type getUserRatingResponse = {
  rating: Rating;
};

export type RateShowRequest = {
  showId: string;
  score: number;
};

export type UpdateRateShowRequest = {
  id: string;
  score: number;
};

export type RatingWithShow = {
  id: string;
  score: number;
  show: Show;
  updatedAt: string;
};

export type GetRatingWithShowResponse = RatingWithShow[];
