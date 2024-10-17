import { Toastr } from "@bigbinary/neetoui";
import axios from "axios";
import { keysToCamelCase } from "neetocist";

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const shouldShowToastr = response =>
  typeof response === "object" && response?.noticeCode;

const showSuccessToastr = response => {
  if (shouldShowToastr(response.data)) Toastr.success(response.data);
};

// const showErrorToastr = error => {
//     if (error.message === )
// }

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);
      showSuccessToastr(response);

      return response.data;
    },
    error => Promise.reject(error)
  );
};

export default function initializeAxios() {
  axios.defaults.baseURL = `http://www.omdbapi.com/`;
  setHttpHeaders();
  responseInterceptors();
}
