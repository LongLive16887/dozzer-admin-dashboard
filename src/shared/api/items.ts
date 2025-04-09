import { createApi } from "@reduxjs/toolkit/query/react";
import { IGetItemsResponse,IGetItemByIdResponse,IItemSuccesResponse,IItem} from "../model/items";
import { baseQueryWithReauth } from "./baseQuery";

export const ItemsApi = createApi({
  reducerPath: "ItemsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Items"],
  endpoints: (builder) => ({

    createItem: builder.mutation<IItemSuccesResponse, IItem>({
      query: (base) => ({
        url: "/v1/base/item",
        method: "POST",
        body: base,
      }),
      invalidatesTags: ["Items"],
    }),

    getItemById: builder.query<IGetItemByIdResponse, string>({
        query: (id) => ({
          url: `/v1/base/item/${id}`,
          method: "GET",
        }),
        providesTags: ["Items"],
      }),

    getItemsBySubcategory: builder.query<IGetItemsResponse, string>({
      query: (id) => ({
        url: `/v1/base/sub-category/items/${id}`,
        method: "GET",
      }),
      providesTags: ["Items"],
    }),
    
  }),
});

export const {
  useCreateItemMutation,
  useGetItemByIdQuery,
  useGetItemsBySubcategoryQuery,
} = ItemsApi;