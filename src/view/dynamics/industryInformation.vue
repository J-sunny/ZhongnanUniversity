<template>
  <!--    行业动态-->
  <div class="industry">
    <router-link :to="{path:'/dynamics/newsDetail',query:{id:item}}" class="industryBox" v-for="item in 10" :key="item">
      <!--      图片-->
      <div class="newsPic">
        <img src="../../../static/imgs/Tu(8).png" alt="">
      </div>
      <!--      标题和时间-->
      <div class="newCon">
        <p class="newsConTitle">﻿会计学院本科2017级学生党支部召开支部大会会计学院本科2017级学生党支部召开支部大会会计学院本科2017级学生党支部召开支部大会会计学院本科2017级学生党支部召开支部大会</p>
        <p class="newsConTime">﻿2019-04-06</p>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'industryInformation'
  }
</script>

<style scoped>
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
