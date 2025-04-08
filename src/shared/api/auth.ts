import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/shared/api/baseQuery";
import { IAuthTokensResponse } from "@/shared/model/authentication/";
import { IUser } from "@/shared/model/authentication/";

export const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Athentication"],
    endpoints: (builder) => ({
        login: builder.mutation<IAuthTokensResponse, IUser>({
            query: (user) => ({
                url: '/v1/system-user/login',
                method: 'POST',
                body: user,
            }),
        }),
    }),
});

export const { useLoginMutation } = AuthApi;