<template>
  <div class="yzk-header">
    <div class="top-nav">
      <div class="layout-wrap">
        <div class="user-nav">
          <div class="reg-login" v-if="!userIsLogin">
            <a :href="CENTER_ADDRESS+'/user/toRegister'" target="_blank">用户注册 / Free Registration</a>
            <a href="javascript:;" @click="loginDialogShow = true">登录 / Sign in</a>
          </div>
          <div class="user-info" v-else>
            <span class="headpic"><img :src="userInfo.headImg | imgCdn" errorimg="../assets/img/headGray.png"
                                       onerror="this.src = this.getAttribute('errorimg')"></span>
            <ul>
              <li>
                <p>{{ userInfo.nickName || userInfo.userName || '&nbsp;&nbsp;' }}</p>
                <ul>
                  <li><a :href="CENTER_ADDRESS+'/jttoverview/init'" target="_blank">个人中心</a></li>
                  <li><a :href="USERCENTER_ADDRESS+'/logout?returnUrl=' + curPageUrl"
                         @click="setUserIsLoginCookie">退出</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="top-head">
      <div class="layout-wrap">
        <router-link to="/" class="yzk-logo"></router-link>
        <div class="business-btn">
          <p>
            <router-link :to="{ path: '/expert', query: {}}">我要咨询专家<span>I want my consultant</span></router-link>
          </p>
          <p>
            <router-link :to="{ path: '/releaseResearch', query: {}}">邀请专家调研企业<span>Apply for expert's research on my company</span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div style="display:none">
      <router-link to="/">首页</router-link>
      <router-link to="/expert">专家列表页</router-link>
      <router-link to="/expert/11331">专家详情页</router-link>
      <router-link to="/releaseResearch">发布调研单</router-link>
      <router-link to="/companyResearch/1" class="nav-me">企业研报</router-link>
      <router-link to="/fse">404</router-link>
    </div>

    <el-dialog class="yzk-login" v-model="loginDialogShow" size="360px" @close="closeLoginDialog"
               @open="openLoginDialogCallback">
      <p class="login-title">欢迎登录</p>
      <el-form :model="loginForm" :rules="loginFormVerifyRule" ref="loginForm" label-width="1px">
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入手机号"
                    autofocus="autofocus"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div class="login-other">
          <a :href="CENTER_ADDRESS+'/user/toRegister'" @click="$refs.loginForm.resetFields()" target="_blank"
             class="reg-link">免费注册</a>
          <a :href="CENTER_ADDRESS+'/user/forgetPassword?flag=1'" @click="$refs.loginForm.resetFields()" target="_blank"
             class="forgot-pw">忘记密码</a>
        </div>
        <el-form-item>
          <el-button type="primary" @click="login" class="btn-login">立即登录</el-button>
        </el-form-item>
      </el-form>
      <div class="tel-info">
        <p class="tel">400-800-1818</p>
        <p class="worktime">工作时间:周一到周五9:00-17:30</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import siteConfig from 'config/address.config';
  //  import RSA from 'assets/js/security';

  export default {
    data() {
      // 登录表单校验函数
      const verifyUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          // 必须调用callback，否则没法完成验证
          callback();
        }
      };
      const verifyPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginDialogShow: false,
        homeUrl: window.location.origin,
        CENTER_ADDRESS: siteConfig.address.CENTER_ADDRESS,
        USERCENTER_ADDRESS: siteConfig.address.USERCENTER_ADDRESS,
        // 登录表单数据
        loginForm: {
          username: '',
          password: '',
        },
        // 登录表单校验规则
        loginFormVerifyRule: {
          username: [
            { validator: verifyUsername, trigger: 'blur', required: true },
          ],
          password: [
            { validator: verifyPassword, trigger: 'blur', required: true },
          ],
        },
      };
    },
    methods: {
      login() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // const data = this.loginForm;
            /* 通过接口获取RSA公钥并对密码进行加密 */
            // this.Api.getRSA().then((rep) => {
            //     let data=rep.data.data
            //     RSA.setMaxDigits(200);
            //     var key = new RSA.getKeyPair(data.publicKeyExponent, "", data.publicKeyModulus);
            //     this.loginForm.password = RSA.encryptedString(key, this.loginForm.password);
            // })

            /* 请求登录接口 */
            // this.Api.doLogin(data.username, data.password).then((rep) => {
            //     let data = rep.data.data
            //     if (data.code == 0) {
            this.closeLoginDialog();
            this.$parent.$emit('userLogined');
            //     } else {
            //         // 显示错误信息
            //         this.$message({
            //             message: data.desc,
            //             type: 'error'
            //         })
            //     }
            // })
          }

          return false;
        });
      },
      closeLoginDialog() {
        this.loginDialogShow = false;
        this.$refs.loginForm.resetFields();
      },
      openLoginDialogCallback() {
      },
      setUserIsLoginCookie() {
        this.Util.cookie.setCookie('userIsLogin', false);
      },
      ...mapMutations([
        'changeLoginState',
        'updateUserInfo',
      ]),
    },
    computed: {
      ...mapState({
        userIsLogin: state => state.User.isLogin,
        userInfo: state => state.User.userInfo,
        loginToUrl: state => state.User.loginToUrl,
        curPageUrl: state => state.Site.curPageUrl,
      }),
    },
    created() {
      const app = this.$parent;
      // 检测到未登录时处理
      app.$on('userNotLogin', () => {
        this.Util.cookie.setCookie('userIsLogin', false);
        this.changeLoginState({ loginState: false });
        this.updateUserInfo({
          userInfo: {},
        });
      });

      // 检测到已登录里处理
      app.$on('userLogined', () => {
        this.Util.cookie.setCookie('userIsLogin', true);
        this.changeLoginState({ loginState: true });
        this.Api.getUserInfo().then((data) => {
          // 更新用户信息
          this.updateUserInfo({
            userInfo: data.data.rows,
          });
        });
      });

      this.$root.$on('showLoginDialog', () => {
        this.loginDialogShow = true;
      });
    },
  };

