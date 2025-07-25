'use client'

import { ProductProps, ServerError } from "@/common/type";
import Loader from "@/components/Loader/page";
import Product from "@/components/Product/page";
import { GENDER } from "@/constants";
import { searchProductByName } from "@/service/products";
import { useStore } from "@/store/store"
import { useMutation } from "@tanstack/react-query";
import { Select } from "antd";
import { useEffect, useState } from "react";
const { Option } = Select;

export default function Products() {
    const [data, setData] = useState<ProductProps[]>([]);
    const searchParams = useStore(state => state.paramsSearch);
    useEffect(() => {
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
    const [sort, setSort] = useState<string>("");
    const [startPrice, setStartPrice] = useState<string>("");
    const [endPrice, setEndPrice] = useState<string>("");
    const [gender, setGender] = useState<string[]>([""]);
    const [category, setCategory] = useState<string[]>([""]);

    const handleGenderChange = (value: string) => {
        setGender((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value) // Bỏ chọn
                : [...prev, value] // Thêm chọn
        );
    };

    const handleCategoryChange = (value: string) => {
        setCategory((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value) // Bỏ chọn
                : [...prev, value] // Thêm chọn
        );
    };
    const { setParamsSearch } = useStore();

    const handleSort = (value: string) => {
        setSort(value);
        const updatedParams = {
            ...searchParams,
            sort: value,
        };
        const filtered = Object.fromEntries(
            Object.entries(updatedParams).filter(
                ([, value]) =>
                    value !== '' &&
                    value !== 0 &&
                    value !== null &&
                    value !== undefined
            )
        );
        setParamsSearch(filtered);
        mutate(filtered);
    };
    return (
        <div className="w-full h-full my-[200px] px-[var(--padding-screen)] flex">
            {isPending && <Loader />}
            <aside className="w-[20%] h-full mr-[10px]">
                <p className="text-[20px] font-[600] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">{searchParams?.search ? searchParams?.search : "Product"}&nbsp;<span className="text-[#FF35C4]">{` ( ${data.length > 1 ? `${data.length} results` : `${data.length} result`} )`}</span>
                </p>
                <div className="my-[10px] border-b border-[#AEAEAE] px-[10px] pb-[10px]">
                    <p className="font-[600] mb-[10px]">Gender</p>
                    {GENDER.map((g) => (
                        <div key={g} className="flex items-center">
                            <span className="min-w-[100px] capitalize">{g}</span>
                            <input
                                type="checkbox"
                                name="gender"
                                value={g}
                                checked={gender.includes(g)}
                                onChange={() => handleGenderChange(g)}
                            />
                        </div>
                    ))}
                </div>
                <div className="w-full my-[10px] border-b border-[#AEAEAE] px-[10px] pb-[10px]">
                    <p className="font-[600] mb-[10px]">Price</p>
                    <div className="flex items-center w-full">
                        <span className="min-w-[40px]">From</span>
                        <input onChange={(e) => setStartPrice(e.target.value)} type="string" name="start_price" value={startPrice} className="outline-none border border-[#AEAEAE] px-[8px] py-[4px] rounded-[8px] max-w-[100px] mx-[4px]" />
                        <span>$</span>
                    </div>
                    <div className="flex items-center w-full mt-[10px]">
                        <span className="min-w-[40px]">To</span>
                        <input onChange={(e) => setEndPrice(e.target.value)} type="string" name="end_price" value={endPrice} className="outline-none border border-[#AEAEAE] px-[8px] py-[4px] rounded-[8px] max-w-[100px] mx-[4px]" />
                        <span>$</span>
                    </div>
                </div>
                <div className="my-[10px] border-b border-[#AEAEAE] px-[10px] pb-[10px]">
                    <p className="font-[600] mb-[10px]">Sports</p>
                    {["badminton", "football", "gym", "running", "swimming", "basketball"].map((g) => (
                        <div key={g} className="flex items-center">
                            <span className="min-w-[100px] capitalize">{g}</span>
                            <input
                                type="checkbox"
                                name="gender"
                                value={g}
                                checked={gender.includes(g)}
                                onChange={() => handleCategoryChange(g)}
                            />
                        </div>
                    ))}
                </div>
            </aside>
            <div className="w-[80%] h-full flex flex-col items-end">
                <div className="min-w-[120px] border border-[#AEAEAE] rounded-[8px] mb-[20px]">
                    <Select
                        value={sort}
                        onChange={handleSort}
                        size="small"
                        className="w-full h-[36px] text-center"
                        variant="borderless"
                    >
                        <Option value="" className="w-full">Sort by price</Option>
                        <Option value="desc" className="w-full">High to low</Option>
                        <Option value="asc" className="w-full">Low to High</Option>
                    </Select>
                </div>
                <div className="w-full flex flex-wrap justify-start gap-x-[30px] gap-y-8 max-w-7xl mx-auto mt-[60px]">{data.length > 0 && data.map(item =>
                    <div key={item.id} className="w-full sm:w-[48%] lg:w-[22%] xl:w-[22%] max-w-[250px]">
                        <Product id={item.id} image_url={item.image_url} name={item.name} price={item.price} />
                    </div>
                )}</div>
            </div>
        </div>
    )
}