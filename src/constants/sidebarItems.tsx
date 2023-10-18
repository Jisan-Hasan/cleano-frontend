import {
    AppstoreOutlined,
    ProfileOutlined,
    TableOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
    const defaultSidebarItems: MenuProps["items"] = [
        {
            label: "Profile",
            key: "profile",
            icon: <ProfileOutlined />,
            children: [
                {
                    label: <Link href={`/${role}`}>Account Profile</Link>,
                    key: `/${role}`,
                    icon: <TableOutlined />,
                },
                {
                    label: (
                        <Link href={`/${role}/change-password`}>
                            Change Password
                        </Link>
                    ),
                    key: `/${role}/change-password`,
                    icon: <TableOutlined />,
                },
            ],
        },
    ];

    const adminSidebarItems: MenuProps["items"] = [
        ...defaultSidebarItems,
        {
            label: <Link href={`/${role}/dashboard`}>Dashboard</Link>,
            icon: <TableOutlined />,
            key: `/${role}/dashboard`,
        },
        {
            label: <Link href={`/${role}/category`}>Category</Link>,
            icon: <TableOutlined />,
            key: `/${role}/category`,
        },
        {
            label: <Link href={`/${role}/service`}>Services</Link>,
            icon: <TableOutlined />,
            key: `/${role}/service`,
        },
        {
            label: "Booking",
            key: "booking",
            icon: <AppstoreOutlined />,
            children: [
                {
                    label: (
                        <Link href={`/${role}/booking/all`}>All Bookings</Link>
                    ),
                    key: `/${role}/booking/all`,
                    icon: <TableOutlined />,
                },
                {
                    label: (
                        <Link href={`/${role}/booking/pending`}>
                            Pending Bookings
                        </Link>
                    ),
                    key: `/${role}/booking/pending`,
                    icon: <TableOutlined />,
                },
                {
                    label: (
                        <Link href={`/${role}/booking/confirmed`}>
                            Confirmed Bookings
                        </Link>
                    ),
                    key: `/${role}/booking/confirmed`,
                    icon: <TableOutlined />,
                },
                {
                    label: (
                        <Link href={`/${role}/booking/completed`}>
                            Completed Bookings
                        </Link>
                    ),
                    key: `/${role}/booking/completed`,
                    icon: <TableOutlined />,
                },
                {
                    label: (
                        <Link href={`/${role}/booking/rejected`}>
                            Rejected Bookings
                        </Link>
                    ),
                    key: `/${role}/booking/rejected`,
                    icon: <TableOutlined />,
                },
            ],
        },
        {
            label: <Link href={`/${role}/blog`}>Blogs</Link>,
            icon: <TableOutlined />,
            key: `/${role}/blog`,
        },
        {
            label: <Link href={`/${role}/faq`}>FAQ</Link>,
            icon: <TableOutlined />,
            key: `/${role}/faq`,
        },
    ];

    const superAdminSidebarItems: MenuProps["items"] = [
        ...defaultSidebarItems,
        {
            label: <Link href={`/${role}/manage-user`}>Manage User</Link>,
            icon: <TableOutlined />,
            key: `/${role}/manage-user`,
        },
    ];

    const userSidebarItems: MenuProps["items"] = [
        ...defaultSidebarItems,
        {
            label: <Link href="/">Hello</Link>,
            icon: <TableOutlined />,
            key: `/`,
        },
        {
            label: <Link href="/">Hello</Link>,
            icon: <TableOutlined />,
            key: `/`,
        },
    ];

    if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
    else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
    else if (role === USER_ROLE.USER) return userSidebarItems;
    else {
        return defaultSidebarItems;
    }
};
