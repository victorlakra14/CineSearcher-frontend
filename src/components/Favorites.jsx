import { NoData, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useFavoritesStore from "stores/useFavoritesStore";

export const Favorites = () => {
  const { t } = useTranslation();
  const favorites = useFavoritesStore.pickFrom();

  if (favorites.length === 0) {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <NoData title={t("noFavorites")} />
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col items-center space-y-4 px-80">
      {favorites.map(({ id, title, rating }) => (
        <div
          className="border-1 flex w-full items-center justify-between rounded-lg border-2 border-gray-200 p-4 shadow-md"
          key={id}
        >
          <Typography style="h4" weight="bold">
            {title}
          </Typography>
          <Typography className="text-gray-500" weight="semibold">
            {t("rating")}: <span className="text-gray-400">{rating}/10</span>
          </Typography>
        </div>
      ))}
    </div>
  );
};
