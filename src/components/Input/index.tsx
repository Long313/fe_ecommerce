'use client'

import { InputProps } from "@/common/type";
import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function Input(props: InputProps) {
    const {
        onGetData,
        title,
        name,
        star = true,
        type,
        width,
        minWidth,
        height,
        placeholder,
        defaultValue,
        dataSelect = [],
        margin
    } = props;

    const [value, setValue] = useState<string>(defaultValue ?? "");
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null);

    // const handleGetValue = () => {
    //     onGetData(name, value);
    // };

    const check = new Set(["city", "district", "ward", "gender", "category"]).has(name);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setValue(defaultValue ?? "");
    }, [defaultValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        onGetData(name, e.target.value);
    }

    useEffect(() => {
        setMounted(true);
    }, []);
    const isPasswordField = type === "password";
    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    if (!mounted) return null;
    return (
        <div className={`flex ${width ? width : "w-full"} h-full ${margin ? margin : "mt-[30px]"}`}>
            <p className={`flex text-black font-[600] ${minWidth ? minWidth : "min-w-[100px]"}`}>
                {title}<span className={`text-[red] ${star ? 'block' : 'hidden'}`}>&nbsp;*</span>
            </p>
            {check ? (
                <select
                    value={value}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        setValue(selectedValue);
                        const selectedItem = dataSelect.find((item) => item.value === selectedValue);
                        if (selectedItem) {
                            onGetData(name, selectedItem.value, selectedItem.id);
                        }
                    }}
                    className={`cursor-pointer appearance-none bg-[url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjODIyRkZGIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNNSA3bDUgNSA1LTVINXoiLz48L3N2Zz4=")] bg-no-repeat bg-[right_8px_center] pr-[32px] outline-none flex-1 ml-[20px] !border !border-solid !border-[#822FFF] bg-[rgb(255,53,196,0.06)] rounded-[4px] py-[4px] px-[8px] text-black ${width ? width : "w-full"} ${height ? height : "h-[30px]"}`}
                >
                    {dataSelect.map((item) => (
                        <option key={item.id ?? item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            ) : name === "description" ? (
                <textarea
                    // onBlur={handleGetValue}
                    className={`cursor-pointer outline-none flex-1 ml-[20px] border border-[#822FFF] bg-[rgb(255,53,196,0.06)] rounded-[4px] py-[4px] px-[8px] text-black resize-none ${width ? width : "w-full"} ${height ? height : "h-[60px]"}`}
                    value={value}
                    placeholder={placeholder}
                    name={name}
                    onChange={(e) => handleChange(e)}
                />
            ) : (
                <div className={`relative flex-1 ml-[20px] ${width ? width : "w-full"} ${height ? height : "h-[30px]"}`}>
                    <input
                        // onBlur={handleGetValue}
                        className={`cursor-pointer w-full h-full outline-none border border-[#822FFF] bg-[rgb(255,53,196,0.06)] rounded-[4px] py-[4px] px-[8px] text-black `}
                        value={value}
                        placeholder={placeholder}
                        type={inputType}
                        ref={inputRef}
                        name={name}
                        onChange={(e) => handleChange(e)}
                    />
                    {isPasswordField && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-[50%] right-[10px] transform -translate-y-1/2 text-[#636364]"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                </div>

            )}
        </div>
    );
}
