<template>
  <div class="articleBox">
    <div class="topBox">
      <p class="articleTitle">文章管理</p>
      <!--    导航分类-->
      <span>
      <span>请选择主页面：</span>
      <span>
         <el-select v-model="navValue" placeholder="全部">
            <el-option
              v-for="item in navList"
              :key="item.classificationId"
              :label="item.classificationName"
              :value="item.classificationId">
            </el-option>
         </el-select>
      </span>
    </span>
      <!--    小分类-->
      <span>
      <span>请选择新闻模块：</span>
      <span>
         <el-select v-model="newsTypeId" placeholder="全部">
            <el-option
              v-for="item in newsList"
              :key="item.newsTypeId"
              :label="item.newsType"
              :value="item.newsTypeId">
            </el-option>
          </el-select>
      </span>
    </span>
      <!--      筛选-->
      <span class="enterArticles" @click="screen()">筛选</span>
      <!--      录入文章-->
      <span class="enterArticles" @click="addArticle(),Wtitle='添加文章'">录入文章</span>
    </div>
    <!--    表格-->
    <div class="bottomBox">
      <el-table
        :data="articleList"
        border
        style="width: 100%">
        <el-table-column
          prop="classificationName"
          label="主页面"
          width="200">
        </el-table-column>
        <el-table-column
          prop="newsType"
          label="新闻模块"
          width="200">
        </el-table-column>
        <el-table-column
          prop="newsTitle"
          label="文章标题"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          width="300"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="dialogVisible=true,Wtitle='编辑文章',look(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteNews(scope.row.newsId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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

    <!--    添加，修改文章弹框-->
    <el-dialog
      :title="Wtitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @closed="closedd"
      width="1000px">
      <!--    导航分类-->
      <el-form>
        <el-form-item label="请选择主页面" label-width="120px">
          <el-select v-model="addNavValue" placeholder="全部" :disabled="Wtitle=='编辑文章'">
            <el-option
              v-for="item in addNavList"
              :key="item.classificationId"
              :disabled="item.classificationName=='机构人员'"
              :label="item.classificationName"
              :value="item.classificationId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--    小分类-->
      <el-form>
        <el-form-item label="请选择新闻模块" label-width="120px">
          <el-select v-model="addNewsTypeId" placeholder="全部" :disabled="Wtitle=='编辑文章'">
            <el-option
              v-for="item in addNewsList"
              :key="item.newsTypeId"
              :label="item.newsType"
              :value="item.newsTypeId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--  文章标题-->
      <el-form>
        <el-form-item label="文章标题" label-width="80px">
          <el-input maxlength="50" v-model="newsTitle" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="文章内容" label-width="80px">
          <!--          文本编辑器-->
          <Uediter v-model="contentText" :config="ueditor.config" ref="ue"></Uediter>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveNews()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  // 获取cookies值
  import {getToken} from '../../../uitlis/auth'
  import {getNavigationBar, getNewsType} from "@/api/administration";
  //获取文章列表
  import {getNewsList} from '@/api/index'
  //富文本编辑器
  import VueUeditorWrap from '@/components/VueQuillEditor'// ES6 Module
  import EditorBar from '@/components/wangEnduit'
  import Uediter from '@/components/ue.vue'

  //录入/修改文章
  import {saveNews, deleteNews} from "@/api/article";
  //获取文章详情
  import {getNews} from "@/api/socialServices";
  import {parseTime} from '@/uitlis/index'

  export default {
    name: "index",
    components: {VueUeditorWrap, EditorBar, Uediter},
    data() {
      return {
        contentText: '',
        isClear: false,
        navList: [],
        newsList: [],
        addNavList: [],
        addNewsList: [],
        addNavValue: '',
        addNewsTypeId: '',
        navValue: '',
        newsTypeId: '',
        classificationId: '1',
        articleList: [],
        dialogVisible: false,
        newsTitle: '',
        Wtitle: '',
        newsId: '',
        addNewsTypeIds: '',
        dat: {
          content: ''
        },
        ueditor: {
          value: '编辑器默认文字',
          config: {}
        },
        totalNews: 0,
        pages: 1
      }
    },
    methods: {
      //上一页
      prevClick() {
        if (this.pages <= 1) {
          this.$message.warning("已是第一页")
        } else {
          this.pages--
          this.getNewsList(this.newsTypeId)
        }
      },
      //下一页
      nextClick() {
        if (this.pages >= (Math.ceil(this.totalNews / 10))) {
          this.$message.warning("最后一页")
        } else {
          this.pages++
          this.getNewsList(this.newsTypeId)
        }
      },
      //改变pageSize
      sizeChange(val) {
        console.log(val)
      },
      //currentPage改变时
      currentChange(val) {
        this.pages = val
        this.getNewsList(this.newsTypeId)
      },

      //添加文章
      addArticle() {
        this.contentText = ""
        this.addNavValue = ""
        this.newsId = ""
        this.newsTitle = ""
        this.addNewsTypeId = ""
        this.dialogVisible = true
        setTimeout(() => {
          this.$refs.ue.editor.body.innerHTML = this.contentText
        }, 200)
      },
      //获取导航栏信息
      getNavigationBar() {
        getNavigationBar().then(data => {
          this.navList = data.data
        })
      },
      //  获取新闻模块名字
      getNewsType(val) {
        this.newsTypeId = ''
        getNewsType({classificationId: val}).then(data => {
          this.newsList = data.data
        })
      },
      //  获取文章列表
      getNewsList(newsTypeId) {
        if (newsTypeId == '') {
          this.navValue = ''
        }
        getNewsList({newsTypeId: newsTypeId, page: this.pages, pageSize: 10}).then(data => {
          console.log(data.data.records);
          data.data.records.forEach(item => {
            item.createTime = parseTime(new Date(item.createTime).getTime())
          })
          this.articleList = data.data.records
          this.totalNews = data.data.total
        })
      },
      //筛选文章
      screen() {
        this.pages = 1
        this.getNewsList(this.newsTypeId)
      },
      //  修改录入文章
      saveNews() {
        if (this.addNavValue == '') {
          this.$message.warning("请选择文章主页面")
          return
        }
        if (this.addNewsTypeId == '') {
          this.$message.warning("请选择新闻模块")
          return
        }
        if (this.newsTitle == '') {
          this.$message.warning("请填写文章标题")
          return
        }
        this.contentText = this.$refs.ue.getUEContent()
        saveNews({
          classificationId: this.addNavValue,
          newsId: this.newsId,
          htmlFile: this.contentText,
          newsTitle: this.newsTitle,
          newsTypeId: this.addNewsTypeId
        }).then(data => {
          this.getNewsList()
          this.$message.success('操作成功！')
          this.addNewsTypeId = this.addNewsTypeIds
          this.addNavValue = ''
          this.addNewsTypeId = ''
          this.newsTitle = ''
          this.newsId = ''
          this.contentText = ''
          this.addNewsList = []
        })
        this.dialogVisible = false
      },
      //获取导航栏信息--添加修改
      addGetNavigationBar() {
        getNavigationBar().then(data => {
          this.addNavList = data.data
        })
      },
      //  获取新闻模块名字--添加修改
      addGetNewsType(val) {
        this.newsTypeId = ''
        if (this.Wtitle == '添加文章') {
          this.addNewsTypeId = ''
        }
        getNewsType({classificationId: val}).then(data => {
          this.addNewsList = data.data
        })
      },
      //编辑
      look(val) {
        this.addNavValue = val.classificationId
        this.addNewsTypeId = val.newsTypeId
        this.newsTitle = val.newsTitle
        this.newsId = val.newsId
        this.getNews(val.createTime, val.newsId, val.newsTypeId)
      },
      //  获取文章详情
      getNews(createTime, newsId, newsTypeId) {
        getNews({newsTypeId: newsTypeId, createTime: createTime, newsId: newsId}).then(data => {
          this.contentText = data.data
          this.$refs.ue.editor.body.innerHTML = this.contentText
        })
      },
      //  删除文章
      deleteNews(newsId) {
        this.$confirm('是否删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteNews({newsId: newsId}).then(data => {
            this.getNewsList(this.newsTypeId)
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //  Dialog 关闭动画结束时的回调
      closedd() {
        this.addNavValue = ''
        this.addNewsTypeId = this.addNewsTypeIds
        this.addNewsTypeId = ''
        this.newsTitle = ''
        this.newsId = ''
        this.contentText = ''
        this.addNewsList = []
      }
    },
    watch: {
      navValue(val) {
        this.getNewsType(val)
      },
      addNavValue(val) {
        this.addGetNewsType(val)
      },
    },
    created() {
      if (!getToken("X-Token")) {
        this.$message.warning("登录失效，请重新登录！")
        window.location = '#/adminLogin'
      }
      this.getNavigationBar()
      this.getNewsList()
      this.addGetNavigationBar()

    }
  }
</script>

<style scoped>
  .articleBox {
  }

  .articleBox .articleTitle {
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .articleBox .enterArticles {
    margin-left: 50px;
    cursor: pointer;
  }

  .articleBox .enterArticles:hover {
    color: #004B44;
    font-weight: bold;
    font-size: 17px;
  }

  .articleBox .bottomBox {
    text-align: center;
    margin-top: 50px;
  }

  /*  分页*/
  .pagination_box {
    width: 100%;
    margin-bottom: 100px;
    margin-top: 30px;
  }

  .pagination {
    /*display: inline-block;*/
    width: 450px;
    margin: 0 auto;
  }
</style>
