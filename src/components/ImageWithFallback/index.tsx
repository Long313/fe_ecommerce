import { useState } from 'react';
import Image from 'next/image';
import item from '../../images/item.svg';
export default function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
    const [imgSrc, setImgSrc] = useState(src);
    console.log("src", imgSrc);
    return (
        <Image
            src={(typeof imgSrc === 'string' ? imgSrc.trim() : imgSrc)}
            // src="http://localhost:8000/hbkaXGfm0mz30EGitr23nEDnO2AbgrBn.png"
            alt={alt}
            width={60}
            height={60}
            unoptimized
            onError={() => setImgSrc(item)}
            style={{ objectFit: 'cover', borderRadius: 8 }}
        />
    );
};
