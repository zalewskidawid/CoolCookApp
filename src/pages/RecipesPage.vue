<template>
  <v-container fluid >
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
        <v-text-field v-model="newCategory" label="Add new category"></v-text-field>
        <v-btn @click="addCategory" class="mb-6">Add category</v-btn>
        <div v-for="(step, index) in steps" :key="index">
          <v-text-field
            v-model="step.description"
            :label="'Step ' + (index + 1)"
            :placeholder="'Step ' + (index + 1)"
          ></v-text-field>
          <v-btn @click="removeStep(index)">Remove step</v-btn>
        </div>
        <v-btn @click="addStep" class="my-6">Add step</v-btn>
        <v-text-field v-model="newIngredientName" label="Ingredient name"></v-text-field>
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
            label="Name"
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
      <Popup :dialog="dialog" :errorText="errorText"/>
  </v-container>
</template>
<script>
import { ref } from 'vue';
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';
import Popup from '@/components/Popup.vue';
export default {
  data: () => ({
    errorText: '',
    dialog: false,
  }),
  setup() {
    const { replace } = useRouter();
    const title = ref('');
    const description = ref('');
    const selectedCategories = ref([]);
    const categories = ref(['Appetizers', 'Main dishes', 'Desserts']);
    const newCategory = ref('');
    const steps = ref([{description: ''}]);
    const newIngredientName = ref('');
    const newIngredientAmount = ref('');
    const newIngredientWeightType = ref('');
    const ingredients = ref([]);
    const weightTypes = ref(['grams', 'ounces', 'pounds']);
    const store = useStore();


    const addCategory = () => {
      if (newCategory.value && !categories.value.includes(newCategory.value)) {
        categories.value.push(newCategory.value);
        newCategory.value = '';
      }
    };

    const addStep = () => {
      steps.value.push({description: ''});
    };

    const removeStep = (index) => {
      steps.value.splice(index, 1);
    };

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
      this.dialog = false;
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
        // alert(err.message || 'Failed to add recipe.');
        this.dialog = true;
        this.errorText = ('Failed to login. Check your data');
      }
    };

    return {
      title,
      description,
      selectedCategories,
      categories,
      newCategory,
      steps,
      newIngredientName,
      newIngredientAmount,
      newIngredientWeightType,
      ingredients,
      weightTypes,
      addCategory,
      addStep,
      removeStep,
      addIngredient,
      removeIngredient,
      submitForm,
      methods: {
        async createPlanFormData(data) {
          this.isLoading = true;
          try {
            await this.$store.dispatch('plans/addNewPlan', data);
            this.$router.replace('/plans');
          } catch (err) {
            this.isLoading = false;
            this.error = err.message || 'Failed to add new plan.';
          }
        },
        handleError() {
          this.error = null;
        },
      }
    };
  },
  components: {Popup: Popup}
}
</script>

<style lang="scss" scoped >
form {
  background: white;
  border: 1px solid white;
  margin: 10px;
  padding: 30px;
}
</style>
