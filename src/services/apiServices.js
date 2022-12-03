import axios from "../utils/axiosCustomize";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, Timestamp } from "firebase/firestore";

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

export async function getRecipesByIngredients(ingredients) {
  return axios.get(`getRecipesByIngredients?ingredients=${ingredients}`);
}

export async function getRecipesById(id) {
  return axios.get(`getRecipeById?id=${id}`);
}

export async function getRecipesByName(name) {
  return axios.get(`getRecipesByName?name=${name}`);
}

export async function getAllSavedRecipes(userId) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

      return {
        data: data.savedRecipes,
      };
    } else {
      return [];
    }
  } catch (err) {
    return err.toString();
  }
}

export async function postAddSavedRecipe(recipe, userId) {
  try {
    const recipeData = {
      ...recipe,
      savedAt: Timestamp.fromDate(new Date()),
    };

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // If the user data already exists, add the recipeId to it
      await updateDoc(userRef, {
        savedRecipes: arrayUnion(recipeData),
      });
    } else {
      // If the user data doesn't exist, create it
      await setDoc(userRef, {
        savedRecipes: [recipeData],
      });
    }

    return { data: "Recipe saved." };
  } catch (err) {
    return err.toString();
  }
}

export async function deleteSavedRecipe(recipeId, userId) {
  try {
    const userRef = doc(db, "users", userId);

    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const removeRecipeIndex = data.savedRecipes.findIndex((item) => item.id === recipeId);

      if (removeRecipeIndex > -1) {
        const removeRecipe = data.savedRecipes[removeRecipeIndex];

        await updateDoc(userRef, {
          // Remove the recipe from the user's saved recipes
          savedRecipes: arrayRemove(removeRecipe),
        });

        return {
          data: "Recipe removed.",
        };
      }
    }
  } catch (err) {
    return err.toString();
  }
}
