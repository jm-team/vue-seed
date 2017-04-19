// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// 兼容ie9
import 'babel-polyfill'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'assets/css/common.css'

// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App'
import router from './router'

// 引入filters
import filter from 'service/filters'

// 引入公共js
import Public from 'service/public'

// 引入公共api
import Api from 'service/api'

// 懒加载
import lazyLoad from 'service/lazyload'

// store
import store from './store'
import address from '../config/address.config'

Vue.use(lazyLoad)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(Api)
Vue.use(Public)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  data () {
    return {
      // 控制公共底部显示
      showFooter: false
    }
  },
  router,
  components: { App }
})
