import { Typography } from "@bigbinary/neetoui";
import { toUpper } from "ramda";

import { MovieDetail } from "./MovieDetail";

export const MovieCard = ({ id, title, type, year, posterURL }) => {
  const imageSrc =
    posterURL === "N/A"
      ? "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"
      : posterURL;

  return (
    <div className="neeto-ui-shadow-lg neeto-ui-rounded-lg flex w-72 flex-col space-y-1.5 px-5 pb-4">
      <div className="flex w-full justify-center">
        <img alt={title} className="h-52 w-40" src={imageSrc} />
      </div>
      <Typography style="h2" weight="semibold">
        {title}
      </Typography>
      <Typography
        className="neeto-ui-text-gray-500"
        style="body2"
        weight="semibold"
      >
        {toUpper(type.slice(0, 1)) + type.slice(1)} • {year}
      </Typography>
      <div>
        <MovieDetail id={id} />
      </div>
    </div>
  );
};
