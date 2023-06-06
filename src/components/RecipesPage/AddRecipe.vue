<template>
              <v-card>
            <v-form @submit.prevent="submitForm" ref="addRecipeForm">
              <h2 class="pb-2">Add your recipe</h2>
              <v-text-field v-model="title" :rules="titleRules"
                            label="Recipe title"></v-text-field>
              <v-textarea v-model="description" :rules="descriptionRules"
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
                  :rules="stepRules"
                  :label="'Step ' + (index + 1)"
                  :placeholder="'Step ' + (index + 1)"
                ></v-text-field>
                <v-btn class="my-3 mb-6" @click="removeStep(index)">Remove step</v-btn>
              </div>
              <v-btn @click="addStep" class="mb-6">Add step</v-btn>
              <v-text-field v-model="newIngredientName" :rules="[v => !!v || 'Ingredient is required']"
                            label="Click to add Ingredient name" class="ingredient-input"
                            @click="showIngredientPopup"></v-text-field>
              <v-text-field v-model="newIngredientAmount"  :rules="amountRules"
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
                  :rules="amountRules"

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
    <Popup :dialog="dialog" :errorText="errorText"/>

  </template>

  <script>
import Popup from '@/components/Popup.vue';
import BasePopup from "@/layouts/default/BasePopup";

export default {
  data() {
    return {
      tab: null,
      searchIngredient: '',
      filteredArray: this.databaseIngredients,
      errorText: '',
      dialog : false,
      baseDialog : false,
      title : '',
      description : '',
      selectedCategories : [],
      categories : ['Appetizers', 'Main dishes', 'Desserts'],
      steps : [{description: ''}],
      newIngredientName : '',
      newIngredientAmount : '',
      newIngredientWeightType : '',
        ingredients : [],
      weightTypes : ['grams', 'ounces', 'pounds'],
      databaseIngredients : [],
      titleRules: [value => {
        if (!value) {
          return 'You must enter a title.';
        } else if (value.length < 2) {
          return 'Title length must be greater than one.'
        } else if (value.length > 40) {
          return 'Title length must be lower than fourty.'
        }
        else if (!(/^[a-zA-Z]'?([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]|\.| |-)+$/.test(value))) {
          return 'Title cannot contain any number and special chars.'
        }
      },
      ],
      descriptionRules: [value => {
        if (!value) {
          return 'You must enter a description.';
        } else if (value.length < 2) {
          return 'Description length must be greater than one.'
        }
      },
      ],
      stepRules: [value => {
        if (!value) {
          return 'You must enter a step.';
        } else if (value.length < 2) {
          return 'Step length must be greater than one.'
        } else if (value.length > 200) {
          return 'Step length must be lower than two hundred.'
        }
        else if (/[!@#$%^&*()_+\-?/'":><.,]/.test(value)) {
          return 'Step cannot contain any special chars.'
        }

      },
      ],
      amountRules: [value => {
        if (!value) {
          return 'You must enter a amount.';
        }
        else if (!/^[0-9]+$/.test(value)) {
          return 'Amount must contain only numbers.'
        }
         else if (value.length > 6) {
          return 'Amount length must be lower than six chars.'
        }
      },
      ]

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
    },

    addStep() {
      this.steps.push({description: ''});
    },
    removeStep(index) {
      this.steps.splice(index, 1);
    },
    showIngredientPopup(){
      this.baseDialog = true;
    },
    addIngredient(){
      if (this.newIngredientName && this.newIngredientAmount && this.newIngredientWeightType) {
        this.ingredients.push({
          name: this.newIngredientName,
          amount: this.newIngredientAmount,
          weightType: this.newIngredientWeightType,
        });
        this.newIngredientName = '';
        this.newIngredientAmount = '';
        this.newIngredientWeightType = '';
      }
    },
    removeIngredient(index){
      this.ingredients.splice(index, 1);
    },
    async submitForm(){
      this.dialog = false;
      const {valid} = await this.$refs.addRecipeForm.validate()
      if (valid) {
        const recipe = {
          title: this.title,
          description: this.description,
          categories: this.selectedCategories,
          steps: this.steps.map((step) => step.description),
          ingredients: this.ingredients,
        };
        try {
          await this.$store.dispatch('recipeStore/addRecipe', recipe);
          this.$router.replace('/');
        } catch (err) {
          this.dialog = true;
          this.errorText = err.message || 'Failed to login. Check your data';
        }
      }
    },
    async getIngredientsFromDatabase(){
      this.dialog = false;
      try {
        await this.$store.dispatch('ingredientsStore/getIngredientsFromDatabase');
        this.$store.getters["ingredientsStore/getIngredients"].forEach(el => {
          this.databaseIngredients.push(el);
        })
      } catch (err) {
        this.dialog = true;
        this.errorText = err.message || 'Failed to get ingredients';
      }

    }
  },
  mounted(){
          if (this.databaseIngredients.length > 0) {
        return
      }
    this.getIngredientsFromDatabase();
    this.filteredArray = this.databaseIngredients;
  },
  components: {BasePopup, Popup: Popup}
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
