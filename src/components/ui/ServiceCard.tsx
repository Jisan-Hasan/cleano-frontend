import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Image from "next/image";
import serviceLogo from "../../assets/service.png";

const { Meta } = Card;

const ServiceCard = ({ service }: any) => (
    <Card
        style={{ width: 300 }}
        cover={<Image alt="example" src={serviceLogo} />}
        actions={[
            <ShoppingCartOutlined key="addToCart" />,
            // <SettingOutlined key="setting" />,
            // <EditOutlined key="edit" />,
            // <EllipsisOutlined key="ellipsis" />,
        ]}
    >
        <div>
            <p className="text-lg font-bold">{service?.name}</p>
            <p className="text-lg font-semibold">$ {service?.price}</p>
        </div>
        {/* <Meta title={service?.name} description={service?.price} /> */}
    </Card>
);

export default ServiceCard;
