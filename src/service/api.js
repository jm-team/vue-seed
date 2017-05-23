import { Message } from 'element-ui'

!(function () {
  // 引入api地址配置
  var API_ADDRESS = '/webapi/v2'
  // var API_ADDRESS = '/mock'

  var Api = {}
  Api.install = function (Vue, options) {
    if (!Vue.axios) {
      console.log('Api需要引入axios插件...')
      return
    }

    // request请求拦截处理
    var _this = Vue.prototype

    // 存放请求cancelToken
    var apiCancelTokens=[]
    // request请求拦截处理
    Vue.axios.interceptors.request.use(function (config) {
      // 添加取消请求用的cancelToken
      config.cancelToken=new Vue.axios.CancelToken(function executor(c) {
            apiCancelTokens.push(c)
      })
      return config
    }, function (error) {
      return Promise.reject(error)
    })

    // response响应拦截处理
    Vue.axios.interceptors.response.use(function (res) {
      // 请求成功，但是操作不成功时显示后端返回的错误信息
      if (res.data.statusCode !== 200) {
        let msg = Message(res.data.desc || `${res.config.apiName || '获取数据'}失败`)
        console.error(msg.message)
      }
      return res
    }, function (err) {
      // 判断请求是否被取消
      if (Vue.axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else {
        // 如果请求未被取消，则处理错误信息
        let msg = Message(`${err.config.apiName || '获取数据'}失败`)
        console.error(msg.message)
      }        
      return Promise.reject(err)
    })

    // 接口列表
    Vue.prototype.Api = {
      // 取消页面当前请求
      apiRequsetCancel: function () {
        // 依次取消请求
        apiCancelTokens.forEach(function(cancel,k,s){cancel('请求被取消')})
        // 清空cancelToken
        apiCancelTokens=[]
      },

      topCarousel: function () {
        return Vue.axios.get(`${API_ADDRESS}/indexBanner.json`, {
          apiName: '获取首页顶部banner'
        })
      },

      expertStyle: function () {
        return Vue.axios.get(`${API_ADDRESS}/advantageExpertInfo.json`, {
          apiName: '获取专家风采数据'
        })
      },

      expertStyleBanner: function () {
        return Vue.axios.get(`${API_ADDRESS}/betweenExpertBanner.json`)
      },

      expertList: function () {
        return Vue.axios.get(`${API_ADDRESS}/indexIndustryExp.json`)
      },

      // 底部轮播
      bottomCarousel: function () {
        return Vue.axios.get(`${API_ADDRESS}/indexBannerBottom.json`)
      },

      technicianList: function (offset = 0, limit = 8) {
        return Vue.axios.get(`/mock/pageExpertInfo.json`, {
          params: {
            t: Date.now()
          }
        })
      },

      // 登录接口
      doLogin: function (user, pwd) {
        return Vue.axios.post(`${API_ADDRESS}/doLogin`, {
          username: user,
          password: pwd
        }, {
          apiName: '用户登录'
        })
      },

      // 获取RSA公钥
      getRSA: function(){
        return Vue.axios.get(`${API_ADDRESS}/getRSA`, {
          params: {
            t: Date.now()
          }
        })
      },

      // 获取用户信息接口
      getUserInfo: function () {
        return Vue.axios.get(`/mock/userInfo.json`, {
          params: {
            t: Date.now()
          }
        })
      },

      // 添加或取消专家收藏
      expertFavo: function (expertId, favoType) {
        var type = 1
        // favoType为操作类型：0表示取消收藏，1表示添加收藏
        if (favoType) {
          return Vue.axios.get(`${API_ADDRESS}/favorite/${type}/${expertId}`, {
            params: {
              t: Date.now()
            }
          })
        } else {
          return Vue.axios.get(`${API_ADDRESS}/notFavorite/${type}/${expertId}`, {
            params: {
              t: Date.now()
            }
          })
        }
      },

      // 获取专家详情
      getExpertDetail: function (expertId) {
        return Vue.axios.get(`/mock/detailedExpertInfo.json`, {
          params: {
            t: Date.now()
          }
        })
      },

      // 获取专家技能
      getExpertAttribute: function (expertId) {
        return Vue.axios.get(`/mock/expertAttribute.json`, {
          params: {
            t: Date.now()
          }
        })
      },

      // 获取专家研报列表
      getExpertResearch: function (expertId) {
        return Vue.axios.get(`/mock/researchReport.json`, {
          params: {
            t: Date.now()
          }
        })
      },

      // 发布联系单
      contactBill: function (reqData) {
        return Vue.axios.post(`${API_ADDRESS}/contactBill`, reqData)
      },

      // 发布联系单
      interviewBill: function (reqData) {
        return Vue.axios.post(`${API_ADDRESS}/InterviewBill`, reqData)
      },

      // 发布调研单
      researchBill: function (reqData) {
        return Vue.axios.post(`${API_ADDRESS}/surveyBill`, reqData)
      },

      detailedResearchReport () {
        return Vue.axios.get(`/mock/detailedResearchReport.json`)
      },

      // 获取底部菜单
      getFooterNavs: function () {
        // return Vue.axios.get(`${API_ADDRESS}/indexBottomMenu`, {
        return Vue.axios.get(`/mock/footerMenu.json`, {
          params: {
            t: Date.now()
          }
        })
      },

      // 获取帮助详情数据
      getArtDetail: function (artId) {
        return Vue.axios.get(`/mock/artDetails.json`, {
          params: {
            t: Date.now()
          }
        })
      },

      // 获取帮助侧栏数据
      getArtLeftbar: function (artId) {
        return Vue.axios.get(`/mock/artLeftList.json`, {
          params: {
            t: Date.now()
          }
        })
      }
    }
  }

  module.exports = Api
}())
