import { useGetServicesQuery } from "@/redux/api/serviceApi";
import ServiceCard from "./ServiceCard";

const TopService = () => {
    const { data } = useGetServicesQuery({ limit: 4, page: 1 });

    return (
        <div className="py-10">
            <h1 className="text-blue-600 text-center mb-6 text-4xl font-bold">Popular Services</h1>
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto ">
                    {(data?.services as [])?.map((service: any) => (
                        <div key={service.id}>
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopService;
