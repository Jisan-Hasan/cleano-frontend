import { tagTypes } from "../app/tag-types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (loginData) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                data: loginData,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        createUser: build.mutation({
            query: (userData) => ({
                url: `${AUTH_URL}/create-user`,
                method: "POST",
                data: userData,
            }),
            invalidatesTags: [tagTypes.user],
        }),
    }),
});

export const { useUserLoginMutation, useCreateUserMutation } = authApi;
