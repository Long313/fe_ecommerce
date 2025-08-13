'use client'

import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type InputFeildProps = {
    title: string,
    placeholder?: string,
    type?: string,
    isError?: boolean,
    name: string,
    star?: boolean,
    compareWith?: string,
    valueDefault?: string | null,
    onSave: (name: string, value: string) => void,
    onGetBlur: (name: string, value: string) => void,
    getError?: Record<string, string>
}
function InputField(props: InputFeildProps) {
    const { title, placeholder, type, name, onSave, onGetBlur, valueDefault, star = true, isError = true } = props;
    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [mounted, setMounted] = useState(false);
    // const { t } = useTranslation();

    useEffect(() => {
        setMounted(true);
    }, [valueDefault]);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onSave(name, newValue);
    }

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onGetBlur(name, newValue);
    }

    const isPasswordField = type === "password";
    const inputType = isPasswordField && !showPassword ? "password" : "text"
    if (!mounted) return null;

    return (<div className="flex flex-col">
        <label className="inline-block font-[500]" onClick={handleFocus}>
            {title}{star ? <span className="text-[red]">&nbsp;*</span> : null}
        </label>
        <div className="relative">
            <input
                value={value}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={30}
                type={inputType}
                ref={inputRef}
                placeholder={placeholder || ""}
                className="min-h-[33px] mt-[8px] outline-none rounded-[8px] py-[4px] px-[8px] pr-[30px] text-[#636364] border border-[#636364] w-full text-[14px]"
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
        {/* {isError && <p className="w-[315px] mt-[2px] ml-[2px] text-[12px] text-[red] min-h-[20px] visibility-visible">
        {error || "\u00A0"}
        </p>} */}
    </div>);
}

export default InputField;