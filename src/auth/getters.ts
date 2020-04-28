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
  /**
   * Check if the user has entity permissions granted on the django backend.
   * The permission string is of format "app_name.permission"
   * e.g this.$store.getters["auth/hasEntityPermission"]("yourapp.view_employees");
   * @param state
   */
  hasEntityPermission: (state: AuthState) => (permission: string): boolean => {
    return state.permissions.includes(permission);
  },
  user: state => {
    if (state.accessToken) {
      return JWTDecode(state.accessToken);
    }
    return {};
  }
};

export default getters;
