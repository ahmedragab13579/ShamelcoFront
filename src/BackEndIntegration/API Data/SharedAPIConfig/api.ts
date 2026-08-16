import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type FailResult from "../../Types/Result/Fail";
import type { AppMessageCodes } from "../../Types/Enums/AppEnums";

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const getCookieValue = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
};

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
    // Attach CSRF Token for state-changing requests (POST, PUT, DELETE, PATCH)
    const method = config.method?.toUpperCase();
    if (method && ["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      const csrfToken = getCookieValue("XSRF-TOKEN") || getCookieValue("CSRF-TOKEN");
      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  async (error: AxiosError<FailResult>) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (
      error.response?.status === 401 && 
      originalRequest && 
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

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

    // Sanitize backend errors to avoid exposing internal infrastructure or stack trace details
    const rawCode = error.response?.data?.code;
    const customError: FailResult = {
      code: (typeof rawCode === "string" ? rawCode : "GENERAL_ERROR") as AppMessageCodes,
    };

    return Promise.reject(customError);
  }
);

export default apiClient;