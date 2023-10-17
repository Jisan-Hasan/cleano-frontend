"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useCreateFaqMutation } from "@/redux/api/faqApi";
import { createFaqSchema } from "@/schemas/faq";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";

const CreateFaqPage = () => {
    const [createFaq] = useCreateFaqMutation();

    const onSubmit = async (data: any) => {
        message.loading("Creating...");
        try {
            await createFaq(data);
            message.success("FAQ Created Successfully");
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
                        label: `faq`,
                        link: `/${role}/faq`,
                    },
                ]}
            />
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Create FAQ</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        resolver={yupResolver(createFaqSchema)}
                    >
                        <div className="grid grid-cols-1 gap-2">
                            <div>
                                <FormInput
                                    type="text"
                                    name="question"
                                    size="large"
                                    label="Question"
                                />
                            </div>
                            <div>
                                <FormTextArea
                                    name="answer"
                                    label="Answer"
                                    rows={6}
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

export default CreateFaqPage;
