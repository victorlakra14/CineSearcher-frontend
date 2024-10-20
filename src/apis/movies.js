import axios from "axios";

const show = params => axios.get("", { params });

const fetch = params => axios.get("", { params });

const moviesApi = { show, fetch };

export default moviesApi;
