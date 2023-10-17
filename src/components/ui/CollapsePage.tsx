"use client";

import type { CollapseProps } from "antd";
import { Collapse } from "antd";

const CollapsePage = ({ items }: { items: CollapseProps["items"] }) => {
    return (
        <>
            <Collapse expandIconPosition={"start"} items={items} />
        </>
    );
};

export default CollapsePage;
