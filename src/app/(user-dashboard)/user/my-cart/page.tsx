"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { removeFromCart } from "@/redux/slices/cartSlice";
import { getUserInfo } from "@/services/auth.service";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";


const MyCartPage = () => {
    const cartItems =
        useAppSelector((state: any) => state.cart.cartItems) || [];
    const dispatch = useAppDispatch();
    // console.log(cartItems);

    // const users = data?.categories;
    // const meta = data?.meta;

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Action",
            render: function (data: any) {
                return (
                    <>
                        <Link href={`/user/my-cart/book-service/${data?.id}`}>
                            <Button
                                style={{
                                    margin: "0px 5px",
                                }}
                                type="primary"
                            >
                                Book Now
                            </Button>
                        </Link>
                        <Button
                            onClick={() => deleteHandler(data)}
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

    const deleteHandler = async (data: any) => {
        dispatch(removeFromCart(data));
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
            <ActionBar title="Cart Items"></ActionBar>

            <UMTable
                loading={false}
                columns={columns}
                dataSource={cartItems}
                // pageSize={size}
                // totalPages={meta?.total}
                showSizeChanger={false}
                // onPaginationChange={onPaginationChange}
                // onTableChange={onTableChange}
                showPagination={false}
            />
        </div>
    );
};

export default MyCartPage;
