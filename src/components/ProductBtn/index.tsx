import Image from "next/image";
import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import item from "../../images/item.svg";
import Link from "next/link";
import Button from "../Button";
import { CiTrash } from "react-icons/ci";
import useTranslation from "@/hooks/useTranslation";
import { ProductBtnProps } from "@/common/type";

function ProductBtn(props: ProductBtnProps) {
    const { id, image_url, width, height, name, price, star, onRemove } = props;
    const { locale } = useTranslation();
    const [imgSrc, setImgSrc] = useState(image_url);

    const handleError = () => {
        setImgSrc(item);
    };

    const handleAddCart = (id: string | number | undefined) => {
        if (id === undefined) return;

        const currentBag: ProductBtnProps[] = JSON.parse(localStorage.getItem("bag") ?? "[]");

        const exists = currentBag.find(item => item.id === id);

        if (exists) {
            // Nếu đã tồn tại thì tăng số lượng
            const updatedBag = currentBag.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: (item.quantity ?? 1) + 1
                    };
                }
                return item;
            });
            localStorage.setItem("bag", JSON.stringify(updatedBag));
        } else {
            // Nếu chưa có thì thêm mới
            const newItem = {
                ...props,
                quantity: 1
            };
            const updatedBag = [...currentBag, newItem];
            localStorage.setItem("bag", JSON.stringify(updatedBag));
        }

        alert("Added to cart!");
    };

    const handleClear = (e: React.MouseEvent<SVGElement>, id: string | number | undefined) => {
        e.stopPropagation();
        e.preventDefault();
        if (id === undefined) return;

        const currentBag: ProductBtnProps[] = JSON.parse(localStorage.getItem("listFavorite") ?? "[]");
        const updatedBag = currentBag.filter(item => item.id !== id);
        localStorage.setItem("listFavorite", JSON.stringify(updatedBag));
        onRemove?.();
    };
    return (<div className={`hover:scale-101 transition-transform duration-300 cursor-pointer flex justify-center items-center flex-col ${width ? width : "max-w-[240px]"} ${height ? height : "max-h-[calc(240px+100px)]"}`}>
        <Link href={`/${locale}/products/${id}`}>
            <div className="z-20 relative bg-[#F8F8F8] rounded-[2px] aspect-[477/628] w-full flex-1">
                {imgSrc ? <Image onError={handleError}
                    src={imgSrc} alt="product" width={width ?? 477} height={height ?? 628} /> : null}
                <CiTrash
                    size={26}
                    onClick={(e: React.MouseEvent<SVGElement>) => handleClear(e, id)}
                    className="z-20 p-[4px] hover:scale-105 cursor-pointer absolute top-[4px] right-[4px]"
                />
            </div>
            <Button type="cart" title="Add To Cart" onSubmit={() => handleAddCart(id)} width="w-full" margin="my-[20px]" />
            <div className="h-[200px] flex-col justify-center">
                <p className="font-[500] text-center mt-[20px] m-b-[10px]">{name}</p>
                <div className="flex items-center justify-center">
                    <span>${price}</span>
                    <span className="inline-block bg-[#454545] w-[2px] h-[16px] mx-[20px]"></span>
                    <span>{star}</span>
                    <IoMdStar color="yellow" />
                </div>
            </div>
        </Link>

    </div>);
}

export default React.memo(ProductBtn);