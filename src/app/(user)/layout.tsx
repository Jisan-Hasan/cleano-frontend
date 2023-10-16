import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {/* <h1>Header</h1> */}
            <Navbar />
            {children}
            {/* <h1>Footer</h1> */}
            <Footer />
        </div>
    );
};

export default UserLayout;
