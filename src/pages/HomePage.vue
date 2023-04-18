<template>
  <v-container fluid>
  <HomePageSlider></HomePageSlider>
  
  </v-container>
</template>

<script>
import Slider from '@/components/HomePage/CousinsSlider.vue'
import HomePageSlider from '@/components/HomePage/HomePageSlider.vue'
import MainSlider from '@/components/HomePage/MainSlider.vue'
  export default{
    data() {
        return {
            tittle: "Home Page content"
        };
    },
    components: { Slider, HomePageSlider, MainSlider }
}
</script>

<style lang="scss" scoped >

h1{
  margin-bottom: 100px;
}

</style>
