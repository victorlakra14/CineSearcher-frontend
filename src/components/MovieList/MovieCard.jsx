import { MovieDetail } from "components/MovieDetail";
import { capitalize } from "neetocist";
import { Typography } from "neetoui";
import { setDefaultImage } from "utils/setDefaultImage";

export const MovieCard = ({ id, title, type, year, posterURL }) => {
  const imageSrc = setDefaultImage(posterURL);

  return (
    <div className="neeto-ui-shadow-lg neeto-ui-rounded-lg flex w-48 flex-col space-y-1.5 px-5 pb-4">
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
        {capitalize(type)} • {year}
      </Typography>
      <div>
        <MovieDetail id={id} title={title} />
      </div>
    </div>
  );
};
