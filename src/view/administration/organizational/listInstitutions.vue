<template>
  <div class="organizationalBox">
    <p class="organiTitle">机构管理</p>
    <p class="addSome">
      <span @click="dialogVisibleJi=true,aTitle='添加机构'">添加机构</span>
      <!--      <span @click="dialogVisibleJi=true,aTitle='修改机构'">修改机构</span>-->
      <!--      <span @click="dialogVisibleJi=true,aTitle='删除机构'">删除机构</span>-->
      <!--      <span @click="showDialogVisible(),Wtitle='添加人员'">添加人员</span></p>-->
    <div>
      <!--            表格-->
      <template>
        <el-table
          :data="getOrganiList"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="organizationName"
            label="机构名称">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="300">
            <template slot-scope="scope">
              <el-button @click="linkToDetail(scope.row)" type="text" size="small">详情</el-button>
              <el-button type="text" size="small" @click="deleteOrganization(scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="updateOrganization(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
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

    <!--    添加，修改人员弹框-->
    <el-dialog
      :title="Wtitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @closed="closedd"
      width="1000px">
      <!--    机构列表-->
      <el-form>
        <el-form-item label="所属机构" label-width="80px">
          <el-select disabled v-model="organizationId" placeholder="请选择">
            <el-option
              v-for="item in getOrganiList"
              :key="item.organizationId"
              :label="item.organizationName"
              :value="item.organizationId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
          <el-input maxlength="50" v-model="jobResponsibilities" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="个人简介" label-width="80px">
          <el-input maxlength="200" v-model="introduction" autocomplete="off"></el-input>
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
        <!--        <el-form-item label="所属机构" label-width="80px" v-if="aTitle=='修改机构'||aTitle=='删除机构'">-->
        <!--          <el-select v-model="updateOrganizationId" placeholder="请选择">-->
        <!--            <el-option-->
        <!--              v-for="item in getOrganiList"-->
        <!--              :key="item.organizationId"-->
        <!--              :label="item.organizationName"-->
        <!--              :value="item.organizationId">-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
      </el-form>
      <!--  机构名称-->
      <el-form v-if="aTitle=='修改机构'||aTitle=='添加机构'">
        <el-form-item :label="aTitle=='修改机构'?'修改为':'添加机构'" label-width="80px">
          <el-input v-model="updateOrganizationName" autocomplete="off"></el-input>
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
  import {saveOrganizationUser, saveOrganizationInfo, deleteOrganization, uploadUserImg} from "@/api/organizational";
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
        },
        //  分页
        totalNews: 0,
        pages: 1
      }
    },
    components: {
      VueUeditorWrap,
      EditorBar,
      Uediter
    },
    methods: {

      //上一页
      prevClick() {
        if (this.pages <= 1) {
          this.$message.warning("已是第一页")
        } else {
          this.pages--
          this.getOrganizations()
        }
      },
      //下一页
      nextClick() {
        if (this.pages >= (Math.ceil(this.totalNews / 10))) {
          this.$message.warning("最后一页")
        } else {
          this.pages++
          this.getOrganizations()
        }
      },
      //改变pageSize
      sizeChange(val) {
        console.log(val)
      },
      //currentPage改变时
      currentChange(val) {
        this.pages = val
        this.getOrganizations()
      },


      //详情跳转
      linkToDetail(row) {
        console.log(row);
        window.location = '#/adminIndex/organizational?organizationId=' + row.organizationId
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
          currentPage: this.pages,
          pageSize: 10
        }).then(data => {
          console.log(data);
          this.totalNews=data.data.total
          this.getOrganiList = data.data.records
        })
      },
      // 获取机构人员列表
      getOrganizationUsers() {
        getOrganizationUsers({}).then(data => {
          this.UsersList = data.data
        })
      },
      //点击编辑机构人员信息按钮让当前信息显示在弹框上
      editInfo(val) {
        this.organizationId = val.organization_id
        this.positionName = val.position
        this.organization_user_name = val.organization_user_name
        this.jobResponsibilities = val.job_responsibilities
        this.introduction = val.introduction
        this.personalHtmlUrl = val.personal_html_url
        this.organizationUserId = val.organization_user_id
        this.imageUrl = this.BASE_API + val.user_img_url
        this.getUserInfoHtml()
      },
      //编辑,添加 机构人员信息
      saveOrganizationUser(organizationUserId) {
        if (this.organizationId == '') {
          this.$message.warning("请选择所属机构")
          return
        }
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
        this.personalHtmlStr = this.$refs.ue.getUEContent()
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

          this.$message.success('操作成功')
          this.getOrganizationDetailedInfo()
        })

      },
      //添加修改机构
      saveOrganizationInfo(row) {
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
      // 修改机构
      updateOrganization(row) {
        console.log(row);
        this.updateOrganizationId = row.organizationId
        this.dialogVisibleJi = true
        this.aTitle = '修改机构'
      },
      //上传头像
      uploadUserImg() {
        uploadUserImg({})
      },
      //删除机构
      deleteOrganization(row) {
        this.$confirm('确认删除？删除后此机构下面的所有人员也将一并删除').then(res => {
          if (res == 'confirm') {
            deleteOrganization({organizationId: row.organizationId}).then(data => {
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
          }
        })
        console.log(row);
        // this.$confirm('是否删除该机构, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {

        // if (this.updateOrganizationId == "") {
        //   this.$message.warning("请选择要删除的机构")
        //   return
        // }


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
        this.organizationId = ''
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
