"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { useDeleteUserMutation, useGetUsersQuery } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/app/hooks";
import { getUserInfo } from "@/services/auth.service";
import {
    DeleteOutlined,
    EditOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const ManageUserPage = () => {
    const query: Record<string, any> = {};

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [deleteUser] = useDeleteUserMutation();

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
    const { data, isLoading } = useGetUsersQuery({ ...query });

    const users = data?.users;
    const meta = data?.meta;

    const columns = [
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
        },
        {
            title: "Role",
            dataIndex: "role",
            sorter: true,
        },
        {
            title: "Action",
            render: function (data: any) {
                return (
                    <>
                        <Link
                            href={`/super_admin/manage-user/edit/${data?.email}`}
                        >
                            <Button
                                style={{
                                    margin: "0px 5px",
                                }}
                                onClick={() => console.log(data)}
                                type="primary"
                            >
                                <EditOutlined />
                            </Button>
                        </Link>
                        <Button
                            onClick={() => deleteHandler(data?.email)}
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
        message.loading("Deleting User");
        try {
            await deleteUser(id).unwrap();
            message.success("User Deleted Successfully");
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
            <ActionBar title="User Lists">
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
                    <Link href="/super_admin/manage-user/create">
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

export default ManageUserPage;
