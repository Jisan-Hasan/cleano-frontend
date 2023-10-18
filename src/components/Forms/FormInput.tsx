"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
interface IInput {
    name: string;
    type?: string;
    size?: "large" | "small";
    value?: string | string[] | undefined;
    id?: string;
    placeholder?: string;
    validation?: object;
    label?: string;
    readonly?: boolean;
}

const FormInput = ({
    name,
    type,
    size = "large",
    value,
    id,
    placeholder,
    validation,
    label,
    readonly = false,
}: IInput) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const errorMessage = getErrorMessageByPropertyName(errors, name);

    return (
        <>
            <div className="mb-1">{label ? label : null}</div>
            <Controller
                control={control}
                name={name}
                render={({ field }) =>
                    type === "password" ? (
                        <Input.Password
                            type={type}
                            size={size}
                            placeholder={placeholder}
                            {...field}
                            value={value ? value : field.value}
                        />
                    ) : (
                        <Input
                            type={type}
                            size={size}
                            placeholder={placeholder}
                            {...field}
                            value={value ? value : field.value}
                            readOnly={readonly}
                        />
                    )
                }
            />
            <small style={{ color: "red" }}>{errorMessage}</small>
        </>
    );
};

export default FormInput;
