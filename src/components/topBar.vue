<template>
    <div class="yzk-header">
        <div class="top-nav">
            <div class="layout-wrap">
                <div class="user-nav">
                    <p class="reg-login"
                       v-if="!userIsLogin">
                        <a :href="CENTER_ADDRESS+'/user/toRegister'" target="_blank">用户注册 / Free Registration</a>
                        <a href="javascript:;"
                           @click="loginDialogShow = true">登录 / Sign in</a>
                    </p>
                    <p class="user-info"
                       v-else>
                        <span class="headpic"><img :src="userInfo.headImg | imgCdn" onerror="this.src = defaultHeadPic"></span>
                        <ul>
                            <li>
                                <p>{{ userInfo.nickName || userInfo.userName || '&nbsp;&nbsp;' }}</p>
                                <ul>
                                    <li><a :href="CENTER_ADDRESS+'/jttoverview/init'"
                                           target="_blank">个人中心</a></li>
                                    <li><a :href="USERCENTER_ADDRESS+'/logout?returnUrl=' + curPageUrl"
                                           @click="setUserIsLoginCookie">退出</a></li>
                                </ul>
                            </li>
                        </ul>
                    </p>
                    <!--<a :href="'http://uc3.dev.com/logout?returnUrl=' + curPageUrl">退出 / Logout</a>-->
                </div>
            </div>
        </div>
        <div class="top-head">
            <div class="layout-wrap">
                <router-link to="/"
                             class="yzk-logo"></router-link>
                <div class="business-btn">
                    <p>
                        <router-link :to="{ path: '/expert', query: {}}">我要咨询专家<span>I want my consultant</span></router-link></p>
                    <p>
                        <router-link :to="{ path: '/releaseResearch', query: {}}">邀请专家调研企业<span>Apply for expert's research on my company</span></router-link></p>
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
    
        <el-dialog class="yzk-login"
                   v-model="loginDialogShow"
                   size="360px"
                   @close="closeLoginDialog"
                   @open="openLoginDialogCallback">
            <p class="login-title">欢迎登录</p>
            <el-form :model="loginForm"
                     :rules="loginFormVerifyRule"
                     ref="loginForm"
                     label-width="1px">
                <el-form-item prop="username">
                    <el-input type="text"
                              v-model="loginForm.username"
                              auto-complete="off"
                              placeholder="请输入手机号"
                              autofocus="true"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password"
                              v-model="loginForm.password"
                              auto-complete="off"
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <div class="login-other">
                    <a :href="CENTER_ADDRESS+'/user/toRegister'" @click="$refs.loginForm.resetFields()" target="_blank"
                       class="reg-link">免费注册</a><a :href="CENTER_ADDRESS+'/user/forgetPassword?flag=1'" @click="$refs.loginForm.resetFields()" target="_blank"
                       class="forgot-pw">忘记密码</a>
                </div>
                <el-form-item>
                    <el-button type="primary"
                               @click="login"
                               class="btn-login">立即登录</el-button>
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import siteConfig from 'config/site.config'
import RSA from 'assets/js/security'
window.defaultHeadPic = 'data:image/png;base64,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'

export default {
    data() {
        // 登录表单校验函数
        var verifyUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                // 必须调用callback，否则没法完成验证
                callback()
            }
        }
        var verifyPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback()
            }
        }
        return {
            loginDialogShow: false
            , homeUrl: window.location.origin
            , CENTER_ADDRESS: siteConfig.address.CENTER_ADDRESS
            , USERCENTER_ADDRESS: siteConfig.address.USERCENTER_ADDRESS
            // 登录表单数据
            , loginForm: {
                username: ''
                , password: ''
            }
            // 登录表单校验规则
            , loginFormVerifyRule: {
                username: [
                    { validator: verifyUsername, trigger: 'blur', required: true }
                ],
                password: [
                    { validator: verifyPassword, trigger: 'blur', required: true }
                ]
            }
        }
    },
    methods: {
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let data = this.loginForm
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
                            this.closeLoginDialog()
                            this.$parent.$emit('userLogined')
                    //     } else {
                    //         // 显示错误信息
                    //         this.$message({
                    //             message: data.desc,
                    //             type: 'error'
                    //         })
                    //     }
                    // })
                } else {
                    return false;
                }
            })
        },
        closeLoginDialog() {
            this.loginDialogShow = false
            this.$refs.loginForm.resetFields()
        },
        openLoginDialogCallback() {
        },
        setUserIsLoginCookie() {
            this.Cookie.setCookie('userIsLogin', false)
        },
        ...mapMutations([
            'changeLoginState'
            , 'updateUserInfo'
        ])
    },
    computed: {
        ...mapState({
            userIsLogin: state => state.User.isLogin
            , userInfo: state => state.User.userInfo
            , loginToUrl: state => state.User.loginToUrl
            , curPageUrl: state => state.Site.curPageUrl
        })
    }
    , created() {
        let _app = this.$parent
        // 检测到未登录时处理
        _app.$on('userNotLogin', () => {
            this.Cookie.setCookie('userIsLogin', false)
            this.changeLoginState({ loginState: false })
            this.updateUserInfo({
                userInfo: {}
            })
        })

        // 检测到已登录里处理
        _app.$on('userLogined', () => {
            this.Cookie.setCookie('userIsLogin', true)
            this.changeLoginState({ loginState: true })
            this.Api.getUserInfo().then((data) => {
                // 更新用户信息
                this.updateUserInfo({
                    userInfo: data.data.rows
                })
            })
        })

        this.$root.$on('showLoginDialog', () => {
            this.loginDialogShow = true
        })
    }
}

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
        .reg-login>a:last-child {
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
        ul>li {
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
        ul>li:hover {
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
    background: url('../assets/img/icon-tel.png') no-repeat 10px 20px;
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
    .top-nav .user-info ul>li:hover ul {
        border: 1px solid $border-color;
    }
}
</style>