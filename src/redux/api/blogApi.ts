import { IMeta } from "@/types";
import { tagTypes } from "../app/tag-types";
import { baseApi } from "./baseApi";

const BLOG_URL = "/blog";

export const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBlogs: build.query({
            query: (args: Record<string, any>) => ({
                url: `${BLOG_URL}`,
                method: "GET",
                params: args,
            }),
            transformResponse: (response, meta: IMeta) => {
                return {
                    blogs: response,
                    meta: meta,
                };
            },
            providesTags: [tagTypes.blog],
        }),
        getBlog: build.query({
            query: (id: string) => ({
                url: `${BLOG_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.blog],
        }),
        createBlog: build.mutation({
            query: (data) => ({
                url: `${BLOG_URL}`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.blog],
        }),
        updateBlog: build.mutation({
            query: (data) => ({
                url: `${BLOG_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.blog],
        }),
        deleteBlog: build.mutation({
            query: (id: string) => ({
                url: `${BLOG_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.blog],
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;
