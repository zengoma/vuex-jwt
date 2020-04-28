import {
  ADD_ERRORS,
  CLEAR_ERRORS,
  LOADED,
  LOADING,
  REFRESHED_TOKEN,
  REFRESHING_TOKEN,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_REFRESHING_CALL
} from "../mutation-types";

import { AuthState, ErrorObject } from "../types";
import { AxiosPromise } from "axios";
import { MutationTree } from "vuex";

const mutations: MutationTree<AuthState> = {
  [SET_ACCESS_TOKEN](state, token: string | undefined) {
    state.accessToken = token;
  },
  [SET_REFRESH_TOKEN](state, refreshToken: string | undefined) {
    state.refreshToken = refreshToken;
  },
  [LOADING](state) {
    state.loading = true;
  },
  [LOADED](state) {
    state.loading = false;
  },
  [REFRESHING_TOKEN](state) {
    state.refreshingToken = true;
  },
  [REFRESHED_TOKEN](state) {
    state.refreshingToken = false;
  },
  [SET_REFRESHING_CALL](state, refreshingCall: AxiosPromise) {
    state.refreshingCall = refreshingCall;
  },
  [ADD_ERRORS](state, errorObject: ErrorObject) {
    state.errors = { ...errorObject, ...state.errors };
  },
  [CLEAR_ERRORS](state) {
    state.errors = {};
  }
};

export default mutations;
