<template>
  <div class="mechanism">
    <div class="contentTitle">
      <p class="detailsInfoTitle">机构设置</p>
      <p class="times" v-if="false">
        <span class="el-icon-time"></span>&nbsp;
        <span>发布时间：2019-05-30</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>发布者：系统管理员</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>浏览次数&nbsp;23445</span>
      </p>
    </div>
    <!--            表格-->
    <div style="overflow: hidden;margin-bottom: 50px">
      <div class="table_heser">
        <div style='width: 180px'>机构名称</div>
        <div style="width: 180px;">职务名称</div>
        <div class="names">姓名及工作职责</div>
      </div>
      <div class="table_body" v-for="item in DetailedInfo" :key="item.organizationId">
        <div style='width: 180px;font-weight:bold;' class="body-L"
             :style="'height:'+item.users.length*44+'px;line-height:'+item.users.length*44+'px'">{{item.organization}}
        </div>
        <div class="body-r">
          <div class="body-r_cnt" v-for="val in item.users" :key="val.organization_user_id">
            <div style='width: 180px;float: left;'>{{val.position}}</div>
            <div class="body-r-name">
              <span style="color: #004B44">{{val.organization_user_name}}</span>
              <span class="jobInfo">( {{val.job_responsibilities}})</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // 获取机构列表
  import {getOrganizations, getOrganizationUsers, getOrganizationDetailedInfo} from "@/api/personnel";

  export default {
    name: 'institutionalSettings',
    data() {
      return {
        getOrganiList: [],
        UsersList: [],
        DetailedInfo: []
      }
    },
    methods: {
      //获取机构列表
      getOrganizations() {
        getOrganizations().then(data => {
          this.getOrganiList = data.data
          // console.log(data);
        })
      },
      // 获取机构人员列表
      getOrganizationUsers() {
        getOrganizationUsers().then(data => {
          this.UsersList = data.data
        })
      },
      //获取机构及人员信息
      getOrganizationDetailedInfo() {
        getOrganizationDetailedInfo().then(data => {
          this.DetailedInfo = data.data
          console.log(data);
        })
      },
    },
    created() {
      this.getOrganizations()
      this.getOrganizationDetailedInfo()
    }
  }
</script>

<style scoped>
  .table_heser {
    width: 100%;
    text-align: center;
    overflow: hidden;
    line-height: 42px;
    margin-top: 50px;
    font-size: 14px;
    font-family: Microsoft YaHei;
  }

  .table_heser > div {
    border: #eee 1px solid;
    float: left;
    box-sizing: border-box;
  }

  .table_body {
    width: 100%;
    text-align: center;
    position: relative;
    box-sizing: border-box;
    line-height: 42.8px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    overflow: hidden;

  }

  .table_body > .body-L {
    box-sizing: border-box;
    float: left;
    border: 1px #eee solid;
  }

  .names {
    width: calc(100% - 360px);
  }

  .body-r {
    width: calc(100% - 180px);
    float: left;
  }

  .body-r_cnt {
    overflow: hidden;
  }

  .body-r_cnt > div {
    box-sizing: border-box;
    border: 1px #eee solid;

  }

  .body-r-name {
    width: calc(100% - 180px);
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*text-align: left;*/
    /*padding-left: 20px;*/
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
  }

  .jobInfo {
    font-weight: 400;
    color: #999999;
  }
</style>
