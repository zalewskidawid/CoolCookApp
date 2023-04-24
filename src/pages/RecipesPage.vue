<template>
  <v-container fluid>
    <v-card
      class="mx-auto pa-8"
      max-width="600"
    >
      <v-form @submit.prevent="submitForm">
        <h2 class="pb-2">Add your recipe</h2>
        <v-text-field v-model="title" label="Recipe title"></v-text-field>
        <v-textarea v-model="description" label="Recipe description"></v-textarea>
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
            :label="'Step ' + (index + 1)"
            :placeholder="'Step ' + (index + 1)"
          ></v-text-field>
          <v-btn class="my-3 mb-6" @click="removeStep(index)">Remove step</v-btn>
        </div>
        <v-btn @click="addStep" class="mb-6">Add step</v-btn>
        <v-text-field v-model="newIngredientName" label="Click to add Ingredient name" class="ingredient-input" @click="showIngredientPopup"></v-text-field>
        <v-text-field v-model="newIngredientAmount" label="Amount"></v-text-field>
        <v-select
          v-model="newIngredientWeightType"
          :items="weightTypes"
          label="Weight type"
        ></v-select>
        <v-btn @click="addIngredient" class="mb-6">Add ingredient</v-btn>
        <div v-for="(ingredient, index) in ingredients" :key="index">
          <v-text-field
            v-model="ingredient.name"
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
      <BasePopup :dialog="baseDialog">
        {{databaseIngredients}}
      </BasePopup>
      <Popup :dialog="dialog" :errorText="errorText"/>
    </v-card>
  </v-container>
</template>
<script>
import { ref, onMounted } from 'vue';
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';
import Popup from '@/components/Popup.vue';
import BasePopup from "@/layouts/default/BasePopup";
export default {
  setup() {
    const { replace } = useRouter();
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
    };
    const getIngredientsFromDatabase = async () => {
      dialog.value = false;
      try{
        await store.dispatch('ingredientsStore/getIngredientsFromDatabase');
        store.getters["ingredientsStore/getIngredients"].forEach(el => {
          databaseIngredients.value.push(el);
        })
      } catch (err) {
        dialog.value = true;
        errorText.value = err.message || 'Failed to get ingredients';
      }
    }
    onMounted(()=> {
      if(databaseIngredients.value.length > 0) {
        return
      }
      getIngredientsFromDatabase();
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
      getIngredientsFromDatabase,
      showIngredientPopup
    };
  },
  components: {BasePopup, Popup: Popup}
}
</script>

<style lang="scss" scoped >
form {
  background: white;
  border: 1px solid white;
  margin: 10px;
  padding: 30px;
}
.ingredient-input {
  cursor: pointer;
}
</style>
