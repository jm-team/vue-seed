<template>
  <div class="expert-list-wrap">
    <div class="technician w1190">

      <div class="technician-list fn-clear" v-for="(item,index) in technicianLists">
        <div class="technician-list-l fn-left">
          <!-- <img :src="item.imgUrl | imgCdn"> -->
          <img v-if="item.imgUrl" v-lazyload="Filters.imgCdn(item.imgUrl)" @click="jpExpertDetail(item.id)">
          <img v-else src="../assets/img/head.png" @click="jpExpertDetail(item.id)">
        </div>
        <div class="technican-list-r fn-left">
          <div class="expert-brief">
            <h5 @click="jpExpertDetail(item.id)" :title="item.expertName">{{item.expertName | subStr(6)}}</h5>
            <span class="location" :title="item.city">{{ item.city | subStr(10) }}</span>
            <span class="company" :title="item.positionName" v-if="item.positionName">{{item.positionName | subStr(10)
              }}</span>
            <span v-if="isNotEmpty(item)"> | </span>
            <span :title="item.companyName" v-if="item.companyName">{{item.companyName | subStr(10)}}</span>
            <button v-if="item.isFavorite == -1" class="collection" :plain="true"
                    @click="handleCollection(1,item,index)">收藏专家
            </button>
            <button v-else-if="item.isFavorite == 0" class="collection" :plain="true"
                    @click="handleCollection(1,item,index)">收藏专家
            </button>
            <button v-else class="not-collection" @click="handleCollection(0,item,index)">取消收藏</button>
          </div>
          <div class="expert-detail">
            <h4>专家简介</h4>
            <p>{{item.expertIntroduces | subStr(138)}}</p>
          </div>
        </div>
      </div>

      <!--分页-->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage1"
                       layout="prev, pager, next, jumper" :page-size="8" :total="technicianListsAll.totalSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        loading: false,
        tabActiveIndex: 0,
        technicianLists: [],
        technicianListsAll: {},
        Items: [1, 2, 3],
        currentPage1: 1
      }
    },
    components: {}
    , created() {
      this.Api.technicianList().then((res) => {
        if (res.data.statusCode == 200 && res.data.rows.length > 0) {
          this.technicianLists = res.data.rows;
          this.technicianListsAll = res.data;
        }
      }).catch((err) => {

      })
    },
    watch: {
      userIsLogin: function (val) {
        this.Api.technicianList().then((res) => {
          if (res.data.statusCode == 200 && res.data.rows.length > 0) {
            this.technicianLists = res.data.rows;
          }
        }).catch((err) => {

        });
      }
    },
    methods: {
      isNotEmpty(item) {
        if (item.positionName && item.companyName) {
          return true;
        }
        return false;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        var limit = 8;
        var offset = (val - 1) * limit;

        this.Api.technicianList(offset, limit).then((res) => {
          if (res.data.statusCode == 200 && res.data.rows.length > 0) {
            this.technicianLists = res.data.rows;
          }
        }).catch((err) => {

        });

      },
      loginWarn() {
        // this.$message({
        //   message: '请先登录！',
        //   type: 'warning'
        // })
        this.$root.$emit('showLoginDialog')

      },
      handleCollection(type, info, index) {
        if (!this.userIsLogin) {
          this.loginWarn();
        } else if (this.userIsLogin) {
          var curItem = Object.assign({}, info)
          let vm = this;
          if (type == 1) {

            vm.axios.get(`/webapi/v2/favorite/1/${info.id}`, {
                params: {
                  t: Date.now()
                }
              }
            ).then((res) => {
              if (res.data.statusCode == 200) {
                curItem.isFavorite = 1
                vm.$set(this.technicianLists, index, curItem);
              }

            })
          } else {
            vm.axios.get(`/webapi/v2/notFavorite/1/${info.id}`, {
              params: {
                t: Date.now()
              }
            }).then((res) => {
              if (res.data.statusCode == 200) {
                curItem.isFavorite = 0
                vm.$set(this.technicianLists, index, curItem);
              }

            })
          }

        }
      },
      jpExpertDetail(id) {
        this.$router.push({name: 'expertDetail', params: {id: id}});
      }
    },
    computed: {
      ...mapState({
        userIsLogin: state => state.User.isLogin
        , userInfo: state => state.User.userInfo
        , loginToUrl: state => state.User.loginToUrl
        , curPageUrl: state => state.Site.curPageUrl
      })
    }
  }

