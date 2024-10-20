import { useState } from "react";

import { Button, Modal, Typography } from "@bigbinary/neetoui";
import { useFetchMovieDetails } from "hooks/reactQuery/useMoviesApi";

import PageLoader from "./PageLoader";

export const MovieDetail = ({ id }) => {
  const params = {
    i: id,
    plot: "full",
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { data: movieDetails = {}, isLoading } = useFetchMovieDetails(
    params,
    isOpen
  );

  const {
    Title,
    Genre = "",
    Poster: posterURL,
    Plot,
    Director,
    Actors,
    BoxOffice,
    Year,
    Runtime,
    Language,
    imdbRating,
  } = movieDetails;

  const genreArray = Genre.split(", ");
  const imageSrc =
    posterURL === "N/A"
      ? "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"
      : posterURL;

  return (
    <>
      <Button
        className="bg-gray-100 text-blue-600"
        size="small"
        style="secondary"
        onClick={handleClick}
      >
        <Typography style="body2" weight="bold">
          View Details
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
          <PageLoader />
        ) : (
          <>
            <div>
              <Typography id="dialog1Title" style="h2" weight="bold">
                {Title}
              </Typography>
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
              <div className="flex">
                <img alt={Title} src={imageSrc} />
                <div>
                  <Typography>{Plot}</Typography>
                  <Typography>{Director}</Typography>
                  <Typography>{Actors}</Typography>
                  <Typography>{BoxOffice}</Typography>
                  <Typography>{Year}</Typography>
                  <Typography>{Runtime}</Typography>
                  <Typography>{Language}</Typography>
                  <Typography>{imdbRating}</Typography>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
