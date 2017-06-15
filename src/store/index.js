import Vue from "vue";
import Vuex from "vuex";

import User from "./user.js";
import Site from "./site.js";

Vue.use(Vuex)

// 全局store
const store = new Vuex.Store({
  modules: {
    User: User,
    Site: Site
  }
})

export default store
