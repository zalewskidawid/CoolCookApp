export default {
  async userRegistration(context, payload) {
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDuJ0Qx43BlfF87oAAtGbKXwjSfQuuTo8';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      })
    });
    const responseData = await response.json();
    if(!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to register. Check your data'
      );
      throw error;
    }
    context.commit('provideUserData', responseData);
    context.commit('setUserLoginStatus', true);
  },
  async userLogin(context, payload) {
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDuJ0Qx43BlfF87oAAtGbKXwjSfQuuTo8';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      })
    });
    const responseData = await response.json();
    if(!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to register. Check your data'
      );
      throw error;
    }
    context.commit('provideUserData', responseData);
    context.commit('setUserLoginStatus', true);
  },
  logout(context) {
    context.commit('userLogout', {});
    context.commit('setUserLoginStatus', false);
  }
}
