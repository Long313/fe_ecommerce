'use client'
import { ProductDetailProps, ProductProps } from "@/common/type"
import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import shop_cart from '../../../../../images/shop_cart.svg'
import { CiTrash } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import item_img from "../../../../../images/item.svg";

export default function Bag() {
    const [listItem, setListItem] = useState<ProductDetailProps[]>([]);
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [like, setLike] = useState<(string | number)[]>([]);

    useEffect(() => {
        const listOrder = JSON.parse(localStorage.getItem("bag") || "[]");
        setListItem(listOrder);

        const savedQuantities = JSON.parse(localStorage.getItem("quantities") || "{}");

        const initialQuantities: Record<string, number> = {};
        listOrder.forEach((item: ProductProps) => {
            if (item.id !== undefined) {
                initialQuantities[String(item.id)] = savedQuantities[String(item.id)] || 1;
            }
        });
        setQuantities(initialQuantities);

        const listFavorite: ProductDetailProps[] = JSON.parse(localStorage.getItem("listFavorite") ?? "[]");
        const likedIds = listFavorite.map((item) => item.id);
        setLike(likedIds);

    }, []);

    // Lưu quantities vào localStorage mỗi khi quantities thay đổi
    useEffect(() => {
        localStorage.setItem('quantities', JSON.stringify(quantities));
    }, [quantities]);

    const handleCheckout = () => {
        // TODO: Xử lý checkout
    }

    const handleClear = (id: string | number | undefined) => {
        if (id === undefined) return;
        const key = String(id);
        const newList = listItem.filter(item => String(item.id) !== key);
        setListItem(newList);

        setQuantities(prev => {
            const updated = { ...prev };
            delete updated[key];
            localStorage.setItem("quantities", JSON.stringify(updated)); // cập nhật localStorage sau khi xóa
            return updated;
        });

        localStorage.setItem("bag", JSON.stringify(newList));
    };

    // const handleSub = (id: string | number) => {
    //     const key = String(id);
    //     setQuantities(prev => ({
    //         ...prev,
    //         [key]: Math.max(1, (prev[key] || 1) - 1)
    //     }));
    // };

    // const handleAdd = (id: string | number) => {
    //     const key = String(id);
    //     setQuantities(prev => ({
    //         ...prev,
    //         [key]: (prev[key] || 1) + 1
    //     }));
    // };

    const handleSub = (id: string | number) => {
        setListItem(prevList => {
            const newList = prevList.map(item => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, (item.quantity || 1) - 1);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            localStorage.setItem("bag", JSON.stringify(newList));
            return newList;
        });
    };

    const handleAdd = (id: string | number) => {
        setListItem(prevList => {
            const newList = prevList.map(item => {
                if (item.id === id) {
                    const newQuantity = (item.quantity || 1) + 1;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            localStorage.setItem("bag", JSON.stringify(newList));
            return newList;
        });
    };

    const handleAddToFavorite = (item: ProductDetailProps) => {
        const listLocalStorage: ProductDetailProps[] = JSON.parse(localStorage.getItem("listFavorite") ?? "[]");

        const exists = listLocalStorage.some((i) => i.id === item.id);

        let newList: ProductDetailProps[];

        if (exists) {
            newList = listLocalStorage.filter((i) => i.id !== item.id);
        } else {
            newList = [...listLocalStorage, item];
        }

        localStorage.setItem("listFavorite", JSON.stringify(newList));

        const newLikeIds = newList.map((i) => i.id);
        setLike(newLikeIds);
    };

    return (
        <div className="w-full h-full my-[200px] px-[var(--padding-screen)] flex flex-col">
            <div className="flex flex-row">
                <div className="w-[70%] pr-[40px]">
                    <p className="text-left mb-[40px] font-[600]">BAG</p>
                    {listItem.length > 0 ? (
                        <div>
                            {listItem.map((item, index) => (
                                <div className="pb-[20px] mb-[40px] flex flex-row border-b border-[#E5E5E5]" key={`${item.id}-${index}`}>
                                    <div className="w-[20%] flex flex-col justify-center items-center">
                                        <Image src={item_img} width={100} height={100} alt="product" />
                                        <div className="mt-[20px] w-[60%] flex justify-between border items-center border-[#A5A5A5] rounded-[16px] py-[4px] px-[8px]">
                                            <RiSubtractFill
                                                onClick={() => handleSub(item.id as string | number)}
                                                className="hover:scale-110 cursor-pointer"
                                            />
                                            <span className="mx-[8px]">{item.quantity || 1}</span>
                                            <IoAdd
                                                onClick={() => handleAdd(item.id as string | number)}
                                                className="hover:scale-110 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 ml-[20px]">
                                        <p className="uppercase font-[600]">{item.name}</p>
                                        <p className="capitalize my-[10px]">{item.category}</p>
                                        <p className="flex items-center"><span>Color</span> <span className={`bg-[${item.color}] w-[20px] h-[20px] ml-[10px] inline-block`}></span></p>
                                        <p className="my-[10px]">Size: <span className="underline">{item.size}</span></p>
                                        <p className="font-[16px] text-[600]">${item.price}</p>
                                    </div>
                                    <div className="p-[4px] rounded-[50%] w-[10%] flex flex-col justify-between">
                                        {like.includes(item.id as string | number) ? (
                                            <IoIosHeart
                                                size={26}
                                                className="hover:scale-105 cursor-pointer border border-[#A5A5A5] rounded-[50%] p-[4px]"
                                                color="red"
                                                onClick={() => handleAddToFavorite(item as ProductDetailProps)}
                                            />
                                        ) : (
                                            <IoIosHeartEmpty
                                                size={26}
                                                className="hover:scale-105 cursor-pointer border border-[#A5A5A5] rounded-[50%] p-[4px]"
                                                onClick={() => handleAddToFavorite(item as ProductDetailProps)}
                                            />
                                        )}
                                        <CiTrash
                                            size={20}
                                            onClick={() => handleClear(item.id)}
                                            className="hover:scale-105 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col w-full justify-center items-center">
                            <Image src={shop_cart} alt="no-product" width={80} />
                            <p className="text-[#ABABAB] mt-[10px]">There are no items in your bag.</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-[30%]">
                    <p className="font-[600]">SUMMARY</p>
                    <div className="my-[40px]">
                        <p>Subtotal</p>
                        <p className="flex flex-row justify-between py-[10px] border-b border-[#E5E5E5]">
                            <span>Shipping fee</span>
                            <span>Free</span>
                        </p>
                        <p className="py-[10px] border-b border-[#E5E5E5]">Total</p>
                    </div>
                    <Button title="Checkout" onSubmit={handleCheckout} width="w-full" />
                </div>
            </div>
        </div>
    );
}
