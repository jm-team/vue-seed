<template>
  <div id="app">
    <top-bar ref="topbar"></top-bar>
    <router-view></router-view>
    <footer-bar v-show="showFooter"></footer-bar>
  </div>
</template>

<script>
import TopBar from 'components/topBar'
import FooterBar from 'components/footerBar'

// 引入单点自动登录的js
import User from 'service/user'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
        isLogin: true
    }
  },
  components:{
      TopBar,
      FooterBar
  },
  watch: {
      $route (to, from) {
          // 路由变化时进行单点登录检测
          this.checkLogin()
          this.getCurPageUrl({
            pageUrl: window.location.href
          })
      }
  },
  computed:{
    showFooter(){
        return this.$root.showFooter
    }
  },
  methods: {
    // 检测用户是否登录
    checkLogin () {
        User.checkAutoLogin().then( (data) => {
            this.$emit('userLogined')
        }).catch( (data) => {
            this.$emit('userNotLogin')
        })
    },
    ...mapMutations([
        'getCurPageUrl'
    ])
  }
}
</script>

<style></style>