// 全站模块
const Site = {
  state: {
    curPageUrl: '',          // 当前路径
  },

  mutations: {
    // 更新当前页地址
    getCurPageUrl(state, payload) {
      state.curPageUrl = payload.pageUrl;
    },
  },
  getters: {},
};

export default Site;
