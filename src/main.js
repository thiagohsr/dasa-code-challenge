import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import Vuex from "vuex";

import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = process.env.NODE_ENV === "production";
Vue.use(Vuex);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
