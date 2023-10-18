import * as yup from "yup";

export const createBlogSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
});
