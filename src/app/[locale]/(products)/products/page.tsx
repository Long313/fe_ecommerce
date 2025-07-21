'use client'

import { ServerError } from "@/common/type";
import { searchProductByName } from "@/service/products";
import { useStore } from "@/store/store"
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Products() {
    const searchParams = useStore(state => state.paramsSearch);
    useEffect(() => {
        // Lọc các param không rỗng
        const filteredParams = Object.fromEntries(
            Object.entries(searchParams).filter(
                ([_, value]) =>
                    value !== '' &&
                    value !== 0 &&
                    value !== null &&
                    value !== undefined
            )
        );
        const data = mutate(filteredParams);
        console.log("data", data);
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
            }
        },
        onError: (error: ServerError) => {

        }

    });
    return (
        <div>Product</div>
    )
}