</script>
<style>
  .el-pagination {
    width: 420px;
    margin: 0 auto;
  }

  .el-pagination .btn-next,
  .el-pagination .btn-prev,
  .el-pager li,
  .el-pager li:last-child,
  .el-pagination {
    border: none;
  }

  .expert-list-wrap .block {
    margin: 20px 0px;
  }

  .expert-list-wrap {
    border-top: 2px solid #2788e8;
  }

  .expert-list-wrap .technician {
    margin-top: 20px;
  }

  .expert-list-wrap .industry-tag {
    margin: 30px 0px;
  }

  .expert-list-wrap .industry-tag span {
    display: inline-block;
    margin-right: 16px;
    font-size: 16px;
    color: #3d3d3d;
  }

  .expert-list-wrap .industry-tag a {
    display: inline-block;
    padding: 10px 14px;
    margin-right: 6px;
    border: 1px solid #dedede;
    font-size: 14px;
    color: #6e6e6e;
    cursor: pointer;
  }

  .expert-list-wrap .industry-tag a.active {
    color: #fff;
    background: #2788e8;
  }

  .expert-list-wrap .technician-list {
    margin-bottom: 16px;
    padding: 20px;
    width: 100%;
    height: 164px;
    background: #f5f5f5;
  }

  .expert-list-wrap .technician-list:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  .expert-list-wrap .technician-list:hover h5 {
    color: #F68306;
  }

  .expert-list-wrap .technician-list .technician-list-l {
    width: 120px;
    height: 120px;
    margin-right: 30px;
  }

  .technician-list .technician-list-l img {
    width: inherit;
    height: inherit;
    border-radius: 120px;
    cursor: pointer;
  }

  .expert-list-wrap .technician-list .technican-list-r {
    width: 1000px;
  }

  .technician-list .technican-list-r .expert-brief {
    margin-bottom: 20px;
  }

  .technican-list-r .expert-brief h5 {
    font-size: 20px;
    color: #3d3d3d;
    font-weight: normal;
    display: inline-block;
    cursor: pointer;
  }

  .technican-list-r .expert-brief span.location {
    display: inline-block;
    padding-left: 25px;
    margin: 0px 20px;
    background: url("../assets/img/icon-location.png") no-repeat;
  }

  .technican-list-r .expert-brief span.company {
    font-size: 14px;
    color: #3d3d3d;
  }

  .technican-list-r .expert-brief button.collection {
    width: 120px;
    height: 34px;
    background: #2788e8 url('../assets/img/icon-fav1.png') no-repeat;
    background-position: 15px;
    padding-left: 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    float: right;
  }

  .technican-list-r .expert-brief button.collection:hover {
    background: #157ada url('../assets/img/icon-fav1.png') no-repeat;
    background-position: 15px;
  }

  .technican-list-r .expert-brief button.collection:active {
    background: #0667c3 url('../assets/img/icon-fav1.png') no-repeat;
    background-position: 15px;
  }

  .technican-list-r .expert-brief button.not-collection {
    width: 120px;
    height: 34px;
    background: #f5f5f5 url('../assets/img/icon-fav2.png') no-repeat;
    background-position: 15px;
    padding-left: 15px;
    font-size: 14px;
    color: #6e6e6e;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    float: right;
  }

  .technican-list-r .expert-detail h4 {
    font-size: 16px;
    /*color: #3d3d3d;*/
    color: var(--fontColor);
    font-weight: normal;
    margin-bottom: 10px;
  }

  .technican-list-r .expert-detail p {
    font-size: 14px;
    line-height: 26px;
    color: #6e6e6e;
  }
</style>
