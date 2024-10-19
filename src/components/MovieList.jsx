import { useEffect, useRef, useState } from "react";

import { Search } from "@bigbinary/neeto-icons";
import { Input, Kbd, Typography } from "@bigbinary/neetoui";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import { isEmpty } from "ramda";

import { MovieCard } from "./MovieCard";
import PageLoader from "./PageLoader";

export const MovieList = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchKey = useDebounce(searchInput);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [movies, setMovies] = useState([]);

  const { data: { Search: movies = [] } = {}, isLoading } = useFetchMovies({
    s: debouncedSearchKey,
  });

  const inputRef = useRef();

  //   const fetchMovies = async () => {
  //     try {
  //       const response = await moviesApi.show({ s: debouncedSearchKey });
  //       if (response.Response === "False") {
  //         return;
  //       }
  //       setMovies(response.Search);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // fetchMovies();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [debouncedSearchKey]);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <div className="pr-10">
        <Input
          autoFocus
          placeholder="Search"
          prefix={<Search />}
          ref={inputRef}
          suffix={<Kbd keyName="/" />}
          type="search"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>
      {isEmpty(movies) ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Typography style="h2" weight="bold">
            Search to find your movie!!!
          </Typography>
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap gap-5 space-y-2 px-10">
          {movies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              poster={movie.Poster}
              title={movie.Title}
              type={movie.Type}
              year={movie.Year}
            />
          ))}
        </div>
      )}
    </>
  );
};
