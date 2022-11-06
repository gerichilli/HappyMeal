/**
 * Return an array of ingredients,
 * each ingredient is an object with name and measure of an ingredient
 * @param {*} recipeData
 * @returns
 */

export default function createIngredientsArray(recipeData) {
  return Object.keys(recipeData).reduce((acc, key, index) => {
    if (key.startsWith("strIngredient") && recipeData[key]) {
      acc.push({
        name: recipeData[key],
        measure: recipeData[`strMeasure${index + 1}`],
      });
    }

    return acc;
  }, []);
}
