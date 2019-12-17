<template>
  <div class="Box"> <!--    底部-->
    <div class="footer">
      <div class="footerBox">
        <div class="footerCon">
          <div class="smallFooter">
            <!--      底部左边-->
            <div class="footerLeft">
              <div class="footerLeftBox">
                <p>地址：湖北省武汉市东湖新技术开发区南湖大道182号</p>
                <p>邮编：430073</p>
                <p>电话：027-88386114</p>
                <p>鄂ICP备05003344号</p>
                <p>鄂公网安备42018502002264号</p>
              </div>
              <!--          分享    -->
              <div class="shareBox">
                <div class="imgBox">
                  <img src="../../../../static/images/1s.png" alt="">
                </div>
                <div class="imgBox">
                  <img src="../../../../static/images/2w.png" alt="">
                </div>
                <div class="imgBox">
                  <img src="../../../../static/images/3t.png" alt="">
                </div>
                <div class="imgBox">
                  <img src="../../../../static/images/4r.png" alt="">
                </div>
                <div class="imgBox">
                  <img src="../../../../static/images/5Q.png" alt="">
                </div>
                <div class="imgBox">
                  <img src="../../../../static/images/6p.png" alt="">
                </div>
              </div>
            </div>
            <!--      底部右边-->
            <div class="footerright">
              <div class="friendshipLinks">
                <p class="linkTitle">友情链接</p>
                <a href="">﻿图书馆</a>
                <a href="">博物馆</a>
                <a href="">校友总会</a>
                <a href="">教育技术网</a>
                <a href="">网络校报</a>
                <a href="">校园微博</a>
                <a href="">学生资助</a>
                <a href="">心理咨询</a>
                <a href="">教师主页</a>
                <a href="">信息公开</a>
                <a href="">招标信息</a>
                <a href="">人才招聘</a>
                <a href="">﻿图书馆</a>
                <a href="">校友总会</a>
                <a href="">教育技术网</a>
                <a href="">教育技术网</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  Copyright  -->
    <div class="copyright">
      Copyright©中南财经政法大学(ZUEL) All Rights Reserved.
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped>

  /*  底部*/
  .Box .footer {
    width: 100%;
    height: 275px;
    background-image: url("../../../../static/images/TU.png");
    background-size: 100% 100%;
  }

  .Box .footerBox {
    width: 100%;
    height: 275px;
    background-color: #075A52;
    background-color: #075A52;
    opacity: 0.92;
  }

  .Box .smallFooter {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    color: #FFFFFF;
  }

  /*左边*/
  .Box .smallFooter .footerLeft {
    float: left;
  }

  .Box .smallFooter .footerLeft .footerLeftBox {
    margin-top: 32px;
  }

  .Box .smallFooter .footerLeft p {
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 32px;
    opacity: 1;
  }

  /*分享*/
  .Box .smallFooter .shareBox {
    overflow: hidden;
    margin-top: 24px;
  }

  .Box .smallFooter .shareBox .imgBox {
    width: 40px;
    height: 40px;

    float: left;
    margin-right: 24px;
    border-radius: 50%;
  }

  .Box .smallFooter .shareBox .imgBox img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  /*右边*/
  .Box .smallFooter .footerright {
    width: 400px;
    float: right;
    text-align: center;
    overflow: hidden;
  }

  .Box .smallFooter .footerright .linkTitle {
    margin-top: 52px;
    margin-bottom: 20px;
  }

  .Box .smallFooter .footerright a {
    float: left;
    font-size: 14px;
    color: #FFFFFF;
    width: 100px;
    display: inline-block;
    text-decoration: none;
    line-height: 30px;
  }

  /*  copyright*/
  .Box .copyright {
    width: 100%;
    height: 48px;
    background: #004B44;
    opacity: 1;
    text-align: center;
    line-height: 48px;
    color: #FFFFFF;
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }
</style>
