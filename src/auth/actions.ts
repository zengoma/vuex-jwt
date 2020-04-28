import { ADD_ERRORS, CLEAR_ERRORS, LOADED, LOADING, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from "../mutation-types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthState, AuthTokens, LoginRequestObject, RootState } from "../types";
import { ActionTree } from "vuex";
import { getTokens, storeTokens } from "../utils";

const actions: ActionTree<AuthState, RootState> = {
  /**
   *Get access Tokens
   * @param commit
   * @param payload { LoginRequestObject }
   * @param getters
   * @param dispatch
   */
  getTokens({ commit, getters, dispatch }, payload: LoginRequestObject) {
    commit(LOADING);
    commit(CLEAR_ERRORS);

    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}${process.env.VUE_APP_JWT_OBTAIN_PATH}`, payload)
      .then(async response => {
        const tokens: AuthTokens = {
          accessToken: response.data.access,
          refreshToken: response.data.refresh
        };

        // Set authentication objects
        dispatch("setTokens", tokens);

        return Promise.resolve(true);
      })
      .catch((err: AxiosError) => {
        commit(ADD_ERRORS, err.response.data);
        commit(LOADED);
        return Promise.reject(err);
      });
  },
  /**
   * Set Refresh/Access tokens (state and localstorage)
   * @param commit
   * @param tokens { AuthTokens }
   */
  setTokens({ commit }, tokens: AuthTokens) {
    storeTokens(tokens.accessToken, tokens.refreshToken);
    commit(SET_ACCESS_TOKEN, tokens.accessToken);
    commit(SET_REFRESH_TOKEN, tokens.refreshToken);
  },
  /**
   * Attempt to refresh the access token
   * @param commit
   * @param state
   * @param refreshToken <string> the refresh token
   * @returns {Promise<AxiosResponse>}
   */
  refreshToken({ state, dispatch }, refreshToken: string) {
    if (state.refreshingToken) {
      return state.refreshingCall;
    }
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}${process.env.VUE_APP_JWT_REFRESH_PATH}`, {
        refresh: refreshToken
      })
      .then(response => {
        const tokens = {
          accessToken: response.data.access,
          refreshToken: refreshToken
        };
        dispatch("setTokens", tokens);
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },

  /**
   * Hydrate auth state from localstorage
   * @returns { void }
   */
  hydrateState({ state, commit, dispatch }) {
    const tokens = getTokens();

    if (!state.accessToken) {
      commit(`${SET_ACCESS_TOKEN}`, tokens.accessToken);
    }

    if (!state.refreshToken) {
      commit(`${SET_REFRESH_TOKEN}`, tokens.refreshToken);
    }
  },

  /**
   * Clear tokens and redirect to login
   * @param commit
   * @param dispatch
   */
  logout({ commit, dispatch }) {
    // perform any additional logout operations here
    const tokens: AuthTokens = {
      accessToken: undefined,
      refreshToken: undefined
    };
    dispatch("setTokens", tokens);
  },
  /**
   * Check if reset token is valid
   * @param commit
   * @param state
   * @param resetToken
   */
  validateResetToken({ commit }, resetToken: string) {
    commit(LOADING);
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}${process.env.VUE_APP_JWT_VALIDATION_PATH}`, resetToken)
      .then((response: AxiosResponse) => {
        commit(LOADED);
        return Promise.resolve(response);
      })
      .catch((error: AxiosError) => {
        commit(LOADED);
        return Promise.reject(error);
      });
  }
};
export default actions;
