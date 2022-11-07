import axios from "../utils/axiosCustomize";

export async function getCategoryList() {
  return axios.get("getCategories");
}

export async function getAreaList() {
  return axios.get("getAreas");
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

export async function getRecipesById(id) {
  return axios.get(`getRecipeById?id=${id}`);
}
