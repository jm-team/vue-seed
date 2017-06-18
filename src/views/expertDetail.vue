<template>
  <div class="expert-detail">
    <div class="expert-topbar">
      <div class="layout-wrap">
        <div class="expert-headpic">
          <img v-if="expertInfo.imgUrl" :src="expertInfo.imgUrl | imgCdn">
          <img v-else src="../assets/img/head.png">
        </div>
        <h3><span :title="expertInfo.expertName">{{ expertInfo.expertName | subStr(6) }}</span><span class="city"
                                                                                                     v-if="expertInfo.city"
                                                                                                     :title="expertInfo.city">{{ expertInfo.city | subStr(10)
          }}</span></h3>
        <p><span v-if="expertInfo.positionName" :title="expertInfo.positionName">{{ expertInfo.positionName | subStr(10)
          }}</span><span v-if="expertInfo.positionName && expertInfo.companyName"> | </span><span
          v-if="expertInfo.companyName" :title="expertInfo.companyName">{{ expertInfo.companyName | subStr(15) }}</span>
          <span v-if="expertInfo.yearsOfWorking"> {{ expertInfo.yearsOfWorking }}年</span></p>
        <p>{{ expertInfo.expertIntroduces | subStr(115) }}</p>
        <span :class=" { 'btn-expert-fav': true, 'expert-faved': expertInfo.isFavorite && expertInfo.isFavorite!=-1 } "
              @click="expertFavo(expertInfo.isFavorite)">{{ expertInfo.isFavorite && expertInfo.isFavorite != -1 ? '取消收藏' : '收藏专家'
          }}</span>
      </div>
    </div>

    <div class="expert-intro">
      <div class="layout-wrap">
        <h3>专家介绍</h3>
        <p class="intro">{{ expertInfo.expertIntroduces }}</p>
      </div>
      <div class="expert-btnitem">
        <a href="javascript:;"
           @click="openDialog('contact')">我要咨询专家</a>
        <router-link :to="'/releaseResearch?expertId=' + expertInfo.id ">申请专家调研企业</router-link>
        <a href="javascript:;"
           @click="openDialog('interview')">我要采访专家</a>
      </div>
    </div>

    <div class="expert-intro-detail">
      <div class="layout-wrap">
        <h3><span>专家详情</span><cite>Expert Details</cite></h3>
        <div class="detail">
          <p>{{ expertAttribute }}</p>
        </div>
      </div>
    </div>

    <div class="middle-pic"
         v-if="researchList.length > 0"></div>

    <div class="expert-research"
         v-if="researchList.length > 0">
      <div class="layout-wrap">
        <h3><span>企业研报</span><cite>Enterprise Research Report</cite></h3>
        <div class="research-list">
          <div class="research-item"
               v-for="item in researchList">
            <router-link :to="'/companyResearch/' + item.id "
                         class="title">{{ item.title }}<span v-if="item.statusTime">{{ item.statusTime.substr(0, 10)
              }}</span></router-link>
            <!-- <span class="company-logo"><img :src=" item.companyLogoUrl | imgCdn "></span> -->
            <span class="company-logo">
              <img v-if="item.companyLogoUrl" v-lazyload="item.companyLogoUrl | $filter.imgCdn">
              <img v-else src="../assets/img/company.png">
            </span>
            <p>{{ item.content | subStr(235)}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系单弹窗 -->
    <el-dialog title="发布联系单"
               v-model="contactDialogVisible"
               custom-class="yzk-dialog contact-dialog"
               @close="closeFormDialog('contact')"
               size="small">
      <el-form :model="contactForm"
               :rules="contactFormVerifyRule"
               ref="contactForm"
               label-width="120px">
        <el-form-item prop="expertInfo"
                      label="专家信息：">
          <div class="form-expert-info">
            <h3><span :title="expertInfo.expertName">{{ expertInfo.expertName | subStr(6) }}</span><span class="city"
                                                                                                         v-if="expertInfo.city"
                                                                                                         :title="expertInfo.city">{{ expertInfo.city | subStr(10)
              }}</span></h3>
            <p><span :title="expertInfo.positionName">{{ expertInfo.positionName | subStr(10) }}</span><span
              v-if="expertInfo.positionName && expertInfo.companyName"> | </span><span v-if="expertInfo.companyName"
                                                                                       :title="expertInfo.companyName">{{ expertInfo.companyName | subStr(15)
              }}</span> <span v-if="expertInfo.yearsOfWorking"> {{ expertInfo.yearsOfWorking }}年</span></p>
            <p>{{ expertInfo.expertIntroduces | subStr(110) }}</p>
          </div>
        </el-form-item>
        <el-form-item prop="content"
                      label="联系内容：">
          <el-input type="textarea"
                    :rows="3"
                    autofocus="true"
                    placeholder="请尽可能说明具体内容问题，并对问题的背景有所介绍，让专家能够快速理解您的问题"
                    v-model="contactForm.content">
          </el-input>
        </el-form-item>
        <div class="contact-info">
          <div class="contact-info-title">
            <h3>联系人信息</h3>
          </div>
          <ul class="form-col">
            <li>
              <el-form-item prop="intentionUserName"
                            label="联系人：">
                <el-input type="text"
                          v-model="contactForm.intentionUserName"
                          auto-complete="off"
                          placeholder="请填写发布者的姓名"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserTel"
                            label="联系电话：">
                <el-input type="text"
                          v-model="contactForm.intentionUserTel"
                          auto-complete="off"
                          placeholder="请务必填写联系电话，以便后续联系"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserCompany"
                            label="联系人公司：">
                <el-input type="text"
                          v-model="contactForm.intentionUserCompany"
                          auto-complete="off"
                          placeholder="请填写发布者公司信息，如公司名称等"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserJob"
                            label="联系人职务：">
                <el-input type="text"
                          v-model="contactForm.intentionUserJob"
                          auto-complete="off"
                          placeholder="请填写发布者的职务信息"></el-input>
              </el-form-item>
            </li>
          </ul>
          <el-form-item prop="intentionUserEmail"
                        label="电子邮箱：">
            <el-input type="text"
                      v-model="contactForm.intentionUserEmail"
                      auto-complete="off"
                      placeholder="请填写发布者电子邮箱"></el-input>
          </el-form-item>
          <div class="dialog-btn-item">
            <el-button @click="closeFormDialog('contact')"
                       class="btn-cancel">取消
            </el-button>
            <el-button type="primary"
                       class="btn-contactSubmit"
                       :disabled="contactFormSubmitting"
                       @click="contactSubmit">提交
            </el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>

    <!-- 采访单弹窗 -->
    <el-dialog title="发布采访单"
               v-model="interviewDialogVisible"
               custom-class="yzk-dialog interview-dialog"
               @close="closeFormDialog('interview')"
               size="small">
      <el-form :model="interviewForm"
               :rules="interviewFormVerifyRule"
               ref="interviewForm"
               label-width="120px">
        <el-form-item prop="expertInfo"
                      label="专家信息：">
          <div class="form-expert-info">
            <h3><span :title="expertInfo.expertName">{{ expertInfo.expertName | subStr(6) }}</span><span class="city"
                                                                                                         v-if="expertInfo.city"
                                                                                                         :title="expertInfo.city">{{ expertInfo.city | subStr(10)
              }}</span></h3>
            <p><span :title="expertInfo.positionName">{{ expertInfo.positionName | subStr(10) }}</span><span
              v-if="expertInfo.positionName && expertInfo.companyName"> | </span><span v-if="expertInfo.companyName"
                                                                                       :title="expertInfo.companyName">{{ expertInfo.companyName | subStr(15)
              }}</span> <span v-if="expertInfo.yearsOfWorking"> {{ expertInfo.yearsOfWorking }}年</span></p>
            <p>{{ expertInfo.expertIntroduces | subStr(110) }}</p>
          </div>
        </el-form-item>
        <el-form-item prop="requirementContent"
                      label="采访内容：">
          <el-input type="textarea"
                    :rows="3"
                    autofocus="true"
                    placeholder="请尽可能说明采访内容，并对相关背景有所介绍，以便专家能够快速响应您的采访要求"
                    v-model="interviewForm.requirementContent">
          </el-input>
        </el-form-item>
        <div class="contact-info">
          <div class="contact-info-title">
            <h3>发布者信息</h3>
          </div>
          <ul class="form-col">
            <li>
              <el-form-item prop="intentionUserName"
                            label="发布者：">
                <el-input type="text"
                          v-model="interviewForm.intentionUserName"
                          auto-complete="off"
                          placeholder="请填写发布者的姓名"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserTel"
                            label="联系电话：">
                <el-input type="text"
                          v-model="interviewForm.intentionUserTel"
                          auto-complete="off"
                          placeholder="请务必填写联系电话，以便后续联系"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserCompany"
                            label="发布者公司：">
                <el-input type="text"
                          v-model="interviewForm.intentionUserCompany"
                          auto-complete="off"
                          placeholder="请填写发布者公司信息，如公司名称等"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="intentionUserPosition"
                            label="发布者职务：">
                <el-input type="text"
                          v-model="interviewForm.intentionUserPosition"
                          auto-complete="off"
                          placeholder="请填写发布者的职务信息"></el-input>
              </el-form-item>
            </li>
          </ul>
          <el-form-item prop="intentionUserEmail"
                        label="电子邮箱：">
            <el-input type="text"
                      v-model="interviewForm.intentionUserEmail"
                      auto-complete="off"
                      placeholder="请填写发布者电子邮箱"></el-input>
          </el-form-item>
          <div class="dialog-btn-item">
            <el-button @click="closeFormDialog('interview')"
                       class="btn-cancel">取消
            </el-button>
            <el-button type="primary"
                       class="btn-contactSubmit"
                       :disabled="interviewFormSubmitting"
                       @click="interviewSubmit">提交
            </el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        loading: false,
        contactDialogVisible: false,
        interviewDialogVisible: false,
        expertId: this.$route.params.id || '',
        expertInfo: {},
        expertAttribute: '',
        researchList: [],
        contactFormSubmitting: false,
        interviewFormSubmitting: false,
      // 发布联系单数据
      // , contactForm: {
      //   content: ''
      //   , intentionUserName: ''
      //   , intentionUserCompany: ''
      //   , intentionUserJob: ''
      //   , intentionUserEmail: ''
      //   , intentionUserTel: ''
      //   , objectId: this.$route.params.id || ''
      // }
      // 发布联系单校验规则
        contactFormVerifyRule: {
          content: [
            { message: '请输入联系内容', trigger: 'blur', required: true },
          ],
          intentionUserName: [
            { message: '请输入联系人姓名', trigger: 'blur', required: true },
          ],
          intentionUserJob: [
            { message: '请输入联系人职务', trigger: 'blur', required: true },
          ],
          intentionUserCompany: [
            { message: '请输入联系人公司', trigger: 'blur', required: true },
          ],
          intentionUserEmail: [
            { message: '请输入电子邮箱', trigger: 'blur', required: true },
          ],
          intentionUserTel: [
            { message: '请输入联系电话', trigger: 'blur', required: true },
          ],
        },

      // 发布采访数据
      // , interviewForm: {
      //   requirementContent: ''
      //   , intentionUserName: ''
      //   , intentionUserCompany: ''
      //   , intentionUserPosition: ''
      //   , intentionUserEmail: ''
      //   , intentionUserTel: ''
      //   , expertNo: this.$route.params.id || null
      // }
      // 发布采访校验规则
        interviewFormVerifyRule: {
          requirementContent: [
            { message: '请输入采访内容', trigger: 'blur', required: true },
          ],
          intentionUserName: [
            { message: '请输入发布者姓名', trigger: 'blur', required: true },
          ],
          intentionUserPosition: [
            { message: '请输入发布者职务', trigger: 'blur', required: true },
          ],
          intentionUserCompany: [
            { message: '请输入发布者公司', trigger: 'blur', required: true },
          ],
          intentionUserEmail: [
            { message: '请输入电子邮箱', trigger: 'blur', required: true },
          ],
          intentionUserTel: [
            { message: '请输入联系电话', trigger: 'blur', required: true },
          ],
        },
      };
    },
    created() {
      this.getExpertInfo();
      // 获取专家技能
      this.Api.getExpertAttribute(this.expertId).then((rep) => {
        if (rep.data.statusCode === 200) {
          this.expertAttribute = rep.data.desc;
        }
      });
      // 获取研报信息
      this.Api.getExpertResearch(this.expertId).then((rep) => {
        if (rep.data.statusCode === 200) {
          this.researchList = rep.data.rows;
        }
      });
    },
    watch: {
      userIsLogin() {
        this.getExpertInfo();
      },
    },
    methods: {
      openDialog(formName) {
        if (!this.userIsLogin) {
          this.$root.$emit('showLoginDialog');
          return;
        }
        this[`${formName}DialogVisible`] = true;
      },
      interviewSubmit() {
        if (!this.interviewFormSubmitting) {
          this.interviewFormSubmitting = true;
          this.$refs.interviewForm.validate((valid) => {
            if (valid) {
              const formData = this.interviewForm;
              this.Api.interviewBill(formData).then((rep) => {
                const data = rep.data;
                if (data.statusCode === 200) {
                  this.closeFormDialog('interview');
                  this.$alert('联系单发送成功', '提示', {
                    type: 'success',
                    confirmButtonText: '确定',
                  });
                  this.changeSubmitStatus('interviewForm');
                } else {
                  // 显示错误信息
                  this.$message({
                    message: data.desc || '提交采访单出错',
                    type: 'error',
                  });
                  this.changeSubmitStatus('interviewForm');
                }
              });
            } else {
              this.interviewFormSubmitting = false;
            }
          });
        }
      },
      // 提交联系单
      contactSubmit() {
        if (!this.contactFormSubmitting) {
          this.contactFormSubmitting = true;
          this.$refs.contactForm.validate((valid) => {
            if (valid) {
              const formData = this.contactForm;
              this.Api.contactBill(formData).then((rep) => {
                const data = rep.data;
                if (data.statusCode === 200) {
                  this.closeFormDialog('contact');
                  this.$alert('联系单发送成功', '提示', {
                    type: 'success',
                    confirmButtonText: '确定',
                  });
                  this.changeSubmitStatus('contactForm');
                } else {
                  // 显示错误信息
                  this.$message({
                    message: data.desc || '提交联系单出错',
                    type: 'error',
                  });
                  this.changeSubmitStatus('contactForm');
                }
              });
            } else {
              this.contactFormSubmitting = false;
            }
          });
        }
      },
      // 改变表单提交状态
      changeSubmitStatus(formName, time) {
        setTimeout(() => {
          this[`${formName}Submitting`] = false;
        }, time || 3000);
      },
      // 关闭表单弹窗
      closeFormDialog(formName) {
        this[`${formName}DialogVisible`] = false;
        this.$refs[`${formName}Form`].resetFields();
      },
      getExpertInfo() {
        // 获取专家信息
        this.Api.getExpertDetail(this.expertId).then((rep) => {
          if (rep.data.statusCode === 200) {
            this.expertInfo = rep.data.rows;
          }
        });
      },
      // 专家收藏
      expertFavo(isFavo) {
        // 判断是否登录
        if (this.userIsLogin) {
          if (isFavo === 0) {
            // 如果没收藏，则添加收藏
            this.Api.expertFavo(this.expertId, 1).then((rep) => {
              if (rep.data.statusCode === 200) {
                this.$set(this.expertInfo, 'isFavorite', 1);
              }
            });
          } else {
            // 如果已收藏，则取消收藏
            this.Api.expertFavo(this.expertId, 0).then((rep) => {
              if (rep.data.statusCode === 200) {
                this.$set(this.expertInfo, 'isFavorite', 0);
              }
            });
          }
        } else {
          // this.$message({
          //   message: '请先登录！',
          //   type: 'warning'
          // })
          this.$root.$emit('showLoginDialog');
        }
      },
    },
    computed: {
      ...mapState({
        userIsLogin: state => state.User.isLogin,
        userInfo: state => state.User.userInfo,
      }),
      // 发布采访单数据
      interviewForm() {
        return {
          requirementContent: '',
          intentionUserName: this.userInfo.realName || '',
          intentionUserPosition: this.userInfo.job || '',
          intentionUserCompany: this.userInfo.companyName || '',
          intentionUserEmail: this.userInfo.email || '',
          intentionUserTel: this.userInfo.userName || '',
          expertNo: this.$route.params.id || null,
        };
      },
      // 发布联系表单数据
      contactForm() {
        return {
          content: '',
          intentionUserName: this.userInfo.realName || '',
          intentionUserJob: this.userInfo.job || '',
          intentionUserCompany: this.userInfo.companyName || '',
          intentionUserEmail: this.userInfo.email || '',
          intentionUserTel: this.userInfo.userName || '',
          objectId: this.$route.params.id || null,
        };
      },
    },
  };

