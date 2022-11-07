import createIngredientsArray from "./createIngredientsArray";

/**
 * Return a formatted recipe
 */

export default function formatRecipe(recipe) {
  return {
    id: recipe.idMeal,
    title: recipe.strMeal,
    drinkAlternate: recipe.strDrinkAlternate,
    category: recipe.strCategory,
    area: recipe.strArea,
    instructions: recipe.strInstructions,
    youtube: recipe.strYoutube,
    thumbnail: recipe.strMealThumb,
    tags: recipe.strTags ? recipe.strTags.split(",") : [],
    ingredients: createIngredientsArray(recipe),
  };
}
