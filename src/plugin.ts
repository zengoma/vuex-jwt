import { CustomVue, Store } from "vuex";
import { AuthTokens } from "./types";

export default function JWTVuexPlugin(authEvent: CustomVue) {
  return (store: Store<any>): void => {
    // Initialize state from localstorage
    store.dispatch("auth/hydrateState");

    authEvent.$on("setTokens", (tokens: AuthTokens) => {
      store.dispatch(`auth/setTokens`, tokens);
    });

    authEvent.$on("logout", () => {
      store.dispatch("auth/logout");
    });
  };
}
