<template>
  <div id="app">
<!--    <Head/>-->
    <router-view/>
<!--    <Footer/>-->
  </div>
</template>

<script>
  import Head from "@/components/content/head"
  import Footer from "@/components/content/footer"
  // var ue = UE.getEditor('editor');


  export default {
    name: 'App',
    components: {
      Head,
      Footer
    }
  }
</script>

<style>

</style>
