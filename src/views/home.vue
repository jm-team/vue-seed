<template>
  <div class="home-wrap">
    <div class="carousel pr">
      <el-carousel arrow="never">
        <el-carousel-item v-for="item in carouselsFilter" :key="item.id">
          <a :href="item.url" @click="jplNul($event,item.url)">
            <img v-lazyload="$filter.imgCdn(item.adsImg)">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="brief-introduction">
      <div class="brief-introduction-detail w1190">
        <div class="title">
          <h3 class="cn">我们的优势</h3>
          <h3 class="en">OUR ADVANTAGES</h3>
          <span class="line"></span>
        </div>

        <div class="content fn-clear">
          <div class="content-l fn-left">
            <p>{{ intro | subStr(25)}}</p>
            <p>{{ intro2 | subStr(25)}}</p>
          </div>
          <div class="content-r fn-left">
            <p>
              We have the advantage ofWe have the advantage ofWe have the advantage ofWe have the advantage ofWe have the advantage
              ofWe have the advantage ofWe have the advantage ofWe have the advantage of </p>
          </div>
          <div class="characteristic fn-left">
            <div class="characteristic-list">
              <img src="../assets/img/team.png">
              <div class="characteristic-list-r">
                <p class="list-name-cn">顶尖专家</p>
                <p class="list-name-en">Authoritative experts of the industry</p>
                <p class="list-descr">严选业内权威专家</p>
              </div>
            </div>

            <div class="characteristic-list">
              <img src="../assets/img/voice.png">
              <div class="characteristic-list-r">
                <p class="list-name-cn">权威声音</p>
                <p class="list-name-en">Insight into industrial trends</p>
                <p class="list-descr">洞悉行业发展趋势</p>
              </div>
            </div>

            <div class="characteristic-list">
              <img src="../assets/img/conslution.png">
              <div class="characteristic-list-r">
                <p class="list-name-cn">专业咨询</p>
                <p class="list-name-en">Your escort for decisions</p>
                <p class="list-descr">为决策保驾护航</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--专家风采-->
    <div class="expert-style">
      <div class="expert-style-detail w1190">
        <div class="title">
          <h3 class="cn">专家风采</h3>
          <h3 class="en">Glimpse of experts</h3>
          <span class="line"></span>
        </div>

        <div class="expert-style-list fn-clear">
          <router-link :to="'/expert/'+item.id" tag="div" class="style-img pr" v-for="(item, index) in styleInfoFilter"
                       v-bind:class="{'fn-left': index === 4, 'fn-right': index === 5}" :key="item.id">
            <!-- <img :src="item.imgUrl | imgCdn"> -->
            <img v-if="item.imgUrl" v-lazyload="$filter.imgCdn(item.imgUrl)">
            <img v-else src="../assets/img/headSquare.png">
            <div class="expert-mask">
              <h5 class="expert-mask-name">{{item.expertName}}</h5>
              <span>{{item.yearsOfWorking}}<span v-if="item.yearsOfWorking">年</span></span>
              <p>{{item.positionName}}</p>
              <p>{{item.companyName}}</p>
              <!--<em class="tag">机械领域</em>-->
            </div>
          </router-link>

          <div class="style-img">
            <a :href="styleBannerUrl" @click="jplNul($event,styleBannerUrl)">
              <img class="style-banner" :src="styleBannerImg | imgCdn">
            </a>
          </div>

        </div>
      </div>
    </div>

    <!--专家-->
    <div class="expert fn-clear">
      <div class="expert-list fn-clear w1190">
        <div class="title">
          <h3 class="cn">各行业顶尖专家云集于此</h3>
          <h3 class="en">The industrial top experts gathered here</h3>
          <span class="line"></span>
        </div>

        <div class="expert-detail-list fn-left pr" v-for="item in expertLists">
          <!-- <img :src="item.imgUrl | imgCdn"> -->
          <img v-if="item.imgUrl" v-lazyload="$filter.imgCdn(item.imgUrl)">
          <img v-else src="../assets/img/headGray.png">
          <!--<i class="tag">有色领域</i>-->
          <ul>
            <li class="name">{{item.expertName}}</li>
            <li>{{item.positionName}} <span v-if="item.positionName.length!==0">|</span> {{item.companyName}}</li>
            <li v-for="items in item.multipleSkills.slice(0,4)">{{items}}</li>
          </ul>
          <router-link class="expert-detail" :to="'/expert/'+item.id">查看详情 》</router-link>
        </div>

        <router-link class="view-more fn-left" :to="'/expert/'">更多专家 More&gt</router-link>

      </div>
    </div>

    <!--底部轮播-->
    <div class="carousel">
      <el-carousel indicator-position="none">
        <el-carousel-item v-for="item in bottomCarouselsFilter" :key="item.id">
          <!-- <img :src="item.adsImg | imgCdn"> -->
          <a :href="item.url" @click="jplNul($event, item.url)">
            <img v-lazyload="$filter.imgCdn(item.adsImg)">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        carousels: [],
        styleInfo: [],
        styleBanner: [],
        expertLists: [],
        bottomCarousels: [],
        intro: '我们｛｝<>1１２１２３〖〗【】的，12323!$$‘’？｛｝优—｛｝——势●★我｛｝｛｝www们的《》优势@#@*&^%我们的12321优势我们的',
        intro2: '我们的优我们的优势我我们的优势我势我我们的优势我我们的优势我我们的优势我',
      };
    },
    computed: {
      styleInfoFilter() {
        return this.styleInfo.slice(0, 6);
      },
      carouselsFilter() {
        return this.carousels.slice(0, 3);
      },
      bottomCarouselsFilter() {
        return this.bottomCarousels.slice(0, 3);
      },
      styleBannerImg() {
        const sb = this.styleBanner || [];
        return sb.length > 0 ? sb[0].adsImg : '';
      },
      styleBannerUrl() {
        const sb = this.styleBanner || [];
        return sb.length > 0 ? sb[0].url : '';
      },
    },
    components: {},
    created() {
      this.Api.topCarousel().then((res) => {
        if (res.data.statusCode === 200 && res.data.rows.length > 0) {
          this.carousels = res.data.rows;
        }
      });
      this.Api.expertStyle().then((res) => {
        if (res.data.statusCode === 200 && res.data.rows.length > 0) {
          this.styleInfo = res.data.rows;
        }
      });
      this.Api.expertStyleBanner().then((res) => {
        if (res.data.statusCode === 200 && res.data.rows.length > 0) {
          this.styleBanner = res.data.rows;
        }
      });
      this.Api.expertList().then((res) => {
        if (res.data.statusCode === 200 && res.data.rows.length > 0) {
          this.expertLists = res.data.rows;
        }
      });
      this.Api.bottomCarousel().then((res) => {
        if (res.data.statusCode === 200 && res.data.rows.length > 0) {
          this.bottomCarousels = res.data.rows;
        }
      });
    },
    methods: {
      // 轮播防空跳转
      jplNul($event, url) {
        if (!url) {
          $event.preventDefault();
        }
      },
    },
    mounted() {
      // 视图挂载完成后显示公共底部
      // this.$parent.showFooter=true
    },
  };

