import axios, { AxiosError } from "axios";
import type FailResult from "../../Types/Result/Fail";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://shamelco.runasp.net/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true, 
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  async (error: AxiosError<FailResult>) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 && 
      originalRequest && 
      !(originalRequest as any)._retry
    ) {
      (originalRequest as any)._retry = true;

      try {
        await axios.post(
          "auth/refresh",
          {},
          { 
            baseURL: import.meta.env.VITE_API_URL || "https://shamelco.runasp.net/api/v1/",
            withCredentials: true 
          }
        );

        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    const customError: FailResult = {
      code: error.response?.data?.code||"GENERAL_ERROR",
    };

    return Promise.reject(customError);
  }
);

export default apiClient;