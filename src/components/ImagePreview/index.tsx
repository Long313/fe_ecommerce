'use client';

import Image, { StaticImageData } from "next/image";
import { memo } from "react";

function ImagePreview({ image }: { image: string | StaticImageData }) {
    return (
        <div className="w-[260px] h-[300px] relative border border-[#C4C4C4]">
            <Image src={image} alt="product_preview" fill className="object-cover rounded-[4px]" />
        </div>
    );
}

export default memo(ImagePreview);