</script>

<style lang="scss" rel="style/scss">
  @import '../assets/css/common.scss';

  .layout-wrap {
    position: relative;
    width: $pageWidth;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .yzk-login {
    .el-dialog--360px {
      width: 360px;
      top: 50% !important;
      margin-top: -209px !important;
      margin-bottom: 0 !important;
    }
    .el-dialog__body {
      padding: 30px 60px;
    }
  }

  .btn-login {
    width: 100%;
  }

  .login-title {
    font-size: 26px;
    color: #3e3e3e;
    font-weight: bold;
    text-align: center;
    margin-bottom: 45px;
    margin-top: 15px;
  }

  .login-other {
    padding-bottom: 18px;
    .forgot-pw {
      float: right;
    }
  }

  .top-nav {
    height: 39px;
    line-height: 39px;
    background: #f5f5f5;
    .user-nav {
      text-align: right;
      a {
        font-size: 14px;
        color: #6e6e6e;
      }
      a:hover {
        color: $linkHoverColor;
      }
      .reg-login > a:last-child {
        padding-left: 30px;
      }
    }
    .user-info {
      position: relative;
      display: inline-block;
      padding-left: 40px;
      margin-left: 30px;
      font-size: 14px;
      .headpic {
        position: absolute;
        left: 0;
        top: 4px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: auto;
          height: 30px;
        }
      }
      ul > li {
        text-align: left;
        p {
          width: 120px;
          padding-right: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        p:after {
          position: absolute;
          right: 3px;
          top: 13px;
          content: '';
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url('../assets/img/arrow-down.png') no-repeat center center;
        }
        ul {
          display: none;
        }
      }
      ul > li:hover {
        p:after {
          transition: transform .2s ease-in;
          transform: rotate(180deg);
          transform-origin: 50% 60%;
        }
        ul {
          display: block;
          width: 160px;
          position: absolute;
          top: 38px;
          right: 0;
          border-radius: 3px;
          z-index: 99;
          background: #fff;
          box-shadow: 0px 4px 10px 0px rgb(216, 216, 216);
          li {
            text-align: center;
            a {
              display: block;
            }
          }
          li:hover {
            background: #f9f9f9;
          }
        }
      }
    }
  }

  .top-head {
    margin: 0 auto;
    padding: 20px 0 30px;
    .layout-wrap {
      padding-left: 560px;
      text-align: right;
    }
    .yzk-logo {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      background: url('../assets/img/logo.png') no-repeat left top;
      width: 494px;
      height: 61px;
    }
    .business-btn {
      padding-top: 15px;
      p {
        display: inline-block;
        text-align: left;
        a {
          color: #3e3e3e;
        }
        a:hover {
          color: $linkHoverColor;
        }
        span {
          display: block;
          margin-top: 3px;
          font-size: 12px;
        }
      }
      p:last-child {
        margin-left: 39px;
      }
    }
  }

  .tel-info {
    border-top: 1px solid #ccc;
    padding: 15px 0 0 60px;
    background: url('../assets/img/sprite/icon-tel.png') no-repeat 10px 20px;
    color: #9e9e9e;
    p {
      margin: 0;
    }
    .tel {
      font-size: 24px;
    }
    .worktime {
      margin-top: 5px;
      font-size: 12px;
    }
  }

  // ie9兼容样式
  .ua-ie9 {
    .yzk-login {
      .el-form-item__content {
        line-height: 0;
      }
    }
    .top-nav .user-info ul > li:hover ul {
      border: 1px solid $border-color;
    }
  }
</style>
