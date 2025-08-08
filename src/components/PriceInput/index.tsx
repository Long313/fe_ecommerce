'use client';

import { PriceInputProps } from "@/common/type";
import { ChangeEvent, useEffect, useState } from "react";

export default function PriceInput(props: PriceInputProps) {
    const { name, title, onGetValue, value } = props;
    const [price, setPrice] = useState<string>(value);
    const { margin, width, minWidth, maxWidth } = props;
    const handleGetValue = (name: string, e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
        onGetValue(name, e.target.value);
    }
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null; // hoặc return một loader/placeholder

    return (
        <div className={`${margin ? margin : ""} ${width ? width : ""} flex`}>
            <span className={`${minWidth ? minWidth : "min-w-[40px]"} inline-block font-[600]`}>{title}:</span>
            <input
                onChange={(e) => handleGetValue(name, e)}
                type="text"
                name={name}
                value={price}
                className={`flex-1 outline-none border border-[#822FFF] bg-[rgb(255,53,196,0.06)] rounded-[4px] px-[8px] py-[4px] ml-[4px] ${maxWidth ? maxWidth : "max-w-[120px]"}`}
            />
        </div>
    )
}

