import { ProductProps } from "@/common/type";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import item from "../../images/item.svg";
import Link from "next/link";

function Product(props: ProductProps) {
    const { id,image_url, width, height, name, price, rate } = props;

    const [imgSrc, setImgSrc] = useState(image_url);

    const handleError = () => {
        setImgSrc(item);
    };
    return (<div className={`hover:scale-101 transition-transform duration-300 cursor-pointer flex justify-center items-center flex-col ${width ? width : "max-w-[240px]"} ${height ? height : "max-h-[calc(240px+100px)]"}`}>
        <Link href={`products/${id}`}>
            <div className="bg-[#F8F8F8] rounded-[2px] aspect-[477/628] w-full flex-1">
                <Image onError={handleError}
                    src={imgSrc} alt="product" width={width ?? 477} height={height ?? 628} />
            </div>
            <div className="h-[200px] flex-col justify-center">
                <p className="font-[500] text-center mt-[20px] m-b-[10px]">{name}</p>
                <div className="flex items-center justify-center">
                    <span>${price}</span>
                    <span className="inline-block bg-[#454545] w-[2px] h-[16px] mx-[20px]"></span>
                    <span>{rate}</span>
                    <IoMdStar color="yellow" />
                </div>
            </div>
        </Link>
    </div>);
}

export default React.memo(Product);