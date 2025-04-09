import { createApi } from "@reduxjs/toolkit/query/react";
import { ICategory, ICategoryResponse, IGetCategoryResponse, IDeleteCategoryResponse } from "../model/categories";
import { baseQueryWithReauth } from "./baseQuery";
export const CategoriesApi = createApi({
  reducerPath: "CategoriesApi",
  baseQuery: baseQueryWithReauth,
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

    getCategories: builder.query<IGetCategoryResponse, void>({
      query: () => ({
        url: "/v1/base/category",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    updateCategory: builder.mutation<ICategoryResponse, { id: string; category: ICategory }>({
      query: ({ id, category }) => ({
        url: `/v1/base/category/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<IDeleteCategoryResponse, string>({
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