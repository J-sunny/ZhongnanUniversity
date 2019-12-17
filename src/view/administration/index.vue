<template>
  <div class="manageBox">
    <div class="leftBox">
      <div class="manageLeft">
        <div class="manageCon">
          <p @click="loginOut()">退出登录</p>
          <p @click="actives('w')" :class="activeName=='w'?'active':''">
            <router-link to="/adminIndex/article">文章管理
            </router-link>
          </p>
          <p @click="actives('j')" :class="activeName=='j'?'active':''">
            <router-link to="/adminIndex/organizational">机构及人员管理
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="manageRight">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import {loginOut} from "@/api/administration";
  import {removeToken} from '../../uitlis/auth'


  export default {
    name: "index",
    data() {
      return {
        activeName: ''
      }
    },
    methods: {
      //  退出登录
      loginOut() {
        this.$confirm('是否确认退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          loginOut().then(data => {
            console.log(data);
            window.location = '#/adminLogin'
            this.$store.state.isToken = false
            this.$store.state.ifLOGIN = false
            this.$message.success('退出成功');
            removeToken("X-Token")

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
      actives(val) {
        console.log(val);
        this.$store.state.activeName = val
        this.$store.addStore()
        this.activeName=this.$store.state.activeName
      }
    },
    created() {
      // this.$store.state.activeName = 'w'
      // this.$store.addStore()
      console.log(this.$store.state.activeName);
      this.activeName=this.$store.state.activeName

    }

  }
</script>

<style scoped>
  .manageBox {
    /*overflow: hidden;*/
    width: 100%;
    height: 100%;
  }

  .manageBox .leftBox {
    position: fixed;
    /*width: 100%;*/
    height: 100%;
  }

  .manageBox .manageLeft {
    float: left;
    width: 250px;
    height: 100%;
    border-right: 1px solid #999999;
    background-color: #004B44;

  }

  .manageLeft .manageCon {
    margin-top: 100px;
    text-align: center;
  }

  .manageLeft .manageCon p,
  .manageLeft .manageCon a {
    line-height: 30px;
    cursor: pointer;
    font-size: 16px;
    display: block;
    text-decoration: none;
    color: #FFFFFF;
  }

  .manageLeft .manageCon p.active a {
    font-size: 20px;
    font-weight: bold;
  }

  .manageBox .manageRight {
    float: left;
    width: 68%;
    padding-left: 20px;
    box-sizing: border-box;
    margin-left: 250px;
    z-index: 99;
    /*position: absolute;*/
  }
</style>
