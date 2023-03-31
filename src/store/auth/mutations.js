export default {
  provideUserData(state, payload) {
    state.userAuth.push(payload);
  },
  setUserLoginStatus(state, payload) {
    state.loggedIn = payload;
  },
  userLogout(state, payload) {
    state.userAuth = payload;
  }
}
