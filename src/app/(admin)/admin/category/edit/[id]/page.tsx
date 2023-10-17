"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
    useGetCategoryQuery,
    useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { createCategorySchema } from "@/schemas/category";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

type IDProps = {
    params: any;
};

const EditCategoryPage = ({ params }: IDProps) => {
    const router = useRouter();
    const { role } = getUserInfo() as any;
    const { id } = params;

    const { data, isLoading } = useGetCategoryQuery(id);
    const [updateCategory] = useUpdateCategoryMutation();

    // const [updateDepartment] = useUpdateDepartmentMutation();

    const onSubmit = async (values: any) => {
        message.loading("Updating.....");
        try {
            //   console.log(data);
            await updateCategory({ id: id, body: values });
            message.success("Category updated successfully");
            router.push("/admin/category");
        } catch (err: any) {
            //   console.error(err.message);
            message.error(err.message);
        }
    };

    // @ts-ignore
    const defaultValues = {
        title: data?.title || "",
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
                        label: `category`,
                        link: `/${role}/category`,
                    },
                ]}
            />

            <ActionBar title=""> </ActionBar>
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Update Category</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        defaultValues={defaultValues}
                        resolver={yupResolver(createCategorySchema)}
                    >
                        <div className="grid grid-cols-1  gap-2">
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
                                Update
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryPage;
