const Util = {};

Util.install = function install(Vue) {
  // cookie操作
  Vue.prototype.Util = {
    // cookie相关操作
    cookie: {
      /**
       * 设置Cookie
       * @param {string} name 设置的Cookie属性
       * @param {string} val  设置的Cookie值
       * @param {string} path 设置的Cookie的路径
       * @param {number} date 设置的Cookie的过期时间(天数)
       */
      setCookie(name, val, path, date) {
        const oDate = new Date();
        oDate.setDate(oDate.getDate() + (date || 30));
        const sDate = `;expires=${oDate}`;
        const Path = `;path=${path || '/'}`;
        document.cookie = `${name}=${val}${sDate}${Path}`;
      },

      /**
       * 获取Cookie
       * @param   {string} name 需要获取的Cookie属性
       * @returns {string} 获取到的Cookie值
       */
      getCookie(name) {
        const sCookies = document.cookie;
        const arr = sCookies.split('; ');

        for (let i = 0; i < arr.length; i++) {
          const arr2 = arr[i].split('=');
          if (arr2[0] === name) {
            return arr2[1];
          }
        }

        return '';
      },

      /**
       * 删除Cookie
       * @param {string} name 需要删除的Cookie
       */
      delCookie(name) {
        this.setCookie(name, '', '', -1);
      },

      /**
       * 获取Cookie的个数
       * @returns {number} Cookie的个数
       */
      cookieLength() {
        const sCookie = document.cookie;
        const arr = sCookie.split('; ');
        if (!sCookie) {
          return 0;
        }
        return arr.length;
      },
    },

  };
};

export default Util;

