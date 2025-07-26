'use client'
import { ProductDetailProps } from '@/common/type';
import { getDetailProduct } from '@/service/product';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import item from "../../../../../images/item.svg";
import Loader from '@/components/Loader/page';
import Button from '@/components/Button/page';
import { SIZES } from '@/constants';
import { IoIosHeartEmpty } from 'react-icons/io';
import { Tooltip } from 'antd';

export default function ProductDetail() {
    const params = useParams();
    const [data, setData] = useState<ProductDetailProps>({
        id: '',
        name: '',
        category: '',
        description: '',
        price: '',
        image_url: "",
        gender: ""
    });

    const handleError = () => {
        setData(prev => ({
            ...prev,
            image_url: item.src,
        }));
    };
    const id: string = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
    useEffect(() => {
        if (id) {
            mutate(id)
        }
    }, [])
    const {
        mutate,
        isPending
        // isError: mutationError,
        // isSuccess,
        // error,
    } = useMutation({
        mutationFn: getDetailProduct,
        onSuccess: (res) => {
            if (res.status === 200) {
                console.log("detail: ", res.data);
                setData(res.data);
            }
        },
        onError: (error: { status: number, message: string }) => {
            console.log(error)
        }
    });

    const handleAddToBag = () => {

    }

    const [size, setSize] = useState<string>("");
    const handleGetSize = (value: string) => {
        setSize(value);
    }

    return (
        <>
            {isPending && <Loader />}
            {data.image_url && <div className="w-full h-full my-[200px] px-[var(--padding-screen)] flex justify-around">
                <div className="relative w-[30%] border border-[#AEAEAE] h-[400px rounded-[4px]">
                    <Image onError={handleError} src={data.image_url} alt="product" fill className='object-contain' />
                </div>
                <div className="relative w-[40%] border border-[#AEAEAE] p-[20px] flex flex-col items-center rounded-[4px]">
                    <h2 className="text-black text-[30px] font-[600]">{data.name}</h2>
                    <p className="text-black text-left">{data.description}</p>
                    <p className="text-[28px] font-[600] my-[20px]">${data.price}</p>
                    <p className="font-[600]">SIZE</p>
                    <div className="flex justify-around items-center my-[10px]">
                        {SIZES.map((item) => (
                            <span
                                key={item}
                                onClick={() => handleGetSize(item)}
                                className={`${size === item ? "bg-[black] text-[white]" : ""} cursor-pointer border border-[#A3A3A3] w-[40px] h-[40px] mx-[4px] flex justify-center items-center rounded-[2px] hover:scale-102 hover:border-[1px] hover:border-black`}
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    <p className='mb-[20px] text-[12px] cursor-pointer'>FIND YOUR SIZE  |  MEASUREMENT GUIDE</p>
                    <Button title="ADD TO BAG" onSubmit={handleAddToBag} width="w-[80%]" height="h-[36px]" />
                    <div className='absolute top-[10px] -right-[30px] group overflow-visible'>
                        <div className="relative w-fit top-0 right-[40px]">
                            <Tooltip
                                title="Add to favorites"
                                placement="bottom" // top | right | left | bottom
                                color="#ffffff" // nền trắng
                                overlayInnerStyle={{
                                    color: '#000000', // màu chữ đen
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                }}
                            >
                                <IoIosHeartEmpty size={20} className="hover:scale-105 cursor-pointer" />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>}
        </>)
}