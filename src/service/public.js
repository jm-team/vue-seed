!function () {

    var Public = {}

    Public.install = function (Vue, options) {
        var _this = Vue.prototype

        // cookie操作
        Vue.prototype.Cookie = {
            /**
             * 设置Cookie
             * @author zhoul
             * @param {string} name 设置的Cookie属性
             * @param {string} val  设置的Cookie值
             * @param {string} path 设置的Cookie的路径
             * @param {number} date 设置的Cookie的过期时间(天数)
             */
            setCookie: function (name, val, path, date) {
                var oDate = new Date();
                oDate.setDate(oDate.getDate() + (date || 30));
                var sDate = ";expires=" + oDate;
                var Path = ";path=" + (path || "/");
                document.cookie = name + "=" + val + sDate + Path;
            },

            /**
             * 获取Cookie
             * @author zhoul
             * @param   {string} name 需要获取的Cookie属性
             * @returns {string} 获取到的Cookie值
             */
            getCookie: function (name) {
                var sCookies = document.cookie;
                var arr = sCookies.split('; ');
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('=');
                    if (arr2[0] == name) {
                        return arr2[1];
                    }
                }
            },

            /**
             * 删除Cookie
             * @author zhoul
             * @param {string} name 需要删除的Cookie
             */
            delCookie: function (name) {
                this.setCookie(name, '', '', -1);
            },

            /**
             * 获取Cookie的个数
             * @author zhoul
             * @returns {number} Cookie的个数
             */
            cookieLength: function () {
                var sCookie = document.cookie;
                var arr = sCookie.split('; ');
                if (!sCookie) {
                    return 0;
                }
                return arr.length;
            }
        }

        // localStorage操作
    }

    module.exports = Public
}()