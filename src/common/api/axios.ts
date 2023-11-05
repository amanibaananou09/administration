import axios from "axios";
import { decodeToken } from "utils/utils";

const api = axios.create({
  baseURL: "http://localhost:8083/api",
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const user = decodeToken(localStorage.getItem("auth"));
    if (user) {
      config.headers.Authorization = "Bearer " + user.token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
