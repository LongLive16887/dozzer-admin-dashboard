import { configureStore } from "@reduxjs/toolkit";
import { CategoriesApi , SubCategoriesApi,BaseApi,ItemsApi,UserApi,AuthApi,superAdminApi} from "@/shared/api";
import { languageReducer,authReducer,superAdminReducer } from "@/shared/hooks";

export const store = configureStore({
  reducer: {
    [CategoriesApi.reducerPath]: CategoriesApi.reducer,
    [SubCategoriesApi.reducerPath]: SubCategoriesApi.reducer,
    [BaseApi.reducerPath]: BaseApi.reducer,
    [ItemsApi.reducerPath]: ItemsApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [superAdminApi.reducerPath]: superAdminApi.reducer,
    language: languageReducer,
    auth: authReducer,
    superAdmin: superAdminReducer
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
      UserApi.middleware,
      superAdminApi.middleware
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;