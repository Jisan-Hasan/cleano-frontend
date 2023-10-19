"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { decodedToken } from "@/utils/jwt";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import loginImage from "../../../assets/login-banner.png";

type FormValues = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const router = useRouter();
    const [userLogin] = useUserLoginMutation();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const res = await userLogin({ ...data }).unwrap();

            storeUserInfo({ accessToken: res?.accessToken });

            if (res?.accessToken) {
                message.success(res?.message || "Login Successful");
                const tokenData = decodedToken(res?.accessToken || "{}");
                if (tokenData?.role === "super_admin") {
                    router.push("/super_admin");
                } else if (tokenData?.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/");
                }
            }
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
                        <div>
                            <FormInput
                                name="email"
                                type="text"
                                size="large"
                                label="User Email"
                            />
                        </div>
                        <div
                            style={{
                                margin: "15px 0px",
                            }}
                        >
                            <FormInput
                                name="password"
                                type="password"
                                size="large"
                                label="User Password"
                            />
                        </div>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        <p className="mt-2">
                            Don't Have any account?{" "}
                            <Link href="/signup">SignUp</Link>
                        </p>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default LoginPage;
