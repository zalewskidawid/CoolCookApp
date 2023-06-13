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
          <v-icon>mdi-eye</v-icon>
          Show
        </v-tab>

        <v-tab value="tab-2" @click="checkLoginStatus">
          <v-icon>mdi-plus</v-icon>
          Add
        </v-tab>

        <v-tab value="tab-3">
          <v-icon>mdi-magnify</v-icon>
          Find
        </v-tab>

        <v-tab value="tab-4">
          <v-icon>mdi-star</v-icon>
          Ranking
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item
          key="1"
          value="tab-1"
        >
          <ShowRecipe></ShowRecipe>
        </v-window-item>
        <v-window-item
          key="2"
          value="tab-2"
        >
          <AddRecipe></AddRecipe>
        </v-window-item>
        <v-window-item
          key="3"
          value="tab-3"
        >
          <FindRecipe></FindRecipe>
        </v-window-item>

        <v-window-item
          key="4"
          value="tab-4"
        >
          <RecipesRanking></RecipesRanking>
        </v-window-item>
      </v-window>
    </v-card>

  </v-container>
</template>
<script>

import AddRecipe from "@/components/RecipesPage/AddRecipe.vue";
import ShowRecipe from "@/components/RecipesPage/ShowRecipe.vue";
import FindRecipe from "@/components/RecipesPage/FindRecipe.vue";
import RecipesRanking from "@/components/RecipesPage/RecipesRanking.vue";

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

  components: {ShowRecipe, AddRecipe, FindRecipe, RecipesRanking}
}
</script>
