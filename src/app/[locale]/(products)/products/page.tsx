'use client'

import { ProductProps, ServerError } from "@/common/type";
import Loader from "@/components/Loader/page";
import Product from "@/components/Product/page";
import { searchProductByName } from "@/service/products";
import { useStore } from "@/store/store"
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Products() {
    const [data, setData] = useState<ProductProps[]>([]);
    const searchParams = useStore(state => state.paramsSearch);
    useEffect(() => {
        // Lọc các param không rỗng
        const filteredParams = Object.fromEntries(
            Object.entries(searchParams).filter(
                ([, value]) =>
                    value !== '' &&
                    value !== 0 &&
                    value !== null &&
                    value !== undefined
            )
        );
        mutate(filteredParams);
    }, [searchParams]);
    const {
        mutate,
        isPending
        // isError: mutationError,
        // isSuccess,
        // error,
    } = useMutation({
        mutationFn: searchProductByName,
        onSuccess: (res) => {
            if (res.status === 200) {
                console.log("Res.data", res.data);
                setData(res.data);
            }
        },
        onError: (error: ServerError) => {
            console.log(error)
        }

    });
    return (
        <div className="w-full h-full mt-[200px] mx-[var(--padding-screen)]">
            {isPending && <Loader />}
            <div>
                <div className="w-[30%]">
                    <p>{searchParams?.search ? searchParams?.search : "Product"}&nbsp;<span>{`(${data.length})`}</span></p>
                </div>
                <div className="w-[70%] flex flex-wrap justify-center gap-x-6 gap-y-8 max-w-7xl mx-auto">{data.length > 0 && data.map(item =>
                    <div key={item.id} className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] max-w-[250px]">
                        <Product image_url={item.image_url} name={item.name} price={item.price} />
                    </div>
                )}</div>
            </div>
        </div>
    )
}