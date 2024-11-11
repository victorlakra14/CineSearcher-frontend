import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center gap-10 px-10 pt-4">
      <div className="flex gap-1">
        <Typography className="text-blue-600" style="h2" weight="bold">
          {t("header.cine")}
        </Typography>
        <Typography style="h2" weight="bold">
          {t("header.searcher")}
        </Typography>
      </div>
      <div className="space-x-10">
        <NavLink
          exact
          activeClassName="text-blue-500"
          className="text-base font-bold"
          to="/movies"
        >
          {t("header.home")}
        </NavLink>
        <NavLink
          exact
          activeClassName="text-blue-500"
          className="text-base font-bold"
          to="/favorites"
        >
          {t("header.favorites")}
        </NavLink>
      </div>
    </div>
  );
};
