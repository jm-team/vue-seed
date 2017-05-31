// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
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

// 引入公共js
import Util from 'service/util'

// 引入公共api
import Api from 'service/api'

// 懒加载
import lazyLoad from 'service/lazyload'

// store
import store from './store'

// 引入filters并注册到vue
import * as filters from './service/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI)
Vue.use(lazyLoad)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Api)
Vue.use(Util)

/* eslint-disable no-new */
var _app = new Vue({
  el: '#app',
  store,
  template: '<App/>',
  data() {
    return {
      showFooter: false
    }
  },
  router,
  components: { App }
})

// 设置路由钩子
router.beforeEach((to, from, next) => {
  _app.Api.apiRequsetCancel()
  var userIsLogin = store.state.User.isLogin
  // 限制访问 releaseReasearch 路由
  if (userIsLogin !== 'true' && '/releaseResearch/'.match(`/${to.name}/`)) {
    _app.$emit('showLoginDialog')
    if (!from.name) {
      _app.$router.push({ path: '/' })
    }
  } else {
    _app.showFooter = false
    next()
  }
  // for SEO
  window.prerenderReady = false
})

router.afterEach((to, form) => {
  document.title = to.meta.title || 'vue-seed'

  // 百度统计单页面pv量
  _hmt.push(['_trackPageview', to.path]);

  // 公共底部延迟显示
  setTimeout(() => { _app.showFooter = true }, 300)
  // for SEO
  window.prerenderReady = true
})
