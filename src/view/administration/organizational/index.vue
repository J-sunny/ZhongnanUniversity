<template>
  <div class="organizationalBox">
    <p class="organiTitle">机构人员管理</p>
    <p class="addSome">
      <!--      <span @click="dialogVisibleJi=true,aTitle='添加机构'">添加机构</span>-->
      <!--      <span @click="dialogVisibleJi=true,aTitle='修改机构'">修改机构</span>-->
      <!--      <span @click="dialogVisibleJi=true,aTitle='删除机构'">删除机构</span>-->
      <span @click="showDialogVisible(),Wtitle='添加人员'">添加人员</span></p>
    <div>
      <!--      -->
      <p class="OrganizationName" v-for="(item,index) in getOrganiList" :key="index"
         v-if="item.organizationId==$route.query.organizationId">{{item.organizationName}}</p>
      <!--            表格-->
      <div v-if="false" style="margin-bottom: 50px;overflow: hidden">
        <div class="table_heser">
          <div style='width: 180px'>机构名称</div>
          <div style="width: 180px;">职务名称</div>
          <div class="names">姓名及工作职责</div>
          <div style="width: 180px;">操作</div>
        </div>
        <div class="table_body" v-for="item in DetailedInfo">
          <div style='width: 180px;font-weight: bold' class="body-L"
               :style="'height:'+item.users.length*44+'px;line-height:'+item.users.length*44+'px'">{{item.organization}}
          </div>
          <div class="body-r">
            <div class="body-r_cnt" v-for="val in item.users">
              <div style='width: 180px;float: left;'>{{val.position}}</div>
              <div class="body-r-name">
                <span style="color: #004B44">{{val.organization_user_name}}</span>
                <span class="jobInfo">( {{val.job_responsibilities}})</span>
              </div>
              <div style='width: 180px;float: left'>
                <el-button type="text" size="small"
                           @click="dialogVisible=true,
                           Wtitle='编辑机构人员信息',
                           editInfo(val)">
                  编辑
                </el-button>
                <el-button type="text" size="small" v-if="false">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template>
        <el-table
          :data="UsersList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="position"
            label="职务名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="organizationUserName"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="jobResponsibilities"
            label="工作职责"
            width="180">
          </el-table-column>
          <el-table-column
            prop="introduction"
            label="个人简介">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="140">
            <template slot-scope="scope">
              <el-button @click="dialogVisible=true,
                           Wtitle='编辑机构人员信息',
                           editInfo(scope.row)" type="text" size="small">编辑
              </el-button>
              <el-button @click="deleteOrganizationUser(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!--    添加，修改人员弹框-->
    <el-dialog
      :title="Wtitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @closed="closedd"
      width="1000px">
      <!--    机构列表-->
      <!--      <el-form>-->
      <!--        <el-form-item label="所属机构" label-width="80px">-->
      <!--          <el-select v-model="organizationId" placeholder="请选择">-->
      <!--            <el-option-->
      <!--              v-for="item in getOrganiList"-->
      <!--              :key="item.organizationId"-->
      <!--              :label="item.organizationName"-->
      <!--              :value="item.organizationId">-->
      <!--            </el-option>-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
      <!--      </el-form>-->
      <!--  职务名称-->
      <el-form>
        <el-form-item label="职务名称" label-width="80px">
          <el-input maxlength="20" v-model="positionName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="姓名" label-width="80px">
          <el-input maxlength="20" v-model="organization_user_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!--      头像-->
      <el-form>
        <el-form-item label="人员头像" label-width="80px">
          <el-upload
            class="avatar-uploader"
            :action="actionUrl"
            :headers="myHeaders"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <el-form>
        <el-form-item label="工作职责" label-width="80px">
          <el-input maxlength="100" v-model="jobResponsibilities" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="个人简介" label-width="80px">
          <el-input maxlength="100" v-model="introduction" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <p style="font-size: 20px;text-align: center;margin: 40px 0">编辑个人详情</p>
      <el-form>
        <el-form-item style="line-height: normal" label="个人详情" label-width="80px">
          <!--          <el-input v-model="personalHtmlUrl" autocomplete="off"></el-input>-->
          <!--          <vue-ueditor-wrap @onEditorChange="onEditorChange" :contentText="personalHtmlStr"></vue-ueditor-wrap>-->
          <!--          <editor-bar v-model="personalHtmlStr" :isClear="isClear" @change="change"></editor-bar>-->
          <Uediter v-model="personalHtmlStr" :config="ueditor.config" ref="ue"></Uediter>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveOrganizationUser()">确 定</el-button>
  </span>
    </el-dialog>
    <!--    添加，修改机构弹框-->
    <el-dialog
      :title="aTitle"
      :visible.sync="dialogVisibleJi"
      :close-on-click-modal="false"
      @closed="closedd"
      width="600px">
      <!--    机构列表-->
      <el-form>
        <el-form-item label="所属机构" label-width="80px" v-if="aTitle=='修改机构'||aTitle=='删除机构'">
          <el-select v-model="updateOrganizationId" placeholder="请选择">
            <el-option
              v-for="item in getOrganiList"
              :key="item.organizationId"
              :label="item.organizationName"
              :value="item.organizationId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--  机构名称-->
      <el-form v-if="aTitle=='修改机构'||aTitle=='添加机构'">
        <el-form-item :label="aTitle=='修改机构'?'修改为':'添加机构'" label-width="80px">
          <el-input maxlength="20" v-model="updateOrganizationName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleJi = false">取 消</el-button>
    <el-button v-if="aTitle=='修改机构'||aTitle=='添加机构'" type="primary"
               @click="saveOrganizationInfo()">确 定</el-button>
    <el-button v-if="aTitle=='删除机构'" type="primary"
               @click="deleteOrganization()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getOrganizations, getOrganizationUsers, getOrganizationDetailedInfo, getUserInfoHtml} from "@/api/personnel";
  import {
    saveOrganizationUser,
    saveOrganizationInfo,
    deleteOrganization,
    uploadUserImg,
    deleteOrganizationUser
  } from "@/api/organizational";
  import {saveNews} from "@/api/article";
  import {getToken} from '../../../uitlis/auth'


  //富文本编辑器
  import VueUeditorWrap from '@/components/VueQuillEditor'// ES6 Module
  import EditorBar from '@/components/wangEnduit'
  import Uediter from '@/components/ue.vue'

  export default {

    name: "index",
    data() {
      return {
        DetailedInfo: [],
        isClear: false,
        dialogVisible: false,
        dialogVisibleJi: false,
        Wtitle: '',
        aTitle: '',
        getOrganiList: [],
        UsersList: [],
        //  个人信息
        organizationId: '',
        positionName: '',
        organization_user_name: '',
        jobResponsibilities: '',
        introduction: '',
        personalHtmlStr: '',
        organizationUserId: '',
        personalhtmlFile: '',
        newsTitle: '',
        personalHtmlUrl: '',
        //  修改后机构名称
        updateOrganizationName: '',
        updateOrganizationId: '',
        imageUrl: '',
        //  删除机构
        //   organizationId:'',
        actionUrl: '',
        myHeaders: {'X-token': this.$store.state.XToken},
        userImgUrl: '',
        BASE_API: '',

        dat: {
          content: ''
        },
        ueditor: {
          value: '编辑器默认文字',
          config: {}
        }
      }
    },
    components: {
      VueUeditorWrap,
      EditorBar,
      Uediter
    },
    methods: {
      //删除人员
      deleteOrganizationUser(row) {
        console.log(row);
        this.$confirm('确认删除？').then(res => {
          console.log(res);
          if (res == 'confirm') {
            deleteOrganizationUser({organizationUserId: row.organizationUserId}).then(data => {
              this.$message.success('删除成功')
              this.getOrganizationUsers(this.$route.query.organizationId)
            })
          }
        })
      },
      //添加人员弹框
      showDialogVisible() {
        this.dialogVisible = true
        this.personalHtmlStr = ""
        setTimeout(() => {
          this.$refs.ue.editor.body.innerHTML = this.personalHtmlStr
        }, 200)
      },

      returnContent() {
        this.dat.content = this.$refs.ue.getUEContent()
        console.log(this.dat.content)
      },

      //获取机构及人员信息
      getOrganizationDetailedInfo() {
        getOrganizationDetailedInfo().then(data => {
          this.DetailedInfo = data.data
        })
      },
      //获取机构列表---修改人员信息
      getOrganizations() {
        getOrganizations({
          currentPage: 1,
          pageSize: 9999
        }).then(data => {
          this.getOrganiList = data.data.records
        })
      },
      // 获取机构人员列表
      getOrganizationUsers(belongOrganizationId) {
        getOrganizationUsers({
          belongOrganizationId: belongOrganizationId
        }).then(data => {
          this.UsersList = data.data
        })
      },
      //点击编辑机构人员信息按钮让当前信息显示在弹框上
      editInfo(val) {
        console.log(val);
        this.organizationId = val.belongOrganizationId
        this.positionName = val.position
        this.organization_user_name = val.organizationUserName
        this.jobResponsibilities = val.jobResponsibilities
        this.introduction = val.introduction
        this.personalHtmlUrl = val.personalHtmlUrl
        this.organizationUserId = val.organizationUserId
        this.imageUrl = this.BASE_API + val.userImgUrl
        this.getUserInfoHtml()
      },
      //编辑,添加 机构人员信息
      saveOrganizationUser(organizationUserId) {
        if (this.positionName == '') {
          this.$message.warning("请填写职务名称")
          return
        }
        if (this.organization_user_name == '') {
          this.$message.warning("请填写机构人员姓名")
          return
        }
        if (this.jobResponsibilities == '') {
          this.$message.warning("请填写工作职责")
          return
        }
        if (this.introduction == '') {
          this.$message.warning("请填写个人简介")
          return
        }
        this.personalHtmlStr = this.$refs.ue.getUEContent()
        if (this.personalHtmlStr == '') {
          this.$message.warning("请填写个人详情")
          return
        }
        saveOrganizationUser({
          belongOrganizationId: this.organizationId,
          introduction: this.introduction,
          jobResponsibilities: this.jobResponsibilities,
          organizationUserId: organizationUserId || this.organizationUserId,
          organizationUserName: this.organization_user_name,
          personalHtmlStr: this.personalHtmlStr,
          position: this.positionName,
          userImgUrl: this.userImgUrl
        }).then(data => {
          this.dialogVisible = false
          this.getOrganizationUsers(this.$route.query.organizationId)

          this.$message.success('操作成功')
          this.getOrganizationDetailedInfo()
        })
      },
      //添加修改机构
      saveOrganizationInfo() {
        if (this.aTitle == "修改机构") {
          if (this.updateOrganizationId == "") {
            this.$message.warning("请选择要修改的机构")
            return
          }
        }
        if (this.updateOrganizationName == "") {
          this.$message.warning("机构名称不能为空")
          return
        }
        saveOrganizationInfo({
          organizationId: this.updateOrganizationId,
          organizationName: this.updateOrganizationName,
          status: 0
        }).then(data => {

          this.getOrganizationDetailedInfo()
          this.getOrganizations()
          // this.$message.success('操作成功')
          this.updateOrganizationId = ''
        })
        this.dialogVisibleJi = false
      },
      //上传头像
      uploadUserImg() {
        uploadUserImg({})
      },

      //删除机构
      deleteOrganization() {
        // this.$confirm('是否删除该机构, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {

        if (this.updateOrganizationId == "") {
          this.$message.warning("请选择要删除的机构")
          return
        }

        deleteOrganization({organizationId: this.updateOrganizationId}).then(data => {
          this.getOrganizationDetailedInfo()
          this.getOrganizations()
          this.updateOrganizationId = ''
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message.error(data.msg)
          }
        })
        this.dialogVisibleJi = false
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });
        // });
      },
      //添加，修改人员详情
      // saveNews() {
      //   console.log(this.personalHtmlStr+111111111);
      //   saveNews({
      //     classificationId: 3,
      //     htmlFile: this.personalHtmlStr,
      //     newsId: '' || this.organizationUserId,
      //     newsTitle: this.organization_user_name,
      //     newsTypeId: 3,
      //   }).then(data => {
      //     console.log(data);
      //   })
      // },
      //查询人员详情信息
      getUserInfoHtml() {
        getUserInfoHtml({htmlUrl: this.personalHtmlUrl}).then(data => {
          this.personalHtmlStr = data.data
          this.$refs.ue.editor.body.innerHTML = this.personalHtmlStr
        })
      },
      //  Dialog 关闭动画结束时的回调
      closedd() {
        // this.$message.info("取消了操作")
        this.positionName = ''
        this.organization_user_name = ''
        this.jobResponsibilities = ''
        this.introduction = ''
        this.personalHtmlUrl = ''
        this.organizationUserId = ''
        this.updateOrganizationId = ''
        this.updateOrganizationName = ''
        this.personalHtmlStr = ''
        this.imageUrl = ''
      },


      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res, file)
        this.userImgUrl = res.data
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

    },
    created() {
      this.getOrganizationUsers(this.$route.query.organizationId)
      this.organizationId = this.$route.query.organizationId
      if (!getToken("X-Token")) {
        this.$message.warning("登录失效，请重新登录！")
        window.location = '#/adminLogin'
      }
      this.getOrganizationDetailedInfo()
      this.getOrganizations()
      this.actionUrl = process.env.BASE_API + '/manager/organization/uploadUserImg'
      this.BASE_API = process.env.BASE_API
    }
  }
</script>

<style scoped>
  .organizationalBox {
  }

  .organizationalBox .organiTitle {
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .OrganizationName {
    font-size: 30px;
    margin-bottom: 30px;
  }

  .organizationalBox .addSome {
    margin-bottom: 40px;
  }

  .organizationalBox .addSome span {
    display: inline-block;
    padding: 10px 20px;
    background-color: #004B44;
    color: #FFFFFF;
    border-radius: 5px;
    cursor: pointer;
  }


  /*  表格*/
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
    line-height: 42.6px;
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
    width: calc(100% - 540px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .body-r {
    width: calc(100% - 180px);
    float: left;
  }

  .body-r_cnt > div {
    box-sizing: border-box;
    border: 1px #eee solid;

  }

  .body-r-name {
    width: calc(100% - 360px);
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .jobInfo {
    font-weight: 400;
    color: #999999;
  }


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader-icon {
    border: 1px solid #DCDFE6;
    border-radius: 10px;

  }

</style>
