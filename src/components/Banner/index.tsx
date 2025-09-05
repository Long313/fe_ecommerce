'use client';

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import collection from '@/images/collection.svg';
import shoes_pink from '@/images/shoes_pink.svg';
import shoes_blue from '@/images/shoes_blue.svg';
import shoes_brown from '@/images/shoes_brown.svg';
import arrow_1 from '@/images/arrow_1.svg';
import arrow_2 from '@/images/arrow_2.svg';
import arrow_3 from '@/images/arrow_3.svg';
import new_img from '@/images/new.svg';
import './banner.css';
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";

const SHOES_STYLES = [
    { id: 1, name: "Amax Sneaker Orange Blaze", shoeImg: shoes_pink, arrowImg: arrow_1, gradient: "from-[#FF7E5E]" },
    { id: 2, name: "Amax Sneaker Blue Storm", shoeImg: shoes_blue, arrowImg: arrow_2, gradient: "from-[#48AFCC]" },
    { id: 3, name: "Amax Sneaker Brown X", shoeImg: shoes_brown, arrowImg: arrow_3, gradient: "from-[#9C6B67]" },
];

export default function Banner() {
    const router = useRouter();
    const { locale } = useTranslation();
    const { resetParamsSearch } = useStore();

    const [style, setStyle] = useState<number>(1);

    const current = useMemo(
        () => SHOES_STYLES.find(s => s.id === style) ?? SHOES_STYLES[0],
        [style]
    );

    const handleExplore = useCallback(() => {
        resetParamsSearch();
        router.push(`/${locale}/products`);
    }, [router, locale]);

    return (
        <section className={`px-0 flex justify-between bg-gradient-to-b ${current.gradient} to-[#F3F3F3]`}>
            <div className="w-full mt-[50px] h-fit flex pb-[100px]">
                <div className="w-1/2">
                    <div className="w-[160px] h-[50px] bg-white rounded-r-[10px] flex justify-center items-center">
                        <Image src={new_img} alt="new" width={80} height={80} />
                    </div>
                    <div className="ml-[var(--padding-screen)] mt-[20px]">
                        <Image src={collection} alt="collection" height={80} width={160} />
                        <h2 key={current.id} className="mt-[50px] font-[600] text-[30px] name-shoes-animation">
                            {current.name}
                        </h2>
                        <div className="flex mt-[60px]">
                            {SHOES_STYLES.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setStyle(item.id)}
                                    className={`
                    ml-[20px] cursor-pointer w-[80px] h-[40px] relative
                    transform transition-transform duration-700 ease-in-out
                    ${style === item.id ? 'scale-150 z-10' : 'scale-100'}
                  `}
                                >
                                    <Image src={item.shoeImg} alt={item.name} fill className="w-full h-full object-contain" />
                                </div>
                            ))}
                        </div>
                        <p className="my-[40px] text-justify font-[500]">
                            Introducing our newest sneakers - designed to deliver both comfort and style in every step. With lightweight materials, modern details, and a sleek silhouette, these shoes are perfect for everyday wear or active lifestyles. Available in multiple colors, they let you express your personality while keeping you comfortable all day long.
                        </p>
                        <button
                            onClick={handleExplore}
                            className="cursor-pointer w-[160px] h-[40px] bg-white rounded-[20px] hover:scale-101 font-[600] shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]"
                        >
                            EXPLORE NOW
                        </button>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center relative">
                    <div className="ml-[20px] w-full h-full relative overflow-hidden">
                        <Image
                            key={current.id}
                            src={current.shoeImg}
                            alt={current.name}
                            fill
                            className="w-full h-full object-contain animate-slide-in z-20"
                        />

                        <div className="animate-arrow absolute left-[100px] bottom-[40px] w-[70%] h-[20px] bg-black/40 blur-xl rounded-[50%]"></div>

                        <div className="absolute top-[0px] right-[10px] flex">
                            {[1, 2, 3].map(i => (
                                <div key={`arrow-${i}-${current.id}`} className="h-[300px] w-[80px] mr-[20px] relative">
                                    <Image
                                        src={current.arrowImg}
                                        alt={`arrow-${i}`}
                                        fill
                                        className="w-full h-full object-contain animate-arrow"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
