<template>
    <div>
        <Swiper :modules="[EffectCards, EffectCube, Pagination, Autoplay]"
        effect="cards"
        :grab-cursor="true"
        :loop="true"
        :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
        }"
        :cards-effect="{
          shadow: true,
          slideShadows: true
        }"
        :pagination="true"
        >
            <SwiperSlide v-for="photo in photos">
                <h2 class="cousin-name">{{ photo.name}}</h2>
                <img :src="`src/assets/cuisines/${photo.src}`" alt="" />
            </SwiperSlide>

        </Swiper>

    </div>
  </template>

  <script>
  import {Swiper, SwiperSlide} from "swiper/vue";
  import {EffectCube} from "swiper"
  import { EffectCards, Pagination, Autoplay } from 'swiper';

  import "swiper/css/effect-cube";
  import 'swiper/css/effect-cards';
  import "swiper/css/pagination"
  import "swiper/css";

    export default{

      data() {
        return {
          photos: [
          {src:"asian-cuisine.jpg", name:"Asian cousin"},
          {src:"polish-cuisine.jpg", name:"Polish cousin"},
          {src:"italian-cuisine.jpg", name:"Italian cousin"}
          ],
          EffectCube: EffectCube,
          EffectCards: EffectCards,
          Pagination: Pagination,
          Autoplay: Autoplay
        };
    },

      components: { Swiper, SwiperSlide },
      modules: {EffectCards, EffectCube, Pagination, Autoplay}
}
  </script>

  <style lang="scss" scoped >

  .swiper{
    width: 550px;
    height: 600px;
    overflow: visible;
  }

  .swiper-slide img{
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  .cousin-name{
    position: absolute;
    padding: 10px;
    font-weight: 500;
    color: pink;
    width: 100%;
  }



  </style>
