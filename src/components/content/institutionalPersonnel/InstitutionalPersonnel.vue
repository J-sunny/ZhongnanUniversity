<template>
  <div class="institutionalPersonnelBox">
    <!--     banner-->
    <div class="bannerBox">
      <img class="bannerPic"     :src="'./static/images/'+picId+'.png'"
      alt="">
    </div>
    <!--    机构人员-->
    <div class="institutionalPersonnel">
      <div class="institutionalPersonnelCon">
        <div class="centreConTitle"><span>机构</span>人员</div>
      </div>
      <!--      内容-->
      <div class="tabsBox">
        <!--        左边-->
        <div class="tabsBoxLeft">
          <p @click="active('3')" :class="activeName=='3'?'fontColors':''">
            <router-link to="/personnel/index">
              <span class="spot"><span v-if="activeName=='3'">●</span></span>&nbsp;机构设置
            </router-link>
          </p>

          <p @click="active('4')" :class="activeName=='4'?'fontColors':''">
            <router-link to="/personnel/researcher">
              <span class="spot"><span v-if="activeName=='4'">●</span></span>&nbsp;研究人员
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
    name: 'institutionalPersonnelBox',
    data () {
      return {
        activeName: this.$route.query.newsTypeId,
        picId: this.$route.query.picId || this.$store.state.classificationId,

      }
    },
    watch: {
      $route(to) {
        if (this.activeName != to.query.newsTypeId) {
          this.activeName = to.query.newsTypeId
        }
      },
    },
    methods: {
      active (val) {
        console.log(val)
        this.activeName = val
      }
    }
  }
</script>
<style scoped>

  /*中心概况*/
  .institutionalPersonnelBox {

  }

  .institutionalPersonnelBox .institutionalPersonnel {
    width: 1200px;
    margin: 0 auto;
  }

  .institutionalPersonnelBox .institutionalPersonnelCon {
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

  .institutionalPersonnelBox .institutionalPersonnelCon span {
    display: inline-block;
    border-bottom: 2px solid #FFFFFF;
    opacity: 1;
    height: 60px;
  }

  /*  内容*/
  .institutionalPersonnel .tabsBox {
    overflow: hidden;
    margin-top: -38px;
  }

  /*左边*/
  .institutionalPersonnel .tabsBox .tabsBoxLeft {
    float: left;
    width: 254px;
    height: 800px;
    background: #F9F9F9;
    opacity: 1;
  }

  .institutionalPersonnel .tabsBox .tabsBoxLeft a {
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

  .institutionalPersonnel .tabsBox .tabsBoxLeft .spot {
    display: inline-block;
    width: 15px;
  }

  /*.institutionalPersonnel .tabsBox .tabsBoxLeft .fontColor {*/
  /*  color: #075A52;*/
  /*}*/
  .fontColors {
    color: #075A52;
  }

  .fontColors a {
    color: #075A52 !important;

  }

  /*右边*/
  .institutionalPersonnel .tabsBox .tabsBoxRight {
    float: left;
    font-family: Microsoft YaHei;
    font-weight: 400;
    width: 900px;
    margin-left: 46px;
  }

  /*  机构设置*/
  .institutionalPersonnel .mechanismTitle {
    font-size: 28px;
    margin-top: 18px;
    color: #000000;
    opacity: 1;
    text-align: center;
  }

  .institutionalPersonnel .tabsBoxRight .times {
    font-size: 14px;
    color: #666666;
    opacity: 1;
    margin-top: 12px;
    text-align: center;
  }

  /*  表格*/
  .institutionalPersonnel .tables {
    width: 900px;
    border-collapse: collapse;
    margin-top: 48px;
  }

  .institutionalPersonnel .tables td {
    border: 1px solid #E9E9E9;
    height: 40px;
    padding-left: 16px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .institutionalPersonnel .tables .firstTr .firstTd {
    width: 140px;
    text-align: center;
  }

  .institutionalPersonnel .tables tr td:nth-child(1) {
    width: 168px;
  }

  /*  研究人员*/
  .institutionalPersonnel .personnel {
    overflow: hidden;
    margin-bottom: 100px;
  }

  .institutionalPersonnel .personnel .personnelTitle {
    font-size: 16px;
    font-weight: bold;
    line-height: 60px;
    color: rgba(0, 0, 0, 1);
    opacity: 1;
  }

  /*人员信息*/
  .institutionalPersonnel .personnel .personnelBox {
    overflow: hidden;
    float: left;
    width: 276px;
    height: 410px;
    background-color: #F7F7F7;
    margin-right: 24px;
    text-decoration: none;
    margin-bottom: 48px;

  }

  .institutionalPersonnel .personnel .personnelInfoBox {
    padding-left: 16px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .institutionalPersonnel .personnelBox .personnelPic {
    width: 276px;
    height: 188px;
  }

  .institutionalPersonnel .personnelBox .personnelPic img {
    width: 276px;
    height: 188px;
    display: block;
  }

  .institutionalPersonnel .personnel .personnelName {
    font-size: 20px;
    font-weight: bold;
    color: #222222;
    opacity: 1;
    margin-top: 20px;
  }

  .institutionalPersonnel .personnel .position {
    font-size: 14px;
    font-weight: 400;
    color: #222222;
    opacity: 1;
    margin-top: 14px;
  }

  .institutionalPersonnel .personnel .personnelInfo {
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

