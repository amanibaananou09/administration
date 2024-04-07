import axios from "axios";
import { decodeToken } from "utils/utils";

const api = axios.create({
  // baseURL: "http://localhost:8083/api",
  // baseURL: "http://54.37.70.164:8200/api",
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const user = decodeToken(localStorage.getItem("auth-admin"));
    if (user) {
      config.headers.Authorization = "Bearer " + user.token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
