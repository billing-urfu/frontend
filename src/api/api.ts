import axios from "axios";
import { shouldRefreshToken, refreshToken } from "./authHelper";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      if (shouldRefreshToken(token)) {
        const isRefreshed = await refreshToken();
        if (!isRefreshed) {
          window.location.href = "/login";
          throw new axios.Cancel("Unable to refresh token.");
        }
      }
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
