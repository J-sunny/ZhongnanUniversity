<template>
  <div class="industryGuidelinesBox">
    <router-link :to="{path:'/academicResources/detailsResources',query:{id:item}}" class="academicPapers" v-for="item in 16" :key="item">
      <p class="academicPapersTitle">﻿会计明日之星计划第89期：CPA Canada 外教Barbara Ko女士应﻿会计明日之星计划第89期：CPA Canada 外教Barbara
        Ko女士应﻿会计明日之星计划第89期：CPA Canada 外教Barbara Ko女士应﻿会计明日之星计划第89期：CPA Canada 外教Barbara Ko女士应</p>
      <p class="academicPapersTime">2019-05-06</p>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'industryGuidelines'
  }
</script>

<style scoped>
  .industryGuidelinesBox {
    overflow: hidden;
    margin-bottom: 100px;
  }

  .academicPapers {
    display: block;
    text-decoration: none;
    color: #000000;
    margin-bottom: 24px;
    overflow: hidden;
  }

  .academicPapers .academicPapersTitle {
    width: 618px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
    font-size: 14px;
  }

  .academicPapers .academicPapersTime {
    float: right;
    font-size: 12px;
    color: #999999;
  }
</style>

