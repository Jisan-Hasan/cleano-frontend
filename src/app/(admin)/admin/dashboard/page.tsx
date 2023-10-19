"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetBookingsQuery } from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";

const DashboardPage = () => {
    const { role } = (getUserInfo() as any) || { role: "admin" };
    const { data } = useGetBookingsQuery({
        limit: 100,
        page: 1,
    });
    const totalPendingBookings = (data?.bookings as any[])?.filter(
        (booking: any) => booking.status === "pending"
    )?.length;

    const totalConfirmedBookings = (data?.bookings as any[])?.filter(
        (booking: any) => booking.status === "confirmed"
    )?.length;

    const totalCompletedBookings = (data?.bookings as any[])?.filter(
        (booking: any) => booking.status === "completed"
    )?.length;

    const totalCancelledBookings = (data?.bookings as any[])?.filter(
        (booking: any) => booking.status === "cancelled"
    )?.length;

    return (
        <div>
            <UMBreadCrumb
                items={[
                    {
                        label: `${role}`,
                        link: `/${role}`,
                    },
                ]}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 py-10 gap-6 mx-2">
                <div className="text-center p-5 py-10 bg-green-200 rounded-md">
                    <h1 className="text-4xl">{totalPendingBookings}</h1>
                    <p className="text-2xl font-semibold">Pending Service</p>
                </div>
                <div className="text-center p-5 py-10 bg-green-400 rounded-md">
                    <h1 className="text-4xl">{totalConfirmedBookings}</h1>
                    <p className="text-2xl font-semibold">Confirmed Service</p>
                </div>
                <div className="text-center p-5 py-10 bg-green-600 rounded-md">
                    <h1 className="text-4xl">{totalCompletedBookings}</h1>
                    <p className="text-2xl font-semibold">Completed Service</p>
                </div>
                <div className="text-center p-5 py-10 bg-red-300 rounded-md">
                    <h1 className="text-4xl">{totalCancelledBookings}</h1>
                    <p className="text-2xl font-semibold">Rejected Service</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
