"use client";

import CollapsePage from "@/components/ui/CollapsePage";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useDeleteFaqMutation, useGetFaqsQuery } from "@/redux/api/faqApi";
import { getUserInfo } from "@/services/auth.service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import Link from "next/link";

const FaqPage = () => {
    const [deleteFaq] = useDeleteFaqMutation();

    const deleteHandler = async (id: string) => {
        message.loading("Deleting...");
        try {
            await deleteFaq(id).unwrap();
            message.success("FAQ Deleted Successfully");
        } catch (error: any) {
            message.error(error?.message || "Something went wrong");
        }
    };

    const { data } = useGetFaqsQuery({ limit: 100, page: 1 });

    const faqs: any = data?.faqs;

    const items = faqs?.map((faq: any) => ({
        key: faq.id,
        label: faq.question,
        children: faq.answer,
        extra: (
            <>
                <Link href={`/admin/faq/edit/${faq?.id}`}>
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
                    onClick={() => deleteHandler(faq?.id)}
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
                <Link href="/admin/faq/create">
                    <Button type="primary" size="large">
                        Create
                    </Button>
                </Link>
            </div>

            <CollapsePage items={items} />
        </div>
    );
};

export default FaqPage;
