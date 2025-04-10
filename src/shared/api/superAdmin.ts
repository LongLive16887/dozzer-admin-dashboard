// apis/superAdminBaseQuery.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/store";
import { API_BASE_URL } from "@/shared/constants/api";
import { createApi } from "@reduxjs/toolkit/query/react";

const superAdminBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const superKey = (getState() as RootState).superAdmin.superKey;
    if (superKey) {
      headers.set("X-SuperAdmin-Key", superKey);
    }
    return headers;
  },
});

export const superAdminApi = createApi({
  reducerPath: "superAdminApi",
  baseQuery: superAdminBaseQuery,
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (body) => ({
        url: "/v1/system-user",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateAdminMutation } = superAdminApi;

