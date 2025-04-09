// apis/index.ts

import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { API_BASE_URL } from "../constants/api";
import { RootState } from "@/app/store";
import { adjustUsedToken, authTokenChange, logoutUser } from "@/shared/hooks/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.usedToken;
        console.log(token)
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});


export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions);

  const authState = (store.getState() as RootState).auth;

  if (result.error && result.error.status === 401) {
    if (!authState.token || !authState.refreshToken) return result;

    // Обновляем usedToken на refreshToken
    store.dispatch(adjustUsedToken(authState.refreshToken as string));

    // Пробуем обновить токены
    const refreshResult = await baseQuery("/refresh-token", store, extraOptions);

    const tokenData = (refreshResult.data as any)?.data?.token;

    if (tokenData?.Access && tokenData?.Refresh) {
      // Сохраняем новые токены
      store.dispatch(
        authTokenChange({
          accessToken: tokenData.Access,
          refreshToken: tokenData.Refresh,
        })
      );

      // Повторяем оригинальный запрос
      result = await baseQuery(args, store, extraOptions);
    } else {
      store.dispatch(logoutUser());
    }
  }

  return result;
};