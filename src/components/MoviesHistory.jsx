import { useEffect, useRef } from "react";

import { Typography } from "@bigbinary/neetoui";
import useViewHistoryStore from "stores/useViewHistoryStore";

export const MoviesHistory = () => {
  const { viewHistory = [] } = useViewHistoryStore();
  const recentMovieRef = useRef(null);

  useEffect(() => {
    if (recentMovieRef.current) {
      recentMovieRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [viewHistory]);

  return (
    <div>
      <Typography style="h2" weight="bold">
        View History
      </Typography>
      <div className="flex max-h-80 flex-col gap-2 overflow-y-auto">
        {viewHistory.map(movie => (
          <div
            key={movie.id}
            ref={movie.isRecent ? recentMovieRef : null}
            className={`rounded-lg ${
              movie.isRecent ? "bg-blue-600 text-white" : "bg-blue-100"
            } py-2 text-center font-medium`}
          >
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
};
