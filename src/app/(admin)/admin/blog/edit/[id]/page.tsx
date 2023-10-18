"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetBlogQuery, useUpdateBlogMutation } from "@/redux/api/blogApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

type IDProps = {
    params: any;
};

const EditBlogPage = ({ params }: IDProps) => {
    const router = useRouter();
    const { role } = getUserInfo() as any;
    const { id } = params;

    const { data, isLoading } = useGetBlogQuery(id);
    const [updateBlog] = useUpdateBlogMutation();

    const onSubmit = async (values: any) => {
        console.log(values);
        message.loading("Updating.....");
        try {
            await updateBlog({ id: id, body: values });
            message.success("Blog updated successfully");
            router.push("/admin/blog");
        } catch (err: any) {
            message.error(err.message);
            console.log(err);
        }
    };

    // @ts-ignore
    const defaultValues = {
        title: data?.title || "",
        description: data?.description || "",
    };

    return (
        <div>
            <UMBreadCrumb
                items={[
                    {
                        label: `${role}`,
                        link: `/${role}`,
                    },
                    {
                        label: `blog`,
                        link: `/${role}/blog`,
                    },
                ]}
            />

            <ActionBar title=""> </ActionBar>
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Update Blog</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        defaultValues={defaultValues}
                    >
                        <div className="grid grid-cols-1 gap-2">
                            <div>
                                <FormInput
                                    type="text"
                                    name="title"
                                    size="large"
                                    label="Title"
                                />
                            </div>
                            <div>
                                <FormTextArea
                                    name="description"
                                    label="Content"
                                    rows={10}
                                />
                            </div>
                        </div>
                        <div className="text-center my-5">
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditBlogPage;
