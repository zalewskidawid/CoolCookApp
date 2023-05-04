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
          <v-card>
            <v-form @submit.prevent="submitForm" ref="addRecipeForm">
              <h2 class="pb-2">Add your recipe</h2>
              <v-text-field v-model="title" :rules="[v => !!v || 'Title is required']"
                            label="Recipe title"></v-text-field>
              <v-textarea v-model="description" :rules="[v => !!v || 'Description is required']"
                          label="Recipe description"></v-textarea>
              <v-select
                v-model="selectedCategories"
                :items="categories"
                label="Categories"
                multiple
                chips
              ></v-select>
              <div v-for="(step, index) in steps" :key="index">
                <v-text-field
                  v-model="step.description"
                  :rules="[v => !!v || 'Step description is required']"
                  :label="'Step ' + (index + 1)"
                  :placeholder="'Step ' + (index + 1)"
                ></v-text-field>
                <v-btn class="my-3 mb-6" @click="removeStep(index)">Remove step</v-btn>
              </div>
              <v-btn @click="addStep" class="mb-6">Add step</v-btn>
              <v-text-field v-model="newIngredientName" :rules="[v => !!v || 'Ingredient is required']"
                            label="Click to add Ingredient name" class="ingredient-input"
                            @click="showIngredientPopup"></v-text-field>
              <v-text-field v-model="newIngredientAmount" :rules="[v => !!v || 'Amount is required']"
                            label="Amount"></v-text-field>
              <v-select
                v-model="newIngredientWeightType"
                :items="weightTypes"
                label="Weight type"
              ></v-select>
              <v-btn @click="addIngredient" class="mb-6">Add ingredient</v-btn>
              <div v-for="(ingredient, index) in ingredients" :key="index">
                <v-text-field
                  v-model="ingredient.name"
                  :rules="[v => !!v || 'Ingredient is required']"
                  label="Click to add Ingredient name"
                  class="ingredient-input"
                ></v-text-field>
                <v-text-field
                  v-model="ingredient.amount"
                  label="Amount"
                ></v-text-field>
                <v-select
                  v-model="ingredient.weightType"
                  :items="weightTypes"
                  label="Weight type"
                ></v-select>
                <v-btn @click="removeIngredient(index)">Remove ingredient</v-btn>
              </div>
              <div class="pt-5">
                <v-btn type="submit">Submit</v-btn>
              </div>
            </v-form>
          </v-card>
        </v-window-item>
        <v-window-item
          key="2"
          value="tab-2"
        >
          <v-card>
            <div v-for="recipe in recipes" :key="recipe.id">
              <Recipe :title="recipe.title"
                      :categories="recipe.categories"
                      :description="recipe.description"
                      :id="recipe.id"
              ></Recipe>
            </div>
          </v-card>
        </v-window-item>
        <v-window-item
          key="3"
          value="tab-3"
        >
          <v-card>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
    <BasePopup :base-dialog="baseDialog" @close-popup="closeIngredientsPopup">
      <v-text-field @input="filterIngredients" v-model="searchIngredient" label="Search Ingredient"
                    placeholder="Ingredient name"></v-text-field>
      <div class="ingredients-search-wrapper">
        <p v-if="filteredArray.length === 0">No ingredients found.</p>
        <div v-for="(ingredient, index) in filteredArray" :key="index" class="my-2">
          <p @click="addIngredientToInput(ingredient)" class="pb-2 ingredient-search-name">{{ ingredient }}</p>
          <v-divider></v-divider>
        </div>
      </div>
    </BasePopup>
    <Popup :dialog="dialog" :errorText="errorText"/>
  </v-container>
</template>
<script>
import {ref, onMounted} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import Popup from '@/components/Popup.vue';
import BasePopup from "@/layouts/default/BasePopup";
import Recipe from "@/components/RecipesPage/Recipe";