</script>
<style lang="scss" rel="style/scss">
  @import '../assets/css/common.scss';

  .form-expert-info {
    h3 {
      font-weight: normal;
      font-size: 24px;
      margin-bottom: 0px;
      .city {
        font-size: 14px;
        margin-left: 20px;
        padding-left: 20px;
        background: url('../assets/img/icon-location.png') no-repeat left center;
      }
    }
    p {
      margin: 0px 0;
      font-size: 14px;
      line-height: 180%;
      word-wrap: break-word;
    }
  }

  .contact-dialog {
    // width: 800px;
  }

  .contact-info {
    .contact-info-title {
      border-bottom: 1px solid $border-color;
      margin-top: 30px;
      h3 {
        color: $font-3e3e3e;
        font-size: 16px;
        font-weight: normal;
        display: inline-block;
        border-bottom: 3px solid #2788e8;
        margin-bottom: -1px;
        padding: 5px 0;
      }
    }
    .form-col {
      margin-top: 20px;
      overflow: hidden;
      li {
        float: left;
        width: 50%; // padding-right: 25px;
      }
      // li:last-child {
      //   padding-right: 0;
      //   padding-left: 25px;
      // }
    }
    .dialog-btn-item {
      padding-top: 20px;
      .btn-cancel {
        width: 100px;
      }
    }
  }

  .expert-topbar {
    background: url('../assets/img/bg-expertdetail.jpg') no-repeat center top;
    height: 240px;
    color: #fff;
    .layout-wrap {
      padding: 70px 160px 20px 200px;
    }
    h3 {
      font-weight: normal;
      font-size: 24px;
      margin-bottom: 20px;
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
    .expert-headpic {
      position: absolute;
      left: 0;
      top: 40px;
      border-radius: 50%;
      width: 160px;
      height: 160px;
      overflow: hidden;
      img {
        width: auto;
        height: 160px;
      }
    }
    .btn-expert-fav {
      position: absolute;
      right: 0;
      top: 100px;
      width: 120px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      color: $font-6e6e6e;
      background: #fff;
      border-radius: 3px;
      cursor: pointer;
    }
    .btn-expert-fav:before {
      content: '';
      display: inline-block;
      width: 15px;
      height: 15px;
      margin: 0 10px 2px 0;
      vertical-align: middle;
      background: url('../assets/img/icon-fav2.png') no-repeat center center;
    }
    .expert-faved:before {
      background: url('../assets/img/icon-fav3.png') no-repeat center center;
    }
  }

  .expert-intro {
    // height:385px;
    padding: 90px 0;
    .layout-wrap {
      padding: 0 80px;
    }
    .layout-wrap:before,
    .layout-wrap:after {
      position: absolute;
      display: inline-block;
      content: '';
      width: 25px;
      height: 25px;
    }
    .layout-wrap:before {
      top: 0;
      left: 0;
      background: url('../assets/img/icon-qm-left.png') no-repeat center center;
    }
    .layout-wrap:after {
      bottom: 0;
      right: 0;
      background: url('../assets/img/icon-qm-right.png') no-repeat center center;
    }
    h3 {
      font-size: 18px;
      font-weight: normal;
      margin-bottom: 20px;
      color: $font-3e3e3e;
      text-align: center;
    }
    .intro {
      line-height: 180%;
      font-size: 14px;
      padding-bottom: 35px;
      word-wrap: break-word;
    }
    .expert-btnitem {
      text-align: center;
      a {
        font-size: 14px;
        border-radius: 3px;
        margin: 0 8px;
        padding: 0px 25px;
        border: 1px solid $color-2788e8;
        color: $color-2788e8;
        display: inline-block;
        line-height: 30px;
        background: #fff;
      }
      a:hover {
        background: $color-2788e8;
        color: #fff;
      }
    }
  }

  .expert-intro-detail {
    min-height: 550px;
    background: url('../assets/img/bg-expertinfo.jpg') repeat-y center top;
    .layout-wrap {
      padding: 90px 0;
    }
    h3 {
      text-align: center;
      font-weight: normal;
      font-size: 26px;
      color: $font-3e3e3e;
      span:before,
      span:after {
        display: inline-block;
        content: '';
        vertical-align: middle;
        width: 78px;
        height: 2px;
        background: #6e6e6e;
        margin: 0 9px;
      }
      cite {
        display: block;
        font-style: normal;
        margin: 6px 0 35px;
        font-size: 15px;
      }
    }
    .detail {
      background: #fff;
      padding: 60px;
      min-height: 260px;
      p {
        text-indent: 28px;
        line-height: 180%;
      }
    }
  }

  .middle-pic {
    height: 336px;
    background: url('../assets/img/bg-expertdetail-middle.jpg') no-repeat center top;
  }

  .expert-research {
    padding-top: 90px;
    h3 {
      text-align: center;
      font-weight: normal;
      font-size: 26px;
      color: $font-3e3e3e;
      span:before,
      span:after {
        display: inline-block;
        content: '';
        vertical-align: middle;
        width: 78px;
        height: 2px;
        background: #6e6e6e;
        margin: 0 9px;
      }
      cite {
        display: block;
        font-style: normal;
        margin: 6px 0 35px;
        font-size: 15px;
      }
    }
    .research-list {
      position: relative;
      min-height: 170px;
      border-bottom: 1px solid $border-color;
      margin: 30px 0 90px;
      .research-item {
        position: relative;
        border-top: 1px solid $border-color;
        padding: 30px 0 25px 140px;
        min-height: 170px;
        .company-logo {
          position: absolute;
          left: 0;
          top: 25px;
          width: 120px;
          height: 120px;
          border: 1px solid $border-color;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 118px;
            height: auto;
            vertical-align: middle;
          }
        }
        .company-logo:before {
          display: inline-block;
          content: '';
          height: 120px;
          vertical-align: middle;
        }
        .title {
          position: relative;
          display: inline-block;
          width: 100%;
          font-size: 18px;
          font-weight: normal;
          padding-right: 100px;
          span {
            position: absolute;
            right: 0;
            top: 3px;
            font-size: 14px;
          }
        }
        .title:hover {
          color: #f30;
          span {
            color: $font-6e6e6e;
          }
        }
        p {
          word-wrap: break-word;
          line-height: 180%;
          font-size: 14px;
          margin-top: 18px;
        }
      }
    }
  }
</style>
