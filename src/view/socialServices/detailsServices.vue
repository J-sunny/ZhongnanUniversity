<template>
  <div class="detailsServicesBox">
    <div class="detailsServices">
      <p class="resultsTitle">﻿{{$store.state.newsTitle}}</p>
      <p class="resultsTime"><span class="el-icon-time"></span>{{$store.state.createTime}}&emsp;&emsp;浏览数
        {{$store.state.searchCount}}</p>
    </div>
    <!--    内容-->
    <div class="servicesConBox">
      <div class="UETxt" v-html="getNewsDetails"></div>
      <div v-if="false" class="servicesPic">
        <img src="../../../static/imgs/112.png" alt="">
      </div>

      <!--          分享到-->
      <div class="shareBox">
        <span class="share">分享到</span>
        <span class="imgFx" @click="shareTo('sina')"><img src="../../../static/images/s.png" alt=""></span>
        <span class="imgFx" @click="shareTo('wechat')"><img src="../../../static/images/w.png" alt=""></span>
      </div>
      <!--      上一篇，下一篇-->
      <div class="nextBox" v-if="false">
        <p class="next"><span>上一篇：</span><span>2019年“智慧建造与运维国家地方联合工程研究中心”揭牌</span></p>
        <p class="next"><span>下一篇：</span><span>2019年“智慧建造与运维国家地方联合工程研究中心”揭牌</span></p>
      </div>
    </div>


    <!--    微信分享弹出框-->
    <div class="wShareBox" v-if="wShow">
      <span class="el-icon-close close" @click="closeW"></span>
      <p class="title">分享到微信</p>
      <div>
        <img :src="maPic" alt="">
      </div>
      <p class="wText">打开微信，点击底部的“发现”</p>
      <p class="wText"> 使用“扫一扫”即可将网页分享至朋友圈。</p>
    </div>
  </div>
</template>

<script>

  // 获取文章详情
  import {getNews} from '@/api/socialServices'
  import {parseTime} from '@/uitlis/index'

  export default {
    name: 'detailsServices',
    data() {
      return {
        newsId: this.$route.query.newsId,
        newsTypeId: this.$route.query.newsTypeId,
        getNewsDetails: [],
        scrollTop: 0,
        maPic: '',
        wShow: false
      }
    },
    methods: {
      //  获取文章详情
      getNews() {
        let createTime = this.$store.state.createTime
        let newCreateTime = parseTime(new Date(createTime).getTime())
        getNews({
          createTime: newCreateTime,
          newsId: this.newsId,
          newsTypeId: this.newsTypeId
        }).then(data => {
          this.getNewsDetails = data.data
          // console.log(data);
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
      //  分享
      shareTo(stype) {
        var ftit = '';
        var flink = '';
        var lk = '';

        //获取文章标题
        ftit = this.$store.state.newsTitle;
        //获取网页中内容的第一张图片地址作为分享图
        flink = document.images[2].src;
        if (typeof flink == 'undefined') {
          flink = '';
        }
        //当内容中没有图片时，设置分享图片为网站logo
        // if (flink == '') {
        //   lk = '/static/images/LOGO.png';
        // }
        // //如果是上传的图片则进行绝对路径拼接
        // if (flink.indexOf('/uploads/') != -1) {
        //   lk = 'http://' + window.location.host + flink;
        // }
        // //百度编辑器自带图片获取
        // if (flink.indexOf('ueditor') != -1) {
        //   lk = flink;
        // }
        console.log(flink)
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
          console.log(this.maPic);
          // window.open();
          this.wShow = true
        }
      },
      //  关闭微信弹框
      closeW() {
        this.wShow = false
      }

    },
    created() {
      this.getNews()
      this.goTop()
      console.log(window.location.href);

    }
  }
</script>

<style scoped>
  .detailsServicesBox {
  }

  .detailsServicesBox .detailsServices {
    margin-top: 18px;
  }

  .detailsServicesBox .detailsServices .resultsTitle {
    width: 900px;
    font-size: 28px;
    color: #000000;
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    text-align: center;
  }

  .detailsServicesBox .detailsServices .resultsTime {
    width: 900px;
    font-size: 14px;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 12px;
  }

  /*/内容*/
  .detailsServicesBox .servicesConBox {
    margin-top: 56px;
  }

  .detailsServicesBox .servicesConBox .servicesCon {
  }

  .detailsServicesBox .servicesConBox .servicesPic,
  .detailsServicesBox .servicesConBox .servicesPic img {
    width: 600px;
    height: 400px;
    display: block;
    margin: 48px auto;
  }

  /*  分享到*/
  /*  分享到*/
  .detailsServicesBox .shareBox {
    height: 48px;
    margin-top: 48px;

  }

  .detailsServicesBox .shareBox .share {
    display: inline-block;
    line-height: 48px;
    float: left;
    margin-bottom: 40px;
  }

  .detailsServicesBox .shareBox .imgFx {
    display: inline-block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    /*background-color: #004B44;*/
    float: left;
    margin-left: 16px;
    cursor: pointer;
  }

  .detailsServicesBox .shareBox .imgFx img {
    display: inline-block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    float: left;
  }

  /*  上一篇下一篇*/
  .detailsServicesBox .nextBox {
    margin-top: 72px;
    margin-bottom: 138px;
    overflow: hidden;
  }

  .detailsServicesBox .nextBox .next {
    width: 507px;
    height: 42px;
    background: #075A52;
    line-height: 42px;
    padding: 0 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    float: right;
    margin-bottom: 12px;

  }

  /*  微信分享弹框*/
  .wShareBox {
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

  .wShareBox .title {
    text-align: center;
    margin-top: 30px;
    font-size: 16px;
  }

  .wShareBox .close {
    float: right;
    font-size: 24px;
    cursor: pointer;
    margin-right: 10px;
    /*margin-top: 10px;*/
  }

  .wShareBox img {
    display: block;
    margin: 0 auto;
    width: 200px;
    height: 200px;
  }

  .wText {
    text-align: center;
  }

  .UETxt img {
    width: 100% !important;
  }
</style>
