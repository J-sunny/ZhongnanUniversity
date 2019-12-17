<template>
  <div class="dynamicsBox">
    <!--     banner-->
    <div class="bannerBox">
      <img class="bannerPic" src="../../../../static/images/5.png" alt="">
    </div>
    <!--    行业动态-->
    <div class="dynamics">
      <div class="institutionalPersonnelCon">
        <div class="centreConTitle"><span>行业</span>动态</div>
      </div>
      <!--      内容-->
      <div class="tabsBox">
        <!--        左边-->
        <div class="tabsBoxLeft">
          <p @click="active('1')" :class="activeName=='1'?'fontColors':''">
            <router-link to="/dynamics/index">
              <span class="spot"><span v-if="activeName=='1'">●</span></span>&nbsp;行业资讯
            </router-link>
          </p>

          <p @click="active('2')" :class="activeName=='2'?'fontColors':''">
            <router-link to="/dynamics/centralNews">
              <span class="spot"><span v-if="activeName=='2'">●</span></span>&nbsp;中心新闻
            </router-link>
          </p>
          <p @click="active('3')" :class="activeName=='3'?'fontColors':''">
            <router-link to="/dynamics/caseTracking">
              <span class="spot"><span v-if="activeName=='3'">●</span></span>&nbsp;案例追踪
            </router-link>
          </p>
        </div>
        <!--        右边-->
        <div class="tabsBoxRight">
          <router-view></router-view>
          <!--          机构设置-->
          <!--          研究人员-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'industryDynamics',
    data () {
      return {
        activeName: '1'
      }
    },
    methods: {
      active (val) {
        // console.log(val)
        this.activeName = val
      }
    }
  }
</script>

<style scoped>

  /*中心概况*/
  .dynamicsBox {

  }

  .dynamicsBox .dynamics {
    width: 1200px;
    margin: 0 auto;
  }

  .dynamicsBox .institutionalPersonnelCon {
    width: 254px;
    height: 76px;
    background: #075A52;
    opacity: 1;
    text-align: center;
    line-height: 76px;
    font-size: 26px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 60px;
    color: #FFFFFF;
    opacity: 1;
    transform: translateY(-38px);
  }

  .dynamicsBox .institutionalPersonnelCon span {
    display: inline-block;
    border-bottom: 2px solid #FFFFFF;
    opacity: 1;
    height: 60px;
  }

  /*  内容*/
  .dynamics .tabsBox {
    overflow: hidden;
    margin-top: -38px;
  }

  /*左边*/
  .dynamics .tabsBox .tabsBoxLeft {
    float: left;
    width: 254px;
    height: 800px;
    background: #F9F9F9;
    opacity: 1;
  }

  .dynamics .tabsBox .tabsBoxLeft a {
    width: 230px;
    height: 56px;
    background: #FFFFFF;
    opacity: 1;
    float: right;
    margin-bottom: 1px;
    line-height: 56px;
    padding-left: 16px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #666666;
    opacity: 1;
    cursor: pointer;
    text-decoration: none;
  }

  .dynamics .tabsBox .tabsBoxLeft .spot {
    display: inline-block;
    width: 15px;
  }

  /*.dynamics .tabsBox .tabsBoxLeft .fontColor {*/
  /*  color: #075A52;*/
  /*}*/
  .fontColors {
    color: #075A52;
  }

  .fontColors a {
    color: #075A52 !important;

  }

  /*右边*/
  .dynamics .tabsBox .tabsBoxRight {
    float: left;
    font-family: Microsoft YaHei;
    font-weight: 400;
    width: 900px;
    margin-left: 46px;
  }

  /*  机构设置*/
  .dynamics .mechanismTitle {
    font-size: 28px;
    margin-top: 18px;
    color: #000000;
    opacity: 1;
    text-align: center;
  }

  .dynamics .tabsBoxRight .times {
    font-size: 14px;
    color: #666666;
    opacity: 1;
    margin-top: 12px;
    text-align: center;
  }

  /*  表格*/
  .dynamics .tables {
    width: 900px;
    border-collapse: collapse;
    margin-top: 48px;
  }

  .dynamics .tables td {
    border: 1px solid #E9E9E9;
    height: 40px;
    padding-left: 16px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .dynamics .tables .firstTr .firstTd {
    width: 140px;
    text-align: center;
  }

  .dynamics .tables tr td:nth-child(1) {
    width: 168px;
  }

  /*  研究人员*/
  .dynamics .personnel {
    overflow: hidden;
    margin-bottom: 100px;
  }

  .dynamics .personnel .personnelTitle {
    font-size: 16px;
    font-weight: bold;
    line-height: 60px;
    color: rgba(0, 0, 0, 1);
    opacity: 1;
  }

  /*人员信息*/
  .dynamics .personnel .personnelBox {
    overflow: hidden;
    float: left;
    width: 276px;
    height: 410px;
    background-color: #F7F7F7;
    margin-right: 24px;
    text-decoration: none;
    margin-bottom: 48px;

  }

  .dynamics .personnel .personnelInfoBox {
    padding-left: 16px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .dynamics .personnelBox .personnelPic {
    width: 276px;
    height: 188px;
  }

  .dynamics .personnelBox .personnelPic img {
    width: 276px;
    height: 188px;
    display: block;
  }

  .dynamics .personnel .personnelName {
    font-size: 20px;
    font-weight: bold;
    color: #222222;
    opacity: 1;
    margin-top: 20px;
  }

  .dynamics .personnel .position {
    font-size: 14px;
    font-weight: 400;
    color: #222222;
    opacity: 1;
    margin-top: 14px;
  }

  .dynamics .personnel .personnelInfo {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 22px;
    color: #999999;
    opacity: 1;
    margin-top: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
</style>
