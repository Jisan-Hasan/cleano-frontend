"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useGetUserQuery } from "@/redux/api/userApi";
import { useAppDispatch } from "@/redux/app/hooks";
import { removeFromCart } from "@/redux/slices/cartSlice";
import { createBookingSchema } from "@/schemas/booking";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";

type IDProps = {
    params: any;
};

const BookingPage = ({ params }: IDProps) => {
    const dispatch = useAppDispatch();
    const [createBooking] = useCreateBookingMutation();
    const { role, email } = getUserInfo() as any;
    const { id } = params;

    const { data: user } = useGetUserQuery(email);

    const defaultValues = {
        name:
            `${user?.firstName} ${user?.lastName ? user?.lastName : ""}` || "",
        email: user?.email || "",
        contractNo: user?.contractNo || "",
        houseNo: user?.houseNo || "",
        street: user?.street || "",
        city: user?.city || "",
        landmark: user?.landmark || "",
        date: new Date().toISOString(),
    };

    const onSubmit = async (values: any) => {
        const bookingData = {
            date:
                new Date(values.date).toISOString() || new Date().toISOString(),
            contractNo: values.contractNo,
            houseNo: values.houseNo,
            street: values.street,
            city: values.city,
            landmark: values.landmark,
            userId: user?.id,
            serviceId: id,
        };
        try {
            message.loading("Booking...");
            await createBooking(bookingData).unwrap();
            dispatch(removeFromCart(id));
            message.success("Booking Successful");
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
                        label: `my-cart`,
                        link: `/${role}/my-cart`,
                    },
                ]}
            />

            <ActionBar title=""> </ActionBar>
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-center mb-5">Booking Information</h1>
                <div>
                    <Form
                        submitHandler={onSubmit}
                        defaultValues={defaultValues}
                        resolver={yupResolver(createBookingSchema)}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2  gap-2">
                            <div>
                                <FormInput
                                    type="text"
                                    name="name"
                                    size="large"
                                    label="Name"
                                    readonly={true}
                                />
                            </div>
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
                                    label="contractNo"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="houseNo"
                                    size="large"
                                    label="houseNo"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="street"
                                    size="large"
                                    label="street"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="city"
                                    size="large"
                                    label="city"
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="landmark"
                                    size="large"
                                    label="landmark"
                                />
                            </div>
                            <div>
                                <FormDatePicker
                                    name="date"
                                    label="Service Date"
                                    size="large"
                                />
                            </div>
                        </div>
                        <div className="text-center my-5">
                            <Button type="primary" htmlType="submit">
                                Book Service
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
