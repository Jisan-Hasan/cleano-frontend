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
            label: <Link href={`/${role}/categories`}>Category</Link>,
            icon: <TableOutlined />,
            key: `/${role}/categories`,
        },
        {
            label: <Link href={`/${role}/services`}>Services</Link>,
            icon: <TableOutlined />,
            key: `/${role}/services`,
        },
        {
            label: "Bookings",
            key: "bookings",
            icon: <AppstoreOutlined />,
            children: [
                {
                    label: (
                        <Link href={`/${role}/bookings/all`}>All Bookings</Link>
                    ),
                    key: `/${role}/bookings/all`,
                    icon: <TableOutlined />,
                },
                {
                    label: (
                        <Link href={`/${role}/bookings/pending`}>
                            Pending Bookings
                        </Link>
                    ),
                    key: `/${role}/bookings/pending`,
                    icon: <TableOutlined />,
                },
                {
                    label: (
                        <Link href={`/${role}/bookings/confirmed`}>
                            Confirmed Bookings
                        </Link>
                    ),
                    key: `/${role}/bookings/confirmed`,
                    icon: <TableOutlined />,
                },
                {
                    label: (
                        <Link href={`/${role}/bookings/completed`}>
                            Completed Bookings
                        </Link>
                    ),
                    key: `/${role}/bookings/completed`,
                    icon: <TableOutlined />,
                },
                {
                    label: (
                        <Link href={`/${role}/bookings/rejected`}>
                            Rejected Bookings
                        </Link>
                    ),
                    key: `/${role}/bookings/rejected`,
                    icon: <TableOutlined />,
                },
            ],
        },
        {
            label: <Link href={`/${role}/blogs`}>Blogs</Link>,
            icon: <TableOutlined />,
            key: `/${role}/blogs`,
        },
        {
            label: <Link href={`/${role}/faqs`}>FAQ</Link>,
            icon: <TableOutlined />,
            key: `/${role}/faqs`,
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

    if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
    else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
    else {
        return defaultSidebarItems;
    }
};
