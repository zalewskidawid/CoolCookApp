<template>
  <v-app>
    <v-main>
  <app-bar/>
  <router-view />
  </v-main>
</v-app>
</template>

<script>
  // import AppBar from '@/layouts/default/AppBar.vue';
  import AppBar from '@/layouts/default/AppBar.vue'
  export default{
    components: {
      AppBar
    }
  }
</script>



<style lang="scss" scoped >

*{
  background-image: url("https://gico.io/spcica/images/main-slider/1.jpg");

}



</style>
