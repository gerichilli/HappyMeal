const { doc, getDoc, updateDoc, arrayRemove } = require("firebase/firestore");
const { db } = require("./firebase");

exports.handler = async (event, context) => {
  try {
    const { recipeId, userId } = JSON.parse(event.body);
    const userRef = doc(db, "users", userId);

    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const removeRecipeIndex = data.savedRecipes.findIndex((item) => item.id === recipeId);

      if (removeRecipeIndex > -1) {
        const removeRecipe = data.savedRecipes[removeRecipeIndex];

        await updateDoc(userRef, {
          // Remove the recipe from the user's saved recipes
          savedRecipes: arrayRemove(removeRecipe),
        });

        return {
          statusCode: 200,
          body: "Recipe removed.",
        };
      }
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
