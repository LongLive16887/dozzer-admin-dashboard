import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { API_BASE_URL } from "../constants/api";
import { RootState } from "@/app/store";
import { adjustUsedToken, authTokenChange, logoutUser } from "@/shared/hooks/authSlice";

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

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result)
  const authState = (api.getState() as RootState).auth;
  console.log(authState)
  if (result.error && result.error.status === 401) {
    if (!authState.refreshToken) return result;

    // ⚠️ Отправляем refreshToken запрос без Authorization
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

    console.log("refreshResult", refreshResult);

    const tokenData = (refreshResult.data as any)?.data?.token;

    if (tokenData?.Access && tokenData?.Refresh) {
      // Сохраняем новые токены
      api.dispatch(
        authTokenChange({
          accessToken: tokenData.Access,
          refreshToken: tokenData.Refresh,
        })
      );

      // Повторяем запрос с новым accessToken
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
    }
  }

  return result;
};
