<template>
  <div class="dynamicsBox">
    <!--     banner-->
    <div class="bannerBox">
      <img class="bannerPic" :src="'./static/images/'+picId+'.png'" alt="">
    </div>
    <!--    社会服务-->
    <div class="dynamics">
      <div class="institutionalPersonnelCon">
        <div class="centreConTitle">{{this.$store.state.classificationName}}
        <span class="lineWhit"></span>
        </div>
      </div>
      <!--      内容-->
      <div class="tabsBox">
        <!--        左边-->
        <div class="tabsBoxLeft">
          <p v-for="item in newsTypeList" :key="item.newsTypeId"
             @click="active(item.newsTypeId),getNewsList(item.newsTypeId)"
             :class="($store.state.newsTypeId||$route.query.listId)==item.newsTypeId?'fontColors':''">
            <router-link :to="{path:'/socialServices/index',query:{picId:picId,newsTypeId:$store.state.newsTypeId}}">
              <span class="spot"><span v-if="$store.state.newsTypeId==item.newsTypeId">●</span></span>&nbsp;{{item.newsType}}
            </router-link>
          </p>
          <!--                    <p @click="active('2')" :class="activeName=='2'?'fontColors':''">-->
          <!--                      <router-link to="/socialServices/index">-->
          <!--                        <span class="spot"><span v-if="activeName=='2'">●</span></span>&nbsp;专业答疑-->
          <!--                      </router-link>-->
          <!--                    </p>-->
          <!--                    <p @click="active('3')" :class="activeName=='3'?'fontColors':''">-->
          <!--                      <router-link to="/socialServices/index">-->
          <!--                        <span class="spot"><span v-if="activeName=='3'">●</span></span>&nbsp;项目合作-->
          <!--                      </router-link>-->
          <!--                    </p>-->
        </div>
        <!--        右边-->
        <div class="tabsBoxRight">
<!--          <div class="industry">-->
<!--            <router-link :to="{path:'/socialServices/detailsServices',query:{id:item.newsId,picId:item.newsTypeId}}" class="industryBox" v-for="item in newsList" :key="item.newsId">-->
<!--              &lt;!&ndash;      图片&ndash;&gt;-->
<!--              <div class="newsPic">-->
<!--                <img src="../../../../static/imgs/Tu(8).png" alt="">-->
<!--              </div>-->
<!--              &lt;!&ndash;      标题和时间&ndash;&gt;-->
<!--              <div class="newCon">-->
<!--                <p class="newsConTitle">{{item.newsTitle}}</p>-->
<!--                <p class="newsConTime">﻿{{item.createTime}}</p>-->
<!--              </div>-->
<!--            </router-link>-->
<!--          </div>-->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  // 获取文章类型
  import {getNewsType} from '@/api/socialServices'
  export default {
    name: 'socialServices',
    data() {
      return {
        // activeName: '',
        picId: this.$route.query.picId,
        newsTypeList: [],
        newsList: [],
      }
    },
    watch: {
      $route(to) {
        if(this.picId!=to.query.picId){
          this.picId = to.query.picId
          if (to.query.ids==0) {
            // this.$store.state.newsTypeId=this.$route.query.listID
            this.$store.addStore()
          }
        this.getNewsType()
        }
      },
    },
    created() {
      this.getNewsType()
    },
    methods: {
      active(val) {
        this.$store.state.newsTypeId = val
        this.$store.addStore()
      },
      //  获取文章类型
      getNewsType() {
        getNewsType({classificationId: this.picId}).then(data => {
          this.newsTypeList = data.data
          // this.activeName = this.activeName||data.data[0].newsTypeId
          this.$store.state.newsTypeId = this.$store.state.newsTypeId||data.data[0].newsTypeId
          this.$store.addStore()

          // console.log(this.activeName);
          this.getNewsList()
        })
      },
      //  获取文章列表
      getNewsList(newsTypeId) {
        var newsTypeIds = newsTypeId || this.$store.state.newsTypeId
        // console.log(newsTypeIds);
        this.$store.state.listID=newsTypeIds
        this.$store.addStore()
        if(this.$route.query.newsId){
        }else {
          window.location='#/socialServices/index?picId='+this.picId+'&ids=0&listID='+newsTypeIds
          this.$store.state.newsList=newsTypeIds
          this.$store.addStore()
        }
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
    position: relative;
  }

  .dynamicsBox .institutionalPersonnelCon .lineWhit {
    position: absolute;
    top: 60px;
    display: inline-block;
    width: 52px;
    height: 2px;
    background-color: #FFFFFF;
    left: 74px;
    /*border-bottom: 2px solid #FFFFFF;*/
    opacity: 1;
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



/*  右边....................................................*/

  .industry{
    margin-bottom: 178px;
  }
  .industryBox {
    overflow: hidden;
    padding: 21px 0 24px 0;
    border-bottom: 1px solid #E0E0E0;
    text-decoration: none;
    display: block;
  }

  /*图片*/
  .industryBox .newsPic,
  .industryBox .newsPic img {
    display: block;
    width: 146px;
    height: 100px;
    float: left;
  }

  /*  标题和时间*/
  .industryBox .newCon{
    float: left;
    margin-left: 24px;
  }
  .industryBox .newCon .newsConTitle{
    font-size:18px;
    font-weight:bold;
    color:#000000;
    margin-top: 19px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 728px;
  }
  .industryBox .newCon .newsConTime{
    font-size:16px;
    color:#666666;
    margin-top: 16px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 728px;

  }
</style>

