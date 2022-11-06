import createIngredientsArray from "./createIngredientsArray";

/**
 * Returns an array of recipes with formatted data
 * @param {*} recipes
 * @returns
 */
export default function mapRecipes(recipes) {
  return recipes.map((recipe) => ({
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
  }));
}
