import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher/page";
import Image from "next/image";
import logo from '../../images/logo.svg';
import amax from '../../images/amax.svg';
function Header() {
    return (<div className="fixed top-0 right-0 left-0">
        <div className="h-[40px] w-full bg-[#373737] text-[#fff] flex justify-center items-center text-[14px]">
            <div className="mr-[50px]">
                <span>Summer Sale For All Swim Sports And Free Express Delivery - OFF 50%! &nbsp;</span>
                <Link href="/" className="font-[500] underline"> ShopNow</Link>
            </div>
            <LanguageSwitcher color="white" />
        </div>
        <div className="h-[60px] border border-[#AEAEAE] px-[var(--padding-screen)] flex items-center">
            <div className="flex items-center">
                <Image src={logo} alt="logo" width={30} />
                <Image src={amax} alt="amax_logo" width={90} height={30} />
            </div>
            <div>
                <div>
                    
                </div>
            </div>
        </div>
    </div>);
}

export default Header;