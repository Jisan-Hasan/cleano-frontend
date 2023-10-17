"use client";

import CategoryField from "@/components/Forms/CategoryField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useCreateServiceMutation } from "@/redux/api/serviceApi";
import { createServiceSchema } from "@/schemas/service";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";

const CreateServicePage = () => {
    const [createService] = useCreateServiceMutation();

    const onSubmit = async (data: any) => {
        data.price = Number(data.price);
        message.loading("Creating...");
        try {
            await createService(data);
            message.success("Service Created Successfully");
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
                        label: `service`,
                        link: `/${role}/service`,
                    },
                ]}
            />
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Create Service</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        resolver={yupResolver(createServiceSchema)}
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
                                Create
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CreateServicePage;
