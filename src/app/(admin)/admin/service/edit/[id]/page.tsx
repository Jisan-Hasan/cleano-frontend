"use client";

import CategoryField from "@/components/Forms/CategoryField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetServiceQuery, useUpdateServiceMutation } from "@/redux/api/serviceApi";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/api/userApi";
import { createServiceSchema } from "@/schemas/service";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

type IDProps = {
    params: any;
};

const EditServicePage = ({ params }: IDProps) => {
    const router = useRouter();
    const { role } = getUserInfo() as any;
    const { id } = params;

    const { data, isLoading } = useGetServiceQuery(id);
    const [updateService] = useUpdateServiceMutation();

    // const [updateDepartment] = useUpdateDepartmentMutation();

    const onSubmit = async (values: { title: string }) => {
        message.loading("Updating.....");
        try {
            //   console.log(data);
            await updateService({ id: id, body: values });
            message.success("User updated successfully");
            router.push("/admin/service");
        } catch (err: any) {
            //   console.error(err.message);
            message.error(err.message);
        }
    };

    // @ts-ignore
    const defaultValues = {
        name: data?.name || "",
        price: data?.price || "",
        availability: data?.availability || "",
        description: data?.description || "",
        categoryId: data?.categoryId || "",
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
                        label: `service`,
                        link: `/${role}/service`,
                    },
                ]}
            />

            <ActionBar title=""> </ActionBar>
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Update Service</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        resolver={yupResolver(createServiceSchema)}
                        defaultValues={defaultValues}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-2 items-center">
                            <div>
                                <FormInput
                                    type="text"
                                    name="name"
                                    size="large"
                                    label="Name"
                                />
                            </div>

                            <div>
                                <FormInput
                                    type="number"
                                    name="price"
                                    size="large"
                                    label="Price"
                                />
                            </div>
                            <div>
                                <FormSelectField
                                    name="availability"
                                    size="large"
                                    label="Availability"
                                    options={[
                                        { label: "Available", value: true },
                                        {
                                            label: "Not Available",
                                            value: false,
                                        },
                                    ]}
                                />
                            </div>
                            <div>
                                <CategoryField
                                    name="categoryId"
                                    label="Category"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <FormTextArea
                                    name="description"
                                    label="Description"
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

export default EditServicePage;
