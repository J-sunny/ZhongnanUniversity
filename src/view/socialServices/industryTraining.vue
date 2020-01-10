<template>
  <div>
    <div class="industry">
      <div @click="linkTo(item.newsId,item.newsTypeId,item.createTime,item.newsTitle,item.searchCount)"
           class="industryBox" v-for="item in newsList" :key="item.newsId">
        <!--      图片-->
        <div class="newsPic" v-if="false">
          <img src="../../../static/imgs/Tu(8).png" alt="">
        </div>
        <!--      标题和时间-->
        <div class="newCon">
          <p class="newsConTitle">{{item.newsTitle}}</p>
          <p class="newsConTime">﻿{{item.createTime}}</p>
        </div>
      </div>
    </div>
    <!--    分页-->
    <div class="pagination_box">
      <div class="pagination">
        <el-pagination
          :current-page="pages"
          hide-on-single-page
          :page-size="10"
          layout="prev, pager, next"
          @prev-click="prevClick"
          @next-click="nextClick"
          @size-change="sizeChange"
          @current-change="currentChange"
          :total="totalNews">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  //获取文章列表
  import {getNewsList} from '@/api/index'

  export default {
    name: 'industryTraining',
    data() {
      return {
        newsList: [],
        listID: '',
        picId: this.$route.query.picId,
        totalNews: 0,
        pages: 1
      }
    },
    watch: {
      $route(to) {
        if (this.listID != to.query.listID) {
          this.listID = to.query.listID
          this.pages = 1
          this.getList(to.query.listID)
        }
      },
    },
    methods: {
      //上一页
      prevClick() {
        if (this.pages <= 1) {
          this.$message.warning("已是第一页")
        } else {
          this.pages--
          this.getList(this.listID)
        }
      },
      //下一页
      nextClick() {
        if (this.pages >= (Math.ceil(this.totalNews / 10))) {
          this.$message.warning("最后一页")
        } else {
          this.pages++
          this.getList(this.listID)
        }
      },
      //改变pageSize
      sizeChange(val) {
        console.log(val)
      },
      //currentPage改变时
      currentChange(val) {
        this.pages = val
        this.getList(this.listID)
      },
      getList(val) {
        if (val != undefined) {
          getNewsList({
            newsTypeId: val,
            page: this.pages,
            pageSize: 10
          }).then(data => {
            this.newsList = data.data.records
            this.totalNews = data.data.total
          })
        }

      },
      linkTo(newsId, newsTypeId, createTime, newsTitle, searchCount) {
        this.$store.state.createTime = createTime
        this.$store.state.newsTitle = newsTitle
        this.$store.state.searchCount = searchCount
        this.$store.addStore()
        window.location = '#/socialServices/detailsServices?picId=' + this.$store.state.classificationId + '&newsId=' + newsId + '&newsTypeId=' + newsTypeId
      }
    },
    created() {
      this.listID = this.$route.query.listID
      this.getList(this.$route.query.listID)
    }
  }
</script>

<style scoped>
  /*.industryTraining {*/
  /*  margin-bottom: 179px;*/

  /*}*/

  /*.industryTraining .industryTrainingBox {*/
  /*  display: block;*/
  /*  padding: 49px 0 40px;*/
  /*  border-bottom: 1px solid #E0E0E0;*/
  /*  overflow: hidden;*/
  /*}*/

  /*!*左边*!*/
  /*.industryTraining .industryTrainingBox .industryPic,*/
  /*.industryTraining .industryTrainingBox .industryPic img {*/
  /*  display: block;*/
  /*  width: 262px;*/
  /*  height: 180px;*/
  /*  float: left;*/
  /*}*/

  /*!*  右边*!*/
  /*.industryTraining .industryTrainingBox .industryConBox {*/
  /*  float: left;*/
  /*  margin-left: 24px;*/
  /*}*/

  /*.industryTraining .industryConBox .industryConTitle {*/
  /*  width: 612px;*/
  /*  font-size: 20px;*/
  /*  font-weight: bold;*/
  /*  color: #000000;*/
  /*  overflow: hidden;*/
  /*  text-overflow: ellipsis;*/
  /*  white-space: nowrap;*/
  /*}*/

  /*.industryTraining .industryConBox .industryCon {*/
  /*  width: 612px;*/
  /*  font-size: 14px;*/
  /*  line-height: 24px;*/
  /*  color: #666666;*/
  /*  margin-top: 20px;*/
  /*  display: -webkit-box;*/
  /*  -webkit-box-orient: vertical;*/
  /*  -webkit-line-clamp: 4;*/
  /*  overflow: hidden;*/
  /*}*/

  /*.industryTraining .industryConBox .industryConTime {*/
  /*  width: 612px;*/
  /*  font-size: 16px;*/
  /*  color: #666666;*/
  /*  margin-top: 21px;*/
  /*}*/


  /*  右边....................................................*/

  .industry {
    margin-bottom: 78px;
    min-height: 750px;
  }

  .industryBox {
    overflow: hidden;
    padding: 21px 0 24px 0;
    border-bottom: 1px solid #E0E0E0;
    text-decoration: none;
    display: block;
    cursor: pointer;
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
  .industryBox .newCon {
    float: left;
    margin-left: 24px;
  }

  .industryBox .newCon .newsConTitle {
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    margin-top: 19px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 728px;
  }

  .industryBox .newCon .newsConTime {
    font-size: 16px;
    color: #666666;
    margin-top: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 728px;

  }



</style>
