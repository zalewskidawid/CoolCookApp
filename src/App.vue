<template>
  <v-app>
    <v-main>
      <MainSlider class="test" ></MainSlider>
  <app-bar/>
  <div class="something">
  <router-view  />
</div>
  </v-main>
</v-app>
</template>

<script>
  import AppBar from '@/layouts/default/AppBar.vue'
  import MainSlider from '@/components/HomePage/MainSlider.vue';
  export default{
    components: {
      AppBar, MainSlider
    }
  }
</script>



<style lang="scss" scoped >

.test{
  position: absolute;
  z-index: 0;
}
.something{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  // background-image: url("https://gico.io/spcica/images/main-slider/1.jpg");
  // background-color: black;
  // opacity: 0.8;
  background-repeat: repeat-y;
  background-blend-mode: darken;
  // background-size:contain;
  background-size:cover;
  padding-top: 80px;
  min-height: 100vh;

}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

</style>
