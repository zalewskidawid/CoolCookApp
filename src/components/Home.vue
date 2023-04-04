<template>
  <v-container fluid class="">
  <h1>{{ this.tittle }}</h1>
  <Slider></Slider>
  </v-container>
</template>

<script>
import Slider from '@/components/Slider.vue'
  export default{
    data() {
        return {
            tittle: "Home Page content"
        };
    },
    components: { Slider }
}
</script>

<style lang="scss" scoped >

h1{
  margin-bottom: 100px;
}

</style>
