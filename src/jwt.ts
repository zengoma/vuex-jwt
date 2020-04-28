import http from "./http";
import auth from "./auth";
import install from "./install";
import Vue from "vue";
import { JWTStoreOptions } from "./types";

const Jwt: Vue.PluginObject<JWTStoreOptions> = {
  install
};

export default Jwt;
export { http, auth };
export * from "./types";
export * from "./utils";
