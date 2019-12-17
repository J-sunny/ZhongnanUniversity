<template>
  <div class="Box">
    <!--    Logo-->
    <div class="logo">
      <img class="logoPic" src="../../../../static/images/LOGO.png" alt="">
    </div>
    <div class="tabsBox">
      <ul class="tabSmall" v-if="">
        <li class="tabBar" v-for="item in navList" :key="item.classificationId"
            :class="$store.state.classificationId==item.classificationId?'activeStyle':''">
          <label @click="links(item,item.classificationId,item.classificationName)">{{item.classificationName}}</label>
          <div class="hoverBox">
            <p @click="linkTo(item.classificationId,val.newsTypeId,item.classificationName)" class="hoverLists"
               v-for="val in item.newsTypes"
               :key="val.newsTypeId">
              {{val.newsType}}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
  import Footer from "@/components/content/footer"
  import {getNavigationBar, getNewsType} from '@/api/index'

  export default {
    name: 'index',
    data() {
      return {
        navList: [],
        getNewsTypeList: [],
        hidden: true
      }
    },
    components: {
      Footer
    },
    methods: {


      links(item, id, classificationName) {
        console.log(item)
        if (item.newsTypes == []) {
          if (id == '1') {
            window.location = '#/home'
          }
        }
        else {
          if (id == '1') {
            window.location = '#/home'
          } else if (id == '2') {
            window.location = '#/centre?newsTypeId=' + item.newsTypes[0].newsTypeId
          } else if (id == '3') {
            window.location = '#/personnel?newsTypeId=' + item.newsTypes[0].newsTypeId
          } else {
            window.location = '#/socialServices?picId=' + id + '&ids=0&listID=' + this.$store.state.listID
          }
        }
        this.$store.state.newsTypeId = ''
        this.$store.state.classificationId = id
        this.$store.state.classificationName = classificationName
        // console.log(this.$store.state)
        this.$store.addStore()

        // console.log(id);

      },
      linkTo(classificationId, newsTypeId, classificationName) {
        // console.log(classificationId, newsTypeId, classificationName)
        console.log(newsTypeId)
        this.$store.state.newsTypeId = newsTypeId
        this.$store.state.classificationId = classificationId
        this.$store.state.classificationName = classificationName
        // console.log(this.$store.state)
        this.$store.addStore()
        if (classificationId == '1') {
          window.location = '#/home'
        } else if (classificationId == '2') {
          window.location = '#/centre?newsTypeId=' + newsTypeId
        } else if (classificationId == '3') {
          if (newsTypeId == 3) {
            console.log(newsTypeId);
            window.location = '#/personnel/index?newsTypeId=' + newsTypeId
          }
          if (newsTypeId == 4) {
            console.log(newsTypeId);

            window.location = '#/personnel/researcher?newsTypeId=' + newsTypeId
          }
        } else {
          window.location = '#/socialServices?picId=' + classificationId + '&ids=0&listID=' + this.$store.state.newsTypeId
        }
      },

    },
    created() {

      getNavigationBar().then(data => {
        // console.log(data);
        this.navList = data.data
      })
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
  .Box .tabsBox {
    width: 100%;
    background-color: #F6F7F7;
    height: 48px;
  }

  .Box .tabsBox .tabSmall {
    display: block;
    width: 1200px;
    margin: 0 auto;
    background-color: #F6F7F7;
  }

  .Box .tabsBox .tabSmall li {
    float: left;
    list-style: none;
    /*padding: 0 32px;*/
    width: 128px;
    line-height: 48px;
    text-align: center;
    position: relative;
  }

  .Box .tabsBox .tabSmall li:hover {
    background-color: #075A52;
  }

  .Box .tabsBox .tabSmall li:hover label {
    color: #FFFFFF;
  }


  .Box .tabsBox .tabSmall li label {
    display: inline-block;
    width: 128px;
    text-decoration: none;
    color: #000000;
    font-size: 16px;
    opacity: 1;
    cursor: pointer;
    /*border-right: 1px solid #333333;*/
  }

  .Box .tabsBox .tabSmall .activeStyle {
    background: #075A52;
    opacity: 1;
  }

  .Box .tabsBox .tabSmall .activeStyle label {
    color: #FFFFFF;
  }

  .Box .tabSmall .tabBar:hover .hoverLists {
    display: block;
  }

  .hoverBox {
    width: 128px;
    position: absolute;
    background-color: #FFFFFF;
  }

  .hoverBox .hoverLists {
    display: none;
  }

  .hoverBox .hoverLists:hover {
    background-color: #075A52;
    color: #FFFFFF;
  }

  /*  底部*/
  .Box .footer {
    width: 100%;
    height: 275px;
    background-image: url("../../../../static/images/TU.png");
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

