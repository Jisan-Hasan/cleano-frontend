"use client";

import CollapsePage from "@/components/ui/CollapsePage";
import { useGetBlogsQuery } from "@/redux/api/blogApi";

const BlogPage = () => {
    const { data } = useGetBlogsQuery({ limit: 100, page: 1 });

    const blogs: any = data?.blogs;

    const items = blogs?.map((item: any) => ({
        key: item.id,
        label: item.title,
        children: item.description,
    }));

    return (
        <div className="max-w-[800px] mx-auto my-10">
            <h1 className="text-center my-5">All Blogs</h1>
            <CollapsePage items={items} />
        </div>
    );
};

export default BlogPage;
