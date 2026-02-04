import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ reject }) => reject(error));
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Ignore refresh request itself
    if (originalRequest.url?.includes("/admin/refreshAccessToken")) {
      return Promise.reject(error);
    }
   if (originalRequest.url?.includes("/login")) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((_, reject) => {
          failedQueue.push({ reject });
        });
      }

      isRefreshing = true;

      try {
        await axios.post(
          `${API_BASE}/users/refreshAccessToken`,
          {},
          { withCredentials: true }
        );

        isRefreshing = false;
        processQueue(null);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);

        window.location.replace("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
