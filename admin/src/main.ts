import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import ApiService from "@/services/ApiService";
import StorageService from "@/services/StorageService";

Vue.config.productionTip = false;

// Import Axios to execute request
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

import vuetify from "./plugins/vuetify";

Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_BACKEND_API);

// If token exists set header
if (StorageService.getToken()) {
  ApiService.setHeader();
}

const router = Router({ store });

//Sync vue-router's current $route as part of vuex store's state.
sync(store, router);

import * as vueMoment from "vue-moment";

Vue.use(vueMoment);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
