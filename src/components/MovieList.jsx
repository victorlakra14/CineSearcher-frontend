import { DEFAULT_PAGE_INDEX } from "constants/productListConstants";

import { useEffect, useRef, useState } from "react";

import { filterNonNull } from "@bigbinary/neeto-cist";
import { Search } from "@bigbinary/neeto-icons";
import { Input, Kbd, Pagination, Typography } from "@bigbinary/neetoui";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { isEmpty, mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { MovieCard } from "./MovieCard";
import { MoviesHistory } from "./MoviesHistory";
import PageLoader from "./PageLoader";

export const MovieList = () => {
  const inputRef = useRef();
  const history = useHistory();
  const queryParams = useQueryParams();
  const { page, s } = queryParams;

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchKey = useDebounce(searchInput);

  const moviesParams = {
    s,
    page: Number(page) || DEFAULT_PAGE_INDEX,
  };

  const { data: { Search: movies = [], totalResults } = {}, isLoading } =
    useFetchMovies(moviesParams);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.movies.index, mergeLeft({ page }, queryParams))
    );

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      s: value || null,
    };

    setSearchInput(value);

    history.replace(buildUrl(routes.movies.index, filterNonNull(params)));
  });

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [debouncedSearchKey]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="grid grid-cols-7">
      <div className="col-span-5 pb-20 pl-20 pr-10 pt-10">
        <div>
          <Input
            autoFocus
            placeholder="Search"
            prefix={<Search />}
            ref={inputRef}
            suffix={<Kbd keyName="/" />}
            type="search"
            value={searchInput}
            onChange={({ target: { value } }) => {
              updateQueryParams(value);
              setSearchInput(value);
            }}
          />
        </div>
        {isEmpty(movies) ? (
          <div className="flex h-screen w-full items-center justify-center">
            <Typography style="h2" weight="bold">
              Search to find your movie!!!
            </Typography>
          </div>
        ) : (
          <>
            <div>
              <div className="mt-8 flex flex-wrap gap-5 space-y-2 px-10">
                {movies.map(movie => (
                  <MovieCard
                    id={movie.imdbID}
                    key={movie.imdbID}
                    posterURL={movie.Poster}
                    title={movie.Title}
                    type={movie.Type}
                    year={movie.Year}
                  />
                ))}
              </div>
            </div>
            <div className="mb-5 mt-10 flex justify-end self-end">
              <Pagination
                count={totalResults}
                navigate={handlePageNavigation}
                pageNo={Number(page) || DEFAULT_PAGE_INDEX}
                pageSize={10}
              />
            </div>
          </>
        )}
      </div>
      <div className="col-span-2">
        <MoviesHistory />
      </div>
    </div>
  );
};
