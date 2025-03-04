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

    createCategory: builder.mutation<ICategoryResponse, ICategory>({
      query: (category) => ({
        url: "/v1/base/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Base"],
    }),

    getCategories: builder.query<ICategoryResponse, void>({
        query: () => ({
          url: "/v1/base/category",
          method: "GET",
        }),
        providesTags: ["Base"],
      }),
      
    updateCategory: builder.mutation<ICategoryResponse,{ id: string; category: ICategory }>({
      query: ({ id, category }) => ({
        url: `/v1/base/category/${id}`,
        method: "PUT",
        body: category,
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