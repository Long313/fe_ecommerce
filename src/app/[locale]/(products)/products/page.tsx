'use client';

import { ProductDetailProps } from "@/common/type";
import Loader from "@/components/Loader";
import Product from "@/components/Product";
import { CATEGORIES, GENDER } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import { useProductSearch } from "@/hooks/useProductSearch";
import { useStore } from "@/store/store";
import { Select } from "antd";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const PriceInput = dynamic(() => import('@/components/PriceInput'), { ssr: false });

const { Option } = Select;

export default function Products() {
    const searchParams = useStore(state => state.paramsSearch);
    const { setParamsSearch } = useStore();
    const searchParamsRouter = useSearchParams();
    const [sortOrder, setSortOrder] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [endPrice, setEndPrice] = useState('');
    const [gender, setGender] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [category, setCategory] = useState<string[]>([]);
    const debouncedStartPrice = useDebounce(startPrice, 500);
    const debouncedEndPrice = useDebounce(endPrice, 500);
    const [pageIndex, setPageIndex] = useState(1);
    const [products, setProducts] = useState<ProductDetailProps[]>([]);

    useEffect(() => {
        const genders = searchParamsRouter.getAll("gender");
        const categories = searchParamsRouter.getAll("category");
        const search = searchParamsRouter.get("search");
        const type = searchParamsRouter.get("type");

        if (genders.length) setGender(genders);
        if (categories.length) setCategory(categories);
        if (search) setSearch(search);
        if (type) setType(type);
    }, [searchParamsRouter]);

    const filteredParams = useMemo(() => {
        const result = {
            ...searchParams,
            sortOrder,
            startPrice: debouncedStartPrice,
            endPrice: debouncedEndPrice,
            gender,
            category,
            search,
            type,
            sortField: "price"
        };

        return Object.fromEntries(
            Object.entries(result).filter(
                ([, value]) =>
                    value !== '' &&
                    value !== 0 &&
                    value !== null &&
                    value !== undefined &&
                    (!(Array.isArray(value)) || value.length > 0)
            )
        );
    }, [searchParams, search, type, sortOrder, debouncedStartPrice, debouncedEndPrice, gender, category]);

    const { data, isPending, isFetching } = useProductSearch({ ...filteredParams, pageIndex });

    useEffect(() => {
        if (data?.data) {
            setProducts(prev =>
                pageIndex === 1 ? data.data : [...prev, ...data.data]
            );
        }
    }, [data, pageIndex]);

    useEffect(() => {
        setPageIndex(1);
    }, [filteredParams]);

    const handleGenderChange = (value: string) => {
        setGender(prev =>
            prev.includes(value) ? prev.filter(g => g !== value) : [...prev, value]
        );
    };

    const handleCategoryChange = (value: string) => {
        setCategory(prev =>
            prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
        );
    };

    const handleSort = (value: string) => {
        setSortOrder(value);
        setParamsSearch({ ...searchParams, sort: value });
    };

    const handleGetValue = (name: string, value: string) => {
        if (name === "start_price") {
            setStartPrice(value);
        } else if (name === "end_price") {
            setEndPrice(value);
        }
    }
    return (
        <>
            <div className="w-full h-max mt-[160px] mb-[50px] px-[var(--padding-screen)] flex">
                {isPending && <Loader />}
                <aside className="w-[20%] h-full mr-[10px]">
                    <p className="text-[20px] font-[600] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        {search ? search : "Product"}&nbsp;
                        <span className="text-[#FF35C4]">
                            ({data?.pagination.total || 0} result{data?.pagination.total !== 1 ? 's' : ''})
                        </span>
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
                                    className="cursor-pointer appearance-none w-4 h-4 border border-[#822FFF] bg-[rgb(255,53,196,0.06)]
                                    checked:bg-[#FF35C4] checked:border-[#822FFF] rounded-[2px]
                                    relative checked:before:content-['✓'] checked:before:absolute checked:before:inset-0
                                    checked:before:flex checked:before:items-center checked:before:justify-center
                                    checked:before:text-white checked:before:text-sm"                                     />
                            </div>
                        ))}
                    </div>
                    <div className="w-full my-[10px] border-b border-[#AEAEAE] px-[10px] pb-[10px]">
                        <p className="font-[600] mb-[10px]">Price</p>
                        <div className="flex items-center w-full font-normal">
                            <PriceInput minWidth="min-w-[60px]" value={startPrice} title="From" name="start_price" onGetValue={(name, value) => handleGetValue(name, value)} />
                        </div>
                        <div className="flex items-center w-full mt-[10px] font-normal">
                            <PriceInput minWidth="min-w-[60px]" value={endPrice} title="To" name="end_price" onGetValue={(name, value) => handleGetValue(name, value)} />
                        </div>
                    </div>
                    <div className="my-[10px] border-b border-[#AEAEAE] px-[10px] pb-[10px]">
                        <p className="font-[600] mb-[10px]">Category</p>
                        {CATEGORIES.map((c) => (
                            <div key={c} className="flex items-center">
                                <span className="min-w-[100px] capitalize">{c}</span>
                                <input
                                    type="checkbox"
                                    name="category"
                                    value={c}
                                    checked={category.includes(c)}
                                    onChange={() => handleCategoryChange(c)}
                                    className="cursor-pointer appearance-none w-4 h-4 border border-[#822FFF] bg-[rgb(255,53,196,0.06)]
                                    checked:bg-[#FF35C4] checked:border-[#822FFF] rounded-[2px]
                                    relative checked:before:content-['✓'] checked:before:absolute checked:before:inset-0
                                    checked:before:flex checked:before:items-center checked:before:justify-center
                                    checked:before:text-white checked:before:text-sm"/>                             </div>
                        ))}
                    </div>
                </aside>
                <div className="w-[80%] h-full flex flex-col items-end">
                    <div className="min-w-[120px] border border-[#822FFF] bg-[rgb(255,53,196,0.06)] rounded-[8px] mb-[20px]">
                        <Select
                            value={sortOrder}
                            onChange={handleSort}
                            size="small"
                            className="w-full h-[36px] text-center font-[600]"
                            variant="borderless"
                        >
                            <Option value="" className="w-full">Sort by price</Option>
                            <Option value="desc" className="w-full">High to low</Option>
                            <Option value="asc" className="w-full">Low to High</Option>
                        </Select>
                    </div>
                    <div className="w-full flex flex-wrap justify-start gap-x-[30px] gap-y-[140px] max-w-7xl mt-[120px] pl-[20px]">
                        {products.map(item => (
                            <div
                                key={item.id}
                                className="w-full sm:w-[48%] lg:w-[24%] xl:w-[22%] max-w-[250px]"
                            >
                                <Product
                                    id={item.id}
                                    image_url={item.image_url}
                                    name={item.name}
                                    price={item.price}
                                    star={item.star} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-[40px] mx-auto z-20">
                {data && data?.pagination?.total > products.length && (
                    <button
                        onClick={() => setPageIndex(prev => prev + 1)}
                        disabled={isFetching}
                        className="z-20 px-6 py-2 border rounded hover:bg-gray-100 cursor-pointer"
                    >
                        {isFetching ? "Loading..." : "Load More"}
                    </button>
                )}
            </div>
        </>
    );
}
