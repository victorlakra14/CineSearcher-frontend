import { Typography } from "@bigbinary/neetoui";
import useFavoritesStore from "stores/useFavoritesStore";

export const FavoriteList = () => {
  const { favorites } = useFavoritesStore();

  return (
    <div className="mt-10 flex flex-col items-center space-y-4 px-80">
      {favorites.map(movie => (
        <div
          className="border-1 flex w-full items-center justify-between rounded-lg border-2 border-gray-200 p-4 shadow-md"
          key={movie.id}
        >
          <Typography style="h4" weight="bold">
            {movie.title}
          </Typography>
          <Typography className="text-gray-500" weight="semibold">
            Rating: <span className="text-gray-400">{movie.rating}/10</span>
          </Typography>
        </div>
      ))}
    </div>
  );
};
