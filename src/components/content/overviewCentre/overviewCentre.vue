<template>
  <div class="overviewCentreBox">
    <!--     banner-->
    <div class="bannerBox">
      <img class="bannerPic" :src="'./static/images/'+picId+'.png'" alt="">
    </div>
    <!--    中心概况-->
    <div class="overviewCentre">
      <div class="overviewCentreCon">
        <div class="centreConTitle"><span>中心</span>概况</div>
      </div>
      <!--      内容-->
      <div class="tabsBox">
        <!--        左边-->
        <div class="tabsBoxLeft">
          <p @click="change('1')"
             :class="active=='1'?'fontColor':''">
            <span class="spot"><span v-if="active=='1'">●</span></span>&nbsp;主任致辞
          </p>
          <p @click="change('2')"
             :class="active=='2'?'fontColor':''">
            <span class="spot"><span v-if="active=='2'">●</span></span>&nbsp;中心简介
          </p>
        </div>
        <!--        右边-->
        <div class="tabsBoxRight" v-if="getNewsLists!=[]">
          <!--   主任致辞       -->
          <div class="zhuren" v-if="active==1">
            <p class="addressDirector">{{getNewsLists.newsTitle}}</p>
            <p class="times">
              <span class="el-icon-time"></span>&nbsp;
              <span>{{getNewsLists.createTime}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>浏览数&nbsp;{{getNewsLists.searchCount}}</span>
            </p>
            <div class="zhici">
              <div v-html="content"></div>
            </div>
          </div>
          <!--          中心简介-->
          <div class="jianjie" v-if="active==2">
            <p class="addressDirector">{{getNewsLists.newsTitle}}</p>
            <p class="times">
              <span class="el-icon-time"></span>&nbsp;
              <span>{{getNewsLists.createTime}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>浏览数&nbsp;{{getNewsLists.searchCount}}</span>
            </p>
            <div class="zhici">
              <div v-html="content"></div>
            </div>
          </div>
          <!--          分享到-->
          <div class="shareBox">
            <span class="share">分享到</span>
            <span @click="shareTo('sina')" class="imgFx"><img
              src="../../../../static/images/s.png" alt=""></span>
            <span class="imgFx" @click="shareTo('wechat')"><img src="../../../../static/images/w.png" alt=""></span>
          </div>
        </div>
      </div>
    </div>
    <!--    微信分享弹出框-->
    <div class="wShareBox" v-if="wShow">
      <span class="el-icon-close close" @click="closeW"></span>
      <p class="title" >分享到微信</p>
      <div>
        <img :src="maPic" alt="">
      </div>
      <p class="wText">打开微信，点击底部的“发现”</p>
      <p class="wText"> 使用“扫一扫”即可将网页分享至朋友圈。</p>
    </div>
  </div>
</template>


<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>


<script>
  import {parseTime} from '@/uitlis/index'

  import {getNewsType} from '@/api/socialServices'
  //获取文章详情
  import {getNews} from "@/api/socialServices";
  //获取文章列表
  import {getNewsList} from "@/api/index";

  export default {
    name: 'overviewCentre',
    data() {
      return {
        active: this.$route.query.newsTypeId,
        activeVal: '',
        newsTypeList: [],
        getNewsLists: [],
        picId: this.$route.query.picId || this.$store.state.classificationId,
        content: '',
        wShow: false

      }
    },
    created() {
      this.getNewsType()
      // console.log(this.$route);
      this.getNewsList()
      console.log(this.active);
    },
    watch: {
      $route(to) {
        console.log(5);
        if (this.active != to.query.newsTypeId) {
          this.active = to.query.newsTypeId
          this.getNewsList()
        }
      },
    },
    methods: {
      //  获取文章类型
      getNewsType() {
        getNewsType({classificationId: this.picId}).then(data => {
          // console.log(data)
          this.newsTypeList = data.data
          // this.active = data.data[0].classificationId
        })
      },
      //获取文章列表
      getNewsList() {
        getNewsList({newsTypeId: this.active,page: 1,
          pageSize: 10}).then(data => {
          this.getNewsLists = data.data.records[0]
          // console.log(data);
          this.getNews(data.data.records[0].newsTypeId, data.data.records[0].createTime, data.data.records[0].newsId)
        })
      },
      //获取文章详情
      getNews(newsTypeId, createTime, newsId) {
        let createTimes = createTime
        let newCreateTime=parseTime(new Date(createTimes).getTime())
        getNews({newsTypeId: newsTypeId, createTime: newCreateTime, newsId: newsId}).then(data => {
          this.content = data.data
          // console.log(data);
        })
      },
      //
      change(val) {
        console.log(val);
        window.location = '#/centre?newsTypeId=' + val
      },
      //分享
      shareTo(stype) {
        var ftit = '';
        var flink = '';
        var lk = '';

        //获取文章标题
        ftit = this.getNewsLists.newsTitle;
        //获取网页中内容的第一张图片地址作为分享图
        flink = document.images[2].src;
        if (typeof flink == 'undefined') {
          flink = '';
        }
        //qq空间接口的传参
        if (stype == 'qzone') {
          window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + document.location.href + '?sharesource=qzone&title=' + ftit + '&pics=' + lk + '&summary=' + document.querySelector('meta[name="description"]').getAttribute('content'));
        }
        //新浪微博接口的传参
        if (stype == 'sina') {
          var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + ftit + '&url=' + window.location.href + '&content=utf-8&sourceUrl=' + window.location.href + '&pic=' + flink;
          window.open(sharesinastring);
          // window.open('http://service.weibo.com/share/share.php?url=' + window.location + '?sharesource=weibo&title=' + ftit + '&pic=' + lk + '&appkey=2706825840');
          // window.open('http://v.t.sina.com.cn/share/share.php?title=' + ftit + '&url=http://148.70.55.201:8088/zuelNews/index.html#/personnel/index?newsTypeId=3'+ '&content=utf-8' + '&pic=' + lk)
        }
        //qq好友接口的传参
        if (stype == 'qq') {
          window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + document.location.href + '?sharesource=qzone&title=' + ftit + '&pics=' + lk + '&summary=' + document.querySelector('meta[name="description"]').getAttribute('content') + '&desc=php自学网，一个web开发交流的网站');
        }
        //生成二维码给微信扫描分享，php生成，也可以用jquery.qrcode.js插件实现二维码生成
        if (stype == 'wechat') {
          this.maPic = 'http://zixuephp.net/inc/qrcode_img.php?url=' + window.location.href
          this.wShow = true
        }
      },
      //  关闭微信弹框
      closeW() {
        this.wShow = false
      }

    },
  }
