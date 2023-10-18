import { IMeta } from "@/types";
import { tagTypes } from "../app/tag-types";
import { baseApi } from "./baseApi";

const REVIEW_URL = "/review";

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getReviews: build.query({
            query: (args: Record<string, any>) => ({
                url: `${REVIEW_URL}`,
                method: "GET",
                params: args,
            }),
            transformResponse: (response, meta: IMeta) => {
                return {
                    reviews: response,
                    meta: meta,
                };
            },
            providesTags: [tagTypes.review],
        }),
        getReview: build.query({
            query: (id: string) => ({
                url: `${REVIEW_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.review],
        }),
        createReview: build.mutation({
            query: (data) => ({
                url: `${REVIEW_URL}`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.review],
        }),
        updateReview: build.mutation({
            query: (data) => ({
                url: `${REVIEW_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.review],
        }),
        deleteReview: build.mutation({
            query: (id: string) => ({
                url: `${REVIEW_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.review],
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useGetReviewQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;
