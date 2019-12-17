<template>
  <div class="detailsInfo">
    <!--     研究人员详情-->
    <div class="contentTitle">
      <p class="detailsInfoTitle">{{$store.state.organization_user_name}}教授</p>
      <p class="times" v-if="false">
        <span class="el-icon-time"></span>&nbsp;
        <span>发布时间：2019-05-30</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>发布者：系统管理员</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>浏览次数&nbsp;23445</span>
      </p>
    </div>

    <div class="userInfo" v-html="userInfo"></div>
  </div>

</template>

<script>
  // 人员详情
  import {getUserInfoHtml} from "@/api/personnel";

  export default {
    name: 'PersonnelInfo',
    data() {
      return {
        userInfo:''
      }
    },
    methods: {
      //获取人员详情
      getUserInfoHtml() {
        console.log(this.$store.state.htmlUrl);
        console.log(this.$store.state.organization_user_name);
        getUserInfoHtml({htmlUrl: this.$store.state.htmlUrl}).then(data => {
          console.log(data);
          this.userInfo=data.data
        })
      },
      //进入页面回到顶部
      goTop() {
        if (document.body.scrollTop > 0) {
          console.log(1);
          window.scrollTo(0, -1);
          document.body.scrollTop = 0;
        }
        window.scrollTo(0, -1);
        document.body.scrollTop = 0;
      },
    },
    created() {
      this.getUserInfoHtml()
      this.goTop()
    }
  }
</script>

<style scoped>
  /*  头像部分*/
  .detailsInfo .presonInfo {
    overflow: hidden;
    position: relative;
    margin-top: 48px;
  }

  .detailsInfo .presonInfo .personPic {
    float: left;
    width: 128px;
    height: 192px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .detailsInfo .presonInfo .personPic img {
    display: block;
    width: 128px;
    height: 192px;
  }

  .detailsInfo .presonInfo .personnelProfile {
    padding-left: 152px;
  }

  .detailsInfo .presonInfo .personnelProfile p {
    font-size: 14px;
    line-height: 26px;
    color: #000000;
    opacity: 1;
  }

  /*  教育经历*/
  .detailsInfo .educationalExperience {
    font-size: 14px;
    line-height: 26px;
    color: #000000;
    margin-top: 32px;
  }

  .detailsInfo .experienceTitle {
    font-size: 14px;
    line-height: 26px;
    color: #000000;
    margin-top: 32px;
    font-weight: bold;
  }

  .detailsInfo .educationalExperience p {
  }

  /*  研究成果*/
  .detailsInfo .researchFindings {
    margin-bottom: 178px;
  }

  .detailsInfo .researchFindings .researchTables {
    border-collapse: collapse;
  }

  .detailsInfo .researchFindings .researchTables td {
    border: 1px solid #E9E9E9;
    height: 42px;
    line-height: 42px;
    font-size: 14px;
    color: #000000;
    text-align: center;
  }

  .detailsInfo .researchFindings .researchTables .tabsHead td {
    background-color: #E9E9E9;
  }

  .detailsInfo .researchFindings .researchTables td:nth-child(1) {
    width: 58px;
  }

  .detailsInfo .researchFindings .researchTables td:nth-child(2) {
    width: 78px;
  }

  .detailsInfo .researchFindings .researchTables td:nth-child(3) {
    width: 348px;
  }

  .detailsInfo .researchFindings .researchTables td:nth-child(4) {
    width: 108px;
  }

  .detailsInfo .researchFindings .researchTables td:nth-child(5) {
    width: 310px;
  }



  .userInfo{
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>
