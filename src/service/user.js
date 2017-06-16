import siteConfig from '../../config/address.config';

export default function () {
  const promise = new Promise((resolve, reject) => {
    /**
     * load has login script dynamically
     * @param token
     */
    const body = document.getElementsByTagName('body')[0];
    const script = document.createElement('script');
    let $hasLoginJs = document.getElementById('_hasLoginJs');

    if ($hasLoginJs != null) {
      // delete $hasLoginJs;
      body.removeChild($hasLoginJs);
      $hasLoginJs = null;
    }

    script.id = '_hasLoginJs';
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.defer = true;
    script.async = true;
    body.appendChild(script);
    // eslint-disable-next-line
    script.onload = function() {};
    script.src = `${siteConfig.address.USERCENTER_ADDRESS}/hasLogin?serviceContext=&_t=${Date.now()}`;

    /**
     * 用户未登录
     * @param token
     */
    function userNotLoginCallback(token) {
      console.log('userNotLoginCallback');
      console.log(token);
      reject(token);
    }

    /**
     * 用户已登录
     * @param token
     */
    function userLoginSuccessCallback(token) {
      console.log('userLoginSuccessCallback');
      console.log(token);
      resolve(token);
    }

    // 用户未登录
    window.userNotLoginCallback = userNotLoginCallback;

    // 用户已登录
    window.userLoginSuccessCallback = userLoginSuccessCallback;
  });

  return promise;
}
