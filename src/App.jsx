import { Header } from "components/commons/Header";
import { Favorites } from "components/Favorites";
import { MovieList } from "components/MovieList";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import "./App.css";
// eslint-disable-next-line import/extensions
// Here eslint was disabled from smile cart repository

const App = () => (
  <div>
    <Header />
    <div className="mt-2 h-0.5 bg-gray-200" />
    <Switch>
      <Route exact component={MovieList} path={routes.movies.index} />
      <Route exact component={Favorites} path={routes.favorites.index} />
      <Redirect exact from={routes.root} to={routes.movies.index} />
    </Switch>
  </div>
);

export default App;
