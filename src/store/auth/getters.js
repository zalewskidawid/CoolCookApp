export default {
  getUserRegData(state) {
    return state.userAuth;
  },
  getUserLoginStatus(state) {
    return state.loggedIn;
  }
}
