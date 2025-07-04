import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { API_BASE_URL } from "../constants/api";
import { RootState } from "@/app/store";
import { authTokenChange, logoutUser } from "@/shared/hooks/authSlice";

// Базовый запрос с токеном
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.usedToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const isUnauthorizedError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") return false;

  const err = error as FetchBaseQueryError;

  return (
    err?.status === 401 ||
    (typeof err?.data === "object" &&
      (err.data as any)?.status === 401)
  );
};


export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  const authState = (api.getState() as RootState).auth;
  
  if (isUnauthorizedError(result.error)) {
    if (!authState.refreshToken) return result;

    const refreshBaseQuery = fetchBaseQuery({ baseUrl: API_BASE_URL });

    const refreshResult = await refreshBaseQuery(
      {
        url: "/v1/refresh-token",
        method: "POST",
        body: {
          refresh_token: authState.refreshToken,
        },
      },
      api,
      extraOptions
    );

    const tokenData = (refreshResult.data as any)?.data?.token;
    
    if (tokenData?.Access && tokenData?.Refresh) {
      api.dispatch(
        authTokenChange({
          accessToken: tokenData.Access,
          refreshToken: tokenData.Refresh,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
    }
  }

  return result;
};
