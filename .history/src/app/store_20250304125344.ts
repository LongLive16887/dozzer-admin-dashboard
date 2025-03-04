import { configureStore } from "@reduxjs/toolkit";
import { CategoriesApi , SubCategoriesApi,BaseApi} from "@/shared/api";
import { languageReducer } from "@/shared/hooks";

export const store = configureStore({
  reducer: {
    [CategoriesApi.reducerPath]: CategoriesApi.reducer,
    [SubCategoriesApi.reducerPath]: SubCategoriesApi.reducer,
    [BaseApi.reducerPath]: BaseApi.reducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Optional: Configure if you need to handle non-serializable values
      serializableCheck: {
        // Ignore specific actions or paths if needed
        ignoredActions: [],
        ignoredPaths: [],
      },
    }).concat([
      CategoriesApi.middleware,
      SubCategoriesApi.middleware
    ]),
  // Explicitly configure devTools based on environment
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;