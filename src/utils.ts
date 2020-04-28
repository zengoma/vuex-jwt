import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthTokens, GenericObject, JWTRetryRequestConfig, JWTToken } from "./types";
import JWTDecode from "jwt-decode";
import authEvent from "./auth/event";

/**
 * Add JWT tokens to local storage
 * @param accessToken {String}
 * @param refreshToken {String}
 * @return void
 */
export const storeTokens = (
  accessToken: string | undefined = undefined,
  refreshToken: string | undefined = undefined
): void => {
  const auth = {
    accessToken: accessToken,
    refreshToken: refreshToken
  };
  return localStorage.setItem("auth", JSON.stringify(auth));
};

/**
 * Get the JWT Tokens from localStorage
 * @return { AuthTokens }
 */
export const getTokens = (): AuthTokens => {
  const tokens = localStorage.getItem("auth") || JSON.stringify({ accessToken: undefined, refreshToken: undefined });
  return JSON.parse(tokens);
};
/**
 * Validate a JWT
 * @param expiryMargin { number } Token is considered expired if only valid for x seconds or less
 * @param token {String}: A Json Web Token
 */
export const validateToken = (token: string | undefined, expiryMargin = 0): boolean => {
  try {
    if (token) {
      const jwtToken: JWTToken = JWTDecode(token);
      return jwtToken.exp - expiryMargin > Date.now() / 1000;
    }
    return false;
  } catch (e) {
    return false;
  }
};

/**
 * Force a logout
 * @return {void}
 */
export const forceLogout = (): void => {
  authEvent.$emit("logout");
};

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: null | AxiosError, token: string | null = null): void => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Refresh an access token using a refresh token
 * @return { Promise<AxiosPromise> }
 */
const refreshRequest = (): Promise<AxiosResponse> => {
  const authTokens = getTokens();
  return axios
    .post(process.env.VUE_APP_API_BASE_URL + "/token/refresh/", {
      refresh: authTokens.refreshToken
    })
    .then(response => {
      return Promise.resolve(response);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

/**
 * Refresh an access token using a refresh token
 * @param originalRequest { AxiosRequestConfig }
 * @returns { Promise<any> }
 */
export const refreshToken = (originalRequest: JWTRetryRequestConfig): Promise<any> => {
  if (!originalRequest._retry) {
    const authTokens = getTokens();
    if (isRefreshing) {
      return new Promise(function(resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then((accessToken: string) => {
          authEvent.$emit("setTokens", { accessToken: accessToken, refreshToken: authTokens.refreshToken });
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          return Promise.resolve(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return refreshRequest()
      .then(
        (response): Promise<AxiosRequestConfig> => {
          const token = response.data.access;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          originalRequest.headers.Authorization = `Bearer ${token}`;
          processQueue(null, token);
          return Promise.resolve(originalRequest);
        }
      )
      .catch((error: AxiosError): Promise<any> | void => {
        const refreshStatus = error.response ? error.response.status : null;
        processQueue(error, null);
        if (refreshStatus === 403 || refreshStatus === 401) {
          forceLogout();
          return Promise.reject(error);
        }
        return Promise.reject(error);
      })
      .then(() => {
        isRefreshing = false;
      });
  }
  return Promise.resolve(originalRequest);
};
