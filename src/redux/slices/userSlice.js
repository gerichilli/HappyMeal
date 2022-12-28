import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin, postGoogleLogin, postRegister, postLogout } from "../../services/authService";
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

const initialState = {
  account: {
    accessToken: "",
    refreshToken: "",
    displayName: "",
    email: "",
    userId: "",
    emailVerified: false,
    photoUrl: "",
    isAuthenticated: false,
    isLoading: false,
    isError: false,
  },
  toastMessage: "",
  bookmarks: {
    list: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAuth.pending, (state) => {
        state.account.isLoading = true;
        state.account.isError = false;
      })
      .addCase(fetchUserAuth.fulfilled, (state, action) => {
        state.account = {
          ...state.account,
          accessToken: action?.payload?.accessToken,
          refreshToken: action?.payload?.refreshToken,
          displayName: action?.payload?.displayName,
          email: action?.payload?.email,
          userId: action?.payload?.userId,
          emailVerified: action?.payload?.emailVerified,
          photoUrl: action?.payload?.photoUrl,
          isAuthenticated: true,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(fetchUserAuth.rejected, (state, action) => {
        state.account.isLoading = false;
        state.account.isError = true;
        state.toastMessage = action.payload;
      });

    builder.addCase(fetchUserLogout.fulfilled, (state, action) => {
      state.account = {
        ...state.account,
        accessToken: "",
        refreshToken: "",
        displayName: "",
        email: "",
        userId: "",
        emailVerified: false,
        photoUrl: "",
        isAuthenticated: false,
        isLoading: false,
        isError: false,
      };
      state.bookmarks.list = [];
    });

    builder.addCase(fetchBookmarks.fulfilled, (state, action) => {
      state.bookmarks.list = action.payload;
    });

    builder.addCase(addBookmark.fulfilled, (state, action) => {
      state.bookmarks.list = action.payload;
    });

    builder.addCase(removeBookmark.fulfilled, (state, action) => {
      state.bookmarks.list = action.payload;
    });
  },
});

export default userSlice.reducer;
