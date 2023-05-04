export default {
  async getIngredientsFromDatabase(context) {
    const response = await fetch(
      `https://coolcookapp-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json`
    );
    const responseData = await response.json();
    if(!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to get ingredients'
      );
      throw error;
    }
    context.commit('setIngredients', responseData);
  }
}
