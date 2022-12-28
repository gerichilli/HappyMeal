import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLatestRecipes, getRandomRecipes } from "../../services/apiServices";

export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes", async (payload) => {});

const initialState = {
  lastestRecipes: [],
  randomRecipes: [],
  list: {
    categories: [],
    areas: [],
    ingredients: [],
  },
};
