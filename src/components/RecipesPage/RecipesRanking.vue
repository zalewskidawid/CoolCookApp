<template>
  <div id="action-buttons">
    <v-btn @click="findRecipes('min')"><v-icon>mdi-star</v-icon>sort by best</v-btn>
    <v-btn @click="findRecipes('max')"><v-icon>mdi-star</v-icon>sort by worst</v-btn>
    <v-btn @click="findRecipes('top')"><v-icon>mdi-podium</v-icon>top 1</v-btn>
  </div>
  <div id="recipes">
    <div v-for="recipe in filteredRecipes" :key="recipe.id">
      <Recipe :title="recipe.title" :ingredients="recipe.ingredients" :steps="recipe.steps"
        :categories="recipe.categories" :description="recipe.description" :id="recipe.id" :reviews="recipe.reviews"
        :review-rate="recipe.reviewRate">
      </Recipe>
    </div>
  </div>
</template>

<script>
import Recipe from "@/components/RecipesPage/Recipe";

export default {
  data() {
    return {
      recipes: [],
      filteredRecipes: [],
      result: [],
    };
  },
  methods: {
    findRecipes(type) {
      this.recipes = [];
      this.getRecipesFromDatabase(type);
    },

    async getRecipesFromDatabase(type) {
      try {
        await this.$store.dispatch("recipeStore/getAllRecipes");
        const data = this.$store.getters["recipeStore/getRecipes"];
        let parsedData = JSON.parse(JSON.stringify(data));
        const values = Object.entries(parsedData);

        values.forEach((element) => {
          let ingredientsString = "";
          let categoriesString = "";
          let stepsArray = "";
          let reviewRate = 0;
          let reviewNumber = 0;
          let reviewArray = [];
          element[1]["ingredients"].forEach(function (el, index) {
            if (index === element[1]["ingredients"].length - 1) {
              ingredientsString = ingredientsString + el.name;
            } else {
              ingredientsString = ingredientsString + el.name + ", ";
            }
          });
          element[1]["categories"].forEach(function (el, index) {
            if (index === element[1]["categories"].length - 1) {
              categoriesString = categoriesString + el;
            } else {
              categoriesString = categoriesString + el + ", ";
            }
          });
          element[1]["steps"].forEach(function (el, index) {
            if (index === element[1]["steps"].length - 1) {
              stepsArray = stepsArray + (index + 1) + "." + el;
            } else {
              stepsArray = stepsArray + (index + 1) + "." + el + "\n";
            }
          });
          for (const [_, value] of Object.entries(element[1]["reviews"])) {
            reviewRate = reviewRate + parseInt(value.reviewRate);
            reviewNumber = reviewNumber + 1;
          }
          for (const [_, value] of Object.entries(element[1]["reviews"])) {
            reviewArray.push(value);
          }
          this.recipes.push({
            id: element[0],
            reviews: reviewArray,
            reviewRate: (reviewRate / reviewNumber).toFixed(2),
            categories: categoriesString,
            title: element[1]["title"],
            description: element[1]["description"],
            ingredients: ingredientsString,
            steps: stepsArray,
          });
        });

        switch (type) {
          case "max": {
            this.sortMax();
            break;
          }
          case "min": {
            this.sortMin();
            break;
          }
          case "top": {
            this.sortTop();
            break;
          }
        }

      } catch (err) {

      }
    },
    sortMax() {
      const result = JSON.parse(JSON.stringify(this.recipes));

      const reviewArrayMax = [];
      this.filteredRecipes = [];

      result.forEach((element) => {
        reviewArrayMax.push(element.reviewRate);
      });

      const max = reviewArrayMax.sort(function (a, b) { return a - b; });



      max.forEach((element, index) => {
        this.recipes.forEach((el, ind) => {

          if (element === el.reviewRate) {
            this.filteredRecipes.push(this.recipes[ind])
          }
        })

      })

    },
    sortMin() {
      const result = JSON.parse(JSON.stringify(this.recipes));

      const reviewArrayMin = [];
      this.filteredRecipes = [];

      result.forEach((element) => {
        reviewArrayMin.push(element.reviewRate)
      });

      const min = reviewArrayMin.sort(function (a, b) { return b - a; });



      min.forEach((element, index) => {
        this.recipes.forEach((el, ind) => {

          if (element === el.reviewRate) {
            this.filteredRecipes.push(this.recipes[ind])
          }
        })

      })

    },
    sortTop() {
      const result = JSON.parse(JSON.stringify(this.recipes));

      const reviewArrayMin = [];
      this.filteredRecipes = [];

      result.forEach((element) => {
        reviewArrayMin.push(element.reviewRate)
      });

      const min = reviewArrayMin.sort(function (a, b) { return b - a; });
      const array = [];

      min.forEach((element) => {
        this.recipes.forEach((el, ind) => {

          if (element === el.reviewRate) {
            array.push(this.recipes[ind]);
          }
        })

      })
      const finalArray = array.slice(0,1);
      this.filteredRecipes = finalArray;

    }
  },
  mounted() {
    this.findRecipes('min');
  },
  components: { Recipe },
};
</script>

<style>
#action-buttons {
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
}
</style>
