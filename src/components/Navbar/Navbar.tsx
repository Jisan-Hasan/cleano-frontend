"use client";
import { authKey } from "@/constants/storageKey";
import { useAppSelector } from "@/redux/app/hooks";
import {
    getUserInfo,
    isLoggedIn,
    removeUserInfo,
} from "@/services/auth.service";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import {
    Avatar,
    Badge,
    Button,
    Dropdown,
    Layout,
    MenuProps,
    Row,
    Space,
    message,
} from "antd";
import Title from "antd/es/typography/Title";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Header } = Layout;

const Navbar = () => {
    const cart = useAppSelector((state: any) => state.cart.cartItems);
    const router = useRouter();

    const handleLogout = () => {
        message.success("Logout Successful");
        removeUserInfo(authKey);
        router.push("/login");
    };
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Button onClick={() => router.push("/user")} type="text">
                    Profile
                </Button>
            ),
        },
        {
            key: "0",
            label: (
                <Button onClick={handleLogout} type="text" danger>
                    Logout
                </Button>
            ),
        },
    ];

    const cartItems: any = [
        {
            key: "22",
            label: <Button type="text">View Cart</Button>,
        },
    ];

    const userLoggedIn = isLoggedIn() || false;

    const { role } = getUserInfo() as any;

    return (
        <>
            <Header className="flex justify-between items-center">
                <Link href="/home">
                    <Title className="text-white font-bold hover:text-blue-600">
                        Cleano
                    </Title>
                </Link>
                <div
                    className={`hidden  ${
                        role === "admin" || role === "super_admin"
                            ? "md:hidden"
                            : "md:flex"
                    }`}
                >
                    <Link
                        href="/home"
                        className="text-white font-semibold hover:bg-blue-500 px-5"
                    >
                        Home
                    </Link>
                    <Link
                        href="/services"
                        className="text-white font-semibold hover:bg-blue-500 px-5"
                    >
                        Services
                    </Link>
                    <Link
                        href="/blogs"
                        className="text-white font-semibold hover:bg-blue-500 px-5"
                    >
                        Blogs
                    </Link>
                    <Link
                        href="/faqs"
                        className="text-white font-semibold hover:bg-blue-500 px-5"
                    >
                        Faqs
                    </Link>
                    <Link
                        href="/about-us"
                        className="text-white font-semibold hover:bg-blue-500 px-5"
                    >
                        About Us
                    </Link>
                </div>
                <div>
                    <Row
                        justify="end"
                        align="middle"
                        style={{
                            height: "100%",
                        }}
                        className="gap-2"
                    >
                        <Link
                            href="/user/my-cart"
                            className={`${
                                role === "admin" || role === "super_admin"
                                    ? "md:hidden"
                                    : "md:flex"
                            }`}
                        >
                            <Badge
                                count={cart?.length}
                                className="cursor-pointer"
                            >
                                <Avatar
                                    shape="circle"
                                    size="large"
                                    icon={<ShoppingCartOutlined />}
                                />
                            </Badge>
                        </Link>

                        {userLoggedIn ? (
                            <Dropdown menu={{ items }}>
                                <a>
                                    <Space wrap size={16}>
                                        <Avatar
                                            size="large"
                                            icon={<UserOutlined />}
                                        />
                                    </Space>
                                </a>
                            </Dropdown>
                        ) : (
                            <Button
                                onClick={() => router.push("/login")}
                                type="primary"
                            >
                                Login
                            </Button>
                        )}
                    </Row>
                </div>
            </Header>
        </>
    );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
