import Vue from 'vue'
import Router from 'vue-router'

// 引入路由视图，懒加载处理
const home = r => require.ensure([], () => r(require('views/home')), 'home')
const expert = r => require.ensure([], () => r(require('views/expert')), 'expert')
const expertDetail = r => require.ensure([], () => r(require('views/expertDetail')), 'expertDetail')
const companyResearch = r => require.ensure([], () => r(require('views/companyResearch')), 'companyResearch')
const releaseResearch = r => require.ensure([], () => r(require('views/releaseResearch')), 'releaseResearch')
const service = r => require.ensure([], () => r(require('views/service')), 'service')
const page404 = r => require.ensure([], () => r(require('views/page404')), 'page404')
Vue.use(Router)

var myrouter = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
        // 首页
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      redirect: '/'
    },
        // 专家列表页
    {
      path: '/expert',
      query: {
        page: 1,            // 页数
        business: ''        // 行业
      },
      name: 'expert',
      component: expert
    },

        // 专家详情页
    {
      path: '/expert/:id',
      name: 'expertDetail',
      component: expertDetail
    },

        // 企业研报页
    {
      path: '/companyResearch/:id',
      name: 'companyResearch',
      component: companyResearch
    },

        // 发布调研单页
    {
      path: '/releaseResearch',
      query: {
        expertId: ''
      },
      name: 'releaseResearch',
      component: releaseResearch
    },
        // 常见问题类页面
    {
      path: '/service/:artId',
      name: 'service',
      component: service
    },
    {
      path: '*',
      component: page404
    }
  ]
})

export default myrouter
