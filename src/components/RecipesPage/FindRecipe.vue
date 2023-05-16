<template>
        <div v-for="recipe in filterdRecipes" :key="recipe.id">
      <Recipe
        :title="recipe.title"
        :categories="recipe.categories"
        :description="recipe.description"
        :id="recipe.id"
      ></Recipe>
    </div>
    <div id="ingredients">

    </div>
    <v-btn @click="showIngredientPopup">Add ingredient</v-btn>
    <v-btn @click="findRecipes">Find recipe</v-btn>
    <BasePopup :base-dialog="baseDialog" @close-popup="closeIngredientsPopup">
      <v-text-field @input="filterIngredients" v-model="searchIngredient" label="Search Ingredient"
                    placeholder="Ingredient name"></v-text-field>
      <div class="ingredients-search-wrapper">
        <p v-if="!filteredArray">No ingredients found.</p>
        <div v-for="(ingredient, index) in filteredArray" :key="index" class="my-2">
          <p @click="addIngredientToInput(ingredient)" class="pb-2 ingredient-search-name">{{ ingredient }}</p>
          <v-divider></v-divider>
        </div>
      </div>
    </BasePopup>
</template>

<script>
import Recipe from "@/components/RecipesPage/Recipe";
import BasePopup from "@/layouts/default/BasePopup";

export default {
    data(){
        return {
            recipes: [],
            filterdRecipes: [],
            result :[],
            baseDialog : false,
            filteredArray: this.databaseIngredients,
            databaseIngredients : [],
            
        }
    },
    methods:{
        closeIngredientsPopup() {
      this.baseDialog = false;
      this.searchIngredient = '';
      this.filteredArray = this.databaseIngredients;
    },
    addIngredientToInput(ingredient) {
      const ingredients = document.querySelector('#ingredients');
      const h2 = document.createElement('h2');
      const childArray = [];
      ingredients.childNodes.forEach(element=>{
        childArray.push(element.innerText);
      })

      if(!childArray.includes(ingredient)){
        h2.innerText = ingredient;
        ingredients.appendChild(h2);
      }
      this.baseDialog = false;
    },
        showIngredientPopup(){
      this.baseDialog = true;
    },
        filterIngredients() {
      this.filteredArray = [];
      this.databaseIngredients.filter(el => {
        if (el.toString().startsWith(this.searchIngredient)) {
          this.filteredArray.push(el);
        }
      })
    },
    findRecipes(){
        const ingredients = document.querySelector('#ingredients');
        const selectedIngredients = [];
        ingredients.childNodes.forEach(element=>selectedIngredients.push(element.innerText))
        console.log(selectedIngredients);

        const testArray = ['olive oil', 'coca cola', 'tomatoes'];
        const isFounded = testArray.some(element => selectedIngredients.includes(element));

        if(isFounded){
            console.log(`Recipe founded with ingredients: ${testArray}`)
            
        }

        this.recipes = [];
        this.filterdRecipes = [];
        this.getRecipesFromDatabase(selectedIngredients);

    },

      async getRecipesFromDatabase(selectedIngredients){
    //   dialog.value = false;
      try {
        await this.$store.dispatch("recipeStore/getAllRecipes");
        const data = this.$store.getters["recipeStore/getRecipes"];
        let parsedData = JSON.parse(JSON.stringify(data));
        const values = Object.entries(parsedData);

        values.forEach((element) => {
          console.log(selectedIngredients);
          this.recipes.push({ id: element[0], ...element[1] });

        });
        const result = (JSON.parse(JSON.stringify(this.recipes)));
        console.log(result);

        result.forEach((element,index)=>{
            const ingredientsArray = [];
            element.ingredients.forEach(el=>{
                ingredientsArray.push(el.name);
                console.log(ingredientsArray); 
            })

            const isFounded = ingredientsArray.some(element => selectedIngredients.includes(element));
                console.log(isFounded);

                if(isFounded){
                    console.log(index);
                    this.filterdRecipes.push(this.recipes[index]);
                    console.log(this.filterdRecipes)
                    return;
                    
                } 
        })
        
      } catch (err) {
        // dialog.value = true;
        // errorText.value = err.message || "Failed to get recipes";
      }
    },

    async getIngredientsFromDatabase(){
    //   this.dialog = false;
      try {
        await this.$store.dispatch('ingredientsStore/getIngredientsFromDatabase');
        this.$store.getters["ingredientsStore/getIngredients"].forEach(el => {
          this.databaseIngredients.push(el);
        })
      } catch (err) {
        // this.dialog = true;
        // this.errorText = err.message || 'Failed to get ingredients';
      }

    },

    },
    mounted(){
        this.getIngredientsFromDatabase();
        this.filteredArray = this.databaseIngredients;

    },
    components: {Recipe, BasePopup}
    
};
</script>