</script>

<style lang="scss" rel="stylesheet/scss">
  .home-wrap .carousel,
  .el-carousel {
    width: 100%;
    height: 500px;
  }

  .el-carousel {
    overflow: hidden;
  }

  .el-carousel__container {
    width: 1920px;
    height: 500px;
    position: absolute;
    left: 50%;
    margin-left: -960px;
    overflow: hidden;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 500px;
    margin: 0;
  }

  .el-carousel__item {
    width: inherit;
    height: inherit;
    text-align: center;
  }

  .el-carousel__item img {
    width: inherit;
    height: 500px;
    vertical-align: middle;
  }

  .el-carousel__item:nth-child(2n) {
  }

  .el-carousel__item:nth-child(2n+1) {
  }

  .home-wrap .title {
    text-align: center;
    margin-bottom: 30px;
  }

  .home-wrap span.line {
    display: inline-block;
    content: '';
    width: 60px;
    height: 2px;
    background-color: #3e3e3e;
  }

  .home-wrap .title h3.cn {
    margin: 0px 0px 8px;
    font-size: 32px;
    color: #3e3e3e;
    font-weight: normal;
    letter-spacing: 8px;
  }

  .home-wrap .title h3.en {
    margin: 0px;
    font-size: 18px;
    color: #3e3e3e;
    font-weight: normal;
  }

  .brief-introduction-detail .content p {
    font-size: 20px;
    line-height: 32px;
  }

  .brief-introduction-detail .content .content-l {
    width: 580px;
    margin-right: 30px;
  }

  .brief-introduction-detail .content .content-l p {
    text-indent: 2em;
  }

  .brief-introduction-detail .content .content-r {
    width: 580px;
  }

  .characteristic {
    margin: 50px 0px 36px 0px;
  }

  .characteristic-list {
    width: 396px;
    height: 146px;
    float: left;
  }

  .characteristic-list-r {
    float: right;
    width: 258px;
  }

  .characteristic-list-r p.list-name-cn {
    margin: 0px 0px 10px 0px;
    font-size: 26px;
    color: #2788e8;
  }

  .characteristic-list-r p.list-name-en {
    margin: 0px 0px 5px 0px;
    font-size: 14px;
    color: #2788e8;
  }

  .characteristic-list-r p.list-descr {
    margin: 0px;
    font-size: 18px;
    color: #6e6e6e;
  }

  .brief-introduction {
    margin: 60px 0px;
  }

  .expert-style {
    background: #f5f5f5;
    padding: 90px 0px;
  }

  .expert-style-list .style-img {
    float: left;
    margin-left: 20px;
    margin-bottom: 18px;
    cursor: pointer;

    &.fn-left {
      margin-left: 0px;
    }

    &.fn-right {
      float: right;
    }
  }

  .expert-style-list .style-img img {
    width: 282px;
    height: 400px;
  }

  .expert-style-list .style-img a.expert-img {
    display: inline-block;
    width: 282px;
    height: 400px;
  }

  .expert-style-list .style-img:hover:after {
    display: inline-block;
    position: absolute;
    left: -4px;
    top: -4px;
    content: "";
    width: 282px;
    height: 400px;
    border: 4px solid #1d86eb;
    z-index: 2;
  }

  .expert-style-list .style-img img.style-banner {
    width: 584px;
    height: 400px;
    margin: 0 auto;
  }

  .expert-style-list .style-img:first-child {
    margin-left: 0px;
  }

  .expert {
    margin: 90px 0px 40px 0px;
  }

  .expert-detail-list {
    width: 158px;
    min-height: 344px;
  }

  .expert-detail-list img {
    width: 120px;
    height: 120px;
    border-radius: 100px;
    margin: 0px 19px;
  }

  .expert-detail-list i.tag {
    font-size: 12px;
    font-style: normal;
    color: #fff;
    display: inline-block;
    position: absolute;
    right: 7px;
    top: 0px;
    width: 40px;
    height: 40px;
    padding: 0px 8px;
    line-height: 20px;
    border-radius: 40px;
    background: #2788e8;
  }

  .expert-detail-list li {
    font-size: 16px;
    line-height: 32px;
    color: #3e3e3e;
    text-align: center;
  }

  .expert-detail-list li.name {
    font-size: 24px;
    color: #3e3e3e;
    margin: 16px 0px;
  }

  .expert-detail-list .expert-detail {
    display: block;
    margin-top: 12px;
    font-size: 14px;
    color: #2788e8;
    text-align: center;
    cursor: pointer;
  }

  .expert-list .expert-detail-list + .expert-detail-list {
    margin-left: 186px;
  }

  .expert-list .view-more {
    width: 100%;
    height: 48px;
    line-height: 48px;
    margin: 48px 0px;
    background: #f5f5f5;
    border: 1px solid #ccc;
    text-align: center;
    cursor: pointer;
  }

  .expert-list .view-more:hover {
    color: #fff;
    background: #157ada;
    border: 1px solid #157ada;
  }

  .expert-list .view-more:active {
    color: #fff;
    background: #0667c3;
    border: 1px solid #0667c3;
  }

  .el-carousel__arrow {
    width: 25px;
    height: 50px;
    border-radius: 0px;
  }

  .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #b5bbbd;
  }

  .el-carousel__indicator {
    padding: 12px 8px;
  }

  .el-carousel__indicator:hover button,
  .el-carousel__indicator.is-active button {
    background: #2788e8;
  }

  .expert-mask {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120px;
    padding: 0px 10px 15px 34px;
    line-height: 28px;
    font-size: 14px;
    color: #fff;
    background: rgba(3, 47, 90, 0.8);
    filter: Alpha(opacity=80);
    z-index: 1;
  }

  .expert-mask h5.expert-mask-name {
    display: inline-block;
    width: 156px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 24px;
    font-weight: normal;
    color: #fff;
    margin: 10px 10px 10px 0px;
  }

  .expert-mask p,
  .expert-mask span {
    font-size: 14px;
    color: #fff;
  }

  .expert-mask .tag {
    font-size: 16px;
    font-style: normal;
    color: #fff;
    position: absolute;
    top: 0px;
    right: 10px;
    display: inline-block;
    height: 34px;
    padding: 4px 10px;
    background: #f68306;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
</style>
