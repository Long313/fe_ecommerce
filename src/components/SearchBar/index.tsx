import { useStore } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import amax from '../../images/amax.svg';
import logo from '../../images/logo.svg';
import ProposeTag from "../ProposeTag";
import useTranslation from "@/hooks/useTranslation";


export default function SearchBar() {
    const [value, setValue] = useState<string>("");
    const router = useRouter();
    const { setSearch } = useStore();
    const [show, setShow] = useState(false);
    const [listPropose, setListPropose] = useState<string[]>([]);
    const { locale } = useTranslation();

    const handleCloseSearchBar = () => {
        setShow(false);
        setTimeout(() => {
            setSearch(false);
        }, 500);
    }

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem("prosose") || '[]');
        setListPropose(list);
    }, [])
    const { setParamsSearch } = useStore();

    const handleSearch = () => {
        const newList = [
            ...listPropose.filter(item => item !== value),
            value
        ];
        setListPropose(newList);
        localStorage.setItem("prosose", JSON.stringify(newList));
        setParamsSearch({ search: value.trim() });
        router.push(`/${locale}/products`);
        setSearch(false);
    };

    const handleSearchByKey = (value: string) => {
        setParamsSearch({ search: value.trim() });
        router.push(`/${locale}/products?search=${value}`);
        setSearch(false);
    }


    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (<div className={`z-30 fixed top-0 right-0 left-0 bottom-0 max-w-[1920px] w-full mx-auto h-full flex flex-col`}>
        <div className={`bg-[#fff] z-40 h-[200px] pt-[40px] px-[var(--padding-screen)] flex flex-col transition-transform ease-in-out duration-500 ${show ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-row items-center cursor-pointer" onClick={() => router.push(`/`)}>
                    <Image src={logo} alt="logo" width={30} />
                    <Image src={amax} alt="amax_logo" width={90} height={30} />
                </div>
                <div className="relative flex-1 mx-[40px] border border-[#373737] rounded-[16px] py-[8px] px-[16px] flex items-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                    <IoSearchOutline size={20} className="mr-[40px] cursor-pointer" onClick={handleSearch} />
                    <input placeholder="SEARCH" value={value} onChange={e => setValue(e.target.value)} className="text-[#A3A3A3] flex-1 outline-none pr-[40px]" />
                    {value ? <IoCloseOutline onClick={() => setValue("")} size={20} className="cursor-pointer absolute top-1/2 -translate-y-[50%] right-[10px]" /> : <></>}
                </div>
                <p className="font-[600] cursor-pointer" onClick={handleCloseSearchBar}>Cancel</p>
            </div>
            <p className="text-[#A3A3A3] my-[20px] ml-[15%]">Popular search terms</p>
            <div className="flex ml-[16%] flex-wrap overflow-y-hidden gap-y-4">
                {listPropose.length > 0 && listPropose.map((name, index) => {
                    return (
                        <ProposeTag key={index} name={name} onChoose={(value) => handleSearchByKey(value)} />
                    )
                })}
                {/* <ProposeTag name="Item CC" onChoose={(value) => handleGetKeySearch(value)} />
                <ProposeTag name="Item BBBBBBBBBBB" onChoose={(value) => handleGetKeySearch(value)} />
                <ProposeTag name="Item A" onChoose={(value) => handleGetKeySearch(value)} />
                <ProposeTag name="Item CC" onChoose={(value) => handleGetKeySearch(value)} />
                <ProposeTag name="Item BBBBBBBBBBB" onChoose={(value) => handleGetKeySearch(value)} />
                <ProposeTag name="Item A" onChoose={(value) => handleGetKeySearch(value)} />
                <ProposeTag name="Item CC" onChoose={(value) => handleGetKeySearch(value)} />
                <ProposeTag name="Item BBBBBBBBBBB" onChoose={(value) => handleGetKeySearch(value)} />
                <ProposeTag name="Item A" onChoose={(value) => handleGetKeySearch(value)} />
                <ProposeTag name="Item CC" onChoose={(value) => handleGetKeySearch(value)} />
                <ProposeTag name="Item BBBBBBBBBBB" onChoose={(value) => handleGetKeySearch(value)} /> */}
            </div>
        </div>
        <div className={`flex-1 bg-[#000] transition-opacity duration-500 ease-in-out ${show ? "opacity-20" : "opacity-0"}`} onClick={handleCloseSearchBar}></div>
    </div>)
}