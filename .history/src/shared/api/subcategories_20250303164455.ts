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

    createSubCategory: builder.mutation<ISubCategorySuccesResponse, ISubCategory>({
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
        transformResponse: (response: any): ISubCategoryResponse => {
          if (!response || typeof response !== "object" || response.error === undefined || !response.data) {
              throw new Error("Некорректный формат ответа API");
          }
          return response as ISubCategoryResponse;
      },
        providesTags: ["SubCategory"],
      }),
      
    updateSubCategory: builder.mutation<ISubCategorySuccesResponse,{id: string; subCategory: ISubCategory}>({
      query: ({ id, subCategory }) => ({
        url: `/v1/base/sub-category/${id}`,
        method: "PUT",
        body: subCategory,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    deleteSubCategory: builder.mutation<ISubCategorySuccesResponse, string>({
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