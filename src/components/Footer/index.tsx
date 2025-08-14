"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import white_amax_logo from '../../images/white_amax.svg';
import useTranslation from '@/hooks/useTranslation';
import dynamic from 'next/dynamic';
const Button = dynamic(() => import("@/components/Button"), { ssr: false });

export default function Footer() {
    const { locale } = useTranslation();
    const [email, setEmail] = useState<string>("");
    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);
    const handleSubmit = useCallback(() => {
        console.log("Submitted email:", email);
    }, [email]);

    const shopLinks = useMemo(() => [
        { label: "Products", href: "/" },
        { label: "Overview", href: "/" },
        { label: "Pricing", href: "/" },
        { label: "Releases", href: "/" }
    ], []);

    const companyLinks = useMemo(() => [
        { label: "About us", href: `/${locale}/about-us` },
        { label: "Contact", href: `/${locale}/contact` },
        { label: "News", href: "/" },
        { label: "Support", href: "/" }
    ], [locale]);

    const socialIcons = useMemo(() => [
        <AiOutlineFacebook key="fb" color="#fff" size={30} className="mr-[20px] cursor-pointer" />,
        <SlSocialTwitter key="tw" size={30} className="mr-[20px] cursor-pointer" />,
        <FaInstagram key="ig" size={30} className="mr-[20px] cursor-pointer" />
    ], []);
    return (<footer className="z-30 mt-[200px] p-[var(--padding-screen)] py-[50px] bg-[#373737] text-[#fff] w-full">
        <div className="flex justify-between">
            <div className="flex flex-col">
                <Image src={white_amax_logo} alt="white_amax_logo" width={90} height={30} />
                <p className="mt-[40px] mb-[20px] font-[500]">Social Media</p>
                <div className="flex flex-row">{socialIcons}</div>
            </div>

            <div className="flex flex-col text-[#fff]">
                <p className="font-[500] my-[10px]">SHOP</p>
                <ul>
                    {shopLinks.map(link => (
                        <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col text-[#fff]">
                <p className="font-[500] my-[10px]">COMPANY</p>
                <ul>
                    {companyLinks.map(link => (
                        <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
                    ))}
                </ul>
            </div>

            <div>
                <p className="uppercase font-[500] my-[10px]">Stay up to date</p>
                <div className="relative">
                    <div className="p-[2px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] w-[300px]">
                        <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            className="w-full bg-black text-white px-[8px] py-[4px] outline-none h-[36px] inline-block"
                        />
                    </div>
                    <Button
                        title="SUBMIT"
                        onSubmit={handleSubmit}
                        height="h-[36px]"
                        width="w-[100px]"
                        rounded="rounded-none"
                        position="absolute top-[2px] right-[1px] bottom-0"
                    />
                </div>
            </div>
        </div>
        <div className="mt-[40px] w-full flex items-center">
            <span className="h-[2px] border-b border-[#fff] flex-1"></span>
            <span className="ml-[20px] font-[500] cursor-pointer">Terms</span>
            <span className="ml-[20px] font-[500] cursor-pointer">Privacy</span>
            <span className="ml-[20px] font-[500] cursor-pointer">Cookies</span>
        </div>
    </footer>);
}