</script>


<style scoped>

  /*中心概况*/
  .overviewCentreBox {

  }

  .overviewCentreBox .overviewCentre {
    width: 1200px;
    margin: 0 auto;
  }

  .overviewCentreBox .overviewCentreCon {
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

  .overviewCentreBox .overviewCentreCon span {
    display: inline-block;
    border-bottom: 2px solid #FFFFFF;
    opacity: 1;
    height: 60px;
  }

  /*  内容*/
  .overviewCentre .tabsBox {
    overflow: hidden;
    margin-top: -38px;
  }

  /*左边*/
  .overviewCentre .tabsBox .tabsBoxLeft {
    float: left;
    width: 254px;
    height: 800px;
    background: #F9F9F9;
    opacity: 1;
  }

  .overviewCentre .tabsBox .tabsBoxLeft p {
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
  }

  .overviewCentre .tabsBox .tabsBoxLeft .spot {
    display: inline-block;
    width: 15px;
  }

  .overviewCentre .tabsBox .tabsBoxLeft .fontColor {
    color: #075A52;
  }

  .overviewCentre .tabsBox .tabsBoxRight {
    float: left;
    padding-left: 70px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .overviewCentre .tabsBox .tabsBoxRight .addressDirector {
    font-size: 28px;
    color: #000000;
    opacity: 1;
    text-align: center;
  }

  .tabsBoxRight .times {
    font-size: 14px;
    color: #666666;
    opacity: 1;
    margin-top: 12px;
  }

  .tabsBoxRight .zhici {
    width: 876px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .tabsBoxRight .zhici .zhiciText {
    margin-top: 56px;
    margin-bottom: 56px;
    width: 876px;
    font-size: 14px;
    line-height: 24px;
    color: #000000;
    opacity: 1;
    text-indent: 2em;
  }

  .tabsBoxRight .zhici .personPic,
  .tabsBoxRight .zhici .personPic img {
    width: 400px;
    height: 600px;
    display: block;
    margin: 0px auto 56px;
  }

  /*中心简介*/
  .tabsBoxRight .jianjiePic {
    margin-bottom: 56px;
  }

  .tabsBoxRight .jianjiePic img {
    display: block;
    width: 600px;
    height: 400px;
    margin: 40px auto 0;
  }

  /*邮箱*/
  .tabsBoxRight .mailBox {
    margin-bottom: 42px;
  }

  .tabsBoxRight .mailBox p {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 24px;
    color: rgba(0, 0, 0, 1);
    opacity: 1;
  }

  /*  分享到*/
  .overviewCentre .shareBox {
    height: 48px;
    margin-bottom: 148px;

  }

  .overviewCentre .shareBox .share {
    display: inline-block;
    line-height: 48px;
    float: left;
  }

  .overviewCentre .shareBox .imgFx {
    display: inline-block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    /*background-color: #004B44;*/
    float: left;
    margin-left: 16px;
  }

  .overviewCentre .shareBox .imgFx img {
    display: inline-block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    float: left;
  }
  /*  微信分享弹框*/
  .wShareBox{
    width: 300px;
    height: 350px;
    position: fixed;
    top: 50%;
    margin-top: -75px;
    left: 50%;
    margin-left: -100px;
    background-color: #f1f1f1;
    z-index: 10000;
  }
  .wShareBox .title{
    text-align: center;
    margin-top: 30px;
    font-size: 16px;
  }
  .wShareBox .close{
    float: right;
    font-size: 24px;
    cursor: pointer;
    margin-right: 10px;
    /*margin-top: 10px;*/
  }
  .wShareBox img{
    display: block;
    margin: 0 auto;
    width: 200px;
    height: 200px;
  }
  .wText{
    text-align: center;
  }
</style>
