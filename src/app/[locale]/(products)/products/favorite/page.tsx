'use client'

import { useEffect, useState } from "react";
import { ProductDetailProps } from "@/common/type";
import ProductBtn from "@/components/ProductBtn";
import { toast, Toaster } from 'react-hot-toast';

export default function Favorite() {
    const [list, setList] = useState<ProductDetailProps[]>([]);

    const loadList = () => {
        const storedList = JSON.parse(localStorage.getItem("listFavorite") || "[]");
        setList(storedList);
    };

    useEffect(() => {
        loadList();
    }, []);

    const handleRemove = () => {
        loadList();
    };
    const handleNotify = () => {
        toast.success('Thêm vào giỏ hàng thành công!');
    }
    return (
        <div className="w-full h-full mt-[240px] px-[var(--padding-screen)] flex flex-col">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-32 w-full max-w-7xl mx-auto">
                {list.length > 0 && list.map(item => (
                    <div className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]" key={item.id}>
                        <ProductBtn {...item} onRemove={handleRemove} onAdd={handleNotify} />
                    </div>
                ))}
            </div>
            <Toaster position="bottom-right" />
        </div>
    )
}