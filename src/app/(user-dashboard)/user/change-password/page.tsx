"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { Button, message } from "antd";

const ChangePasswordPage = () => {
    const [changePassword] = useChangePasswordMutation();

    const onSubmit = async (data: any) => {
        message.loading("Updating...");
        try {
            await changePassword(data).unwrap();
            message.success("Updated Successfully");
        } catch (error: any) {
            message.error(error?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <UMBreadCrumb
                items={[
                    {
                        label: `user`,
                        link: `/user`,
                    },
                ]}
            />
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Change Password</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        // resolver={yupResolver(createCategorySchema)}
                    >
                        <div className="grid grid-cols-1 gap-2">
                            <div>
                                <FormInput
                                    type="password"
                                    name="oldPassword"
                                    size="large"
                                    label="Current Password"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="password"
                                    name="newPassword"
                                    size="large"
                                    label="New Password"
                                />
                            </div>
                        </div>
                        <div className="text-center my-5">
                            <Button type="primary" htmlType="submit">
                                Change Password
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
