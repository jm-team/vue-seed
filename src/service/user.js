import siteConfig from '../../config/site.config'

export function checkAutoLogin() {
  let promise = new Promise(function (resolve, reject) {
    // 用户未登录
    window.userNotLoginCallback = userNotLoginCallback

    // 用户已登录
    window.userLoginSuccessCallback = userLoginSuccessCallback

    /**
     * load has login script dynamically
     * @param token
     */
    !(function () {
      let body = document.getElementsByTagName('body')[0]
      let _hasLoginJs = document.getElementById('_hasLoginJs')
      if (_hasLoginJs != null) {
        body.removeChild(_hasLoginJs)
        _hasLoginJs = null
        // delete _hasLoginJs;
      }

      let script = document.createElement('script')
      script.id = '_hasLoginJs'
      script.type = 'text/javascript'
      script.charset = 'utf-8'
      script.defer = true
      script.async = true
      body.appendChild(script)
      script.onload = function () {
      }
      script.src = siteConfig.address.USERCENTER_ADDRESS + '/hasLogin?serviceContext=&_t=' + Date.now()
    }())

    /**
     * 用户未登录
     * @param token
     */
    function userNotLoginCallback(token) {
      console.log('userNotLoginCallback')
      console.log(token)
      reject(token)
    }

    /**
     * 用户已登录
     * @param token
     */
    function userLoginSuccessCallback(token) {
      console.log('userLoginSuccessCallback')
      console.log(token)
      resolve(token)
    }
  })
  return promise
}
