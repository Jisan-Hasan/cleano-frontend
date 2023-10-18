import { IMeta } from "@/types";
import { tagTypes } from "../app/tag-types";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/booking";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBookings: build.query({
            query: (args: Record<string, any>) => ({
                url: `${BOOKING_URL}`,
                method: "GET",
                params: args,
            }),
            transformResponse: (response, meta: IMeta) => {
                return {
                    bookings: response,
                    meta: meta,
                };
            },
            providesTags: [tagTypes.booking],
        }),
        getBooking: build.query({
            query: (id: string) => ({
                url: `${BOOKING_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.booking],
        }),
        createBooking: build.mutation({
            query: (data) => ({
                url: `${BOOKING_URL}`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.booking],
        }),
        updateBooking: build.mutation({
            query: (data) => ({
                url: `${BOOKING_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.booking],
        }),
        deleteBooking: build.mutation({
            query: (id: string) => ({
                url: `${BOOKING_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.booking],
        }),
    }),
});

export const {
    useGetBookingsQuery,
    useGetBookingQuery,
    useCreateBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
} = bookingApi;
