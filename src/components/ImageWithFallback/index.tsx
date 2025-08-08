import { useState, useEffect } from 'react';
import Image from 'next/image';
import item from '../../images/item.svg';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
    const [imgSrc, setImgSrc] = useState<string | StaticImport | null>(null);

    // Chỉ set imgSrc nếu src không phải chuỗi rỗng
    useEffect(() => {
        if (src && src.trim() !== '') {
            setImgSrc(src.trim());
        } else {
            setImgSrc(null);
        }
    }, [src]);

    // Nếu imgSrc là null, không render Image
    if (!imgSrc) return null;

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={60}
            height={60}
            unoptimized
            onError={() => setImgSrc(item)}
            style={{ objectFit: 'cover', borderRadius: 8 }}
        />
    );
}
