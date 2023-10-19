"use client";

import CollapsePage from "@/components/ui/CollapsePage";
import { useGetFaqsQuery } from "@/redux/api/faqApi";

const FaqPage = () => {
    const { data } = useGetFaqsQuery({ limit: 100, page: 1 });

    const faqs: any = data?.faqs;

    const items = faqs?.map((faq: any) => ({
        key: faq.id,
        label: faq.question,
        children: faq.answer,
    }));

    return (
        <div className="max-w-[800px] mx-auto my-10">
            <h1 className="text-center my-5">All FAQ</h1>
            <CollapsePage items={items} />
        </div>
    );
};

export default FaqPage;
