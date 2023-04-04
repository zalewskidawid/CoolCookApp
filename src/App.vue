<template>
  <v-app>
    <v-main>
  <app-bar/>
  <div class="something">
  <router-view  />
</div>
  </v-main>
</v-app>
</template>

<script>
  import AppBar from '@/layouts/default/AppBar.vue'
  export default{
    components: {
      AppBar
    }
  }
</script>



<style lang="scss" scoped >

.something{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-image: url("https://gico.io/spcica/images/main-slider/1.jpg");
  background-repeat: repeat-y;
  background-blend-mode: darken;
  // background-size:contain;
  background-size:cover;
  margin-top: 80px;
  min-height: calc( 100vh - 80px);

}

</style>
