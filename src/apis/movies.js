import axios from "axios";

const show = slug => axios.get(`&t=${slug}`);

const moviesApi = { show };

export default moviesApi;
