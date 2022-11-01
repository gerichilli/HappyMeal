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
