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

    createBase: builder.mutation<ICreateBaseResponse, IBase>({
      query: (base) => ({
        url: "/v1/new/base",
        method: "POST",
        body: base,
      }),
      invalidatesTags: ["Base"],
    }),

    getBases: builder.query<IGetBasesResponse, void>({
        query: () => ({
          url: "/v1/new/bases",
          method: "GET",
        }),
        providesTags: ["Base"],
      }),

    getBaseById: builder.query<IGetBaseResponse, string>({
      query: (id) => ({
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
    
  }),
});

export const {
  useCreateBaseMutation,
  useGetBasesQuery,
  useGetBaseByIdQuery,
  useUpdateBaseMutation,
} = BaseApi;