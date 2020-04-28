import { AuthState } from "../types";

const auth: AuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  permissions: [],
  loading: false,
  refreshingToken: false,
  refreshingCall: undefined,
  errors: {}
};

export default auth;
