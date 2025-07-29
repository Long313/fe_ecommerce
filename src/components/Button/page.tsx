"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

type ButtonProps = {
    title: string;
    backgroundColor?: string;
    width?: string;
    widthLogo?: number;
    height?: string;
    heightLogo?: number;
    color?: string;
    onSubmit: () => void;
    image?: string | StaticImport;
    border?: string;
    margin?: string;
    boxShadow?: string;
    rounded?: string;
    position?: string;
    arrow?: boolean;
    padding?: string;
    type?: string;
};

function Button(props: ButtonProps) {
    const {
        title,
        backgroundColor,
        width,
        height,
        color,
        onSubmit,
        image,
        widthLogo,
        heightLogo,
        border,
        margin,
        boxShadow,
        rounded,
        position,
        arrow,
        padding,
        type
    } = props;

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const buttonClass = `
    ${backgroundColor ?? "bg-gradient-to-r from-[#822FFF] to-[#FF35C4]"}
    ${width ?? "min-w-[315px]"}
    ${height ?? "h-[40px]"}
    ${color ?? "text-[#fff]"}
    ${border ?? ""}
    ${boxShadow ?? ""}
    ${margin ?? ""}
    ${rounded ?? "rounded-[12px]"}
    ${position ?? ""}
    ${padding ?? ""}
    flex items-center justify-center font-[500] text-[14px] cursor-pointer hover:zoom transition-transform duration-300 transform hover:scale-101 min-h-[40px]
  `;

    return (
        <button onClick={onSubmit} className={buttonClass}>
            {image && (
                <Image
                    src={image}
                    alt="logo-button"
                    width={widthLogo ?? 24}
                    height={heightLogo ?? 24}
                    className="inline-block mr-[8px]"
                />
            )}
            {
                type && (
                    <IoCartOutline size={20} className="hover:scale-105 mr-[20px] cursor-pointer" />
                )
            }
            <span className="inline-block">{title}</span>
            {arrow && <FaArrowRightLong className="ml-[10px]" />}
        </button>
    );
}

export default Button;
