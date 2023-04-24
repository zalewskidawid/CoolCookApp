import { createStore } from 'vuex';
import authStore from './auth/index';
import recipeStore from './recipes/index'
import ingredientsStore from './ingredients/index'

const store = createStore({
  modules: {
    authStore,
    recipeStore,
    ingredientsStore
  }
});

export default store;
