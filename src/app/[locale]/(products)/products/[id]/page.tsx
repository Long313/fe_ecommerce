'use client'
import { ProductDetailProps } from '@/common/type';
import { COLORS, SIZES } from '@/constants';
import useTranslation from '@/hooks/useTranslation';
import { getDetailProduct } from '@/service/product';
import { useMutation } from '@tanstack/react-query';
import { Tooltip } from 'antd';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import item from "@/images/item.svg";
import dynamic from 'next/dynamic';
const Button = dynamic(() => import('@/components/Button'), { ssr: false });
const Loader = dynamic(() => import('@/components/Loader'), { ssr: false });

export default function ProductDetail() {
    const params = useParams();
    const [like, setLike] = useState<boolean>(false);
    const [size, setSize] = useState<string>("L");
    const [color, setColor] = useState<string>("pink");
    const [data, setData] = useState<ProductDetailProps>({
        id: '',
        name: '',
        category: '',
        description: '',
        price: '',
        image_url: "",
        gender: "",
        size: "",
        color: "",
    });
    const { locale } = useTranslation();
    const router = useRouter();

    // const handleError = () => {
    //     setData(prev => ({
    //         ...prev,
    //         image_url: item.src,
    //     }));
    // };

    const id: string = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");

    useEffect(() => {
        if (id) mutate(id);
    }, []);

    const { mutate, isPending } = useMutation({
        mutationFn: getDetailProduct,
        onSuccess: (res) => {
            if (res.status === 200) setData(res.data);
        },
        onError: (error: { status: number, message: string }) => {
            console.log(error);
        }
    });

    // const handleGetSize = (value: string) => setSize(value);
    // const handleGetColor = (value: string) => setColor(value);

    const handleAddToBag = useCallback(() => {
        let bag: (ProductDetailProps & { quantity: number; size: string })[] = [];
        try {
            const stored = JSON.parse(localStorage.getItem("bag") ?? "[]");
            bag = Array.isArray(stored) ? stored : [];
        } catch {
            bag = [];
        }

        const existingIndex = bag.findIndex(item => item.id === data.id && item.size === size && item.color === color);
        if (existingIndex !== -1) {
            bag[existingIndex].quantity = (bag[existingIndex].quantity || 1) + 1;
        } else {
            bag.push({ ...data, size, color, quantity: 1 });
        }

        localStorage.setItem("bag", JSON.stringify(bag));
        router.push(`/${locale}/products/bag`);
    }, [data, size, color, locale, router])

    const handleAddToFavorite = useCallback(() => {
        const newLike = !like;
        setLike(newLike);
        const listLocalStorage: ProductDetailProps[] = JSON.parse(localStorage.getItem("listFavorite") ?? "[]");

        if (newLike) {
            const alreadyExists = listLocalStorage.some((item) => item.id === data.id);
            if (!alreadyExists) {
                listLocalStorage.push(data);
                localStorage.setItem("listFavorite", JSON.stringify(listLocalStorage));
            }
        } else {
            const newList = listLocalStorage.filter((item) => item.id !== data.id);
            localStorage.setItem("listFavorite", JSON.stringify(newList));
        }
    }, [[like, data]]);

    const renderColors = useMemo(() => (
        COLORS.map(c => (
            <span
                key={c}
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`${color === c ? "border-2 border-black" : ""} cursor-pointer border border-[#A3A3A3] w-10 h-10 mx-1 rounded-sm hover:scale-105`}
            />
        ))
    ), [color]);

    const renderSizes = useMemo(() => (
        SIZES.map(s => (
            <span
                key={s}
                onClick={() => setSize(s)}
                className={`${size === s ? "bg-black text-white" : ""} cursor-pointer border border-[#A3A3A3] w-10 h-10 mx-1 flex justify-center items-center rounded-sm hover:scale-105`}
            >
                {s}
            </span>
        ))
    ), [size]);

    return (
        <>
            {isPending && <Loader />}
            {data && (
                <div className="w-full mt-[120px] mb-[200px] px-[var(--padding-screen)] flex justify-around">
                    <div className="relative w-[30%] shadow-md h-[480px] rounded-sm">
                        <Image
                            src={data.image_url || item}
                            alt="product"
                            fill
                            className="object-contain"
                            onError={(e) => (e.currentTarget.src = item.src)}
                        />
                    </div>

                    <div className="relative w-[40%] shadow-md p-5 flex flex-col items-center rounded-sm">
                        <h2 className="bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent text-[30px] font-semibold">
                            {data.name}
                        </h2>
                        <p className="text-black">{data.description}</p>
                        <p className="text-[28px] font-semibold my-5">${data.price}</p>

                        <p className="font-semibold">COLORS</p>
                        <div className="flex justify-around items-center my-2">{renderColors}</div>

                        <p className="font-semibold">SIZE</p>
                        <div className="flex justify-around items-center my-2">{renderSizes}</div>

                        <p className="mb-5 text-xs cursor-pointer">FIND YOUR SIZE | MEASUREMENT GUIDE</p>
                        <Button
                            type="cart"
                            title="ADD TO CART"
                            onSubmit={handleAddToBag}
                            width="w-[80%]"
                            height="h-[36px]"
                            boxShadow="shadow-[0px_7.12px_7.12px_rgba(55,55,55,0.25)]"
                        />

                        <div className="absolute top-[10px] right-[10px]">
                            <Tooltip title="Add to favorites" placement="bottom" color="#fff" styles={{ body: { color: 'black' } }}>
                                {like
                                    ? <IoIosHeart size={20} onClick={handleAddToFavorite} className="cursor-pointer" color="red" />
                                    : <IoIosHeartEmpty size={20} onClick={handleAddToFavorite} className="cursor-pointer" />
                                }
                            </Tooltip>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
