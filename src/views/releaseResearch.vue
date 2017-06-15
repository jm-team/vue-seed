<template>
  <div class="release-research">
    <div class="layout-wrap">
      <div class="rr-title">
        <h3>发布调研单</h3>
        <!-- <span @click="explainDialogVisible=true">发布说明</span> -->
      </div>
      <div class="demand-form">
        <el-form :model="demandForm" :rules="demandFormVerifyRule" ref="demandForm" label-width="125px">
          <div class="expert-baseinfo" v-if="demandForm.objectId">
            <div class="company-info-title">专家信息：</div>
            <div class="baseinfo">
              <h3>
                <span :title="expertInfo.expertName">{{ expertInfo.expertName | subStr(6) }}</span>
                <span class="city" v-if="expertInfo.city" :title="expertInfo.city">{{ expertInfo.city | subStr(10)
                  }}</span>
              </h3>
              <p>
                <span :title="expertInfo.positionName">{{ expertInfo.positionName | subStr(10) }}</span>
                <span v-if="expertInfo.positionName && expertInfo.companyName"> | </span>
                <span v-if="expertInfo.companyName"
                      :title="expertInfo.companyName">{{ expertInfo.companyName | subStr(15) }}</span>
                <span v-if="expertInfo.yearsOfWorking"> {{ expertInfo.yearsOfWorking }}年</span>
              </p>
              <p>{{ expertInfo.expertIntroduces | subStr(165) }}</p>
            </div>
          </div>
          <div class="company-info-title required">调研公司信息：</div>
          <el-form-item prop="companyIntroduces" label-width="1px">
            <el-input type="textarea" :rows="5" autofocus="true" placeholder="请尽可能的对公司信息进行描述，以便客服人员安排相应的专家进行调研"
                      v-model="demandForm.companyIntroduces">
            </el-input>
          </el-form-item>
          <div class="company-info-title required">调研描述：</div>
          <el-form-item prop="content" label-width="1px">
            <el-input type="textarea" :rows="5" autofocus="true" placeholder="请尽可能说明具体内容问题，并对背景有所介绍，让专家能够快速理解您调查内容的重点"
                      v-model="demandForm.content">
            </el-input>
          </el-form-item>
          <div class="user-info">
            <el-form-item prop="intentionUserName" label="发布者名称：">
              <el-input type="text" v-model="demandForm.intentionUserName" auto-complete="off"
                        placeholder="请填写发布者的姓名"></el-input>
            </el-form-item>
            <el-form-item prop="intentionUserCompany" label="发布者公司：">
              <el-input type="text" v-model="demandForm.intentionUserCompany" auto-complete="off"
                        placeholder="请填写发布者公司信息，如公司名称等"></el-input>
            </el-form-item>
            <el-form-item prop="intentionUserJob" label="发布者职务：">
              <el-input type="text" v-model="demandForm.intentionUserJob" auto-complete="off"
                        placeholder="请填写发布者的职务信息"></el-input>
            </el-form-item>
            <el-form-item prop="intentionUserEmail" label="电子邮箱：">
              <el-input type="text" v-model="demandForm.intentionUserEmail" auto-complete="off"
                        placeholder="请填写发布者电子邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="intentionUserTel" label="联系方式：">
              <el-input type="text" v-model="demandForm.intentionUserTel" auto-complete="off"
                        placeholder="请务必填写联系方式，以便后续联系"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="demandSubmit" class="btn-demandSubmit" :disabled="formSubmitting">提交
              </el-button>
            </el-form-item>
          </div>
        </el-form>

        <!-- 发布说明弹窗 -->
        <el-dialog title="需求发布说明" v-model="explainDialogVisible" custom-class="yzk-dialog explain-dialog" size="small">
          <div class="explain-content">
            <p>- 发布者按照需求表单填写好需求咨询单后，云智库将有专人与您联系。</p>
            <p>- 云智库与发布者确认好需求后，将正式发布此需求并告知发布者。</p>
            <p>- 需求正式发布后，云智库上的认证专家可以报名参与此需求。</p>
            <p>- 发布者可通过云智库平台及时联系以及和报名专家进行沟通。</p>
            <p>- 在发布者未确定专家人选前，报名专家可以取消报名。</p>
            <p>- 发布者通过云智库与专家沟通后，确定合作专家及给予沟通评价，并在线下完成合作签约。</p>
            <p>- 任何其他疑问，可联系云智库客服电话：400-860-0550。</p>
          </div>
          <div class="dialog-btn-item">
            <el-button type="primary" class="btn-iknow" @click="explainDialogVisible = false">知道了</el-button>
          </div>
          </span>
        </el-dialog>

      </div>
    </div>

  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        loading: false
        , explainDialogVisible: false
        , expertInfo: {}
        // 判断是否提交中
        , formSubmitting: false
        // 发布需求表单校验规则
        , demandFormVerifyRule: {
          companyIntroduces: [
            {message: '请输入调研公司信息', trigger: 'blur', required: true}
          ],
          content: [
            {message: '请输入调研描述', trigger: 'blur', required: true}
          ],
          intentionUserName: [
            {message: '请输入发布者名称', trigger: 'blur', required: true}
          ],
          intentionUserJob: [
            {message: '请输入发布者职务', trigger: 'blur', required: true}
          ],
          intentionUserCompany: [
            {message: '请输入发布者公司', trigger: 'blur', required: true}
          ],
          intentionUserEmail: [
            {message: '请输入电子邮箱', trigger: 'blur', required: true}
          ],
          intentionUserTel: [
            {message: '请输入联系方式', trigger: 'blur', required: true}
          ]
        }
      }
    }
    , components: {},
    watch: {
      $route(to, from) {
        this.demandForm.objectId = to.query.expertId || null
      }
    },
    computed: {
      ...mapState({
        userIsLogin: state => state.User.isLogin
        , userInfo: state => state.User.userInfo
        , loginToUrl: state => state.User.loginToUrl
        , curPageUrl: state => state.Site.curPageUrl
      }),
      // 发布需求表单数据
      demandForm() {
        return {
          companyIntroduces: ''
          , content: ''
          , intentionUserName: this.userInfo.realName || ''
          , intentionUserJob: this.userInfo.job || ''
          , intentionUserCompany: this.userInfo.companyName || ''
          , intentionUserEmail: this.userInfo.email || ''
          , intentionUserTel: this.userInfo.userName || ''
          , objectId: this.$route.query.expertId || null
        }
      }
    }
    , methods: {
      demandSubmit() {
        if (!this.formSubmitting) {
          this.formSubmitting = true
          this.$refs.demandForm.validate((valid) => {

            if (valid) {
              let data = this.demandForm
              this.Api.researchBill(data).then((rep) => {
                let data = rep.data
                if (data.statusCode == 200) {
                  this.closeDemandDialog()
                  this.$alert('调研单发布成功', '提示', {
                    type: 'success',
                    confirmButtonText: '确定'
                  })
                  this.changeSubmitStatus()
                } else {
                  // 显示错误信息
                  this.$message({
                    message: data.desc,
                    type: 'error'
                  })
                  this.changeSubmitStatus()
                }
              })
            } else {
              this.formSubmitting = false
              return false
            }

          })

        }
      },
      closeDemandDialog() {
        this.explainDialogVisible = false
        this.$refs.demandForm.resetFields()
      },
      // 改变表单提交状态
      changeSubmitStatus(time) {
        setTimeout(() => {
          this.formSubmitting = false
        }, time || 3000)
      }
    }
    , created() {
      // 如果带有专家id,则获取专家简介信息
      if (this.demandForm.objectId) {
        // 获取专家信息
        this.Api.getExpertDetail(this.demandForm.objectId).then((rep) => {
          if (rep.data.statusCode == 200) {
            this.expertInfo = rep.data.rows
          } else {
            // 显示错误信息
            this.$message({
              message: rep.data.desc,
              type: 'error'
            })
          }
        })
      }
    }
  }

