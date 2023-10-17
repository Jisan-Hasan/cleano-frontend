import { IMeta } from "@/types";
import { tagTypes } from "../app/tag-types";
import { baseApi } from "./baseApi";

const CATEGORY_URL = "/category";

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: (args: Record<string, any>) => ({
                url: `${CATEGORY_URL}`,
                method: "GET",
                params: args,
            }),
            transformResponse: (response, meta: IMeta) => {
                return {
                    categories: response,
                    meta: meta,
                };
            },
            providesTags: [tagTypes.category],
        }),
        createCategory: build.mutation({
            query: (data) => ({
                url: `${CATEGORY_URL}`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.category],
        }),
        getCategory: build.query({
            query: (id: string) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.category],
        }),
        updateCategory: build.mutation({
            query: (data) => ({
                url: `${CATEGORY_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.category],
        }),
        deleteCategory: build.mutation({
            query: (id: string) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.category],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
