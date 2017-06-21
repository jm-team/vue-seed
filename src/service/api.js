import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Message } from 'element-ui';

Vue.use(VueAxios, axios);

// 引入api地址配置
const API_ADDRESS = '/webapi/v2';
// eslint-disable-next-line
const API_ADDRESS2 = `${__webpack_require__.p}mock`;
const Api = {};

Api.install = () => {
  let apiCancelTokens = []; // 存放请求cancelToken

  // request请求拦截处理
  Vue.axios.interceptors.request.use((config) => {
    // 添加取消请求用的cancelToken
    config.cancelToken = new Vue.axios.CancelToken((c) => {
      apiCancelTokens.push(c);
    });
    return config;
  }, error => Promise.reject(error));

  // response响应拦截处理
  Vue.axios.interceptors.response.use((res) => {
    // 请求成功，但是操作不成功时显示后端返回的错误信息
    if (res.data.statusCode !== 200) {
      const msg = Message(res.data.desc || `${res.config.apiName || '获取数据'}失败`);
      console.error(msg.message);
    }
    return res;
  }, (err) => {
    // 判断请求是否被取消
    if (Vue.axios.isCancel(err)) {
      console.log('Request canceled', err.message);
    } else {
      // 如果请求未被取消，则处理错误信息
      const msg = Message(`${err.config.apiName || '获取数据'}失败`);
      console.error(msg.message);
    }
    return Promise.reject(err);
  });

  /* eslint-disable */
  // 接口列表
  Vue.prototype.Api = {
    // 取消页面当前请求
    apiRequsetCancel() {
      // 依次取消请求
      apiCancelTokens.forEach((cancel) => {
        cancel('请求被取消');
      });
      // 清空cancelToken
      apiCancelTokens = [];
    },

    topCarousel() {
      return Vue.axios.get(`${API_ADDRESS2}/indexBanner.json`, {
        apiName: '获取首页顶部banner',
      });
    },

    expertStyle() {
      return Vue.axios.get(`${API_ADDRESS2}/advantageExpertInfo.json`, {
        apiName: '获取专家风采数据',
      });
    },

    expertStyleBanner() {
      return Vue.axios.get(`${API_ADDRESS2}/betweenExpertBanner.json`);
    },

    expertList() {
      return Vue.axios.get(`${API_ADDRESS2}/indexIndustryExp.json`);
    },

    // 底部轮播
    bottomCarousel() {
      return Vue.axios.get(`${API_ADDRESS2}/indexBannerBottom.json`);
    },

    technicianList(offset = 0, limit = 8) {
      return Vue.axios.get(`${API_ADDRESS2}/pageExpertInfo.json`, {
        params: {
          t: Date.now(),
        },
      });
    },

    // 登录接口
    doLogin(user, pwd) {
      return Vue.axios.post(`${API_ADDRESS}/doLogin`, {
        username: user,
        password: pwd,
      }, {
        apiName: '用户登录',
      });
    },

    // 获取RSA公钥
    getRSA() {
      return Vue.axios.get(`${API_ADDRESS}/getRSA`, {
        params: {
          t: Date.now(),
        },
      });
    },

    // 获取用户信息接口
    getUserInfo() {
      return Vue.axios.get(`${API_ADDRESS2}/userInfo.json`, {
        params: {
          t: Date.now(),
        },
      });
    },

    // 添加或取消专家收藏
    expertFavo(expertId, favoType) {
      const type = 1;
      // favoType为操作类型：0表示取消收藏，1表示添加收藏
      if (favoType) {
        return Vue.axios.get(`${API_ADDRESS}/favorite/${type}/${expertId}`, {
          params: {
            t: Date.now(),
          },
        });
      }
      return Vue.axios.get(`${API_ADDRESS}/notFavorite/${type}/${expertId}`, {
        params: {
          t: Date.now(),
        },
      });
    },

    // 获取专家详情
    getExpertDetail(expertId) {
      return Vue.axios.get(`${API_ADDRESS2}/detailedExpertInfo.json`, {
        params: {
          t: Date.now(),
        },
      });
    },

    // 获取专家技能
    getExpertAttribute(expertId) {
      return Vue.axios.get(`${API_ADDRESS2}/expertAttribute.json`, {
        params: {
          t: Date.now(),
        },
      });
    },

    // 获取专家研报列表
    getExpertResearch(expertId) {
      return Vue.axios.get(`${API_ADDRESS2}/researchReport.json`, {
        params: {
          t: Date.now(),
        },
      });
    },

    // 发布联系单
    contactBill(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/contactBill`, reqData);
    },

    // 发布联系单
    interviewBill(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/InterviewBill`, reqData);
    },

    // 发布调研单
    researchBill(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/surveyBill`, reqData);
    },

    detailedResearchReport() {
      return Vue.axios.get(`${API_ADDRESS2}/detailedResearchReport.json`);
    },

    // 获取底部菜单
    getFooterNavs() {
      // return Vue.axios.get(`${API_ADDRESS}/indexBottomMenu`, {
      return Vue.axios.get(`${API_ADDRESS2}/footerMenu.json`, {
        params: {
          t: Date.now(),
        },
      });
    },

    // 获取帮助详情数据
    getArtDetail(artId) {
      return Vue.axios.get(`${API_ADDRESS2}/artDetails.json`, {
        params: {
          t: Date.now(),
        },
      });
    },

    // 获取帮助侧栏数据
    getArtLeftbar(artId) {
      return Vue.axios.get(`${API_ADDRESS2}/artLeftList.json`, {
        params: {
          t: Date.now(),
        },
      });
    },
  };
};

export default Api;

