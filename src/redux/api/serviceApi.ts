import { IMeta } from "@/types";
import { tagTypes } from "../app/tag-types";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/service";

export const serviceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getServices: build.query({
            query: (args: Record<string, any>) => ({
                url: `${SERVICE_URL}`,
                method: "GET",
                params: args,
            }),
            transformResponse: (response, meta: IMeta) => {
                return {
                    services: response,
                    meta: meta,
                };
            },
            providesTags: [tagTypes.service],
        }),
        getService: build.query({
            query: (id: string) => ({
                url: `${SERVICE_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.service],
        }),
        createService: build.mutation({
            query: (data) => ({
                url: `${SERVICE_URL}`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.service],
        }),
        updateService: build.mutation({
            query: (data) => ({
                url: `${SERVICE_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.service],
        }),
        deleteService: build.mutation({
            query: (id: string) => ({
                url: `${SERVICE_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.service],
        }),
    }),
});

export const {
    useGetServicesQuery,
    useGetServiceQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = serviceApi;
