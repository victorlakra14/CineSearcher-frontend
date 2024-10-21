import { Typography } from "@bigbinary/neetoui";
import { FavoriteList } from "components/FavoriteList";
import { MovieList } from "components/MovieList";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import routes from "routes";

import "./App.css";
// eslint-disable-next-line import/extensions

const App = () => (
  <div className="App">
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
    <div className="mt-2 h-0.5 bg-gray-200" />
    <Switch>
      <Route exact component={MovieList} path={routes.movies.index} />
      <Route exact component={FavoriteList} path={routes.favorites.index} />
      <Redirect exact from={routes.root} to={routes.movies.index} />
    </Switch>
  </div>
);

export default App;
