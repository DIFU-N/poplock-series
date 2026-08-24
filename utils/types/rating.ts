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
