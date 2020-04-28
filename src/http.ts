import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { forceLogout, getTokens, refreshToken, validateToken } from "./utils";

/**
 * Axios request interceptors
 * https://github.com/axios/axios#interceptors
 */
const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken"
});

http.interceptors.request.use(
  async (reqConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const authTokens = getTokens();

    if (!validateToken(authTokens.refreshToken)) {
      forceLogout();
      return reqConfig;
    }

    if (!validateToken(authTokens.accessToken, 5)) {
      const request = await refreshToken(reqConfig);

      if (request) {
        return request;
      }
      return reqConfig;
    }

    reqConfig.headers.Authorization = `Bearer ${authTokens.accessToken}`;
    return reqConfig;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

export default http;
