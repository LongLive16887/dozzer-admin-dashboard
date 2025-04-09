import { createApi } from "@reduxjs/toolkit/query/react";
import { ISubCategory,ISubCategoryResponse,/* ISubCategoryResponseObject */IDeleteSubCategoryResponse } from "../model/subcategories";
import {IGetSubCategoryResponse} from "../model/subcategories";
import { baseQueryWithReauth } from "./baseQuery";

export const SubCategoriesApi = createApi({
  reducerPath: "SubCategoriesApi",
  baseQuery: baseQueryWithReauth,
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

    getSubCategories: builder.query<IGetSubCategoryResponse, {id: string}>({
        query: ({id}) => ({
          url: `/v1/base/sub-category/${id}`,
          method: "GET",
        }),
        providesTags: ["SubCategory"],
      }),
      
    updateSubCategory: builder.mutation<ISubCategoryResponse,{id: string; subCategory: ISubCategory}>({
      query: ({ id, subCategory }) => ({
        url: `/v1/base/sub-category/${id}`,
        method: "PUT",
        body: subCategory,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    deleteSubCategory: builder.mutation<IDeleteSubCategoryResponse, string>({
        query: (id) => ({
            url: `/v1/base/sub-category/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["SubCategory"],
    }),
    
  }),
});

export const {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
} = SubCategoriesApi;