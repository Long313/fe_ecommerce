'use client';

import { ProductProps } from "@/common/type";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import item from "../../images/item.svg";
import Link from "next/link";
import useTranslation from "@/hooks/useTranslation";

function Product(props: ProductProps) {
    const { id, image_url, width, height, name, price, star } = props;
    const { locale } = useTranslation();
    const [imgSrc, setImgSrc] = useState(image_url);

    const handleError = () => {
        setImgSrc(item);
    };
    return (<div className={`hover:scale-101 transition-transform duration-300 cursor-pointer flex justify-center items-center flex-col ${width ? width : "max-w-[160px]"} ${height ? height : "max-h-[180px]"}`}>
        <Link href={`/${locale}/products/${id}`}>
            <div className="bg-[#F8F8F8] rounded-[2px] aspect-[477/628] w-full flex-1 max-w-[160px] max-h-[200px] overflow-hidden">
                {imgSrc ? (
                    <Image
                        onError={handleError}
                        src={imgSrc}
                        alt="product"
                        width={width ?? 477}
                        height={height ?? 628}
                    />
                ) : <Image
                    // onError={handleError}
                    src={item}
                    alt="product"
                    width={width ?? 477}
                    height={height ?? 628}
                />}
            </div>
            <div className="h-[60px] mt-[10px] flex-col justify-center">
                <p className="font-[500] text-center mb-[10px] max-w-[160px] truncate overflow-hidden whitespace-nowrap">{name}</p>
                <div className="flex items-center justify-center">
                    <p><span className="font-[600]">$</span><span>{price}</span></p>
                    <span className="inline-block bg-[#454545] w-[2px] h-[16px] mx-[20px]"></span>
                    <span>{star}</span>
                    <IoMdStar color="yellow" size={20} />
                </div>
            </div>
        </Link>
    </div>);
}

export default React.memo(Product);