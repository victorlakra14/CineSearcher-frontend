import { MovieCard } from "components/MovieCard";

import "./App.css";
// eslint-disable-next-line import/extensions

const App = () => (
  <div className="App">
    <MovieCard title="Hangover" type="Movie" year={1998} />
  </div>
);

export default App;
