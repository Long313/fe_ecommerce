'use client';

import Loader from "@/components/Loader";
import Product from "@/components/Product";
import { GENDER } from "@/constants";
import { useProductSearch } from "@/hooks/useProductSearch";
import { useStore } from "@/store/store";
import { Select } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";


const { Option } = Select;

export default function Products() {
    const searchParams = useStore(state => state.paramsSearch);
    const { setParamsSearch } = useStore();
    const searchParamsRouter = useSearchParams();

    const [sort, setSort] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [endPrice, setEndPrice] = useState('');
    const [gender, setGender] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [category, setCategory] = useState<string[]>([]);
    const debouncedStartPrice = useDebounce(startPrice, 500);
    const debouncedEndPrice = useDebounce(endPrice, 500);
    // Lấy giá trị từ URL
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

    // Build filter params
    const filteredParams = useMemo(() => {
        const result = {
            ...searchParams,
            sort,
            startPrice: debouncedStartPrice,
            endPrice: debouncedEndPrice,
            gender,
            category,
            search,
            type
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
    }, [searchParams, search, type, sort, debouncedStartPrice, debouncedEndPrice, gender, category]);

    const { data, isPending } = useProductSearch(filteredParams);

    // Toggle chọn giới tính
    const handleGenderChange = (value: string) => {
        setGender(prev =>
            prev.includes(value) ? prev.filter(g => g !== value) : [...prev, value]
        );
    };

    // Toggle chọn danh mục
    const handleCategoryChange = (value: string) => {
        setCategory(prev =>
            prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
        );
    };

    const handleSort = (value: string) => {
        setSort(value);
        setParamsSearch({ ...searchParams, sort: value });
    };

    return (
        <div className="w-full h-full my-[200px] px-[var(--padding-screen)] flex">
            {isPending && <Loader />}
            <aside className="w-[20%] h-full mr-[10px]">
                <p className="text-[20px] font-[600] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                    {search ? search : "Product"}&nbsp;
                    <span className="text-[#FF35C4]">
                        ({data?.pagination.total || 0} result{data?.pagination.total !== 1 ? 's' : ''})
                    </span>
                </p>

                {/* Filter Gender */}
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

                {/* Filter Price */}
                <div className="w-full my-[10px] border-b border-[#AEAEAE] px-[10px] pb-[10px]">
                    <p className="font-[600] mb-[10px]">Price</p>
                    <div className="flex items-center w-full">
                        <span className="min-w-[40px]">From</span>
                        <input
                            onChange={(e) => setStartPrice(e.target.value)}
                            type="text"
                            name="start_price"
                            value={startPrice}
                            className="outline-none border border-[#AEAEAE] px-[8px] py-[4px] rounded-[8px] max-w-[100px] mx-[4px]"
                        />
                        <span>$</span>
                    </div>
                    <div className="flex items-center w-full mt-[10px]">
                        <span className="min-w-[40px]">To</span>
                        <input
                            onChange={(e) => setEndPrice(e.target.value)}
                            type="text"
                            name="end_price"
                            value={endPrice}
                            className="outline-none border border-[#AEAEAE] px-[8px] py-[4px] rounded-[8px] max-w-[100px] mx-[4px]"
                        />
                        <span>$</span>
                    </div>
                </div>

                {/* Filter Category */}
                <div className="my-[10px] border-b border-[#AEAEAE] px-[10px] pb-[10px]">
                    <p className="font-[600] mb-[10px]">Category</p>
                    {["shoes", "shirts", "accessories", "trousers", "short", "socks", "skirts"].map((g) => (
                        <div key={g} className="flex items-center">
                            <span className="min-w-[100px] capitalize">{g}</span>
                            <input
                                type="checkbox"
                                name="category"
                                value={g}
                                checked={category.includes(g)}
                                onChange={() => handleCategoryChange(g)}
                            />
                        </div>
                    ))}
                </div>
            </aside>

            {/* Product list */}
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
                <div className="w-full flex flex-wrap justify-start gap-x-[30px] gap-y-8 max-w-7xl mx-auto mt-[60px]">
                    {data?.data?.map(item => (
                        <div
                            key={item.id}
                            className="w-full sm:w-[48%] lg:w-[22%] xl:w-[22%] max-w-[250px]"
                        >
                            <Product
                                id={item.id}
                                image_url={item.image_url}
                                name={item.name}
                                price={item.price}
                                star={item.star}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
