import { useEffect, useRef } from "react";

import { Delete } from "neetoicons";
import { Button, NoData, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useViewHistoryStore from "stores/useViewHistoryStore";

export const MoviesHistory = () => {
  const { t } = useTranslation();
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
          {t("viewHistory")}
        </Typography>
        <Button
          label={t("clearAll")}
          style="danger-text"
          onClick={clearHistory}
        />
      </div>
      <div
        className="flex max-h-80 flex-col gap-2 overflow-y-auto p-2"
        ref={containerRef}
      >
        {viewHistory.length > 0 ? (
          viewHistory.map(movie => (
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
          ))
        ) : (
          <div className="mt-40 flex justify-center">
            <NoData title={t("noHistory")} />
          </div>
        )}
      </div>
    </div>
  );
};
