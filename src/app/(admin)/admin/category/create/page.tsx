"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { createCategorySchema } from "@/schemas/category";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";

const CreateCategoryPage = () => {
    const [createCategory] = useCreateCategoryMutation();

    const onSubmit = async (data: any) => {
        message.loading("Creating Category");
        try {
            await createCategory(data);
            message.success("Category Created Successfully");
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
                        label: `category`,
                        link: `/${role}/category`,
                    },
                ]}
            />
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Create Category</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        resolver={yupResolver(createCategorySchema)}
                    >
                        <div className="grid grid-cols-1 gap-2">
                            <div>
                                <FormInput
                                    type="text"
                                    name="title"
                                    size="large"
                                    label="Category Title"
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

export default CreateCategoryPage;
