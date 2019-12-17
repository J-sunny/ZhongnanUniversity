<template>
  <div class="personnel">
    <div class="DetailedInfo" v-for="item in DetailedInfo" :key="item.organizationId">
      <p class="personnelTitle">{{item.organization}}机构</p>
      <!--            人员信息-->
      <div @click="linkTo(val.personal_html_url,val.organization_user_name)" class="personnelBox"
           v-for="(val) in item.users"
           :key="val.organization_user_id">
        <div class="personnelPic">
          <img :src="BAST_API+val.user_img_url" alt="">
        </div>
        <div class="personnelInfoBox">
          <p :title="val.organization_user_name" class="personnelName">﻿{{val.organization_user_name}}</p>
          <p :title="val.position" class="position">﻿{{val.position}}</p>
          <div :title="val.introduction" class="personnelInfo">{{val.introduction}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 获取人员机构列表
  import {getOrganizationDetailedInfo, getUserInfoHtml} from "@/api/personnel";

  export default {
    name: 'personnel',
    data() {
      return {
        DetailedInfo: [],
        BAST_API: '',
      }
    },
    methods: {
      // 获取机构人员列表
      getOrganizationDetailedInfo() {
        getOrganizationDetailedInfo().then(data => {
          this.DetailedInfo = data.data
          console.log(data);
        })
      },

      //  跳转
      linkTo(personal_html_url, organization_user_name) {
        console.log(personal_html_url);
        // :to="{path:'/personnel/personnelInfo',query:{id:1}}"
        window.location = '#/personnel/personnelInfo'
        this.$store.state.htmlUrl = personal_html_url
        this.$store.state.organization_user_name = organization_user_name
      }
    },
    created() {
      this.BAST_API = process.env.BASE_API
      this.getOrganizationDetailedInfo()
    }
  }
</script>

<style scoped>


  /*  研究人员*/
  .personnel {
    overflow: hidden;
    margin-bottom: 100px;
  }

  .personnel .DetailedInfo {
    width: 100%;
    overflow: hidden;
  }

  .personnel .personnelTitle {
    font-size: 16px;
    font-weight: bold;
    line-height: 60px;
    color: rgba(0, 0, 0, 1);
    opacity: 1;
  }

  /*人员信息*/
  .personnel .personnelBox {
    overflow: hidden;
    float: left;
    width: 276px;
    height: 410px;
    background-color: #F7F7F7;
    margin-right: 24px;
    text-decoration: none;
    margin-bottom: 48px;

  }

  .personnel .personnelInfoBox {
    padding-left: 16px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .personnelBox .personnelPic {
    width: 276px;
    height: 188px;
  }

  .personnelBox .personnelPic img {
    width: 276px;
    height: 188px;
    display: block;
    background-color: #075A52;
  }

  .personnel .personnelName {
    font-size: 20px;
    font-weight: bold;
    color: #222222;
    opacity: 1;
    margin-top: 20px;
  }

  .personnel .position {
    font-size: 14px;
    font-weight: 400;
    color: #222222;
    opacity: 1;
    margin-top: 14px;
  }

  .personnel .personnelInfo {
    width: 240px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 22px;
    color: #999999;
    opacity: 1;
    margin-top: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    /*overflow: hidden;*/


    　word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

</style>
