<template>
  <div class="conIndex">
    <!--     banner-->
    <div class="bannerBox">
      <img class="bannerPic" src="../../../../static/images/banner1.png" alt="">
    </div>
    <!--    内容-->
    <div class="contentBox">
      <!--      左边-->
      <div class="leftBox">
        <div class="title">主任致辞</div>
        <div class="directorPic">
          <img src="../../../../static/imgs/tu(2).png" alt="">
        </div>
        <div class="speech">
          为国家培养高素质的会计财务审计人才，一直是我们会计学院的孜孜追求。桃李满天下，代代铸辉煌，师生情深共谱华章；后浪推前浪，涛声震华夏，人才辈出续写辉煌。中南薪火育英才，风雨历程数十载，就让我们会计学院的师生传承中原薪火，砥砺中南精神，博文明理存真意，厚德济世天下知。
          <p style="text-align: right"> ——院长：张敦力</p>
        </div>
      </div>
      <!--      中间-->
      <div class="centerBox">
        <!--        中心新闻-->
        <div class="centralNews">
          <div class="title">中心新闻</div>
          <div class="news">
            <div
              @click="linkTo(item.classificationId,item.newsId,item.newsTypeId,item.createTime,item.newsTitle,item.searchCount)"
              class="newsCon"
              v-for="item in centerNews" :key="item.newsId">
              <p class="newsText">﻿{{item.newsTitle}}</p>
              <p class="newsTime">{{item.createTime}}</p>
            </div>
          </div>
        </div>
        <!--    行业资讯    -->
        <div class="industryInformation">
          <div class="title">行业资讯</div>
          <div class="news">
            <div
              @click="linkTo(item.classificationId,item.newsId,item.newsTypeId,item.createTime,item.newsTitle,item.searchCount)"
              class="newsCon"
              v-for="item in hangye" :key="item.newsId">
              <p class="newsText">﻿{{item.newsTitle}}</p>
              <p class="newsTime">{{item.createTime}}</p>
            </div>
          </div>
        </div>
      </div>
      <!--      右边-->
      <div class="rightBox">
        <div class="title">学术活动</div>
        <div class="activityPic">
          <img src="../../../../static/imgs/Tu(1).png" alt="">
        </div>
        <div
          @click="linkTo(item.classificationId,item.newsId,item.newsTypeId,item.createTime,item.newsTitle,item.searchCount)"
          class="activityInfo" v-for="item in xueshu" :key="item.newsId">
          <p class="activityTitle">﻿{{item.newsTitle}}</p>
          <p class="activityTime">{{item.createTime}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getNewsList} from '@/api/index'

  export default {
    name: 'index',
    data() {
      return {
        centerNews: [],
        hangye: [],
        xueshu: []
      }
    },
    created() {
      this.getCenterNewsList()
      this.getHangyeNewsList()
      this.getShuxhuNewsList()
    },
    methods: {
      //  获取中心新闻文章列表
      getCenterNewsList() {
        getNewsList({
          newsTypeId: 6,
          page: 1,
          pageSize: 10
        }).then(data => {
          this.centerNews = data.data.records
        })
      },
      //  获取行业资讯文章列表
      getHangyeNewsList() {
        getNewsList({
          newsTypeId: 5, page: 1,
          pageSize: 10
        }).then(data => {
          console.log(data);
          this.hangye = data.data.records
        })
      },
      //  获取学术活动文章列表
      getShuxhuNewsList() {
        getNewsList({
          newsTypeId: 9,
          page: 1,
          pageSize: 10
        }).then(data => {
          console.log(data);
          this.xueshu = data.data.records
        })
      },
      // 跳转
      linkTo(classificationId, newsId, newsTypeId, createTime, newsTitle, searchCount) {
        this.$store.state.newsTypeId = newsTypeId
        this.$store.state.newsTitle = newsTitle
        this.$store.state.searchCount = searchCount
        this.$store.state.createTime = createTime
        this.$store.state.classificationId = classificationId
        this.$store.addStore()
        if (classificationId == 4) {
          this.$store.state.classificationName = '行业动态'
          this.$store.addStore()
        } else if (classificationId == 5) {
          this.$store.state.classificationName = '学术活动'
          this.$store.addStore()
        } else {

        }
        console.log(newsId);
        console.log(newsTypeId);
        window.location = '#/socialServices/detailsServices?picId=' + classificationId + '&newsId=' + newsId + '&newsTypeId=' + newsTypeId
      },
    }
  }
</script>

<style scoped>
  .conIndex {
  }


  /*  内容*/
  .contentBox {
    width: 1200px;
    overflow: hidden;
    /*background-color: #075A52;*/
    /*height: 400px;*/
    margin: 40px auto 139px;
  }

  /*左边*/
  .contentBox .leftBox {
    width: 202px;
    float: left;
  }

  .contentBox .title {
    width: 120px;
    height: 40px;
    background: #075A52;
    text-align: center;
    line-height: 40px;
    color: #FFFFFF;
  }

  .contentBox .leftBox .directorPic,
  .contentBox .leftBox .directorPic img {
    display: block;
    width: 202px;
    height: 140px;
    margin-top: 16px;
  }

  .contentBox .leftBox .speech {
    width: 202px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 28px;
    color: #000000;
    margin-top: 24px;
    text-indent: 2em;
  }

  /*中间*/
  .contentBox .centerBox {
    float: left;
    width: 618px;
    margin: 0 48px;
  }

  /*中心新闻*/
  .contentBox .centerBox .centralNews {
    height: 241px;
    overflow: hidden;
  }

  .contentBox .centerBox .news {
    border-top: 1px solid #E0E0E0;
    padding-top: 20px;
  }

  .contentBox .centerBox .news .newsCon {
    display: block;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    cursor: pointer;
  }

  .centerBox .news .newsCon .newsText {
    float: left;
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 24px;
    color: #000000;
  }

  .centerBox .news .newsCon .newsTime {
    float: right;
    font-size: 12px;
    color: #999999;
  }

  /*行业资讯*/

  .industryInformation .centerBox .centralNews {
    height: 241px;
    overflow: hidden;
  }

  .industryInformation .centerBox .news {
    border-top: 1px solid #E0E0E0;
    padding-top: 20px;
  }

  .industryInformation .centerBox .news .newsCon {
    display: block;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    cursor: pointer;
  }

  .industryInformation .news .newsCon .newsText {
    float: left;
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 24px;
    color: #000000;
  }

  .industryInformation .news .newsCon .newsTime {
    float: right;
    font-size: 12px;
    color: #999999;
  }

  .contentBox .centerBox .industryInformation {
    margin-top: 40px;
  }

  /*  右边*/
  .contentBox .rightBox {
    float: left;
    width: 284px;
    height: 523px;
    overflow: hidden;

  }

  .rightBox .activityPic,
  .rightBox .activityPic img {
    width: 284px;
    height: 162px;
    display: block;
    margin-top: 16px;
  }

  .rightBox .activityInfo {
    border-bottom: 1px solid #E0E0E0;
    font-family: Microsoft YaHei;
    font-weight: 400;
    padding: 10px 0;
    display: block;
    text-decoration: none;
    cursor: pointer;
  }

  .rightBox .activityInfo .activityTitle {
    font-size: 14px;
    line-height: 24px;
    color: #000000;
  }

  .rightBox .activityInfo .activityTime {
    font-size: 12px;
    color: #999999;
  }
</style>
