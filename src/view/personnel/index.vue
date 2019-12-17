<template>
    <div class="personnel">
      <InstitutionalPersonnel/>
    </div>
</template>

<script>
  //机构人员
  import InstitutionalPersonnel from '@/components/content/institutionalPersonnel/InstitutionalPersonnel'
  export default {
    name: 'personnel',
    components:{
      InstitutionalPersonnel
    }
  }
</script>

<style scoped>

</style>
