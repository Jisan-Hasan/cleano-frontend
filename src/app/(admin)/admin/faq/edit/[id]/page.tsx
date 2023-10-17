"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetFaqQuery, useUpdateFaqMutation } from "@/redux/api/faqApi";
import { createFaqSchema } from "@/schemas/faq";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

type IDProps = {
    params: any;
};

const EditFaqPage = ({ params }: IDProps) => {
    const router = useRouter();
    const { role } = getUserInfo() as any;
    const { id } = params;

    const { data, isLoading } = useGetFaqQuery(id);
    const [updateFaq] = useUpdateFaqMutation();

    const onSubmit = async (values: { title: string }) => {
        message.loading("Updating.....");
        try {
            await updateFaq({ id: id, body: values });
            message.success("FAQ updated successfully");
            router.push("/admin/faq");
        } catch (err: any) {
            message.error(err.message);
        }
    };

    // @ts-ignore
    const defaultValues = {
        question: data?.question || "",
        answer: data?.answer || "",
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
                        label: `faq`,
                        link: `/${role}/faq`,
                    },
                ]}
            />

            <ActionBar title=""> </ActionBar>
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Update FAQ</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        resolver={yupResolver(createFaqSchema)}
                        defaultValues={defaultValues}
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
                                Update
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditFaqPage;
