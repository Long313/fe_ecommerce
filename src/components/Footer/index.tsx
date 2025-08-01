"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import white_amax_logo from '../../images/white_amax.svg';
import Button from '../Button';
import useTranslation from '@/hooks/useTranslation';

export default function Footer() {
    const [email, setEmail] = useState<string>("");
    console.log(email);
    const { locale } = useTranslation();
    return (<footer className="mt-[200px] p-[var(--padding-screen)] py-[50px] bg-[#373737] text-[#fff] w-full">
        <div className='flex justify-between'>
            <div className="flex flex-col">
                <Image src={white_amax_logo} alt="white_amax_logo" width={90} height={30} />
                <p className='mt-[40px] mb-[20px] font-[500]'>Social Media</p>
                <div className="flex flex-row">
                    <AiOutlineFacebook color="#fff" size={30} className="mr-[20px] cursor-pointer" />
                    <SlSocialTwitter size={30} className="mr-[20px] cursor-pointer" />
                    <FaInstagram size={30} className="mr-[20px] cursor-pointer" />
                </div>
            </div>
            <div className='flex flex-col text-[#fff]'>
                <p className='font-[500] my-[10px]'>SHOP</p>
                <ul>
                    <li><Link href="/">Products</Link></li>
                    <li><Link href="/">Overview</Link></li>
                    <li><Link href="/">Pricing</Link></li>
                    <li><Link href="/">Releases</Link></li>
                </ul>
            </div>
            <div className='flex flex-col text-[#fff]'>
                <p className='font-[500] my-[10px]'>COMPANY</p>
                <ul>
                    <li><Link href={`/${locale}/about-us`}>About us</Link></li>
                    <li><Link href={`/${locale}/contact`}>Contact</Link></li>
                    <li><Link href="/">News</Link></li>
                    <li><Link href="/">Support</Link></li>
                </ul>
            </div>
            <div>
                <p className='uppercase font-[500] my-[10px]'>Stay up to date</p>
                <div className='relative'>
                    <div className="p-[2px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] w-[300px]">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Enter your email"
                            className="w-full bg-white text-black px-[8px] py-[4px] outline-none h-[36px] inline-block"
                        />
                    </div>
                    <Button title="SUBMIT" onSubmit={() => { }} height="h-[39px]" width="w-[100px]" rounded='rounded-none' position="absolute top-[1px] right-[1px] bottom-0" />
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
