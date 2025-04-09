import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/shared/api/baseQuery";
import { IUserResponse, IUpdateUserResponse, IUpdateUser } from "../model/user/user-response-types";

export const UserApi = createApi({
    reducerPath: "UserApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query<IUserResponse, void>({
            query: () => ({
                url: '/v1/system-users/profile',
                method: 'GET',
            }),
            providesTags: ["User"]
        }),
        updateUser: builder.mutation<IUpdateUserResponse, IUpdateUser>({
            query: (user) => ({
                url: '/v1/system-users/profile',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ["User"]
        })
    }),
});

export const { useGetUserQuery, useUpdateUserMutation } = UserApi;