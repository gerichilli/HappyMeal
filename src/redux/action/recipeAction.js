export const FETCH_SAVED_RECIPES_SUCCESS = "FETCH_SAVED_RECIPES_SUCCESS";

export const getSavedRecipes = (recipes) => {
  return {
    type: FETCH_SAVED_RECIPES_SUCCESS,
    payload: recipes,
  };
};
