"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import {
    useDeleteReviewMutation,
    useGetReviewsQuery,
} from "@/redux/api/reviewApi";
import { useDebounced } from "@/redux/app/hooks";
import { getUserInfo } from "@/services/auth.service";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const ReviewPage = () => {
    const query: Record<string, any> = {};

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [deleteReview] = useDeleteReviewMutation();

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
    const { data, isLoading } = useGetReviewsQuery({ ...query });

    const reviews = data?.reviews;
    const meta = data?.meta;

    const columns = [
        {
            title: "Rating",
            dataIndex: "rating",
            sorter: true,
        },
        {
            title: "Comment",
            dataIndex: "comment",
            sorter: true,
        },
        {
            title: "Submitted At",
            dataIndex: "createdAt",
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
                        <Button
                            onClick={() => deleteHandler(data?.id)}
                            type="primary"
                            danger
                        >
                            <DeleteOutlined />
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

    const deleteHandler = async (id: string) => {
        message.loading("Deleting...");
        try {
            await deleteReview(id).unwrap();
            message.success("Review Deleted Successfully");
        } catch (error: any) {
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
            <ActionBar title="User Feedback Lists">
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
                dataSource={reviews}
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

export default ReviewPage;
