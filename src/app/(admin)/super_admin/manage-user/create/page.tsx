"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { userCreateRoleOptions } from "@/constants/global";
import { useCreateUserMutation } from "@/redux/api/authApi";
import { createUserSchema } from "@/schemas/user";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";

const CreateUserPage = () => {
    const [createUser] = useCreateUserMutation();

    const onSubmit = async (data: any) => {
        message.loading("Creating User");
        try {
            await createUser(data);
            message.success("User Created Successfully");
        } catch (error: any) {
            console.error(error);
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
                        label: `manage-user`,
                        link: `/${role}/manage-user`,
                    },
                ]}
            />
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Create User</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        resolver={yupResolver(createUserSchema)}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
                            <div className="md:col-span-2">
                                <FormInput
                                    type="email"
                                    name="email"
                                    size="large"
                                    label="Email"
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
                                <FormSelectField
                                    name="role"
                                    size="large"
                                    label="Role"
                                    options={userCreateRoleOptions}
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="password"
                                    name="password"
                                    size="large"
                                    label="Password"
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

export default CreateUserPage;
