<template>
  <div class="yzk-footer">
    <div class="layout-wrap">
      <div class="site-navs">
        <template v-for="(item, index) in siteNavs">
          <!-- 给最后一个dl加last-child样式 -->
          <dl :class=" index==siteNavs.length-1 ? 'last-child' : ''">
            <dd v-for="link in item.artInfo">
              <router-link :to=" {name:'service', params:{artId: link.id}} ">{{ link.title }}</router-link>
              <span>{{ link.subTitle }}</span>
            </dd>
          </dl>
        </template>
        <p class="jumore-qr"><span>element ui</span></p>
      </div>
      <div class="copyright">
        <p><span>客服电话／Contacts：400-800-1818</span><span>E-Mail：jm-fe-item@jumore.com</span><span>工作时间／Work Time：（周一至周日 9：00 - 9:00）</span>
        </p>
        <p>公司地址：浙江省杭州市西湖区求是路</p>
        <p>Address : NORTHWEST OF ANNO DOMINI XFFEFWF, NO.18, SFEWF ROAD,HANGZHOU,CHINA</p>
        <p>Copyright © 2017 JM-FE-ITEM Inc. All rights reserved.  |  www.jm-fe-item.com </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        siteNavs: [],
      };
    },
    props: {
      showNav: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      route() {
        return this.$route.path;
      },
    },
    created() {
      this.Api.getFooterNavs().then((rep) => {
        if (rep.data.statusCode === 200) {
          this.siteNavs = rep.data.rows;
        } else {
          this.$message({
            message: rep.data.desc || '获取数据出错',
            type: 'error',
          });
        }
      });
    },
  };
</script>

<style lang="scss" rel="style/scss">
  @import '../assets/css/common.scss';

  .yzk-footer {
    background: $bg-f5f5f5;
    padding-top: 20px;
    .site-navs {
      padding-top: 16px;
      dl {
        display: inline-block;
        width: 300px;
        min-height: 150px;
        vertical-align: top;
        dd {
          margin: 0;
          padding-bottom: 10px;
          a {
            font-size: 14px;
          }
          a:hover {
            color: $linkHoverColor;
          }
          span {
            display: block;
            margin-top: 3px;
            font-size: 12px;
            color: $font-6e6e6e;
          }
        }
      }
      dl.last-child {
        width: 120px;
      }
    }
    .jumore-qr {
      position: absolute;
      text-align: center;
      margin: 0;
      right: 0px;
      top: 18px;
      width: 107px;
      height: 37px;
      padding-top: 115px;
      background: url('../assets/img/qr-pic.png') no-repeat left top;
    }
    .copyright {
      text-align: center;
      padding: 10px 0 30px;
      p {
        font-size: 14px;
        color: $font-6e6e6e;
        margin: 0 0 8px;
        span {
          margin: 0 10px;
        }
      }
      p:last-child {
        font-size: 12px;
      }
    }
  }

</style>
