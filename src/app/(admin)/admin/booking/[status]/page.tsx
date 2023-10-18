"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import {
    useGetBookingsQuery,
    useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { useDebounced } from "@/redux/app/hooks";
import { getUserInfo } from "@/services/auth.service";
import {
    CheckOutlined,
    CloseOutlined,
    FileDoneOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const BookingPage = ({ params }: { params: { status: string } }) => {
    const { status } = params;
    const query: Record<string, any> = {};

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [updateBooking] = useUpdateBookingMutation();

    query["limit"] = size;
    query["page"] = page;
    query["sortBy"] = sortBy;
    query["sortOrder"] = sortOrder;
    query["searchTerm"] = searchTerm;

    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600,
    });

    if (!!debouncedTerm) {
        query["searchTerm"] = debouncedTerm;
    }
    const { data, isLoading } = useGetBookingsQuery({ ...query });

    const bookings = (data as Record<string, any>)?.bookings?.filter(
        (bookingItem: any) => bookingItem.status === status
    );
    const meta = (data as Record<string, any>)?.meta;

    const columns = [
        {
            title: "Contact Name",
            dataIndex: "contractNo",
        },
        {
            title: "City",
            dataIndex: "city",
        },
        {
            title: "Service Date",
            dataIndex: "date",
            render: function (data: any) {
                return data && dayjs(data).format("MMM D, YYYY hh:mm A");
            },
            sorter: true,
        },
        {
            title: "Action",
            render: function (data: any) {
                return (
                    <>
                        <Button type="default" onClick={()=> updateHandler(data?.id, "confirmed")}>
                            <CheckOutlined />
                        </Button>
                        <Button
                            style={{
                                margin: "0px 5px",
                            }}
                            onClick={() => updateHandler(data?.id, "completed")}
                            type="primary"
                        >
                            <FileDoneOutlined />
                        </Button>

                        <Button
                            onClick={() => updateHandler(data?.id, "cancelled")}
                            type="primary"
                            danger
                        >
                            <CloseOutlined />
                        </Button>
                    </>
                );
            },
        },
    ];

    const onPaginationChange = (page: number, pageSize: number) => {
        console.log("Page:", page, "PageSize:", pageSize);
        setPage(page);
        setSize(pageSize);
    };
    const onTableChange = (pagination: any, filter: any, sorter: any) => {
        const { order, field } = sorter;
        // console.log(order, field);
        setSortBy(field as string);
        setSortOrder(order === "ascend" ? "asc" : "desc");
    };

    const resetFilters = () => {
        setSortBy("");
        setSortOrder("");
        setSearchTerm("");
    };

    const updateHandler = async (id: string, status: string) => {
        message.loading("Updating...");
        try {
            await updateBooking({ id, body: { status } }).unwrap();
            message.success("Updated Successfully");
        } catch (error: any) {
            console.log(error);
            message.error(error?.message || "Something went wrong");
        }
    };

    const { role } = getUserInfo() as any;
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
            <ActionBar title="Booking Lists">
                <Input
                    type="text"
                    size="large"
                    placeholder="Search..."
                    style={{
                        width: "20%",
                    }}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />
                <div>
                    {(!!sortBy || !!sortOrder || !!searchTerm) && (
                        <Button
                            onClick={resetFilters}
                            type="primary"
                            style={{ margin: "0px 5px" }}
                        >
                            <ReloadOutlined />
                        </Button>
                    )}
                </div>
            </ActionBar>

            <UMTable
                loading={isLoading}
                columns={columns}
                dataSource={bookings}
                pageSize={size}
                totalPages={meta?.total}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                onTableChange={onTableChange}
                showPagination={true}
            />
        </div>
    );
};

export default BookingPage;
