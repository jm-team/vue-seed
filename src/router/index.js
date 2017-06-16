import Vue from 'vue';
import Router from 'vue-router';

// 引入路由视图，懒加载处理
const home = () => import(/* webpackChunkName: "home" */ 'views/home');
const expert = () => import(/* webpackChunkName: "expert" */ 'views/expert');
const expertDetail = () => import(/* webpackChunkName: "expertDetail" */ 'views/expertDetail');
const companyResearch = () => import(/* webpackChunkName: "companyResearch" */ 'views/companyResearch');
const releaseResearch = () => import(/* webpackChunkName: "releaseResearch" */ 'views/releaseResearch');
const service = () => import(/* webpackChunkName: "service" */ 'views/service');
const page404 = () => import(/* webpackChunkName: "page404" */ 'views/page404');

Vue.use(Router);

const myrouter = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/home',
      redirect: '/',
    },
    // 专家列表页
    {
      path: '/expert',
      query: {
        page: 1,            // 页数
        business: '',        // 行业
      },
      name: 'expert',
      component: expert,
      meta: {
        title: '专家列表页',
      },
    },

    // 专家详情页
    {
      path: '/expert/:id',
      name: 'expertDetail',
      component: expertDetail,
      meta: {
        title: '专家详情页',
      },
    },

    // 企业研报页
    {
      path: '/companyResearch/:id',
      name: 'companyResearch',
      component: companyResearch,
    },

    // 发布调研单页
    {
      path: '/releaseResearch',
      query: {
        expertId: '',
      },
      name: 'releaseResearch',
      component: releaseResearch,
    },
    // 常见问题类页面
    {
      path: '/service/:artId',
      name: 'service',
      component: service,
    },
    {
      path: '*',
      component: page404,
    },
  ],
});

export default myrouter;
