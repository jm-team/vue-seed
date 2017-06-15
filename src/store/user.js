// 用户模块
const User = {
  state: {
    isLogin: false,              // 用户是否登录
    userInfo: {},            // 用户信息
    loginSuccessToUrl: '',     // 用户登录成功后要跳转的链接
    loginFailedToUrl: '',      // 用户登录失败后要跳转的链接
  },

  // 特别注意，子模块的mutations和getters、actions都是注册在全局store上的
  mutations: {
    // 改变登录状态
    changeLoginState(state, payload) {
      state.isLogin = payload.loginState;
    },

    // 更新用户信息
    updateUserInfo(state, payload) {
      state.userInfo = payload.userInfo;
    },
  },
  getters: {},
};

export default User;
