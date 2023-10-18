"use client";

import CollapsePage from "@/components/ui/CollapsePage";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useDeleteBlogMutation, useGetBlogsQuery } from "@/redux/api/blogApi";
import { getUserInfo } from "@/services/auth.service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import Link from "next/link";



const BlogPage = () => {
    const [deleteBlog] = useDeleteBlogMutation();

    const deleteHandler = async (id: string) => {
        message.loading("Deleting...");
        try {
            await deleteBlog(id).unwrap();
            message.success("Blog Deleted Successfully");
        } catch (error: any) {
            message.error(error?.message || "Something went wrong");
        }
    };

    const { data } = useGetBlogsQuery({ limit: 100, page: 1 });

    const blogs: any = data?.blogs;

    const items = blogs?.map((item: any) => ({
        key: item.id,
        label: item.title,
        children: item.description,
        extra: (
            <>
                <Link href={`/admin/blog/edit/${item?.id}`}>
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
                    onClick={() => deleteHandler(item?.id)}
                    type="primary"
                    danger
                >
                    <DeleteOutlined />
                </Button>
            </>
        ),
    }));

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

            <div className="flex justify-end m-4">
                <Link href="/admin/blog/create">
                    <Button type="primary" size="large">
                        Create
                    </Button>
                </Link>
            </div>

            <CollapsePage items={items} />
        </div>
    );
};

export default BlogPage;
