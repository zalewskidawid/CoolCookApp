<template>
  <v-container fluid class="fill-height">
    <v-card class="mx-auto pa-8" max-width="500" subtitle="Something more about me...">
      <img :src="photoUrl" alt="devPhoto"/>
      <h1>Hello I'm <span>{{ name }}</span> </h1>
      <slot>
        <h2>&lt&ltWrite more information here&gt&gt</h2>
      </slot>
      <v-card-actions>
        <v-btn  @click="goBack()" >go back</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    name: String,
    photoUrl: String,
  },
  methods: {
    goBack(){
      this.$router.push({ path: '/Contact'});
    }
  },
  components: {},
};
</script>

<style lang="scss" scoped>
img {
  width: 300px;
  height: 350px;
}
</style>
