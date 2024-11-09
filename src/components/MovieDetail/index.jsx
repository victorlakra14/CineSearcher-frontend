import { useState } from "react";

import { useFetchMovieDetails } from "hooks/reactQuery/useMoviesApi";
import { Rating, RatingFilled } from "neetoicons";
import { Button, Modal, Spinner, Tooltip, Typography } from "neetoui";
import { includes } from "ramda";
import { useTranslation } from "react-i18next";
import useFavoritesStore from "stores/useFavoritesStore";
import useViewHistoryStore from "stores/useViewHistoryStore";

import { DetailRow } from "./DetailRow";

export const MovieDetail = ({ id, title }) => {
  const params = {
    i: id,
  };

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { addToHistory } = useViewHistoryStore();
  const { favorites, toggleFavorite } = useFavoritesStore();

  const { data: movieDetails = {}, isLoading } = useFetchMovieDetails(
    params,
    isOpen
  );

  const {
    Genre = "",
    Poster: posterURL,
    Plot,
    Director,
    Actors,
    BoxOffice,
    Year,
    Runtime,
    Language,
    Rated,
    imdbRating,
  } = movieDetails;

  const rowDetails = [
    { label: t("movieDetail.director"), value: Director },
    { label: t("movieDetail.actors"), value: Actors },
    { label: t("movieDetail.boxOffice"), value: BoxOffice },
    { label: t("movieDetail.year"), value: Year },
    { label: t("movieDetail.runtime"), value: Runtime },
    { label: t("movieDetail.language"), value: Language },
    { label: t("movieDetail.rated"), value: Rated },
  ];

  const isFavorite = includes(
    id,
    favorites.map(m => m.id)
  );

  const genreArray = Genre.split(", ");
  const imageSrc =
    posterURL === "N/A"
      ? "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"
      : posterURL;

  const handleClick = () => {
    setIsOpen(true);
    addToHistory({ id, title });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        className="bg-gray-100 text-blue-600"
        size="small"
        style="secondary"
        onClick={handleClick}
      >
        <Typography style="body2" weight="bold">
          {t("viewDetail")}
        </Typography>
      </Button>
      <Modal
        className="p-5"
        closeOnOutsideClick={false}
        isOpen={isOpen}
        size="large"
        onClose={closeModal}
      >
        {isLoading ? (
          <div className="flex h-80 w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Typography id="dialog1Title" style="h2" weight="bold">
                {title}
              </Typography>
              {isFavorite ? (
                <Tooltip content={t("removeAsFavorite")} position="right">
                  <Button
                    icon={() => <RatingFilled size={18} />}
                    label=""
                    size="small"
                    style="text"
                    onClick={() =>
                      toggleFavorite({ id, title, rating: imdbRating })
                    }
                  />
                </Tooltip>
              ) : (
                <Tooltip content={t("addAsFavorite")} position="right">
                  <Button
                    icon={() => <Rating size={18} />}
                    size="small"
                    style="text"
                    onClick={() =>
                      toggleFavorite({ id, title, rating: imdbRating })
                    }
                  />
                </Tooltip>
              )}
            </div>
            <div>
              <div className="genre mb-5 mt-2 flex gap-3">
                {genreArray.map(genre => (
                  <div
                    className="rounded-full bg-blue-100 py-0.5 pl-3 pr-3"
                    key={genre}
                  >
                    <Typography className="" weight="medium">
                      {genre}
                    </Typography>
                  </div>
                ))}
              </div>
              <div className="flex gap-5">
                <img alt={title} className="h-72" src={imageSrc} />
                <div>
                  <div className="mb-3 mt-1">
                    <Typography component="em" style="body2" weight="normal">
                      {Plot}
                    </Typography>
                  </div>
                  {rowDetails.map(({ label, value }) => (
                    <DetailRow key={label} label={label} value={value} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
