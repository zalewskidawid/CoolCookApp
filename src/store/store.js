import { createStore } from 'vuex';


const store = createStore({
 state: {
    userRegData: []
 },
  actions: {
    userRegistration(context, payload) {
      context.commit('provideUserData', payload);
      console.log(payload);
    }
  },
  mutations: {
  provideUserData(state, payload) {
    state.userRegData.push(payload);
  }
  },
  getters: {
    getUserRegData(state) {
      return state.userRegData;
    }
  }
});

export default store;
