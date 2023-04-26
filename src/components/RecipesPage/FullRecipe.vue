<template>
    <v-container fluid>
      <v-card
      :loading="loading"
      width="66vw"
      height="66vh"
      class="mx-auto my-12"
    >
      <v-img
        cover
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
  
      <v-card-item>
        <v-card-title>{{ title }}</v-card-title>
  
        <v-card-subtitle>
          <span class="me-1">{{ categories }}</span>
  
          <v-icon
            color="error"
            icon="mdi-fire-circle"
            size="small"
          ></v-icon>
        </v-card-subtitle>
      </v-card-item>
  
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :model-value="4.5"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>
  
          <div class="text-grey ms-4">
            4.5 (413)
          </div>
        </v-row>
  
        <div class="my-4 text-subtitle-1">
           Categories: • {{ categories }} •
        </div>
  
        <div>{{ description }}</div>
      </v-card-text>
  
      <v-divider class="mx-4 mb-1"></v-divider>
      <v-card-actions>
        <router-link :to="`/Recipes`">
        <v-btn
          color="deep-purple-lighten-2"
          variant="text"
        >
          Go back
        </v-btn>
      </router-link>
      </v-card-actions>
    </v-card>
    </v-container>
  </template>
  
  <script>
  
  export default {
      props: ['title', 'categories', 'description','id'],
      mounted() {
    let data = this.$route.params.data;
    console.log("data is", data);
  }
  
    }
  </script>
  
  <style lang="scss" scoped>
  </style>
  