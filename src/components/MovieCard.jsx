import { Button, Typography } from "@bigbinary/neetoui";

export const MovieCard = ({ title, type, year }) => (
  <div className="neeto-ui-shadow-lg neeto-ui-rounded-lg flex w-72 flex-col space-y-1.5 px-5 pb-4">
    <div className="flex w-full justify-center">
      <img
        alt="movie"
        className="h-52 w-40"
        src="https://m.media-amazon.com/images/M/MV5BOWFlZTk5NDUtZmYxZS00N2ExLWE4YmItYTY3NzE0NTY3ZWM4XkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_SX300.jpg"
      />
    </div>
    <Typography style="h2" weight="semibold">
      {title}
    </Typography>
    <Typography
      className="neeto-ui-text-gray-500"
      style="body2"
      weight="semibold"
    >
      {type} • {year}
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