</script>
<style lang="scss" rel="style/scss">
  @import "../assets/css/common.scss";

  .release-research {
    border-top: 1px solid $border-color;
  }

  .rr-title {
    border-bottom: 1px solid $border-color;
    margin-top: 50px;
    h3 {
      color: $font-3e3e3e;
      font-size: 24px;
      font-weight: normal;
      display: inline-block;
      border-bottom: 3px solid #2788e8;
      margin-bottom: -1px;
      padding: 9px 0;
    }
    span {
      display: inline-block;
      cursor: pointer;
      float: right;
      padding-left: 25px;
      margin-top: 15px;
      background: url('../assets/img/icon-info.png') no-repeat left center;
    }
  }

  .demand-form {
    margin-bottom: 80px;
    .company-info-title {
      font-size: 20px;
      color: $font-3e3e3e;
      margin-top: 0px;
      padding: 20px 0;
    }
    .company-info-title.required:before {
      content: "*";
      padding-right: 10px;
      color: red;
      vertical-align: middle;
    }
    .user-info {
      width: 600px;
      margin: 0 auto;
      padding-top: 20px;
    }
    .el-form-item__label {
      font-size: 16px;
      color: $font-3e3e3e;
    }
    .btn-demandSubmit {
      width: 200px;
      margin: 20px 0 0 80px;
    }
    .el-form-item.is-required .el-form-item__label:before {
      // display: none;
    }
  }

  .explain-dialog {
    .explain-content {
      p {
        font-size: 14px;
        color: $font-3e3e3e;
        line-height: 200%;
      }
    }
  }

  .expert-baseinfo {
    .baseinfo {
      padding-left: 8px;
    }
    h3 {
      font-weight: normal;
      font-size: 24px;
      margin-bottom: 10px;
      color: $font-3e3e3e;
      .city {
        font-size: 14px;
        margin-left: 20px;
        padding-left: 20px;
        background: url('../assets/img/icon-location.png') no-repeat left center;
      }
    }
    p {
      margin: 5px 0;
      font-size: 14px;
      line-height: 180%;
      word-wrap: break-word;
    }
  }
</style>
