<template>
  <v-container fluid>
    <Swiper
      :modules="[EffectCube, Pagination, Autoplay]"
      effect="cube"
      :grab-cursor="true"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :cards-effect="{
        shadow: true,
        slideShadows: true,
      }"
      :pagination="false"
    >
      <SwiperSlide
        @click="goToAboutDev(dev.pathName)"
        v-for="dev in developers"
        v-bind:key="dev.id"
      >
        <v-card
          loading
          :title="dev.name"
          :subtitle="dev.role"
          :text="dev.shortInfo"
          variant="outlined"
        >
          <v-btn prepend-icon="mdi-information" variant="tonal">
            Click for more information
          </v-btn>
          <v-avatar style="margin: 15px"
            size="100"
            color="grey-darken-3"
            :image="dev.src"
          ></v-avatar>
        </v-card>
      </SwiperSlide>
    </Swiper>
  </v-container>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCube } from "swiper";
import { Pagination, Autoplay } from "swiper";
import AvatarsSrc from "../../main";

import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css";

export default {
  data() {
    return {
      developers: [
        {
          src: AvatarsSrc.DW_AVATAR_URL,
          name: "Dawid Wymoczyło",
          pathName: "DawidWymoczylo",
          shortInfo:
            "Hello there",
          role: "Front-end developer",
          id: 1,
        },
        {
          src: AvatarsSrc.DZ_AVATAR_URL,
          name: "Dawid Zalewski",
          pathName: "DawidZalewski",
          shortInfo:
            "IT is my passion, I love to do some exercises and eat good kraftowy kebab",
          role: "Front-end developer",
          id: 2,
        },
        {
          src: AvatarsSrc.MW_AVATAR_URL,
          name: "Michał Wnorowski",
          pathName: "MichalWnorowski",
          shortInfo: "A young programmer who wants to develop his skills towards front-end.",
          role: "Front-end developer",
          id: 3,
        },
      ],
      AvatarSrc: AvatarsSrc,
      EffectCube: EffectCube,
      Pagination: Pagination,
      Autoplay: Autoplay,
    };
  },
  methods: {
    goToAboutDev(name) {
      this.$router.push({ path: `/Contact/${name}` });
    },
  },
  components: { Swiper, SwiperSlide },
  modules: { EffectCube, Pagination, Autoplay },
};
</script>

<style lang="scss" scoped>
.buttonInfo {
  color: red;
}

.swiper {
  width: 400px;
  height: 400px;
  overflow: visible;
  margin-bottom: 100px;
}

.swiper-slide {
  background-color: salmon;
  width: 100%;
  height: 100%;
}
.v-card {
  margin: 10px;
  padding: 10px;
  background-color: pink;
  width: 90%;
  height: 90%;
}
</style>
