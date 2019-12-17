<template>
  <div class="adminBox">
    <div class="loginBox">
      <p class="adminTitle">登录后台管理</p>
      <el-form label-width="80px">
        <el-form-item label="用户名：">
          <el-input v-model="userName" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="userPwd" placeholder="请输入密码" show-password clearable></el-input>
        </el-form-item>
      </el-form>
      <span class="login" @click="loginByAccount()">登录</span>
    </div>
  </div>
</template>

<script>
  import {loginByAccount} from "@/api/administration";
  import {sha256_digests} from '../../uitlis/sha256'
  import {setToken} from '../../uitlis/auth'


  export default {
    name: "index",
    data() {
      return {
        userName: '',
        userPwd: ''
      }
    },
    methods: {
      loginByAccount() {
        if (this.userName === '' || this.userPwd === '') {
          this.$message.warning('用户名或密码不能为空！')
          this.userPwd = ''
        } else {
          loginByAccount({
            username: this.userName,
            password: sha256_digests(this.userPwd),
            userIdenty: 1
          }).then(res => {
            console.log(res);
            if (res.code == '200') {
              this.userPwd = ''
              //将用户token保存到vuex中
              this.userToken = res.token;
              console.log(this.$store)
              this.$store.state.XToken = this.userToken
              this.$store.state.ifLOGIN = true
              setToken(this.userToken)
              window.location = '#/adminIndex'
              this.$message.success('登录成功！');
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .adminBox {
    background-color: #999999;
    position: fixed;
    height: 100%;
    width: 100%;
  }

  .loginBox {
    width: 500px;
    height: 300px;
    background-color: #004B44;
    margin: 0 auto;
    transform: translateY(50%);
    border-radius: 10px;

  }

  .loginBox .adminTitle {
    text-align: center;
    padding: 30px 0 40px;
    color: #FFFFFF;
    font-weight: bold;
  }

  /*  登录按钮*/
  .loginBox .login {
    width: 70px;
    height: 30px;
    line-height: 30px;
    background-color: #FFFFFF;
    color: #004B44;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
    display: block;
    cursor: pointer;
  }

</style>
