import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBase,IBaseResponse,IBaseResponseObject } from "../model/base";


export const BaseApi = createApi({
  reducerPath: "BaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api1.dozzer.uz/api",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");

      const apiKey = import.meta.env.VITE_API_KEY;
      if (apiKey) {
        headers.set("Authorization", `Bearer ${apiKey}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Base"],
  endpoints: (builder) => ({

    createBase: builder.mutation<IBaseResponse, IBase>({
      query: (base) => ({
        url: "/v1/new/base",
        method: "POST",
        body: base,
      }),
      invalidatesTags: ["Base"],
    }),

    getBases: builder.query<IBaseResponse, void>({
        query: () => ({
          url: "/v1/new/bases",
          method: "GET",
        }),
        providesTags: ["Base"],
      }),

    getBaseById: builder.query<IBaseResponse, {id: string}>({
      query: () => ({
        url: `/v1/new/base/${id}`,
        method: "GET",
      }),
      providesTags: ["Base"],
    }),
      
    updateBase: builder.mutation<IBaseResponse,{ id: string; base: IBase }>({
      query: ({ id, base }) => ({
        url: `/v1/new/base/${id}`,
        method: "PUT",
        body: base,
      }),
      invalidatesTags: ["Base"],
    }),

    deleteCategory: builder.mutation<ICategoryResponse, string>({
        query: (id) => ({
            url: `/v1/base/category/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["Base"],
    }),
    
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} = BaseApi;