"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useCreateBlogMutation } from "@/redux/api/blogApi";
import { createBlogSchema } from "@/schemas/blog";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";



const CreateBlogPage = () => {
    const [createBlog] = useCreateBlogMutation();

    const onSubmit = async (data: any) => {
        message.loading("Creating...");
        try {
            await createBlog(data);
            message.success("Blog Created Successfully");
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
                    {
                        label: `blog`,
                        link: `/${role}/blog`,
                    },
                ]}
            />
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Create Blog</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        resolver={yupResolver(createBlogSchema)}
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
                                Create
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CreateBlogPage;
