import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import message from "./message";
import dataObjects from "./dataObjects";
import dataObject from "./dataObject";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    user,
    dataObjects,
    dataObject,
    message,
  },
  strict: debug,
});
