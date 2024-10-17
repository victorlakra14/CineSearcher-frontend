import axios from "axios";

const show = slug =>
  axios.get(`?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${slug}`);

const moviesApi = { show };

export default moviesApi;
