import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import userReducer from "./slices/userSlice";
import recipeReducer from "./slices/recipeSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["account"], // only account will be persisted
};

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
  recipes: recipeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PURGE"],
      },
    }),
});

export const persistor = persistStore(store);
