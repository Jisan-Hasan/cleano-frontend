import * as yup from "yup";

export const createFaqSchema = yup.object().shape({
    question: yup.string().required("Question is required"),
    answer: yup.string().required("Answer is required"),
});
