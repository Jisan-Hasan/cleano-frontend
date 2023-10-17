import * as yup from "yup";

export const createUserSchema = yup.object().shape({
    email: yup
        .string()
        .email("Provide a valid email address")
        .required("Email is required"),
    firstName: yup.string().min(2).max(32).required("First name is required"),
    lastName: yup.string().min(2).max(32).optional(),
    role: yup.string().oneOf(["admin", "user"]).required("Role is required"),
    password: yup
        .string()
        .min(6, "Password must be 6 character long")
        .max(32, "Password should be less than 32 character")
        .required("Password is required"),
});
