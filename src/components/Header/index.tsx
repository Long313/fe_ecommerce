import useTranslation from "@/hooks/useTranslation";
import { useAccessToken, useStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { PiBag } from "react-icons/pi";
import { SlUser, SlUserFollowing } from "react-icons/sl";
import amax from '../../images/amax.svg';
import logo from '../../images/logo.svg';
import Button from "../Button";
import LanguageSwitcher from "../LanguageSwitcher";
import { ROLE, UserInfor } from "@/common/type";

function Header() {
    const { setSearch } = useStore();
    const accessToken = useAccessToken(state => state.accessToken);
    const { setAccessToken } = useAccessToken();
    const { setUserInfor } = useStore();
    const role = useStore(state => state.userInfor.role);
    const [activeTab, setActiveTab] = useState<string>('');
    const searchParams = useSearchParams();

    const router = useRouter();
    const { t, locale } = useTranslation();
    const handleRouterLogin = () => {
        router.push(`/${locale}/login`)
    }
    const userInfor = useStore(state => state.userInfor);

    const handleRouterLogout = () => {
        setAccessToken("");
        setUserInfor({
            ...userInfor,
            role: ROLE.CUSTOMER
        });
        document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push(`/${locale}/login`)
    }

    const handleOpenSearchBar = () => {
        setSearch(true);
    }

    const handleRouterLink = (value: string) => {
        let query = '';
        switch (value) {
            case 'men':
                query = 'gender=men';
                break;
            case 'women':
                query = 'gender=women';
                break;
            case 'kids':
                query = 'type=kid';
                break;
            case 'accessories':
                query = 'category=accessories';
                break;
            default:
                return;
        }
        router.push(`/${locale}/products?${query}`);
    };

    useEffect(() => {
        const gender = searchParams.get("gender");
        const category = searchParams.get("category");
        const type = searchParams.get("type");

        if (gender === "men") {
            setActiveTab("men");
        } else if (gender === "women") {
            setActiveTab("women");
        } else if (type === "kid") {
            setActiveTab("kids");
        } else if (category === "accessories") {
            setActiveTab("accessories");
        } else {
            setActiveTab('');
        }
    }, [searchParams]);


    return (<header className="z-[30] fixed top-0 right-0 left-0 max-w-[1920px] w-full mx-auto">
        <div className="h-[40px] w-full bg-[#373737] text-[#fff] flex justify-center items-center text-[14px]">
            <div className="mr-[50px]">
                <span>Summer Sale For All Swim Sports And Free Express Delivery - OFF 50%! &nbsp;</span>
                <Link href="/" className="font-[500] underline"> ShopNow</Link>
            </div>
            <LanguageSwitcher />
        </div>
        <div className="h-[60px] border-b border-[#AEAEAE] px-[var(--padding-screen)] flex items-center bg-[#fff]">
            <div className="flex items-center cursor-pointer" onClick={() => router.push(`/${locale}/`)}>
                <Image src={logo} alt="logo" width={30} />
                <Image src={amax} alt="amax_logo" width={90} height={30} />
            </div>
            <div className="ml-[10%] w-4/10">
                <nav className="w-full">
                    <ul className="flex w-full justify-between">
                        <li className="relative group cursor-pointer" onClick={() => handleRouterLink("men")}>
                            <Link href="/men" className="relative z-10">
                                MEN
                            </Link>
                            <span
                                className={`absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#822FFF] to-[#FF35C4] transform transition-transform duration-300 origin-left
                                ${activeTab === "men" ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                `}
                            />
                        </li>
                        <li className="relative group cursor-pointer" onClick={() => handleRouterLink("women")}>
                            <Link href="/women" className="relative z-10">
                                WOMEN
                            </Link>
                            <span
                                className={`absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#822FFF] to-[#FF35C4] transform transition-transform duration-300 origin-left
                                ${activeTab === "women" ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                `}
                            />
                        </li>
                        <li className="relative group cursor-pointer" onClick={() => handleRouterLink("kids")}>
                            <Link href="/kids" className="relative z-10">
                                KIDS
                            </Link>
                            <span
                                className={`absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#822FFF] to-[#FF35C4] transform transition-transform duration-300 origin-left
                                ${activeTab === "kids" ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                `}
                            />
                        </li>
                        <li className="relative group cursor-pointer" onClick={() => handleRouterLink("accessories")}>
                            <Link href="/accessories" className="relative z-10">
                                ACCESSORIES
                            </Link>
                            <span
                                className={`absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#822FFF] to-[#FF35C4] transform transition-transform duration-300 origin-left
                                ${activeTab === "accessories" ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                `}
                            />
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex ml-[10%]">
                <IoSearchOutline size={20} className="hover:scale-105 mr-[40px] cursor-pointer" onClick={handleOpenSearchBar} />
                <PiBag size={20} className="hover:scale-105 mr-[40px] cursor-pointer" onClick={() => router.push(`/${locale}/products/bag`)} />
                <IoIosHeartEmpty size={20} className="hover:scale-105 mr-[40px] cursor-pointer" onClick={() => router.push(`/${locale}/products/favorite`)} />
                {accessToken && <SlUser size={18} className="hover:scale-105 mr-[40px] cursor-pointer" onClick={() => router.push(`/${locale}/user`)} />}
                {accessToken && role === "admin" && <SlUserFollowing size={18} className="hover:scale-105 mr-[40px] cursor-pointer" onClick={() => router.push(`/${locale}/admin`)} />}
            </div>
            <div>
                {accessToken ?
                    <Button backgroundColor="#fff" onSubmit={handleRouterLogout} title={t("logOut")} border="border border-[#AEAEAE]" width="min-w-[86px] w-fit" height="h-[33px]" color="#373737" padding="px-[8x] py-[4px]" />
                    : <Button backgroundColor="#fff" onSubmit={handleRouterLogin} title={t("signIn")} border="border border-[#AEAEAE]" width="min-w-[86px] w-fit" height="h-[33px]" color="#373737" />}
            </div>
        </div>
    </header>);
}

export default Header;