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
        :reviews="recipe.reviews"
        :review-rate ="recipe.reviewRate"
      ></Recipe>
    </div>
  </v-card>
</template>

<script>
import {ref, onMounted} from "vue";
import {useStore} from "vuex";
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
          let ingredientsString = '';
          let categoriesString = '';
          let stepsArray = '';
          let reviewRate = 0;
          let reviewNumber = 0;
          let reviewArray = ref([]);
          element[1]['ingredients'].forEach(function(el, index) {
            if(index === element[1]['ingredients'].length - 1) {
              ingredientsString = ingredientsString + el.name;
            } else {
              ingredientsString = ingredientsString + el.name + ', ';
            }
          })
          element[1]['categories'].forEach(function(el, index) {
            if(index === element[1]['categories'].length - 1) {
              categoriesString = categoriesString + el;
            } else {
              categoriesString = categoriesString + el + ', ';
            }
          })
          element[1]['steps'].forEach(function(el, index) {
            if(index === element[1]['steps'].length - 1) {
              stepsArray = stepsArray + (index+1) + '.' + el;
            } else {
              stepsArray = stepsArray + (index+1) + '.' + el + "\n";
            }
          });
          for (const [_, value] of Object.entries(element[1]['reviews'])) {
            reviewRate =  reviewRate + parseInt(value.reviewRate);
            reviewNumber = reviewNumber + 1;
          }
          for (const [_, value] of Object.entries(element[1]['reviews'])) {
            reviewArray.value.push(value);
          }
          recipes.value.push({
            id: element[0],
            reviews: reviewArray,
            reviewRate: (reviewRate / reviewNumber).toFixed(2),
            categories: categoriesString,
            title: element[1]['title'],
            description: element[1]['description'],
            ingredients:  ingredientsString,
            steps: stepsArray
        })
          ;
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
  components: {Popup: Popup, Recipe},
};
</script>

<style lang="scss" scoped></style>
