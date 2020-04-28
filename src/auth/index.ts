import { Module } from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import { AuthState, RootState } from "../types";

const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default auth;
