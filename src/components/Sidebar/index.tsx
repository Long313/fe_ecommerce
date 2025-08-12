'use client'

import useTranslation from "@/hooks/useTranslation";
import { useAccessToken, useStore } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const userInfor = useStore(state => state.userInfor);
    const { locale } = useTranslation();
    const pathname = usePathname();
    const { setAccessToken } = useAccessToken();
    const router = useRouter();
    const isActive = (path: string) =>
        pathname === path ? "bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent" : "";
    const handleRouterLogout = () => {
        setAccessToken("");
        router.push(`/${locale}/`);
    }
    return (
        <div className="flex flex-col w-40%">
            <div>
                <p className="text-[#822FFF] text-[30px] font-[600] overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px]">Hello&nbsp;{userInfor.fullname ?? userInfor.email}!</p>
                <p className="text-[#FF35C4] text-[30px] font-[600]">Welcome back</p>
            </div>
            <div className="mt-[20px] flex flex-col pb-[10px] border-b border-[#E5E5E5]">
                <p className="font-[600] text-[20px] mb-[10px]">Membership</p>
                <Link href={`/${locale}/user`} className={`ml-[20px] hover:bg-gradient-to-r hover:from-[#822FFF] hover:to-[#FF35C4] hover:bg-clip-text hover:text-transparent ${isActive(`/${locale}/user`)}`}>Profile</Link>
                <Link href={`/${locale}/user/counpons`} className={`my-[10px] ml-[20px] hover:bg-gradient-to-r hover:from-[#822FFF] hover:to-[#FF35C4] hover:bg-clip-text hover:text-transparent ${isActive(`/${locale}/user/counpons`)}`}>Counpons</Link>
                <Link href={`/${locale}/user/purchase-history`} className={`ml-[20px] hover:bg-gradient-to-r hover:from-[#822FFF] hover:to-[#FF35C4] hover:bg-clip-text hover:text-transparent ${isActive(`/${locale}/user/purchase-history`)}`}>Purchase history</Link>
            </div>
            <div className="mt-[20px] flex flex-col pb-[10px] border-b border-[#E5E5E5]">
                <p className="font-[600] text-[20px] mb-[10px]">Profile settings</p>
                <Link href={`/${locale}/user/edit-profile`} className={`ml-[20px] hover:bg-gradient-to-r hover:from-[#822FFF] hover:to-[#FF35C4] hover:bg-clip-text hover:text-transparent ${isActive(`/${locale}/user/edit-profile`)}`}>Edit profile</Link>
                <Link href={`/${locale}/user/address-book`} className={`my-[10px] ml-[20px] hover:bg-gradient-to-r hover:from-[#822FFF] hover:to-[#FF35C4] hover:bg-clip-text hover:text-transparent ${isActive(`/${locale}/user/address-book`)}`}>Address book</Link>
                <Link href={`/${locale}/user/change-password`} className={`ml-[20px] hover:bg-gradient-to-r hover:from-[#822FFF] hover:to-[#FF35C4] hover:bg-clip-text hover:text-transparent ${isActive(`/${locale}/user/change-password`)}`}>Change my password</Link>
            </div>
            <p className="font-[600] mt-[20px] cursor-pointer hover:bg-gradient-to-r hover:from-[#822FFF] hover:to-[#FF35C4] hover:bg-clip-text hover:text-transparent" onClick={handleRouterLogout}>Sign out</p>
        </div>
    );
}
