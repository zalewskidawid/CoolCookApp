<template>
    <swiper :spaceBetween="30" :effect="'fade'" :navigation="false" :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
        }" :pagination="{
        clickable: true,
    }" :modules="modules" class="mySwiper">
        <swiper-slide><img src="src/assets/cuisines/asian-cuisine.jpg" /></swiper-slide><swiper-slide><img
                src="src/assets/cuisines/polish-cuisine.jpg" /></swiper-slide><swiper-slide><img
                src="src/assets/cuisines/italian-cuisine.jpg" /></swiper-slide>
    </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";



// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper';


export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [EffectFade, Navigation, Pagination, Autoplay],
        };
    },
};
</script>
<style lang="scss" scoped >

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  background-repeat: repeat;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

</style>
  