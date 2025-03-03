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

    createSubCategory: builder.mutation<ISubCategoryResponse, ISubCategory>({
      query: (subCategory) => ({
        url: "/v1/base/sub-category",
        method: "POST",
        body: subCategory,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    getSubCategories: builder.query<ISubCategoryResponse, {id: string}>({
        query: ({id}) => ({
          url: `/v1/base/sub-category/${id}`,
          method: "GET",
        }),
        providesTags: ["SubCategory"],
      }),
      
    updateSubCategory: builder.mutation<ISubCategoryResponse,{ id: string; category: ISubCategory }>({
      query: ({ id, subCategory }) => ({
        url: `/v1/base/category/${id}`,
        method: "PUT",
        body: subCategory,
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