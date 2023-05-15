<template>
  <v-container fluid>
    <v-card class="mx-auto"
            max-width="600">
      <v-tabs
        v-model="tab"
        bg-color="deep-purple-accent-4"
        centered
        stacked
      >
        <v-tab value="tab-1">
          <v-icon>mdi-plus</v-icon>
          Add recipe
        </v-tab>

        <v-tab value="tab-2">
          <v-icon>mdi-eye</v-icon>
          Show all recipes
        </v-tab>

        <v-tab value="tab-3">
          <v-icon>mdi-star</v-icon>
          Favourties
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item
          key="1"
          value="tab-1"
        >
        <AddRecipe></AddRecipe>
        </v-window-item>
        <v-window-item
          key="2"
          @click="checkLoginStatus"
          value="tab-2"
        >
        <ShowRecipe></ShowRecipe>

        </v-window-item>
        <v-window-item
          key="3"
          value="tab-3"
        >
          <v-card>
            <v-card-text>no content yet</v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>

  </v-container>
</template>
<script>

import AddRecipe from "@/components/RecipesPage/AddRecipe.vue";
import ShowRecipe from "@/components/RecipesPage/ShowRecipe.vue";

export default {
  data() {
    return {
      tab: null,
      
    }
  },
  methods: {
    checkLoginStatus() {
      let loginStatus = this.$store.getters['getUserLoginStatus'];
      if(loginStatus === false) {
        this.$router.replace('/Login');
      }
    }
  },

  components: {ShowRecipe, AddRecipe}
}
</script>
