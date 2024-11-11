export const getType = (showMovies, showSeries) => {
  if (showMovies && showSeries) {
    return undefined;
  } else if (showMovies) {
    return "movie";
  } else if (showSeries) {
    return "series";
  }

  return undefined;
};
