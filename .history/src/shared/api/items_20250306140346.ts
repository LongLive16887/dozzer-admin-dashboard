import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetItemsResponse,IGetItemByIdResponse,IItemsSuccesResponse,IItems} from "../model/items";


export const ItemsApi = createApi({
  reducerPath: "ItemsApi",
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
  tagTypes: ["Items"],
  endpoints: (builder) => ({

    createItem: builder.mutation<IItemsSuccesResponse, IItems>({
      query: (base) => ({
        url: "/v1/new/base",
        method: "POST",
        body: base,
      }),
      invalidatesTags: ["Items"],
    }),

    getBases: builder.query<IGetBasesResponse, void>({
        query: () => ({
          url: "/v1/new/bases",
          method: "GET",
        }),
        providesTags: ["Items"],
      }),

    getBaseById: builder.query<IGetBaseResponse, string>({
      query: (id) => ({
        url: `/v1/new/base/${id}`,
        method: "GET",
      }),
      providesTags: ["Items"],
    }),
    
  }),
});

export const {
  useCreateBaseMutation,
  useGetBasesQuery,
  useGetBaseByIdQuery,
} = ItemsApi;