import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISubCategory,ISubCategoryResponse,/* ISubCategoryResponseObject */ } from "../model/subcategories";

export const SubCategoriesApi = createApi({
  reducerPath: "SubCategoriesApi",
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
  tagTypes: ["SubCategory"],
  endpoints: (builder) => ({

    createCategory: builder.mutation<ISubCategoryResponse, ISubCategory>({
      query: (subCategory) => ({
        url: "/v1/base/sub-category",
        method: "POST",
        body: subCategory,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    getCategories: builder.query<ISubCategoryResponse, {id: string}>({
        query: () => ({
          url: "/v1/base/sub-category/",
          method: "GET",
        }),
        providesTags: ["SubCategory"],
      }),
      
    updateCategory: builder.mutation<ICategoryResponse,{ id: string; category: ICategory }>({
      query: ({ id, category }) => ({
        url: `/v1/base/category/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<ICategoryResponse, string>({
        query: (id) => ({
            url: `/v1/base/category/${id}`,
            method: "DELETE",
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
    
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} = CategoriesApi;