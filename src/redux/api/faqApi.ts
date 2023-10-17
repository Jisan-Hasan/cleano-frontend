import { IMeta } from "@/types";
import { tagTypes } from "../app/tag-types";
import { baseApi } from "./baseApi";

const FAQ_URL = "/faq";

export const faqApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getFaqs: build.query({
            query: (args: Record<string, any>) => ({
                url: `${FAQ_URL}`,
                method: "GET",
                params: args,
            }),
            transformResponse: (response, meta: IMeta) => {
                return {
                    faqs: response,
                    meta: meta,
                };
            },
            providesTags: [tagTypes.faq],
        }),
        getFaq: build.query({
            query: (id: string) => ({
                url: `${FAQ_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.faq],
        }),
        createFaq: build.mutation({
            query: (data) => ({
                url: `${FAQ_URL}`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.faq],
        }),
        updateFaq: build.mutation({
            query: (data) => ({
                url: `${FAQ_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.faq],
        }),
        deleteFaq: build.mutation({
            query: (id: string) => ({
                url: `${FAQ_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.faq],
        }),
    }),
});

export const {
    useGetFaqsQuery,
    useGetFaqQuery,
    useCreateFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation,
} = faqApi;
