import http from "./http";
import _Vue from "vue";
import { JWTStoreOptions } from "./types";
import JwtVuexPlugin from "./plugin";
import authEvent from "./auth/event";

const install = (Vue: typeof _Vue, { store }: JWTStoreOptions): void => {
  // Set resource to jwt axios
  Vue.prototype.$http = http;

  // Register the Jwt Vuex plugin
  const jwtVuexPlugin = JwtVuexPlugin(authEvent);
  jwtVuexPlugin(store);
};

export default install;
