"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar/Navbar";
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const userLoggedIn = isLoggedIn();

    useEffect(() => {
        if (!userLoggedIn) {
            router.push("/login");
        }
    }, [userLoggedIn, router]);

    return (
        <>
            <Navbar />
            <Layout hasSider>
                <SideBar />
                <Contents>{children}</Contents>
            </Layout>
        </>
    );
};

export default dynamic(() => Promise.resolve(DashboardLayout), { ssr: false });
