import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLastestRecipes, getRandomRecipes, getCategoryList, getAreaList, getIngredientList } from "../../services/apiServices";
import mapRecipes from "../../utils/mapRecipes";

export const fetchLastestRecipes = createAsyncThunk("recipes/fetchLastestRecipes", async (payload) => {
  const res = await getLastestRecipes();

  if (res && res.status === 200 && res.data.length > 0) {
    return mapRecipes(res.data);
  } else {
    return [];
  }
});

export const fetchRandomRecipes = createAsyncThunk("recipes/fetchRandomRecipes", async (payload) => {
  const res = await getRandomRecipes();

  if (res && res.status === 200 && res.data.length > 0) {
    return mapRecipes(res.data);
  } else {
    return [];
  }
});

export const fetchCategoryList = createAsyncThunk("recipes/fetchCategoryList", async (payload) => {
  const res = await getCategoryList();

  if (res && res.status === 200 && res.data.length > 0) {
    return res.data;
  } else {
    return [];
  }
});

export const fetchAreaList = createAsyncThunk("recipes/fetchAreaList", async (payload) => {
  const res = await getAreaList();

  if (res && res.status === 200 && res.data.length > 0) {
    return res.data;
  } else {
    return [];
  }
});

export const fetchIngredientList = createAsyncThunk("recipes/fetchIngredientList", async (payload) => {
  const res = await getIngredientList();

  if (res && res.status === 200 && res.data.length > 0) {
    return res.data;
  } else {
    return [];
  }
});
