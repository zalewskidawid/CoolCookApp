import { createStore } from 'vuex';
import authStore from './auth/index';

const store = createStore({
  modules: {
    authStore
  }
});

export default store;
