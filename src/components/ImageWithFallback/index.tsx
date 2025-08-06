import { useState } from 'react';
import Image from 'next/image';
import item from '../../images/item.svg';
export default function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            src={(typeof imgSrc === 'string' ? imgSrc.trim() : imgSrc)}
            alt={alt}
            width={60}
            height={60}
            onError={() => setImgSrc(item)}
            style={{ objectFit: 'cover', borderRadius: 8 }}
        />
    );
};
