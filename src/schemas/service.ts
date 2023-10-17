import * as yup from "yup";

export const createServiceSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required"),
    availability: yup.boolean().required("Availability is required"),
    categoryId: yup
        .string()
        .uuid("Invalid UUID")
        .required("Category is required"),
});
