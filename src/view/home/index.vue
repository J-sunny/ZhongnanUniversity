<template>
  <div class="Box">
    <Index></Index>
  </div>
</template>

<script>
  // 首页
  import Index from '@/components/content/index/index'

  export default {
    name: 'index',
    data() {
      return {}
    },
    components: {
      Index,
    }
  }
</script>

<style scoped>
  .Box {
  }

  /*Logo*/
  .Box .logo {
    height: 108px;
    width: 1200px;
    margin: 0 auto;
    /*background-color: red;*/
    position: relative;
  }

  .Box .logo .logoPic {
    display: block;
    width: 359px;
    height: 84px;
    position: absolute;
    top: 50%;
    margin-top: -42px;
  }

  /*  Tab标签页*/
  .Box .tabBox {
    width: 100%;
    /*background-color: #F6F7F7;*/
  }

  .Box .tabBox .tabSmall {
    /*display: block;*/
    /*width: 1200px;*/
    /*margin: 0 auto;*/
  }

  /*  底部*/
  .Box .footer {
    width: 100%;
    height: 275px;
    background-image: url("../../../static/images/TU.png");
    background-size: 100% 100%;
  }

  .Box .footerBox {
    width: 100%;
    height: 275px;
    background-color: #075A52;
    background-color: #075A52;
    opacity: 0.92;
  }

  .Box .smallFooter {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    color: #FFFFFF;
  }

  .Box .smallFooter .footerLeft {
    float: left;
  }

  .Box .smallFooter .footerLeft .footerLeftBox {
    margin-top: 32px;
  }

  .Box .smallFooter .footerLeft p {

    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 32px;

    opacity: 1;
  }

  .Box .smallFooter .footerright {
    width: 400px;
    float: right;
    text-align: center;
    overflow: hidden;
  }

  .Box .smallFooter .footerright .linkTitle {
    margin-top: 52px;
    margin-bottom: 20px;
  }

  .Box .smallFooter .footerright a {
    float: left;
    font-size: 14px;
    color: #FFFFFF;
    width: 100px;
    display: inline-block;
    text-decoration: none;
    line-height: 30px;
  }

  /*  copyright*/
  .Box .copyright {
    width: 100%;
    height: 48px;
    background: #004B44;
    opacity: 1;
    text-align: center;
    line-height: 48px;
    color: #FFFFFF;
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }


</style>
