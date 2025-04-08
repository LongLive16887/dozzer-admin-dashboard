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

  console.log(authState)

  if (result.error && result.error.status === 401) {
    if (!authState.token || !authState.refreshToken) return result;

    // Update token to use refresh token
    store.dispatch(adjustUsedToken(authState.refreshToken as string));

    // Try to refresh the token
    const refreshResult = await baseQuery("/refresh-token", store, extraOptions);

    if (refreshResult.data) {
      // Store the new tokens
      store.dispatch(
        authTokenChange({
          accessToken: (refreshResult.data as any).accessToken,
          refreshToken: authState.refreshToken as string,
        })
      );
      // Retry the original request
      result = await baseQuery(args, store, extraOptions);
    } else {
      store.dispatch(logoutUser());
    }
  }
  return result;
};