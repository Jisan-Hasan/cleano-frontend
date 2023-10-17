"use client";
import { Layout } from "antd";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {

    return (
        <Content
            style={{
                minHeight: "100vh",
                color: "black",
                marginLeft: "10px",
                marginTop: "6px",
            }}
        >
            
            {children}
        </Content>
    );
};

export default Contents;
