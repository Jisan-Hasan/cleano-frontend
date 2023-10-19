"use client";

import ServiceCard from "@/components/ui/ServiceCard";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { Input } from "antd";
import { useState } from "react";

const ServicesPage = () => {
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    let options: any = { page: 1, limit: 100 };
    if (searchTerm !== "" && category !== "") {
        options = {
            page: 1,
            limit: 100,
            categoryId: category,
            searchTerm: searchTerm,
        };
    } else if (searchTerm === "" && category !== "") {
        options = {
            page: 1,
            limit: 100,
            categoryId: category,
        };
    } else if (searchTerm !== "" && category === "") {
        options = {
            page: 1,
            limit: 100,
            searchTerm: searchTerm,
        };
    }
    //@ts-ignore
    const { data: { services } = [{}] } = useGetServicesQuery(options);

    //@ts-ignore
    const { data: { categories } = [{}] } = useGetCategoriesQuery({
        page: 1,
        limit: 100,
    });

    // console.log(category);
    return (
        <div>
            <div className="py-4 grid">
                <Input
                    className="mx-auto"
                    type="text"
                    size="large"
                    placeholder="Search..."
                    style={{
                        width: "20%",
                    }}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />
            </div>
            <div className="flex gap-2">
                <div className="max-w-[450px] bg-[#E9EDF2]">
                    <div
                        className="hover:bg-green-900 px-10 py-5"
                        onClick={() => setCategory("")}
                    >
                        <button className="text-2xl border-none bg-transparent text-green-600 font-semibold ">
                            All Services
                        </button>
                    </div>
                    {categories?.map((item: any) => (
                        <div
                            key={item.id}
                            className="px-10 py-5 hover:bg-green-900"
                            onClick={() => setCategory(item.id)}
                        >
                            <button className="text-2xl border-none bg-transparent text-green-600 font-semibold ">
                                {item.title}
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {services?.map((item: any) => (
                            <div key={item.id}>
                                <ServiceCard service={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
