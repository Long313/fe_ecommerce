import Image from "next/image";
import React from "react";
import { IoMdStar } from "react-icons/io";

interface ProductProps {
    image: string,
    width?: number | string,
    height?: number | string
    name?: string,
    price?: number | string,
    rate?: number | string;
}

function Product(props: ProductProps) {
    const { image, width, height, name, price, rate } = props;                          //    ratio: 477/628
    return (<div className={`hover:scale-101 transition-transform duration-300 cursor-pointer flex justify-center items-center flex-col ${width ? width : "max-w-[240px]"} ${height ? height : "max-h-[calc(240px+100px)]"}`}>
        <div className="bg-[#F8F8F8] rounded-[2px] aspect-[477/628] w-full flex-1">
            <Image src={image} alt="product" className="" />
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
    </div>);
}

export default React.memo(Product);