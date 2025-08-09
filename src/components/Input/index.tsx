'use client'

import { InputProps } from "@/common/type";
import { ChangeEvent, useEffect, useState } from "react";

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

    if (!mounted) return null; 
    return (
        <div className={`flex ${width ? width : "w-full"} h-full ${margin ? margin : "mt-[30px]"}`}>
            <p className={`text-black font-[600] ${minWidth ? minWidth : "min-w-[100px]"}`}>
                {title}: <span className={`text-[red] ${star ? 'block' : 'hidden'}`}>&nbsp;*</span>
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
                <input
                    // onBlur={handleGetValue}
                    className={`cursor-pointer outline-none flex-1 ml-[20px] border border-[#822FFF] bg-[rgb(255,53,196,0.06)] rounded-[4px] py-[4px] px-[8px] text-black ${width ? width : "w-full"} ${height ? height : "h-[30px]"}`}
                    value={value}
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    onChange={(e) => handleChange(e)}
                />
            )}
        </div>
    );
}
