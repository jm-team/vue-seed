<template>
  <div id="app">
    <top-bar ref="topbar"></top-bar>
    <router-view></router-view>
    <footer-bar v-show="showFooter"></footer-bar>
  </div>
</template>

<script>
  import TopBar from 'components/topBar';
  import FooterBar from 'components/footerBar';

  // 引入单点自动登录的js
  import { checkAutoLogin } from 'service/user';
  import { mapMutations } from 'vuex';

  export default {
    name: 'app',
    data() {
      return {};
    },
    components: {
      TopBar,
      FooterBar,
    },
    watch: {
      $route() {
        // 路由变化时进行单点登录检测
        this.checkLogin();
        this.getCurPageUrl({
          pageUrl: window.location.href,
        });
      },
    },
    computed: {
      showFooter() {
        return this.$root.showFooter;
      },
    },
    methods: {
      // 检测用户是否登录
      checkLogin() {
        checkAutoLogin().then(() => {
          this.$emit('userLogined');
        }).catch(() => {
          this.$emit('userNotLogin');
        });
      },
      ...mapMutations([
        'getCurPageUrl',
      ]),
    },
    created() {
      console.dir(this.Api);
    },
  };

</script>