export default {
  data() {
    return {
      tab: null,
      text: 'dsadsadas',
      searchIngredient: '',
      filteredArray: this.databaseIngredients
    }
  },
  methods: {
    closeIngredientsPopup() {
      this.baseDialog = false;
      this.searchIngredient = '';
      this.filteredArray = this.databaseIngredients;
    },
    addIngredientToInput(ingredient) {
      this.newIngredientName = ingredient;
      this.baseDialog = false;
    },
    filterIngredients() {
      this.filteredArray = [];
      this.databaseIngredients.filter(el => {
        if (el.toString().startsWith(this.searchIngredient)) {
          this.filteredArray.push(el);
        }
      })
    }
  },
  setup() {
    const {replace} = useRouter();
    let errorText = ref('');
    let dialog = ref(false);
    let baseDialog = ref(false);
    const title = ref('');
    const description = ref('');
    const selectedCategories = ref([]);
    const categories = ref(['Appetizers', 'Main dishes', 'Desserts']);
    const steps = ref([{description: ''}]);
    const newIngredientName = ref('');
    const newIngredientAmount = ref('');
    const newIngredientWeightType = ref('');
    const ingredients = ref([]);
    const weightTypes = ref(['grams', 'ounces', 'pounds']);
    const databaseIngredients = ref([]);
    const store = useStore();
    const recipes = ref([{}]);
    const recipesCategories = ref([]);
    // {id: '', title: '', description: '', categories: [''], steps: ['']}


    const addStep = () => {
      steps.value.push({description: ''});
    };

    const removeStep = (index) => {
      steps.value.splice(index, 1);
    };
    const showIngredientPopup = () => {
      baseDialog.value = true;
    }
    const addIngredient = () => {
      if (newIngredientName.value && newIngredientAmount.value && newIngredientWeightType.value) {
        ingredients.value.push({
          name: newIngredientName.value,
          amount: newIngredientAmount.value,
          weightType: newIngredientWeightType.value,
        });
        newIngredientName.value = '';
        newIngredientAmount.value = '';
        newIngredientWeightType.value = '';
      }
    };

    const removeIngredient = (index) => {
      ingredients.value.splice(index, 1);
    }
    const submitForm = async () => {
      dialog.value = false;
      const {valid} = await this.$refs.addRecipeForm.validate()
      if (valid & this.submitted) {
        const recipe = {
          title: title.value,
          description: description.value,
          categories: selectedCategories.value,
          steps: steps.value.map((step) => step.description),
          ingredients: ingredients.value,
        };
        try {
          await store.dispatch('recipeStore/addRecipe', recipe);
          replace('/');
        } catch (err) {
          dialog.value = true;
          errorText.value = err.message || 'Failed to login. Check your data';
        }
      }
    };
    const getIngredientsFromDatabase = async () => {
      dialog.value = false;
      try {
        await store.dispatch('ingredientsStore/getIngredientsFromDatabase');
        store.getters["ingredientsStore/getIngredients"].forEach(el => {
          databaseIngredients.value.push(el);
        })
      } catch (err) {
        dialog.value = true;
        errorText.value = err.message || 'Failed to get ingredients';
      }
    }
    const getRecipesFromDatabase = async () => {
      dialog.value = false;
      try {
        await store.dispatch('recipeStore/getAllRecipes');
        const data = store.getters['recipeStore/getRecipes']
        let parsedData = JSON.parse(JSON.stringify(data))
        const values = (Object.entries(parsedData));

        values.forEach(element => {
          recipes.value.push({id: element[0], ...element[1]});
          recipesCategories.value.push(element[1].categories);
        })
        // const result = JSON.parse(JSON.stringify(recipes.value));

      } catch (err) {
        dialog.value = true;
        errorText.value = err.message || 'Failed to get recipes';
      }
    }
    onMounted(() => {
      if (databaseIngredients.value.length > 0) {
        return
      }
      // if(recipesCategories.value.length > 0) {
      //   return
      // }
      getIngredientsFromDatabase();
      getRecipesFromDatabase();
    })

    return {
      title,
      description,
      selectedCategories,
      categories,
      steps,
      newIngredientName,
      newIngredientAmount,
      newIngredientWeightType,
      ingredients,
      weightTypes,
      addStep,
      removeStep,
      addIngredient,
      removeIngredient,
      submitForm,
      baseDialog,
      databaseIngredients,
      recipesCategories,
      recipes,
      getIngredientsFromDatabase,
      getRecipesFromDatabase,
      showIngredientPopup

    };
  },
  components: {BasePopup, Popup: Popup, Recipe}
}
</script>

<style lang="scss" scoped>
form {
  background: white;
  border: 1px solid white;
  margin: 10px;
  padding: 30px;
}

.ingredient-input {
  cursor: pointer;
}

.ingredients-header {
  background-color: black;
  color: white;
  padding: 0 60px;
}

.ingredient-search-name {
  cursor: pointer;
}
.ingredients-search-wrapper {
  max-height: 250px;
  overflow-y: scroll;
  padding-right: 10px;
}
</style>
