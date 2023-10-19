"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useSignupMutation } from "@/redux/api/authApi";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import loginImage from "../../../assets/login-banner.png";

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const SignUpPage = () => {
    const router = useRouter();
    const [signup] = useSignupMutation();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await signup({ ...data }).unwrap();

            message.success("Account Created Successfully");
            router.push("/login");
        } catch (err) {
            message.error("Something Went Wrong");
        }
    };
    return (
        <Row
            justify="center"
            align="middle"
            style={{
                minHeight: "100vh",
            }}
        >
            <Col sm={12} md={16} lg={10} xl={8} className="hidden md:flex">
                <Image src={loginImage} width={500} alt="login image" />
            </Col>
            <Col sm={12} md={8} lg={8} xl={8}>
                <h1
                    style={{
                        margin: "15px 0px",
                    }}
                >
                    First login your account
                </h1>
                <div>
                    <Form submitHandler={onSubmit}>
                        <div className="space-y-2 my-3">
                            <div>
                                <FormInput
                                    name="firstName"
                                    type="text"
                                    size="large"
                                    label="First Name"
                                />
                            </div>
                            <div>
                                <FormInput
                                    name="lastName"
                                    type="text"
                                    size="large"
                                    label="Last Name"
                                />
                            </div>
                            <div>
                                <FormInput
                                    name="email"
                                    type="email"
                                    size="large"
                                    label="Email"
                                />
                            </div>
                            <div>
                                <FormInput
                                    name="password"
                                    type="password"
                                    size="large"
                                    label="Password"
                                />
                            </div>
                        </div>
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                        <p className="mt-2">
                            Already Have any account?{" "}
                            <Link href="/login">SignIn</Link>
                        </p>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default SignUpPage;
