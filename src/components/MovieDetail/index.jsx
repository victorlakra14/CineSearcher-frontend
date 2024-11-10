import { useState } from "react";

import { useFetchMovieDetails } from "hooks/reactQuery/useMoviesApi";
import { Rating, RatingFilled } from "neetoicons";
import { Button, Modal, Spinner, Tooltip, Typography } from "neetoui";
import { includes } from "ramda";
import { useTranslation } from "react-i18next";
import useFavoritesStore from "stores/useFavoritesStore";
import useViewHistoryStore from "stores/useViewHistoryStore";
import { lowercaseFirstLetter } from "utils/lowercaseFirstLetter";
import { setDefaultImage } from "utils/setDefaultImage";

import { DetailRow } from "./DetailRow";

export const MovieDetail = ({ id, title }) => {
  const params = {
    i: id,
  };

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const addToHistory = useViewHistoryStore.pickFrom();
  const { favorites, toggleFavorite } = useFavoritesStore.pick();

  const { data: movieDetails = {}, isLoading } = useFetchMovieDetails(
    params,
    isOpen
  );

  const {
    genre = "",
    poster: posterURL,
    plot,
    director,
    actors,
    boxOffice,
    year,
    runtime,
    language,
    rated,
    imdbRating,
  } = lowercaseFirstLetter(movieDetails);

  const rowDetails = [
    { label: t("movieDetail.director"), value: director },
    { label: t("movieDetail.actors"), value: actors },
    { label: t("movieDetail.boxOffice"), value: boxOffice },
    { label: t("movieDetail.year"), value: year },
    { label: t("movieDetail.runtime"), value: runtime },
    { label: t("movieDetail.language"), value: language },
    { label: t("movieDetail.rated"), value: rated },
  ];

  const isFavorite = includes(
    id,
    favorites.map(m => m.id)
  );

  const genreArray = genre.split(", ");
  const imageSrc = setDefaultImage(posterURL);

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
                      {plot}
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
