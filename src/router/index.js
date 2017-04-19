import Vue from 'vue'
import Router from 'vue-router'

// 引入路由视图
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
        expertId: '',
        time: ''
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

// 路由进入前钩子
myrouter.beforeEach((to, from, next) => {
  var _app = arguments[1].default.app
  var userIsLogin = _app.Cookie.getCookie('userIsLogin')
  if (userIsLogin != 'true' && '/releaseResearch/'.match(`/${to.name}/`)) {
        // _app.$message({
        //     message: '请先登录！',
        //     type: 'warning'
        // })
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

// 路由进入后钩子
myrouter.afterEach((to, form) => {
    // 有待验证是否有效
  var _app = arguments[1].default.app
    // 公共底部延迟显示
  setTimeout(() => { _app.showFooter = true }, 300)

    // for SEO
  window.prerenderReady = true
})

export default myrouter
