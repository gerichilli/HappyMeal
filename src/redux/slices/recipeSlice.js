import { createSlice } from "@reduxjs/toolkit";

import { fetchLastestRecipes, fetchRandomRecipes, fetchCategoryList, fetchIngredientList, fetchAreaList } from "../thunks/recipeThunk";

const initialState = {
  lastestRecipes: {
    meals: [],
  },
  randomRecipes: {
    meals: [],
  },
  list: {
    categories: [],
    areas: [],
    ingredients: [],
  },
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLastestRecipes.fulfilled, (state, action) => {
      state.lastestRecipes.meals = action.payload;
    });

    builder.addCase(fetchRandomRecipes.fulfilled, (state, action) => {
      state.randomRecipes.meals = action.payload;
    });

    builder.addCase(fetchCategoryList.fulfilled, (state, action) => {
      state.list.categories = action.payload;
    });

    builder.addCase(fetchAreaList.fulfilled, (state, action) => {
      state.list.areas = action.payload;
    });

    builder.addCase(fetchIngredientList.fulfilled, (state, action) => {
      state.list.ingredients = action.payload;
    });
  },
});

export default recipesSlice.reducer;
