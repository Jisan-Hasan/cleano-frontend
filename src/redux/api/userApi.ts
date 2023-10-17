import { IMeta } from "@/types";
import { tagTypes } from "../app/tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/user";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: (arg: Record<string, any>) => ({
                url: `${USER_URL}`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response, meta: IMeta) => {
                return {
                    users: response,
                    meta: meta,
                };
            },
            providesTags: [tagTypes.user],
        }),
        getUser: build.query({
            query: (email: string) => ({
                url: `${USER_URL}/${email}`,
                method: "GET",
            }),
            providesTags: [tagTypes.user],
        }),
        updateUser: build.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.email}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        deleteUser: build.mutation({
            query: (email: string) => ({
                url: `${USER_URL}/${email}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.user],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = authApi;
