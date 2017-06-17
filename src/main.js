// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'es6-promise/auto'; // 兼容ie9
import 'assets/css/common.css';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';

import App from './App';
import Api from './service/api';
import Util from './service/util';
import store from './store';
import router from './router';
import lazyLoad from './assets/js/lazyload';
import * as filters from './filter';

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 将过滤器挂载到vue原型上，方便在实例中使用
Vue.prototype.Filters = filters;

Vue.use(Api);
Vue.use(Util);
Vue.use(lazyLoad);
Vue.use(ElementUI);

const app = new Vue({
  el: '#app',
  data() {
    return {
      showFooter: false,
    };
  },
  router,
  store,
  template: '<App/>',
  components: { App },
});

// 设置路由钩子
router.beforeEach((to, from, next) => {
  const userIsLogin = store.state.User.isLogin;

  app.Api.apiRequsetCancel();
  // 限制访问 releaseReasearch 路由
  if (userIsLogin !== 'true' && '/releaseResearch/'.match(`/${to.name}/`)) {
    app.$emit('showLoginDialog');
    if (!from.name) {
      app.$router.push({ path: '/' });
    }
  } else {
    app.showFooter = false;
    next();
  }
  // for SEO
  window.prerenderReady = false;
});

router.afterEach((to) => {
  // 修改标题
  document.title = to.meta.title || 'vue-seed';

  // 百度统计单页面pv量
  // eslint-disable-next-line
  _hmt.push(['_trackPageview', to.path]);

  // 公共底部延迟显示
  setTimeout(() => {
    app.showFooter = true;
  }, 300);
  // for SEO
  window.prerenderReady = true;
});
