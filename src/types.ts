import { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import { Store } from "vuex";

export interface RootState {
  version: string;
}

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export interface JWTRetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export interface JWTRetryError extends AxiosError {
  config: JWTRetryRequestConfig;
}

export interface ErrorState {
  errors: ErrorObject;
}

export interface ErrorObject {
  [index: string]: string[];
}

export interface GenericObject {
  [index: string]: any;
}

// Auth
export interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  loading: boolean;
  refreshingToken: boolean;
  refreshingCall?: AxiosPromise;
  errors: GenericObject;
  entity: GenericObject;
  permissions: Array<string>;
}

export interface JWTToken {
  exp: number;
}

export interface LoginRequestObject {
  username: string;
  password: string;
}

export interface JWTStoreOptions {
  store: Store<any>;
}
