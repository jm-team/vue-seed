import Vue from 'vue';
import Vuex from 'vuex';

import User from './user';
import Site from './site';

Vue.use(Vuex);

// 全局store
const store = new Vuex.Store({
  modules: {
    User,
    Site,
  },
});

export default store;
