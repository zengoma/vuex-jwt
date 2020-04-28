import mutations from "../mutations";
import state from "../state";
import { AuthState } from "../../types";
const { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, LOADING, LOADED } = mutations;

describe("mutations", () => {
  let authState: AuthState;

  beforeEach(() => {
    authState = { ...state };
  });

  describe("set_access_token", () => {
    test("it can set the accessToken", () => {
      const token = "my-secret-token";
      SET_ACCESS_TOKEN(authState, token);
      expect(authState.accessToken).toEqual(token);
    });
  });

  describe("set_refresh_token", () => {
    test("it can set the refreshToken", () => {
      const token = "my-secret-token";
      SET_REFRESH_TOKEN(authState, token);
      expect(authState.refreshToken).toEqual(token);
    });
  });

  describe("set_refresh_token", () => {
    test("it can set the refreshToken", () => {
      const token = "my-secret-token";
      SET_REFRESH_TOKEN(authState, token);
      expect(authState.refreshToken).toEqual(token);
    });
  });

  describe("loading", () => {
    test("it is false by default", () => {
      expect(authState.loading).toBeFalsy();
    });
    test("it sets loading to true", () => {
      LOADING(authState);
      expect(authState.loading).toBeTruthy();
    });
  });
  describe("loaded", () => {
    test("it sets loading to false", () => {
      LOADING(authState);
      LOADED(authState);
      expect(authState.loading).toBeFalsy();
    });
  });
});
