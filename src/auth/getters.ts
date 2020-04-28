import JWTDecode from "jwt-decode";
import { AuthState, RootState } from "../types";
import { GetterTree } from "vuex/types";
import { validateToken } from "../utils";

const getters: GetterTree<AuthState, RootState> = {
  refreshTokenIsValid: (state): boolean => {
    return validateToken(state.refreshToken);
  },
  accessTokenIsValid: (state): boolean => {
    return validateToken(state.accessToken);
  },
  loggedIn: (state, getters) => {
    return getters.refreshTokenIsValid;
  },
  user: state => {
    if (state.accessToken) {
      return JWTDecode(state.accessToken);
    }
    return {};
  }
};

export default getters;
