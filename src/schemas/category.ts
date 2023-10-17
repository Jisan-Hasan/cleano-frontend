import * as yup from "yup";

export const createCategorySchema = yup.object().shape({
    title: yup.string().min(2).max(50).required("Category Title is required"),
});
