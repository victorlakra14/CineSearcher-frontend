import { Button, Typography } from "@bigbinary/neetoui";
import { toUpper } from "ramda";

export const MovieCard = ({ title, type, year, poster }) => (
  <div className="neeto-ui-shadow-lg neeto-ui-rounded-lg flex w-72 flex-col space-y-1.5 px-5 pb-4">
    <div className="flex w-full justify-center">
      <img alt={title} className="h-52 w-40" src={poster} />
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
      <Button
        className="bg-gray-100 text-blue-600"
        size="small"
        style="secondary"
      >
        <Typography style="body2" weight="bold">
          View Details
        </Typography>
      </Button>
    </div>
  </div>
);
