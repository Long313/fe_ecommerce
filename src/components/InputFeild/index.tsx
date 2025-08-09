'use client'

import { emailRegex, passwordRegex, phoneRegex } from "@/constants";
import useTranslation from "@/hooks/useTranslation";
import { Eye, EyeOff } from "lucide-react"; // Hoặc dùng bất kỳ icon lib nào
import { ChangeEvent, useEffect, useRef, useState } from "react";


type InputFeildProps = {
    title: string,
    placeholder?: string,
    type?: string,
    name: string,
    star?: boolean,
    valueDefault?: string | null,
    onSave: (name: string, value: string) => void,
    getError?: Record<string, string>
}
function InputField(props: InputFeildProps) {
    const { title, placeholder, name, onSave, getError, valueDefault, star = true } = props;
    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | boolean>("");
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [mounted, setMounted] = useState(false); // 👈 kiểm soát render
    const { t } = useTranslation();

    useEffect(() => {
        setValue(valueDefault || "");
        setMounted(true);
    }, [valueDefault]);
    const handleFocus = () => {
        inputRef.current?.focus();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setValue(e.target.value);
    }

    const handleValidate = () => {
        if (name === "email" && !emailRegex.test(value)) {
            setError(t("emailError"));
        }
        if (name === "password" && !passwordRegex.test(value)) {
            setError(t("passwordError"));
        }
        if (name === "phone" && !phoneRegex.test(value)) {
            setError(t("phoneError"));
        }
        // if (name === "confirmPassword" && !passwordRegex.test(value)) {
        //     setError(t("confirmPasswordError")); 
        // }
        onSave(name, value);
    };

    useEffect(() => {
        if (getError?.confirmPassword === "confirm error" && name === "confirmPassword") {
            setError(t("confirmPasswordError"));
        } else if (getError && getError[name]) {
            setError(t(`${getError[name]}`));
        }
    }, [getError]);


    const isPasswordField = name === "password" || name === "confirmPassword"
    const inputType = isPasswordField && !showPassword ? "password" : "text"
    if (!mounted) return null; // tránh hydration mismatch

    return (<div className="flex flex-col">
        <label className="inline-block font-[500]" onClick={handleFocus}>
            {title}{star ? <span className="text-[red]">&nbsp;*</span> : null}
        </label>
        <div className="relative">
            <input
                value={value}
                onBlur={handleValidate}
                name={name}
                onChange={handleChange}
                type={inputType}
                ref={inputRef}
                placeholder={placeholder || ""}
                className="mt-[8px] outline-none rounded-[8px] py-[4px] px-[8px] text-[#636364] border border-[#636364] w-full pr-10 text-[16px]"
            />
            {isPasswordField && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-[calc(50%+5px)] right-[4px] transform -translate-y-1/2 text-[#636364]"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
        <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
            {error || "\u00A0"}
        </p>
    </div>);
}

export default InputField;