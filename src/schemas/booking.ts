import * as yup from "yup";

export const createBookingSchema = yup.object().shape({
    contractNo: yup.string().required("Contract No is required"),
    houseNo: yup.string().required("House No is required"),
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
});
