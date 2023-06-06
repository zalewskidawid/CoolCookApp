<template>
  <div id="information"></div>
  <div id="recipes">
    <div v-for="recipe in filterdRecipes" :key="recipe.id">
      <Recipe
        :title="recipe.title"
        :ingredients="recipe.ingredients"
        :steps="recipe.steps"
        :categories="recipe.categories"
        :description="recipe.description"
        :id="recipe.id"
        :reviews="recipe.reviews"
        :review-rate="recipe.reviewRate"
      >
      </Recipe>
    </div>
  </div>
  <div id="ingredients"></div>
  <div id="action-buttons">
    <v-btn @click="showIngredientPopup">Add ingredient</v-btn>
    <v-btn @click="findRecipes">Find recipe</v-btn>
  </div>
  <BasePopup :base-dialog="baseDialog" @close-popup="closeIngredientsPopup">
    <v-text-field
      @input="filterIngredients"
      v-model="searchIngredient"
      label="Search Ingredient"
      placeholder="Ingredient name"
    ></v-text-field>
    <div class="ingredients-search-wrapper">
      <p v-if="!filteredArray">No ingredients found.</p>
      <div
        v-for="(ingredient, index) in filteredArray"
        :key="index"
        class="my-2"
      >
        <p
          @click="addIngredientToInput(ingredient)"
          class="pb-2 ingredient-search-name"
        >
          {{ ingredient }}
        </p>
        <v-divider></v-divider>
      </div>
    </div>
  </BasePopup>
</template>

<script>
import Recipe from "@/components/RecipesPage/Recipe";
import BasePopup from "@/layouts/default/BasePopup";

export default {
  data() {
    return {
      recipes: [],
      formattedRecipes: [],
      filterdRecipes: [],
      result: [],
      baseDialog: false,
      filteredArray: this.databaseIngredients,
      databaseIngredients: [],
      selectedIngredients: [],
    };
  },
  methods: {
    closeIngredientsPopup() {
      this.baseDialog = false;
      this.searchIngredient = "";
      this.filteredArray = this.databaseIngredients;
    },
    addIngredientToInput(ingredient) {
      const ingredients = document.querySelector("#ingredients");
      const div = document.createElement("div");
      div.style =
        "text-align: center; width: auto; padding: 10px;border-radius: 20px;background-color: pink;font-weight: 700;margin: 5px; border: solid 2px black;";
      const p = document.createElement("p");
      div.appendChild(p);
      this.searchIngredient = "";
      this.filteredArray = this.databaseIngredients;
      const childArray = [];
      ingredients.childNodes.forEach((element) => {
        childArray.push(element.innerText);
      });

      if (!childArray.includes(ingredient)) {
        p.innerText = ingredient;
        ingredients.appendChild(div);

        this.databaseIngredients.forEach((el, index) => {
          if (this.databaseIngredients[index] === ingredient) {
            this.databaseIngredients.splice(index, 1);
          }
        });
      }
      this.baseDialog = false;
    },
    showIngredientPopup() {
      this.baseDialog = true;
    },
    filterIngredients() {
      this.filteredArray = [];
      this.databaseIngredients.filter((el) => {
        if (el.toString().startsWith(this.searchIngredient)) {
          this.filteredArray.push(el);
        }
      });
    },
    async reloadIngredients() {
      await this.getIngredientsFromDatabase();
      this.filteredArray = this.getIngredientsFromDatabase();
    },
    findRecipes() {
      const ingredients = document.querySelector("#ingredients");
      const selectedIngredients = [];
      ingredients.childNodes.forEach((element) =>
        selectedIngredients.push(element.innerText)
      );

      this.recipes = [];
      this.formattedRecipes = [];
      this.filterdRecipes = [];
      this.reloadIngredients();

      this.getRecipesFromDatabase(selectedIngredients);
      ingredients.innerText = "";
      this.selectedIngredients = [];
      this.selectedIngredients = selectedIngredients;

      this.underlineIngredients();
    },

    underlineIngredients() {
      setTimeout(() => {
        const ingredientsElements = document.querySelectorAll(".ingredients");
        ingredientsElements.forEach((element) => {
          let previousText = element.innerText;
          let newText = previousText;
          this.selectedIngredients.forEach((ingredient) => {
            if (previousText.includes(ingredient)) {
              previousText = newText;
              newText = previousText.replace(
                ingredient,
                `<span style="background-color:pink; border-radius:10px; padding:5px; border: solid 1px black; font-size: 2rem; font-weight: 700;">${ingredient}</span>`
              );
            } else {
              //do nothing
            }
          });
          element.innerHTML = newText;
        });
      }, 1000);
    },

    async getRecipesFromDatabase(selectedIngredients) {
      //   dialog.value = false;
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
          this.formattedRecipes.push({
            id: element[0],
            reviews: reviewArray,
            reviewRate: (reviewRate / reviewNumber).toFixed(2),
            categories: categoriesString,
            title: element[1]["title"],
            description: element[1]["description"],
            ingredients: ingredientsString,
            steps: stepsArray,
          });

          this.recipes.push({ id: element[0], ...element[1] });
        });
        const result = JSON.parse(JSON.stringify(this.recipes));

        result.forEach((element, index) => {
          const ingredientsArray = [];
          element.ingredients.forEach((el) => {
            ingredientsArray.push(el.name);
          });

          const isFounded = ingredientsArray.some((element) =>
            selectedIngredients.includes(element)
          );

          if (isFounded) {
            const information = document.querySelector("#information");
            this.filterdRecipes.push(this.formattedRecipes[index]);
            information.innerText = "";
            return;
          } 
          // else if (!isFounded) {
          //   information.innerText = "No Recipes found";
          // }
        });
      } catch (err) {
        // dialog.value = true;
        // errorText.value = err.message || "Failed to get recipes";
      }
    },

    async getIngredientsFromDatabase() {
      //   this.dialog = false;
      const array = [];
      this.databaseIngredients = [];
      try {
        await this.$store.dispatch(
          "ingredientsStore/getIngredientsFromDatabase"
        );
        this.$store.getters["ingredientsStore/getIngredients"].forEach((el) => {
          this.databaseIngredients.push(el);
          array.push(el);

          return array;
        });
      } catch (err) {
        // this.dialog = true;
        // this.errorText = err.message || 'Failed to get ingredients';
      }
    },
  },
  mounted() {
    this.getIngredientsFromDatabase();
    this.filteredArray = this.databaseIngredients;
  },
  components: { Recipe, BasePopup },
};
</script>

<style lang="scss" scoped>
#information {
  text-align: center;
  font-weight: 700;
  color: rebeccapurple;
}
#ingredients {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
#action-buttons {
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
}
</style>
