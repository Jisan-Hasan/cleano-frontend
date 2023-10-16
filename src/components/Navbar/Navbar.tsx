"use client";
import { authKey } from "@/constants/storageKey";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import {
    Avatar,
    Button,
    Dropdown,
    Layout,
    Menu,
    MenuProps,
    Row,
    Space,
    message,
} from "antd";
import Title from "antd/es/typography/Title";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const { Header } = Layout;

const Navbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        message.success("Logout Successful");
        removeUserInfo(authKey);
        router.push("/login");
    };
    const items: MenuProps["items"] = [
        {
            key: "0",
            label: (
                <Button onClick={handleLogout} type="text" danger>
                    Logout
                </Button>
            ),
        },
    ];

    const userLoggedIn = isLoggedIn() || false;

    return (
        <>
            <Header className="flex justify-between items-center">
                <Title className="text-white">Cleano</Title>
                <Menu theme="dark" mode="horizontal" className="hidden md:flex">
                    <Menu.Item key="1">Services</Menu.Item>
                    <Menu.Item key="2">Blogs</Menu.Item>
                    <Menu.Item key="3">FAQS</Menu.Item>
                    <Menu.Item key="4">About Us</Menu.Item>
                </Menu>
                <div>
                    <Row
                        justify="end"
                        align="middle"
                        style={{
                            height: "100%",
                        }}
                    >
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
