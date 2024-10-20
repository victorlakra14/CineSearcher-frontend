import { useState } from "react";

import { Button, Modal, Typography } from "@bigbinary/neetoui";
import { useFetchMovieDetails } from "hooks/reactQuery/useMoviesApi";
import useViewHistoryStore from "stores/useViewHistoryStore";

import PageLoader from "./PageLoader";

export const MovieDetail = ({ id, title }) => {
  const params = {
    i: id,
    plot: "full",
  };

  const [isOpen, setIsOpen] = useState(false);
  const { addToHistory } = useViewHistoryStore();

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
  } = movieDetails;

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
                {title}
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
              <div className="flex gap-5">
                <img alt={title} className="h-72" src={imageSrc} />
                <div>
                  <div className="mb-3 mt-1">
                    <Typography component="em" style="body2" weight="normal">
                      {Plot}
                    </Typography>
                  </div>
                  <Typography style="body2">
                    <span className="font-bold">Director: </span>
                    {Director}
                  </Typography>
                  <Typography style="body2">
                    <span className="font-bold">Actors: </span>
                    {Actors}
                  </Typography>
                  <Typography style="body2">
                    <span className="font-bold">Box Office: </span>
                    {BoxOffice}
                  </Typography>
                  <Typography style="body2">
                    <span className="font-bold">Year: </span>
                    {Year}
                  </Typography>
                  <Typography style="body2">
                    <span className="font-bold">Runtime: </span>
                    {Runtime}
                  </Typography>
                  <Typography style="body2">
                    <span className="font-bold">Language: </span>
                    {Language}
                  </Typography>
                  <Typography style="body2">
                    <span className="font-bold">Rated: </span>
                    {Rated}
                  </Typography>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
