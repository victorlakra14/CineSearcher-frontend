import { useEffect, useRef } from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import useViewHistoryStore from "stores/useViewHistoryStore";

export const MoviesHistory = () => {
  const {
    viewHistory = [],
    removeFromHistory,
    clearHistory,
  } = useViewHistoryStore();
  const recentMovieRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (recentMovieRef.current && containerRef.current) {
      const recentMovie = recentMovieRef.current;
      const container = containerRef.current;

      const topOffSet = recentMovie.offsetTop - container.offsetTop;

      container.scrollTo({
        top: topOffSet - 130,
        behavior: "smooth",
      });
    }
  }, [viewHistory]);

  return (
    <div className="flex w-full flex-col gap-3 p-2 pt-5">
      <div className="flex items-center justify-between px-5">
        <Typography style="h3" weight="bold">
          View History
        </Typography>
        <Button label="Clear all" style="danger-text" onClick={clearHistory} />
      </div>
      <div
        className="flex max-h-80 flex-col gap-2 overflow-y-auto"
        ref={containerRef}
      >
        {viewHistory.map(movie => (
          <div
            key={movie.id}
            ref={movie.isRecent ? recentMovieRef : null}
            className={`flex items-center justify-between rounded-lg ${
              movie.isRecent ? "bg-blue-600 text-white" : "bg-blue-100"
            } px-5 py-2 text-center font-medium`}
          >
            {movie.title}
            <div>
              <Delete
                className="cursor-pointer"
                onClick={() => removeFromHistory(movie.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
