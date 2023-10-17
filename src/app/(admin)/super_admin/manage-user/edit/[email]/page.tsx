"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { userCreateRoleOptions } from "@/constants/global";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

type IDProps = {
    params: any;
};

const EditUserPage = ({ params }: IDProps) => {
    const router = useRouter();
    const { role } = getUserInfo() as any;
    const { email } = params;

    const { data, isLoading } = useGetUserQuery(email);
    const [updateUser] = useUpdateUserMutation();

    // const [updateDepartment] = useUpdateDepartmentMutation();

    const onSubmit = async (values: { title: string }) => {
        message.loading("Updating.....");
        try {
            //   console.log(data);
            await updateUser({ email: email, body: values });
            message.success("User updated successfully");
            router.push("/super_admin/manage-user");
        } catch (err: any) {
            //   console.error(err.message);
            message.error(err.message);
        }
    };

    // @ts-ignore
    const defaultValues = {
        email: data?.email || "",
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        role: data?.role || "",
        contractNo: data?.contractNo || "",
        houseNo: data?.houseNo || "",
        street: data?.street || "",
        city: data?.city || "",
        landmark: data?.landmark || "",
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
                        label: `manage-user`,
                        link: `/${role}/manage-user`,
                    },
                ]}
            />

            <ActionBar title=""> </ActionBar>
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Update User</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        defaultValues={defaultValues}
                        // resolver={yupResolver(createUserSchema)}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
                            <div>
                                <FormInput
                                    type="email"
                                    name="email"
                                    size="large"
                                    label="Email"
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
                                    name="contractNo"
                                    size="large"
                                    label="Contract No"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="houseNo"
                                    size="large"
                                    label="House"
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
                            <div className="md:col-span-2">
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
                                Update
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
