"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Contents from "@/components/ui/Contents";
import Sidebar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import dynamic from "next/dynamic";
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
                <Sidebar />
                <Contents>{children}</Contents>
            </Layout>
            <Footer />
        </>
    );
};

export default dynamic(() => Promise.resolve(DashboardLayout), { ssr: false });
