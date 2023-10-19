"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";

const SuperAdminPage = () => {
    const [updateUser] = useUpdateUserMutation();

    const { role, email } = getUserInfo() as any;
    console.log(role, email);

    const { data: userInfo } = useGetUserQuery(email);

    const onSubmit = async (data: any) => {
        message.loading("Updating...");
        try {
            await updateUser({ email: email, body: data });
            message.success("Profile Updated Successfully");
        } catch (error: any) {
            message.error(error?.message || "Something went wrong");
        }
    };

    const defaultValues = {
        email: userInfo?.email || "",
        firstName: userInfo?.firstName || "",
        lastName: userInfo?.lastName || "",
        contractNo: userInfo?.contractNo || "",
        houseNo: userInfo?.houseNo || "",
        street: userInfo?.street || "",
        city: userInfo?.city || "",
        landmark: userInfo?.landmark || "",
    };

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
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">My Profile</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        defaultValues={defaultValues}
                        // resolver={yupResolver(createCategorySchema)}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                                <FormInput
                                    type="email"
                                    name="email"
                                    size="large"
                                    label="Email"
                                    readonly={true}
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="contractNo"
                                    size="large"
                                    label="Contract Number"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="firstName"
                                    size="large"
                                    label="First Name"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="lastName"
                                    size="large"
                                    label="Last Name"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="houseNo"
                                    size="large"
                                    label="House Number"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="street"
                                    size="large"
                                    label="Street"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="city"
                                    size="large"
                                    label="City"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="landmark"
                                    size="large"
                                    label="Landmark"
                                />
                            </div>
                        </div>
                        <div className="text-center my-5">
                            <Button type="primary" htmlType="submit">
                                Update Profile
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminPage;
