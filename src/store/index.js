import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 用户模块
const User = {
    state: {
        isLogin: false              // 用户是否登录
        , userInfo: {}            // 用户信息
        , loginSuccessToUrl: ''     // 用户登录成功后要跳转的链接
        , loginFailedToUrl: ''      // 用户登录失败后要跳转的链接
    }

    // 特别注意，子模块的mutations和getters、actions都是注册在全局store上的
    , mutations: {
        // 改变登录状态
        changeLoginState(state, payload) {
            state.isLogin = payload.loginState
        }

        // 更新用户信息
        , updateUserInfo(state, payload) {
            state.userInfo = payload.userInfo
        }
    }
    , getters: {

    }
}

// 全站模块
const Site = {
    state: {
        curPageUrl: ''          // 当前路径
    }

    , mutations: {
        // 更新当前页地址
        getCurPageUrl(state, payload) {
            state.curPageUrl = payload.pageUrl
        }
    }
    , getters: {

    }
}

// 全局store
const store = new Vuex.Store({
    modules: {
        User: User,
        Site: Site
    }
})

export default store