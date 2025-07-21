import useTranslation from "@/hooks/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { PiBag } from "react-icons/pi";
import amax from '../../images/amax.svg';
import logo from '../../images/logo.svg';
import Button from "../Button/page";
import LanguageSwitcher from "../LanguageSwitcher/page";
import { useStore } from "@/store/store";

function Header() {
    const { setSearch } = useStore();
    const router = useRouter();
    const { locale } = useTranslation();
    const handleRouterLogin = () => {
        router.push(`/${locale}/login`)
    }

    const handleOpenSearchBar = () => {
        setSearch(true);
    }

    return (<header className="z-20 fixed top-0 right-0 left-0 max-w-[1920px] w-full mx-auto">
        <div className="h-[40px] w-full bg-[#373737] text-[#fff] flex justify-center items-center text-[14px]">
            <div className="mr-[50px]">
                <span>Summer Sale For All Swim Sports And Free Express Delivery - OFF 50%! &nbsp;</span>
                <Link href="/" className="font-[500] underline"> ShopNow</Link>
            </div>
            <LanguageSwitcher />
        </div>
        <div className="h-[60px] border-b border-[#AEAEAE] px-[var(--padding-screen)] flex items-center bg-[#fff]">
            <div className="flex items-center cursor-pointer" onClick={() => router.push(`/`)}>
                <Image src={logo} alt="logo" width={30} />
                <Image src={amax} alt="amax_logo" width={90} height={30} />
            </div>
            <div className="ml-[10%] w-4/10">
                <nav className="w-full">
                    <ul className="flex w-full justify-between">
                        <li className="relative group cursor-pointer">
                            <Link href="/men" className="relative z-10">
                                MEN
                            </Link>
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#822FFF] to-[#FF35C4] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </li>

                        <li className="relative group cursor-pointer">
                            <Link href="/women" className="relative z-10">
                                WOMEN
                            </Link>
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#822FFF] to-[#FF35C4] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </li>

                        <li className="relative group cursor-pointer">
                            <Link href="/kids" className="relative z-10">
                                KIDS
                            </Link>
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#822FFF] to-[#FF35C4] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </li>

                        <li className="relative group cursor-pointer">
                            <Link href="/accessories" className="relative z-10">
                                ACCESSORIES
                            </Link>
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#822FFF] to-[#FF35C4] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex ml-auto">
                <IoSearchOutline size={20} className="mr-[40px] cursor-pointer" onClick={handleOpenSearchBar} />
                <PiBag size={20} className="mr-[40px] cursor-pointer" />
                <IoIosHeartEmpty size={20} className="mr-[40px] cursor-pointer" />
            </div>
            <div>
                <Button backgroundColor="#fff" onSubmit={handleRouterLogin} title="LOGIN" border="border border-[#AEAEAE]" width="w-[67px]" height="h-[33px]" color="#373737" />
            </div>
        </div>
    </header>);
}

export default Header;