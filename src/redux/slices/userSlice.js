import { createSlice } from "@reduxjs/toolkit";

import { fetchUserAuth, fetchUserLogout, fetchUserUpdate, fetchUserDelete, fetchBookmarks, addBookmark, removeBookmark } from "../thunks/userThunk";

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
  },
  bookmarks: {
    list: [],
  },
  status: {
    authProcessStatus: "idle",
    logoutProcessStatus: "idle",
    updateProcessStatus: "idle",
    deleteProcessStatus: "idle",
    saveRecipeProcessStatus: "idle",
    removeRecipeProcessStatus: "idle",
  },
  toast: {
    toastMessage: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAuth.pending, (state) => {
        state.status.authProcessStatus = "pending";
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
        };
        state.status.authProcessStatus = "fulfilled";
      })
      .addCase(fetchUserAuth.rejected, (state, action) => {
        state.status.authProcessStatus = "rejected";
        state.toast.toastMessage = action.payload;
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
      };
      state.bookmarks.list = [];
      state.status.logoutProcessStatus = "fulfilled";
    });

    builder
      .addCase(fetchUserUpdate.pending, (state) => {
        state.status.updateProcessStatus = "pending";
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        state.account = {
          ...state.account,
          displayName: action?.payload?.displayName,
          email: action?.payload?.email,
          photoUrl: action?.payload?.photoUrl,
        };
        state.status.updateProcessStatus = "fulfilled";
      })
      .addCase(fetchUserUpdate.rejected, (state, action) => {
        state.status.updateProcessStatus = "rejected";
        state.toast.toastMessage = action.payload;
      });

    builder.addCase(fetchUserDelete.fulfilled, (state, action) => {
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
      };
      state.bookmarks.list = [];
      state.status.deleteProcessStatus = "fulfilled";
    });

    builder.addCase(fetchBookmarks.fulfilled, (state, action) => {
      state.bookmarks.list = action.payload;
    });

    builder
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.status.saveRecipeProcessStatus = "fulfilled";
        state.bookmarks.list = action.payload;
      })
      .addCase(addBookmark.rejected, (state, action) => {
        state.status.saveRecipeProcessStatus = "rejected";
      });

    builder
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.status.removeRecipeProcessStatus = "fulfilled";
        state.bookmarks.list = action.payload;
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        state.status.removeRecipeProcessStatus = "rejected";
        state.toastMessage = action.payload;
      });

    builder.addDefaultCase((state) => {
      state.status.authProcessStatus = "idle";
      state.status.logoutProcessStatus = "idle";
      state.status.updateProcessStatus = "idle";
      state.status.deleteProcessStatus = "idle";
      state.status.saveRecipeProcessStatus = "idle";
      state.status.removeRecipeProcessStatus = "idle";

      state.toast.toastMessage = "";
    });
  },
});

export default userSlice.reducer;
