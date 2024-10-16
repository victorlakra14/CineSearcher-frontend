import { MovieList } from "components/MovieList";
import { SearchBar } from "components/SearchBar";

import "./App.css";
// eslint-disable-next-line import/extensions

const App = () => (
  <div className="App">
    <div className="p-20">
      <SearchBar />
      <MovieList />
    </div>
  </div>
);

export default App;
