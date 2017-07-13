<template>
  <div class="service">
    <div class="layout-wrap">
      <div class="left-navbar">
        <h3>{{ categoryName}}</h3>
        <ul>
          <li v-for="nav in artLeftlist.arts">
            <a href="javascript:;" @click="changeArtDetail(nav.id)"
               :class=" nav.id == artDetail.id ? 'active' : ''">{{ nav.title}}</a>
          </li>
        </ul>
      </div>
      <div class="main-content">
        <h3>{{ artDetail.title }}</h3>
        <div class="article-detail" v-html="artDetail.content">
          <!-- <p>聚达通是聚贸旗下外贸综合服务平台，也是中国专业服务于中小微企业的外贸综合服务行业的开拓者和领军者。</p>
                  <p>在过去的十余年中，通过线上化操作及建立有效的信用数据系统，聚达通一直致力于持续地推动传统外贸模式的革新。通过整合各项外贸服务资源和银行资源，聚达通目前已成为中国国内进出口额排名第一的外贸综合服务平台，为中小企业提供专业、低成本的通关、外汇、退税及配套的物流和金融服务。</p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        artId: this.$route.params.artId || '',
        artDetail: {},
        categoryName: {},
        artLeftlist: {},
      };
    },
    created() {
      this.getArtDetail(this.artId);
      this.getArtLeftbar(this.artId);
      console.dir(this.Api.getArtDetail(this.artId));
    },
    watch: {
      $route(to) {
        this.getArtDetail(to.params.artId);
        this.getArtLeftbar(to.params.artId);
      },
    },
    methods: {
      getArtDetail(artId) {
        this.Api.getArtDetail(artId).then((rep) => {
          if (rep.data.statusCode === 200) {
            this.artDetail = rep.data.rows;
          } else {
            this.$message({
              message: rep.data.desc || '获取数据出错',
              type: 'error',
            });
          }
        });
      },
      getArtLeftbar(artId) {
        this.Api.getArtLeftbar(artId).then((rep) => {
          if (rep.data.statusCode === 200) {
            this.artLeftlist = rep.data.rows;
            this.categoryName = rep.data.rows.cmsCategory.categoryName;
          } else {
            this.$message({
              message: rep.data.desc || '获取数据出错',
              type: 'error',
            });
          }
        });
      },
      changeArtDetail(artId) {
        this.getArtDetail(artId);
      },
    },
  };

</script>

<style lang="scss" rel="style/scss">
  @import '../assets/css/common.scss';

  .service {
    position: relative;
    border-top: 2px solid $color-2788e8;
    padding: 60px 0;
    .layout-wrap {
      padding-left: 200px;
    }
    .left-navbar {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      padding: 10px 0;
      border: 1px solid $border-color;
      border-right: none;
      min-height: 300px;
      h3 {
        font-size: 16px;
        font-weight: normal;
        color: $font-3e3e3e;
        line-height: 36px;
        border-bottom: 1px solid $border-color;
        margin: 0 20px 10px;
      }
      ul {
        li {
          a {
            display: block;
            padding-left: 50px;
            line-height: 40px;
            background: url('../assets/img/sprite/icon-dot-default.png') no-repeat 20px center;
          }
          a:hover,
          a.active {
            color: #fff;
            background: $color-2788e8 url('../assets/img/sprite/icon-dot-active.png') no-repeat 20px center;
          }
        }
      }
    }
    .main-content {
      min-height: 680px;
      border: 2px solid $color-2788e8;
      padding: 30px 35px;
      h3 {
        font-size: 24px;
        text-align: center;
        font-weight: normal;
        color: $font-3e3e3e;
        border-bottom: 1px solid $border-color;
        padding: 0 0 25px;
        margin-bottom: 30px;
        line-height: 150%;
      }
      .article-detail {
        p {
          /*text-indent:32px;*/
          line-height: 160%;
          margin-bottom: 20px;
        }
        ul,
        li {
          list-style: inherit;
        }
      }
    }
  }
</style>
