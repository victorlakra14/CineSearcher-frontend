import axios from "axios";

const show = params => axios.get("", { params });

const moviesApi = { show };

export default moviesApi;
