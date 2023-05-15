<template>
  <v-card>
    <div v-for="recipe in recipes" :key="recipe.id">
      <Recipe
        :title="recipe.title"
        :categories="recipe.categories"
        :description="recipe.description"
        :ingredients="recipe.ingredients"
        :steps="recipe.steps"
        :id="recipe.id"
      ></Recipe>
    </div>
  </v-card>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import Popup from "@/components/Popup.vue";
import Recipe from "@/components/RecipesPage/Recipe";

export default {
  setup() {
    let errorText = ref("");
    let dialog = ref(false);
    const store = useStore();
    const recipes = ref([{}]);
    const recipesCategories = ref([]);

    const getRecipesFromDatabase = async () => {
      dialog.value = false;
      try {
        await store.dispatch("recipeStore/getAllRecipes");
        const data = store.getters["recipeStore/getRecipes"];
        let parsedData = JSON.parse(JSON.stringify(data));
        const values = Object.entries(parsedData);

        values.forEach((element) => {
          recipes.value.push({ id: element[0], ...element[1] });
          recipesCategories.value.push(element[1].categories);
        });
        // const result = JSON.parse(JSON.stringify(recipes.value));
      } catch (err) {
        dialog.value = true;
        errorText.value = err.message || "Failed to get recipes";
      }
    };
    onMounted(() => {
      getRecipesFromDatabase();
    });

    return {
      recipesCategories,
      recipes,
      getRecipesFromDatabase,
    };
  },
  components: { Popup: Popup, Recipe },
};
</script>

<style lang="scss" scoped></style>
