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
        changePassword: build.mutation({
            query: (passwordData) => ({
                url: `${AUTH_URL}/change-password`,
                method: "POST",
                data: passwordData,
            }),
            transformResponse: (response) => {
                return { data: response };
            },
            transformErrorResponse: (response) => {
                return { error: response };
            },
        }),
    }),
});

export const {
    useUserLoginMutation,
    useCreateUserMutation,
    useChangePasswordMutation,
} = authApi;
