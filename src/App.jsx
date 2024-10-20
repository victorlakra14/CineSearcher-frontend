import { MovieList } from "components/MovieList";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import "./App.css";
// eslint-disable-next-line import/extensions

const App = () => (
  <div className="App">
    <Switch>
      <Route exact component={MovieList} path={routes.movies.index} />
      <Redirect exact from={routes.root} to={routes.movies.index} />
    </Switch>
  </div>
);

export default App;
