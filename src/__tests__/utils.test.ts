import { getTokens } from "../utils";
import { AuthTokens } from "../types";

describe("get_tokens", () => {
  test("it returns undefined tokens if localStorage is empty", () => {
    const noTokens: AuthTokens = { accessToken: undefined, refreshToken: undefined };
    expect(getTokens()).toEqual(noTokens);
  });

  test("it returns tokens from localStorage", () => {
    const tokens: AuthTokens = { accessToken: "secret-token", refreshToken: "secret-refresh-token" };
    localStorage.setItem("auth", JSON.stringify(tokens));
    expect(getTokens()).toEqual(tokens);
  });
});
