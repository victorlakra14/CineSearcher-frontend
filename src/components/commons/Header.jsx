import { Typography } from "@bigbinary/neetoui";
import { NavLink } from "react-router-dom";

export const Header = () => (
  <div className="flex w-full items-center gap-10 px-10 pt-4">
    <div className="flex gap-1">
      <Typography className="text-blue-600" style="h2" weight="bold">
        Cine
      </Typography>
      <Typography style="h2" weight="bold">
        Searcher
      </Typography>
    </div>
    <div className="space-x-10">
      <NavLink
        exact
        activeClassName="text-blue-500"
        className="text-base font-bold"
        to="/movies"
      >
        Home
      </NavLink>
      <NavLink
        exact
        activeClassName="text-blue-500"
        className="text-base font-bold"
        to="/favorites"
      >
        Favorites
      </NavLink>
    </div>
  </div>
);
