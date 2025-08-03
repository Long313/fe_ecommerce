'use client'
import { ProductDetailProps } from '@/common/type';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { COLORS, SIZES } from '@/constants';
import useTranslation from '@/hooks/useTranslation';
import { getDetailProduct } from '@/service/product';
import { useMutation } from '@tanstack/react-query';
import { Tooltip } from 'antd';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import item from "../../../../../images/item.svg";

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

    const handleError = () => {
        setData(prev => ({
            ...prev,
            image_url: item.src,
        }));
    };

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

    const handleGetSize = (value: string) => setSize(value);
    const handleGetColor = (value: string) => setColor(value);

    const handleAddToBag = () => {
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
    }

    const handleAddToFavorite = () => {
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
    };

    return (
        <>
            {isPending && <Loader />}
            {data.image_url && (
                <div className="w-full h-full my-[200px] px-[var(--padding-screen)] flex justify-around">
                    <div className="relative w-[30%] shadow-[0_4px_12px_rgba(0,0,0,0.15)] h-[480px] rounded-[4px]">
                        <Image onError={handleError} src={data.image_url} alt="product" fill className='object-contain' />
                    </div>

                    <div className="relative w-[40%] shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-[20px] flex flex-col items-center rounded-[4px]">
                        <h2 className="text-black text-[30px] font-[600]">{data.name}</h2>
                        <p className="text-black text-left">{data.description}</p>
                        <p className="text-[28px] font-[600] my-[20px]">${data.price}</p>

                        <p className="font-[600]">COLORS</p>
                        <div className="flex justify-around items-center my-[10px]">
                            {COLORS.map((item) => (
                                <span
                                    key={item}
                                    onClick={() => handleGetColor(item)}
                                    style={{ backgroundColor: item }}
                                    className={`${color === item ? "border-[2px] border-black" : ""
                                        } cursor-pointer border border-[#A3A3A3] w-[40px] h-[40px] mx-[4px] flex justify-center items-center rounded-[2px] hover:scale-102 hover:border-[1px] hover:border-black`}
                                ></span>
                            ))}
                        </div>

                        <p className="font-[600]">SIZE</p>
                        <div className="flex justify-around items-center my-[10px]">
                            {SIZES.map((item) => (
                                <span
                                    key={item}
                                    onClick={() => handleGetSize(item)}
                                    className={`${size === item ? "bg-black text-white" : ""
                                        } cursor-pointer border border-[#A3A3A3] w-[40px] h-[40px] mx-[4px] flex justify-center items-center rounded-[2px] hover:scale-102 hover:border-[1px] hover:border-black`}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <p className='mb-[20px] text-[12px] cursor-pointer'>FIND YOUR SIZE  |  MEASUREMENT GUIDE</p>
                        <Button type="cart" title="ADD TO CART" onSubmit={handleAddToBag} width="w-[80%]" height="h-[36px]" />

                        <div className='absolute top-[10px] -right-[30px] group overflow-visible'>
                            <div className="relative w-fit top-0 right-[40px]">
                                <Tooltip
                                    title="Add to favorites"
                                    placement="bottom"
                                    color="#ffffff"
                                    styles={{
                                        body: {
                                            color: 'black',
                                        },
                                    }}
                                >
                                    {like
                                        ? <IoIosHeart size={20} className="hover:scale-105 cursor-pointer" onClick={handleAddToFavorite} color="red" />
                                        : <IoIosHeartEmpty size={20} className="hover:scale-105 cursor-pointer" onClick={handleAddToFavorite} />}
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
