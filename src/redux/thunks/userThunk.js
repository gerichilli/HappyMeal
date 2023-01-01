import { createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin, postGoogleLogin, postRegister, postLogout, postUpdateProfileInfo, deleteAccount } from "../../services/authService";
import { getAllSavedRecipes, postAddSavedRecipe, deleteSavedRecipe } from "../../services/apiServices";

export const fetchUserAuth = createAsyncThunk("user/fetchUserAuth", async (payload, { rejectWithValue }) => {
  if (payload.method === "google") {
    const res = await postGoogleLogin();

    if (res.EC === 0 && res.data) {
      return res.data;
    } else {
      return rejectWithValue(res.EM);
    }
  } else if (payload.type === "register") {
    const res = await postRegister(payload.displayName, payload.email, payload.password);

    if (res.EC === 0 && res.data) {
      return res.data;
    } else {
      return rejectWithValue(res.EM);
    }
  } else {
    const res = await postLogin(payload.email, payload.password);

    if (res.EC === 0 && res.data) {
      return res.data;
    } else {
      return rejectWithValue(res.EM);
    }
  }
});

export const fetchUserLogout = createAsyncThunk("user/fetchUserLogout", async (payload, { rejectWithValue }) => {
  const res = await postLogout();

  if (res.EC === 0 && res.data) {
    return res.data;
  } else {
    return rejectWithValue(res.EM);
  }
});

export const fetchUserUpdate = createAsyncThunk("user/fetchUserUpdate", async (payload, { rejectWithValue }) => {
  const res = await postUpdateProfileInfo(payload.displayName, payload.email, payload.profilePicture);

  if (res.EC === 0 && res.data) {
    return res.data;
  } else {
    return rejectWithValue(res.EM);
  }
});

export const fetchUserDelete = createAsyncThunk("user/fetchUserDelete", async (payload, { rejectWithValue }) => {
  const res = await deleteAccount();

  if (res.EC === 0 && res.data) {
    return res.data;
  } else {
    return rejectWithValue(res.EM);
  }
});

export const fetchBookmarks = createAsyncThunk("bookmarks/fetchBookmarks", async (payload) => {
  const res = await getAllSavedRecipes(payload);

  if (res.EC === 0 && res.data) {
    return res.data;
  }
});

export const addBookmark = createAsyncThunk("bookmarks/addBookmark", async (payload) => {
  const res = await postAddSavedRecipe(payload.recipe, payload.userId);

  if (res.EC === 0 && res.data) {
    return res.data;
  }
});

export const removeBookmark = createAsyncThunk("bookmarks/removeBookmark", async (payload) => {
  const res = await deleteSavedRecipe(payload.recipeId, payload.userId);

  if (res.EC === 0 && res.data) {
    return res.data;
  }
});
