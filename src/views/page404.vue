<template>
  <div class="page404">
    <div class="pg404">
      <img src="../assets/img/404.png">
      <p>矮油！您迷路了...
        很抱歉您访问的页面不存在！</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goHomeTimeout: null,
      };
    },
    created() {
      this.goHomeTimeout = setTimeout(() => this.$router.push('/'), 5000);
    },
    beforeRouteLeave(to, from, next) {
      clearTimeout(this.goHomeTimeout);
      next();
    },
  };
</script>

<style>
  .page404 {
    text-align: center;
    margin: 40px 0px;
  }

  .page404 .pg404 {
    width: 410px;
    height: 640px;
    margin: 0 auto;
  }

  .page404 .pg404 p {
    font-size: 34px;
    color: #343434;
    line-height: 1.5;
    margin-top: 65px;
  }
</style>
