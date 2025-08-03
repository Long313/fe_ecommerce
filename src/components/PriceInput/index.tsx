'use client';

import { PriceInputProps } from "@/common/type";
import { ChangeEvent, useState } from "react";

export default function PriceInput(props: PriceInputProps) {
    const { name, title, onGetValue, value } = props;
    const [price, setPrice] = useState<string>(value);

    const handleGetValue = (name: string, e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
        onGetValue(name, e.target.value);
    }
    return (
        <>
            <span className="min-w-[40px]">{title}</span>
            <input
                onChange={(e) => handleGetValue(name, e)}
                type="text"
                name={name}
                value={price}
                className="outline-none border border-[#AEAEAE] px-[8px] py-[4px] rounded-[8px] max-w-[100px] mx-[4px]"
            />
            <span>$</span>
        </>
    )
}

