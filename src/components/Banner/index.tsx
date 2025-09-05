'use client';

import Image from "next/image";
import { useCallback, useState } from "react";
import collection from '@/images/collection.svg';
import shoes_pink from '@/images/shoes_pink.svg';
import shoes_blue from '@/images/shoes_blue.svg';
import shoes_brown from '@/images/shoes_brown.svg';
import new_img from '@/images/new.svg';
import './banner.css';
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
export default function Banner() {
    const router = useRouter();
    const { locale } = useTranslation();
    const { resetParamsSearch } = useStore();

    const [style, setStyle] = useState<number>(1);
    const handleExplore = useCallback(() => {
        resetParamsSearch();
        router.push(`/${locale}/products`);
    }, [router, locale]);
    const handleSetStyle = (value: number) => {
        setStyle(value);
    }

    return (
        <section className={`px-0 flex justify-between bg-gradient-to-b ${style === 1 ? 'from-[#FF7E5E]' : style === 2 ? 'from-[#48AFCC]' : 'from-[#9C6B67]'} to-[#F3F3F3]`}>
            <div className="w-full mt-[50px] h-fit flex pb-[100px]">
                <div className="w-1/2">
                    <div className="w-[160px] h-[50px] bg-white rounded-r-[10px] flex justify-center items-center">
                        <Image src={new_img} alt="new" width={80} height={80} />
                    </div>
                    <div className="ml-[var(--padding-screen)] mt-[20px]">
                        <Image src={collection} alt="collection" height={80} width={160} />
                        <h2 key={style} className="mt-[50px] font-[600] text-[30px] name-shoes-animation">{style === 1 ? 'Amax Sneaker Orange Blaze' : style === 2 ? 'Amax Sneaker Blue Storm' : 'Amax Sneaker Brown X'}</h2>
                        <div className="flex mt-[60x]">
                            <div
                                onClick={() => handleSetStyle(1)}
                                className={`
                                ml-[20px] 
                                cursor-pointer 
                                w-[80px] 
                                h-[40px] 
                                relative 
                                transform 
                                transition-transform 
                                duration-700 
                                ease-in-out
                                ${style === 1 ? 'scale-150 z-10' : 'scale-100'}
                            `}
                            >
                                <Image
                                    src={shoes_pink}
                                    alt="shoes_pink"
                                    fill
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div
                                onClick={() => handleSetStyle(2)}
                                className={`
                                ml-[20px] 
                                cursor-pointer 
                                w-[80px] 
                                h-[40px] 
                                relative 
                                transform 
                                transition-transform 
                                duration-700 
                                ease-in-out
                                ${style === 2 ? 'scale-150 z-10' : 'scale-100'}
                            `}
                            >
                                <Image
                                    src={shoes_blue}
                                    alt="shoes_blue"
                                    fill
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div
                                onClick={() => handleSetStyle(3)}
                                className={`
                                ml-[20px] 
                                cursor-pointer 
                                w-[80px] 
                                h-[40px] 
                                relative 
                                transform 
                                transition-transform 
                                duration-700  
                                ease-in-out
                                ${style === 3 ? 'scale-150 z-10' : 'scale-100'}
                            `}
                            >
                                <Image
                                    src={shoes_brown}
                                    alt="shoes_brown"
                                    fill
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <p className="my-[40px] text-justify font-[500]">
                            Introducing our newest sneakers — designed to deliver both comfort and style in every step. With lightweight materials, modern details, and a sleek silhouette, these shoes are perfect for everyday wear or active lifestyles. Available in multiple colors, they let you express your personality while keeping you comfortable all day long.
                        </p>
                        <button onClick={handleExplore} className="cursor-pointer w-[160px] h-[40px] bg-white rounded-[20px] hover:scale-101 font-[600] shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]">EXPLORE NOW</button>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <div className="ml-[20px] w-[80%] h-[80%] relative overflow-hidden">
                        {style === 1 && (
                            <Image
                                key="pink"
                                src={shoes_pink}
                                alt="shoes"
                                fill
                                className="w-full h-full object-contain animate-slide-in"
                            />
                        )}
                        {style === 2 && (
                            <Image
                                key="blue"
                                src={shoes_blue}
                                alt="shoes"
                                fill
                                className="w-full h-full object-contain animate-slide-in"
                            />
                        )}
                        {style === 3 && (
                            <Image
                                key="brown"
                                src={shoes_brown}
                                alt="shoes"
                                fill
                                className="w-full h-full object-contain animate-slide-in"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}