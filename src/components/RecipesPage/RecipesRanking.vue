<template>
  <div id="action-buttons">
    <span>Choose min rating</span>
    <v-rating
      v-model="rating"
      background-color="orange lighten-1"
      color="blue"
      @input="filterByRate"
    ></v-rating>
    <v-btn @click="findRecipes('top')"><v-icon>mdi-podium</v-icon>top 1</v-btn>
  </div>
  <v-card class="d-flex flex-row flex-wrap">
    <v-checkbox
      v-model="categories.mainDishes"
      label="Main dishes"
      @change="filterByRate"
    ></v-checkbox>

    <v-checkbox
      v-model="categories.desserts"
      label="Desserts"
      @change="filterByRate"
    ></v-checkbox>

    <v-checkbox
      v-model="categories.appetizers"
      label="Appetizers"
      @change="filterByRate"
    ></v-checkbox>

    <v-checkbox
      v-model="categories.all"
      label="All"
      @change="filterByRate"
    ></v-checkbox>
  </v-card>
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
      rating: null,
      categories: {
        mainDishes: true,
        desserts: true,
        appetizers: true,
        all: true
      },

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
          if(typeof element[1]['reviews'] === 'undefined') {
            this.recipes.push({
              id: element[0],
              categories: categoriesString,
              title: element[1]["title"],
              description: element[1]["description"],
              ingredients: ingredientsString,
              steps: stepsArray,
            });
          } else {
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
          }
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


    filterByRate() {
      const selectedRate = this.rating ? parseInt(this.rating) : 0;
      const selectedCategories = Object.values(this.categories).filter(val => val);

      if (selectedCategories.length === 0 && !this.rating) {
        this.filteredRecipes = this.recipes.slice(0, 1);
      } else if (this.categories.all) {
        if (this.rating) {
          this.filteredRecipes = this.recipes.filter(recipe => recipe.reviewRate >= selectedRate);
        } else {
          this.filteredRecipes = this.recipes;
        }
        this.categories = {
          mainDishes: true,
          desserts: true,
          appetizers: true,
          all: true
        };
      } else {
        this.filteredRecipes = this.recipes.filter(recipe => {
          const meetsRate = selectedRate === 0 || recipe.reviewRate >= selectedRate;
          const meetsCategory = (this.categories.mainDishes && recipe.categories.includes('Main dishes')) ||
            (this.categories.desserts && recipe.categories.includes('Desserts')) ||
            (this.categories.appetizers && recipe.categories.includes('Appetizers'));
          return meetsRate && meetsCategory;
        });
        this.categories.all = false;
      }
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

<style lang="scss" scoped>
#action-buttons {
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
  span {
    display: flex;
    align-items: center;
  }
}
</style>
