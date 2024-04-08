import { MovieData } from "../types";

export const formatMovieData = (data: MovieData[]) => {
  const newData = data.map((movie) => {
    const newMovie = { ...movie };
    const averageRating = Number(
      (
        movie.reviews.reduce((review, current) => review + current, 0) /
        movie.reviews.length
      ).toFixed(1)
    );
    newMovie.averageRating = averageRating;
    return newMovie;
  });

  return newData;
};
