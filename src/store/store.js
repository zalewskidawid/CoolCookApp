import { createStore } from 'vuex';
import authStore from './auth/index';
import recipeStore from './recipes/index'

const store = createStore({
  modules: {
    authStore,
    recipeStore
  }
});

export default store;
