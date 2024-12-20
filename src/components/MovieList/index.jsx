import { useEffect, useRef, useState } from "react";

import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Kbd, NoData, Pagination } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { createParams } from "utils/createParams";
import { getType } from "utils/getType";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_INDEX } from "./constants";
import { FilterOptions } from "./FilterOptions";
import { MovieCard } from "./MovieCard";
import { MoviesHistory } from "./MoviesHistory";

import PageLoader from "../commons/PageLoader";

export const MovieList = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showMovies, setShowMovies] = useState(false);
  const [showSeries, setShowSeries] = useState(false);

  const { t } = useTranslation();
  const inputRef = useRef();
  const history = useHistory();
  const queryParams = useQueryParams();
  const { page, search, year } = queryParams;
  const debouncedSearchKey = useDebounce(searchInput);

  const [releaseYear, setReleaseYear] = useState(year);

  const moviesParams = createParams({
    s: search,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    y: releaseYear || undefined,
    type: getType(showMovies, showSeries),
  });

  const { data: { Search: movies = [], totalResults } = {}, isLoading } =
    useFetchMovies(moviesParams);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.movies.index, mergeLeft({ page }, queryParams))
    );

  const updateQueryParams = useFuncDebounce(value => {
    const params = createParams({
      page: DEFAULT_PAGE_INDEX,
      search: value || null,
      year: releaseYear || null,
      showMovies: showMovies || null,
      showSeries: showSeries || null,
    });

    setSearchInput(value);

    history.replace(buildUrl(routes.movies.index, filterNonNull(params)));
  });

  const handleYearChange = newYear => {
    setReleaseYear(newYear);
    const params = createParams({
      page: DEFAULT_PAGE_INDEX,
      search: searchInput || null,
      year: newYear || null,
      showMovies: showMovies || null,
      showSeries: showSeries || null,
    });
    history.replace(buildUrl(routes.movies.index, filterNonNull(params)));
  };

  const toggleIsMovie = () => {
    setShowMovies(prev => !prev);
    const params = createParams({
      page: DEFAULT_PAGE_INDEX,
      search: searchInput || null,
      year: releaseYear || null,
      showMovies: !showMovies || null,
      showSeries: showSeries || null,
    });
    history.replace(buildUrl(routes.movies.index, filterNonNull(params)));
  };

  const toggleIsSeries = () => {
    setShowSeries(prev => !prev);
    const params = createParams({
      page: DEFAULT_PAGE_INDEX,
      search: searchInput || null,
      year: releaseYear || null,
      showMovies: showMovies || null,
      showSeries: !showSeries || null,
    });
    history.replace(buildUrl(routes.movies.index, filterNonNull(params)));
  };

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

  return (
    <div className="mt-2 grid grid-cols-7">
      <div className="col-span-5 border-r-2 pb-20 pl-20 pr-10 pt-6">
        <div className="flex gap-2">
          <Input
            autoFocus
            placeholder={t("search")}
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
          <FilterOptions
            setYear={handleYearChange}
            showMovies={showMovies}
            showSeries={showSeries}
            toggleIsMovie={toggleIsMovie}
            toggleIsSeries={toggleIsSeries}
            year={releaseYear}
          />
        </div>
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            {isEmpty(movies) ? (
              <div className="flex h-96 w-full items-center justify-center">
                <NoData title={t("noMovies")} />
              </div>
            ) : (
              <>
                <div>
                  <div className="mt-8 flex flex-wrap gap-5 space-y-2 px-10">
                    {movies.map(({ imdbID, Poster, Title, Type, Year }) => (
                      <MovieCard
                        id={imdbID}
                        key={imdbID}
                        posterURL={Poster}
                        title={Title}
                        type={Type}
                        year={Year}
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
          </>
        )}
      </div>
      <div className="col-span-2">
        <MoviesHistory />
      </div>
    </div>
  );
};
