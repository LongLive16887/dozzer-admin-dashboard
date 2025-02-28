import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {ICategory,ICategoryResponse /* ,ICategoryResponseObject */} from "../model/categories/index";

export const CategoriesApi = createApi({
  reducerPath: "CategoriesApi",
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
  tagTypes: ["Category"],
  endpoints: (builder) => ({

    createCategory: builder.mutation<ICategoryResponse, ICategory>({
      query: (category) => ({
        url: "/v1/base/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    getCategories: builder.query<ICategoryResponse, void>({
        query: () => ({
          url: "/v1/base/category",
          method: "GET",
        }),
        providesTags: ["Category"],
      }),
      
    updateCategory: builder.mutation<
      ICategoryResponse,
      { id: number; category: ICategory }
    >({
      query: ({ id, category }) => ({
        url: `/v1/admin/feeds/categories/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    /* serveCategoryIcon: builder.query<ICategoryResponse, string>({
      query: (icon_name) => ({
        url: "/v1/admin/feeds/categories/icon",
        params: { icon_name },
      }),
      providesTags: ["Category"],
    }), */
    
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/v1/admin/feeds/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategories,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = CategoriesApi;