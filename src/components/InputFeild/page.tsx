'use client'
import { ChangeEvent, useRef, useState } from "react";
import { emailRegex, passwordRegex } from "@/constants";
import useTranslation from "@/hooks/useTranslation";


type InputFeildProps = {
    title: string;
    placeholder?: string;
    type?: string;
    name : string
}
function InputField({ title, placeholder, type, name }: InputFeildProps) {
    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>("");
    const { t } = useTranslation()

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        console.log("e", e.target.value);
        setValue(e.target.value);
    }

    const handleValidate = () => {
        if (name === "email" && !emailRegex.test(value)) {
            setError(t("emailError"));
        }
        if (name === "password" && !passwordRegex.test(value)) {
            setError(t("passwordError")); 
        }
        if (name === "confirmPassword" && !passwordRegex.test(value)) {
            setError(t("confirmPasswordError")); 
        }
    };

    return (<div className="flex flex-col mt-[20px]">
        <label htmlFor="email_feild" className="inline-block font-[500]" onClick={handleFocus}>
            {title}
        </label>
        <input onBlur={handleValidate} name={name}
            onChange={(e) => handleChange(e)} type={type} ref={inputRef} placeholder={placeholder || ""} className="mt-[8px] outline-none rounded-[12px] py-[4px] px-[8px] text-[#636364] border border-[#636364] min-w-[315px]" />
        <p className="mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[16px] visibility-visible">
            {error || "\u00A0"}
        </p>
    </div>);
}

export default InputField;