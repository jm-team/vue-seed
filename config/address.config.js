/**
 * @title address.config
 * @desc 配置依赖服务器地址
 * @type {{SERVER_ADDRESS: string, CENTER_ADDRESS: string, USERCENTER_ADDRESS: string, CDN_ADDRESS: string}}
 */
var address = {
  // api服务器
  API_ADDRESS: 'http://192.168.26.119:1210',
  // API_ADDRESS: "http://192.168.23.224",

  // 中台服务器
  CENTER_ADDRESS: 'http://192.168.26.119:8082',

  // 单点认证中心
  USERCENTER_ADDRESS: 'http://uc3.dev.com',

  // 静态资源CDN服务器
  CDN_ADDRESS: '',

  // 图片服务器
  IMG_ADDRESS: 'http://image.jm.com',

  // 图片上传服务器
  UPLOAD_ADDRESS: 'http://image5.jm.com'
};

module.exports = {
  address: address,
  // 跨域设置
  api_proxy: {
    '/webapi/**': address.API_ADDRESS,
    '/sso': address.API_ADDRESS
  },
};
