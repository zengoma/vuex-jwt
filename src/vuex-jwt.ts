import http from "./http";
import auth from "./auth";
import install from "./install";
import Vue from "vue";
import { JWTStoreOptions } from "./types";

const VuexJwt: Vue.PluginObject<JWTStoreOptions> = {
  install
};

export default VuexJwt;
export { http, auth };
export * from "./types";
export * from "./utils";
