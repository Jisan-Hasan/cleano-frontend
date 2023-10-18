"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { useGetUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

const ReviewPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const router = useRouter();

    const { role, email } = getUserInfo() as any;
    const { data: userData } = useGetUserQuery(email);

    const [createReview] = useCreateReviewMutation();

    const onSubmit = async (data: any) => {
        data["rating"] = Number(data.rating);
        data["userId"] = userData?.id;
        data["serviceId"] = id;
        message.loading("Submitting Review");
        try {
            await createReview(data);
            message.success("Review Provided Successfully");
            router.push("/user/booking/confirmed");
        } catch (error: any) {
            message.error(error?.message || "Something went wrong");
        }
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
                        label: `booking`,
                        link: `/${role}/booking/confirmed`,
                    },
                ]}
            />
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">
                    Provide Your Valuable Feedback
                </h1>
                <div>
                    <Form submitHandler={onSubmit}>
                        <div className="grid grid-cols-1 gap-2">
                            <div>
                                <FormInput
                                    type="number"
                                    name="rating"
                                    size="large"
                                    label="Rating"
                                />
                            </div>
                            <div>
                                <FormTextArea
                                    name="comment"
                                    rows={4}
                                    label="Feedback"
                                />
                            </div>
                        </div>
                        <div className="text-center my-5">
                            <Button type="primary" htmlType="submit">
                                Submit Feedback
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;
