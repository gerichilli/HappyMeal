import axios from "../utils/axiosCustomize";

export async function getCategoryList() {
  return axios.get("getCategories");
}

export async function getAreaList() {
  return axios.get("getAreas");
}

export async function getIngredientList() {
  return axios.get("getIngredients");
}

export async function getCategoriesDetail() {
  return axios.get("getCategoriesDetail");
}

export async function getLastestRecipes() {
  return axios.get("getLastestRecipes");
}

export async function getRandomRecipes() {
  return axios.get("getRandomRecipes");
}

export async function getRecipesByCategory(category) {
  return axios.get(`getRecipesByCategory?category=${category}`);
}

export async function getRecipesByArea(area) {
  return axios.get(`getRecipesByArea?area=${area}`);
}

export async function getRecipesByMainIngredient(ingredient) {
  return axios.get(`getRecipesByMainIngredient?ingredient=${ingredient}`);
}

export async function getRecipesById(id) {
  return axios.get(`getRecipeById?id=${id}`);
}
