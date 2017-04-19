<template>
  <div class="research-report-wrap">
    <div class="top-banner-wrap pr">
      <div class="top-banner">
        <img class="bg" src="../assets/img/reportBanner.png">
        <div class="report-company fn-clear">
          <div class="report-company-l fn-left">
            <img class="company-name" v-if="reportContent.companyLogoUrl" :src="reportContent.companyLogoUrl | imgCdn">
            <img class="company-name" v-else src="../assets/img/company.png">
          </div>
          <div class="report-company-r fn-left">
            <h3>{{reportContent.companyName}}</h3>
            <a :href="reportContent.websiteUrl">跳转至公司页面</a>
          </div>
        </div>

      </div>
    </div>
    <div class="research-report w1190">

      <div class="research-report-detail w1190 fn-clear">
        <div class="research-report-detail-l fn-left">
          <div class="title">
            <h3><em>【研报】</em><span>{{reportContent.title}}</span></h3>
            <h5 class="time">{{reportContent.statusTimes}}</h5>
          </div>
          <p>
           {{reportContent.content}}
          </p>
          <div class="declare">
          <!--
            <h4>免责声明</h4>
            <ul>
              <li>1、云智库发布此信息目的在于传播更多信息，与本网站立场无关。</li>
              <li>2、云智库不保证该信息（包括但不限于文字、数据及图表）全部或者部分内容的准确性、真实性、完整性、有效性、及时性、原创性等。</li>
              <li>3、相关信息并未经过本网站证实，不对您构成任何投资建议，据此操作，风险自担。</li>
              <li>4、如有侵权请直接与作者联系或书面发函至本公司转达、处理。</li>
            </ul>
          -->
            <h4>版权声明</h4>
            <ul>
              <li>1、本文仅代表作者观点，不代表聚贸立场。</li>
              <li>2、本文系作者授权聚贸云智库发表，未经许可，不得转载。</li>
            </ul>
          </div>
        </div>

        <div class="research-report-detail-r fn-left">
          <div class="expert-card">
            <div class="brief fn-clear">
              <div class="brief-l fn-left">
                <img v-if="reportExpert.imgUrl" :src="reportExpert.imgUrl | imgCdn">
                <img v-else src="../assets/img/head.png">
              </div>
              <div class="brief-r fn-left">
                <h5>{{reportExpert.expertName}}</h5>
                <p>{{reportExpert.city}}</p>
              </div>
            </div>
            <div class="content">
              <div class="content-list">
                <label>担任职务：</label>
                <span>{{reportExpert.positionName}}</span>
              </div>
              <div class="content-list">
                <label>所在公司：</label>
                <span>{{reportExpert.companyName}}</span>
              </div>
              <div class="content-list">
                <label>年限：</label>
                <span>{{reportExpert.yearsOfWorking}} <span v-if="reportExpert.yearsOfWorking">年</span></span>
              </div>
            </div>
            <router-link class="expert-page" :to="'/expert/'+reportExpert.id">专家个人页面</router-link>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        reportId:this.$route.params.id || null,
        reportContent:{},
        reportExpert:{}
      }
    },

    components: {

    }
    ,created() {
        this.Api.detailedResearchReport().then((res) =>{
            if(res.data.statusCode == 200){

                this.reportContent =res.data.rows;
                this.Api.getExpertDetail().then((res) =>{
                    if(res.data.statusCode == 200){

                        this.reportExpert =res.data.rows;
                    }
                }).catch((err) =>{

                });
            }
        }).catch((err) =>{

        })


    },
    methods: {
        // detailedResearchReport(){
        //     return this.axios.get(`/webapi/v2/detailedResearchReport/${this.reportId}`);
        // },
        // researchReport(){
        //     return this.axios.get(`/webapi/v2/detailedExpertInfo/${this.reportContent.expertId}`);
        // }
    }
  }

</script>
<style>
.research-report-wrap .top-banner-wrap{
  width:100%;
  height:200px;
  margin-bottom: 20px;
  overflow-x: hidden;
}
.research-report-wrap .top-banner-wrap .top-banner{
  width:1920px;
  height:200px;
  position: absolute;
  left:50%;
  margin-left:-960px;
  overflow:hidden;
}

.research-report-wrap .top-banner-wrap .top-banner img.bg{
  display:inline-block;
  width:inherit;
  height:inherit;
}

.research-report-wrap .top-banner-wrap .top-banner .report-company{
  position:absolute;
  left:20%;
  top:20%;
}

.research-report-wrap .top-banner-wrap .top-banner .report-company-l{
  width:120px;
  height:120px;
  margin-right:30px;
}

.research-report-wrap .top-banner-wrap .top-banner img.company-name{
  width:inherit;
  height:inherit;
  border-radius:120px;
}

.research-report-wrap  .report-company-r h3{
    font-size:24px;
    color:#fff;
    margin:20px 0px;
}

.research-report-wrap  .report-company-r a{
  display:inline-block;
  font-size: 14px;
  color:#6e6e6e;
  background:#fff;
  padding:8px 12px;
  border-radius:3px;
  cursor:pointer;
}
.research-report-detail-l{
  width:850px;
  padding:40px 0px 30px;
  border-top:1px solid #dedede;
}

.research-report-detail-l .title{
  text-align:center;
}

.research-report-detail-l .title h3{
  font-size:24px;
  color:#3d3d3d;
  font-weight:normal;
  margin-bottom:30px;
}

.research-report-detail-l .title em{
  margin-right:10px;
  font-style:normal;
  font-weight:normal;
}

.research-report-detail-l .title h5.time{
  font-size:14px;
  font-weight:normal;
  color:#6e6e6e;
  margin-bottom:25px;
}

.research-report-detail-l p{
  padding-bottom: 40px;
  border-bottom:1px solid #dedede;
}

.research-report-detail .declare{
  margin-top:30px;
}

.research-report-detail .declare{
  line-height:28px;
}

.research-report-detail .declare h4{
  font-size:16px;
  font-weight:normal;
  color:#3d3d3d;
}

.research-report-detail .declare ul>li{
  font-size:14px;
  color:#6e6e6e
}

.research-report-detail-r{
  margin-left:30px;
}
.research-report-detail-r .expert-card{
  width:306px;
  border:1px solid #dedede;
  padding:30px 36px;
}

.research-report-detail-r .brief-l{
  width:100px;
  height:100px;
  margin-right:20px;
}
.research-report-detail-r .brief-l img{
  width:inherit;
  height:inherit;
  border-radius:100px;
}

.research-report-detail-r .brief-r h5{
  width:96px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size:24px;
  font-weight:normal;
  color:#3e3e3e;
  margin:20px 0px 16px 4px;
}
.research-report-detail-r .brief-r p{
  font-size:14px;
  line-height: 28px;
  color:#a1a1a1;
  padding-left:25px;
  background:url("../assets/img/icon-location.png") 0px 4px no-repeat;
}

.research-report-detail-r .expert-card .content{
  margin:20px 0px;
}

.research-report-detail-r .expert-card .content-list{
  line-height: 26px;
}

.research-report-detail-r .expert-card  a.expert-page{
  display:block;
  width:152px;
  font-size:14px;
  color:#fff;
  background:#2788e8;
  padding:10px 34px;
  border-radius:3px;
  margin:0 auto;
  cursor:pointer;
}
</style>