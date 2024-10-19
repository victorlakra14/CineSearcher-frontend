import { QUERY_KEYS } from "constants/query";

import moviesApi from "apis/movies";
import { useQuery } from "react-query";

export const useFetchMovies = params =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, params],
    queryFn: () => moviesApi.show(params),
    keepPreviousData: true,
  });
