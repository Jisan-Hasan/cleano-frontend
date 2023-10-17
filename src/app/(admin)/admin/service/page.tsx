"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import {
    useDeleteServiceMutation,
    useGetServicesQuery,
} from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/app/hooks";
import { getUserInfo } from "@/services/auth.service";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ServicePage = () => {
    const query: Record<string, any> = {};

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [deleteService] = useDeleteServiceMutation();

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
    const { data, isLoading } = useGetServicesQuery({ ...query });

    const users = data?.services;
    const meta = data?.meta;

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            sorter: true,
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: true,
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
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
                        <Link href={`/admin/service/details/${data?.id}`}>
                            <Button
                                type="primary"
                            >
                                <EyeOutlined />
                            </Button>
                        </Link>
                        <Link href={`/admin/service/edit/${data?.id}`}>
                            <Button
                                style={{
                                    margin: "0px 5px",
                                }}
                                type="primary"
                            >
                                <EditOutlined />
                            </Button>
                        </Link>
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
            await deleteService(id).unwrap();
            message.success("Service Deleted Successfully");
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
            <ActionBar title="Service Lists">
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
                    <Link href="/admin/service/create">
                        <Button type="primary">Create</Button>
                    </Link>
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
                dataSource={users}
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

export default ServicePage;
