import formatRecipe from "./formatRecipe";

/**
 * Returns an array of recipes with formatted data
 * @param {*} recipes
 * @returns
 */
export default function mapRecipes(recipes) {
  return recipes.map((recipe) => formatRecipe(recipe));
}
