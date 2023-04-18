export default {
  async addRecipe(context, payload) {
    // const uniqueId = new Date().getTime().toString()+ Math.floor(Math.random() * (9999 - 1000) + 9999);
    let url = `https://coolcookapp-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
        categories: payload.categories,
        steps: payload.steps,
        ingredients: payload.ingredients
      })
    });
    const responseData = await response.json();
    if(!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to add Recipe. Check your data'
      );
      throw error;
    }
  },
}