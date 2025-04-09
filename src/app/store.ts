import { configureStore } from "@reduxjs/toolkit";
import { CategoriesApi , SubCategoriesApi,BaseApi,ItemsApi,UserApi,AuthApi} from "@/shared/api";
import { languageReducer } from "@/shared/hooks";
import authReducer from "@/shared/hooks/authSlice"

export const store = configureStore({
  reducer: {
    [CategoriesApi.reducerPath]: CategoriesApi.reducer,
    [SubCategoriesApi.reducerPath]: SubCategoriesApi.reducer,
    [BaseApi.reducerPath]: BaseApi.reducer,
    [ItemsApi.reducerPath]: ItemsApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    language: languageReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        ignoredPaths: [],
      },
    }).concat([
      CategoriesApi.middleware,
      SubCategoriesApi.middleware,
      BaseApi.middleware,
      ItemsApi.middleware,
      AuthApi.middleware,
      UserApi.middleware
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;