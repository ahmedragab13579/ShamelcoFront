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

// 1. Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor
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
      error: error.response?.data?.error || "حدث خطأ غير متوقع أثناء الاتصال بالخادم",
    };

    return Promise.reject(customError);
  }
);

export default apiClient;